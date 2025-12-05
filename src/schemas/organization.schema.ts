import type { JSONSchema7 } from 'json-schema'

export const organization: JSONSchema7 = {
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
}
