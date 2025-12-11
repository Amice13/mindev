<template>
  <div class="pa-4 document">
    <div v-html="html"></div>
  </div>
</template>

<style>
.document table td {
  vertical-align: top;
}
.document .highlighted {
  background: #dbefef;
  display: inline-block;
}

.document div > table {
  margin: 20px 0px;
}
.document .highlighted-centered {
  background: #dbefef;
  display: block;
  text-align: center;
  margin: 4px 0px;
}

.document .highlighted-char {
  background: #dbefef;
}

.document .paragraph, .document .paragraph-even {
  text-indent: 2em;
  margin-bottom: 14px;
  text-align: justify;
}

.document .custom-title {
  font-size: 1.1em;
  font-weight: 500;
}

.document table:nth-child(1) td:nth-child(1) {
  width: 55%;
}

.document table:nth-child(1) td:nth-child(2) {
  text-align: center;
  line-height: 1.5;
}

.document table:nth-child(1) td:nth-child(2) table {
  width: 100%;
}

.document table:nth-child(1) td:nth-child(2) tr:nth-child(1) td:nth-child(1) {
  border-bottom: 1px solid #000;
}

.document table:nth-child(3) {
  width: 100%;
}

.document table:nth-child(3) td:nth-child(2) {
  text-align: right !important;
}

.document .superscript {
  position: relative;
  top: -0.5em;
  font-size: 80%;
}


</style>

<script setup lang="ts">
import { toRaw } from 'vue'
import type { Act, Person } from '@/types';
import sanitizeHtml from 'sanitize-html'
import mammoth from 'mammoth'
import docUrl from '@/templates/act.docx?url'
import PizZip from 'pizzip'
import docxtemplater from 'docxtemplater'
import expressionParser from 'docxtemplater/expressions.js'
// const expressionParser = require("docxtemplater/expressions.js")

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

const shortenName = (user: Person) => {
  const nameInitial = user.givenName ? user.givenName.slice(0, 1) + '.' : ''
  const additionalNameInitial = user.additionalName ? user.additionalName.slice(0, 1) + '.' : ''
  return [user.familyName, nameInitial, additionalNameInitial].filter(Boolean).join(' ')
}

const parser = expressionParser.configure({ filters: {
  formatDate,
  safe (s: string | number | undefined) {
    if (s === undefined) return ''
    return s
  },
  toLowerCase (s:string) {
    return s.toLowerCase()
  }
}})

interface Props {
  data: NonNullable<Act>
}

const props = defineProps<Props>()

const fetchDoc = async () => {
  const res = await fetch(docUrl)
  const docx = await res.arrayBuffer()
  const zip = new PizZip(docx)
  const newDoc = new docxtemplater(zip, { parser, linebreaks: true })
  const data = toRaw(props.data)
  data.createdBy.shortName = shortenName(data.createdBy)
  data.isFirst = ['112', '113'].includes(props.data.buildingClass?.code3 ?? 'N/A')
  newDoc.setData(data)
  newDoc.render()
  const docToRender = newDoc.getZip().generate({ type: 'uint8array' })
  const newHtml = await mammoth.convertToHtml({ arrayBuffer: docToRender.buffer as ArrayBuffer }, {
    styleMap: [
      'p[style-name=\'Paragraph\'] => p.paragraph:fresh',
      'p[style-name=\'Paragraph-Even\'] => p.paragraph-even:fresh',
      'r[style-name=\'Paragraph-Even\'] => p.paragraph:fresh',
      'p[style-name=\'Centered\'] => p.text-center',
      'p[style-name=\'CustomTitle\'] => p.text-center.mt-6.mb-6.custom-title',
      'p[style-name=\'Highlighted-centered\'] => p.highlighted-centered',
      'p[style-name=\'Highlighted-bold\'] => p.highlighted',
      'r[style-name=\'Highlighted-bold Char\'] => span.highlighted-char',
      'p[style-name=\'Superscript\'] => p.superscript',
      'r[style-name=\'Superscript Char\'] => span.superscript'
    ]
  })
  html.value = newHtml.value
  html.value = sanitizeHtml(newHtml.value, {
    allowedAttributes: {
      '*': [ 'class' ]
    }
  })
}
const html = ref('')

fetchDoc()
watch(props, () => {
    fetchDoc()
  },
  { deep: true }
)
</script>