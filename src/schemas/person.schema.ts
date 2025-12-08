import type { JSONSchema } from 'json-schema-to-ts'
import personalDocumentTypes from '@/dicts/personal-document-types'

export const person = {
  title: 'Фізична особа',
  type: 'object',
  properties: {
    documentType: {
      title: 'Тип документа фізичної особи',
      type: 'string',
      enum: personalDocumentTypes
    },
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
} as const satisfies JSONSchema
