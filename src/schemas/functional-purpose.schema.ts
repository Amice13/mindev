import type { JSONSchema } from 'json-schema-to-ts'

export const functionalPurpose = {
  title: 'Призначення згідно з проектною документацією на будівництво о\'бєкта/станом на час проведення обстеження',
  type: 'object',
  properties: {
    class1: {
      title: 'Класс 1 рівня',
      type: 'string'
    },
    class: {
      title: 'Класс 2 рівня',
      type: 'string'
    },
    code1: {
      title: 'Код 1 рівня',
      type: 'string'
    },
    code: {
      title: 'Код 2 рівня',
      type: 'string'
    }
  }
} as const satisfies JSONSchema
