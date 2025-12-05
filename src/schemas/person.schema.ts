import type { JSONSchema7 } from 'json-schema'

export const person: JSONSchema7 = {
  title: 'Фізична особа',
  type: 'object',
  properties: {
    taxId: {
      title: 'РНОКПП',
      type: 'string'
    },
    passportNumber: {
      title: 'Номер паспорту',
      type: 'string'
    },
    familyName: {
      title: 'Прізвище',
      type: 'string'
    },
    givenName: {
      title: 'Ім\'я',
      type: 'string',
    },
    additionalName: {
      title: 'По батькові',
      type: 'string'
    }
  }  
}
