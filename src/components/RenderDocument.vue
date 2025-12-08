<template>
  <div class="pa-4">
    <div v-html="html"></div>
  </div>
</template>

<script setup lang="ts">
import mammoth from 'mammoth'
import docUrl from '@/templates/act.docx?url'

const fetchDoc = async () => {
  const res = await fetch(docUrl)
  const docx = await res.arrayBuffer()
  const newHtml = await mammoth.convertToHtml({ arrayBuffer: docx }, {
    styleMap: [
      'p.custom => span.placeholder',
      'p[style-name=\'custom Char\'] => span.placeholder',
      'p[style-name=\'custom\'] => span.placeholder',
      'r[style-name=\'custom Char\'] => span.placeholder',
      'r[style-name=\'custom\'] => span.placeholder',
      'r[style-name=\'Title\'] => p.title',
      'p[style-name=\'Title\'] => p.title',
    ]
  })
  html.value = newHtml.value
}
const html = ref('')
fetchDoc()
</script>