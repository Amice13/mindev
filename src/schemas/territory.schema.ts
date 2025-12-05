import type { JSONSchema7 } from 'json-schema'

export const territory: JSONSchema7 = {
  title: 'Адреса',
  type: 'object',
  properties: {
    admin1: {
      title: 'Область',
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
    }
  }
}
