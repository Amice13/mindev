import sanitizeHtml from 'sanitize-html'
import mammoth from 'mammoth'

const styleMap = [
  'p[style-name=\'Paragraph\'] => p.paragraph:fresh',
  'p[style-name=\'Paragraph-Even\'] => p.paragraph-even:fresh',
  'r[style-name=\'Paragraph-Even\'] => p.paragraph:fresh',
  'p[style-name=\'Centered\'] => p.text-center',
  'p[style-name=\'Alert\'] => p.alert',
  'r[style-name=\'Alert\'] => p.alert',
  'r[style-name=\'Alert Char\'] => span.alert',
  'p[style-name=\'CustomTitle\'] => p.text-center.mt-6.mb-6.custom-title',
  'p[style-name=\'Highlighted-centered\'] => p.highlighted-centered',
  'p[style-name=\'Highlighted-bold\'] => p.highlighted',
  'r[style-name=\'Highlighted-bold Char\'] => span.highlighted-char',
  'p[style-name=\'Superscript\'] => p.superscript',
  'r[style-name=\'Superscript Char\'] => span.superscript'
]

const allowedAttributes = {
  '*': [ 'class' ]
}

const renderHtml = async (arrayBuffer: ArrayBuffer) => {
  const result = await mammoth.convertToHtml({ arrayBuffer }, { styleMap })
  return sanitizeHtml(result.value, {
    allowedAttributes: {
      '*': [ 'class' ]
    }
  })
}

const useRenderHtml = () => {
  return {
    renderHtml
  }
}

export default useRenderHtml
