import type { JSONSchema } from 'json-schema-to-ts'

export const territory = {
  title: 'Адреса',
  type: 'object',
  properties: {
    admin1: {
      title: 'Область або місто зі спеціальним статусом',
      type: 'string'
    },
    code1: {
      title: 'КАТОТТГ області',
      type: 'string'
    },
    admin2: {
      title: 'Район',
      type: 'string'
    },
    code2: {
      title: 'КАТОТТГ району',
      type: 'string'
    },
    admin3: {
      title: 'Громада',
      type: 'string'
    },
    code3: {
      title: 'КАТОТТГ громади',
      type: 'string'
    },
    admin4: {
      title: 'Населений пункт',
      type: 'string'
    },
    code4: {
      title: 'КАТОТТГ населеного пункту',
      type: 'string'
    },
    admin5: {
      title: 'Район у місті',
      type: 'string'
    },
    code5: {
      title: 'КАТОТТГ району у місті',
      type: 'string'
    }
  }
} as const satisfies JSONSchema
