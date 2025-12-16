import type { Act, Person } from '@/types';
import expressionParser from 'docxtemplater/expressions.js'
import docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import docUrl from '@/templates/act.docx?url'

// Formatters
const formatDate = (date: string | undefined): string => {
  if (!date) date = new Date() as unknown as string
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
  firstLetter (s: string): string {
    return s.substring(0, 1)
  },
  zeroText (s: string | number | undefined): string {
    if (s === undefined) return ''
    if (s === 0) return '0'
    return String(s)
  },
  safe (s: string | number | undefined): string {
    if (s === undefined) return ''
    return String(s)
  },
  toLowerCase (s:string) {
    return s?.toLowerCase() ?? ''
  }
}})

// Base document
const res = await fetch(docUrl)
const docx = await res.arrayBuffer()

const generateDocument = (source: Act): ArrayBuffer => {
  const zip = new PizZip(docx)
  const newDoc = new docxtemplater(zip, { parser, linebreaks: true })
  const data = toRaw(source)
  data.createdBy.shortName = shortenName(data.createdBy)
  data.isFirst = ['112', '113'].includes(data.buildingClass?.code3 ?? 'N/A')
  data.isSecond = ['121', '122', '123', '124', '126'].includes(data.buildingClass?.code3 ?? 'N/A')
  data.isThird = ['125', '127'].includes(data.buildingClass?.code3 ?? 'N/A')
  newDoc.render(data)
  const docToRender = newDoc.getZip().generate({ type: 'uint8array' })
  return docToRender as unknown as ArrayBuffer
}

const useGenerateDocument = () => {
  return { generateDocument }
}

export default useGenerateDocument
