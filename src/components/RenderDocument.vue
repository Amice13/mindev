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
.document .alert {
  background: #FFCDD2;
  display: inline;
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

.document div > table:nth-last-of-type(1),
.document div > table:nth-last-of-type(2) {
  width: 100%;
}

.document div > table:nth-last-of-type(1) td:nth-child(1),
.document div > table:nth-last-of-type(2) td:nth-child(1) {
  width: 20%;
}

.document div > table:nth-last-of-type(1) tr:nth-child(even) td:nth-child(1),
.document div > table:nth-last-of-type(2) tr:nth-child(even) td:nth-child(1) {
  padding-top: 4px;
  width: 20%;
  text-align: center;
  border-top: 1px solid black;
}

.document div > table:nth-last-of-type(1) tr:nth-child(odd) td:nth-child(2),
.document div > table:nth-last-of-type(2) tr:nth-child(odd) td:nth-child(2) {
  padding-left: 24px;
}

.document div > table:nth-last-of-type(1) td:nth-child(2) table,
.document div > table:nth-last-of-type(2) td:nth-child(2) table {
  width: 100%;
}

</style>

<script setup lang="ts">
import useGenerateDocument from '@/composables/generate-document'
import useRenderHtml from '@/composables/render-html'
import type { Act } from '@/types'

const { generateDocument } = useGenerateDocument()
const { renderHtml } = useRenderHtml()

interface Props {
  data: Partial<Act>
}

const props = defineProps<Props>()

const fetchDoc = async () => {
  const doc = generateDocument(props.data as Act)
  const newHtml = await renderHtml(doc)
  html.value = newHtml
}
const html = ref('')

fetchDoc()

watch(props, () => {
    fetchDoc()
  },
  { deep: true }
)
</script>