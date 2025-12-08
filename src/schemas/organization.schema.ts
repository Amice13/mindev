import type { JSONSchema } from 'json-schema-to-ts'

export const organization = {
  title: 'Юридична особа',
  type: 'object',
  properties: {
    title: {
      title: 'Назва юридичної особи',
      type: 'string'
    },
    code: {
      title: 'Код ЄДРПОУ юридичної особи',
      type: 'string'
    }    
  }
} as const satisfies JSONSchema
