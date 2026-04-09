import type { JSONSchema } from 'json-schema-to-ts'
import streetTypes from '@/dicts/street-types.ts'
import { territory } from './territory.schema.ts'
const streetCodes = streetTypes.map(el => el.code)
const streetTypesTitles = streetTypes.map(el => el.title)

export const address = {
  title: 'Адреса',
  type: 'object',
  properties: {
    ...territory.properties,
    postalCode: {
      title: 'Поштовий індекс',
      type: 'string',
    },
    streetType: {
      title: 'Тип вулиці',
      type: 'string',
      enum: streetTypesTitles,
    },
    streetTypeCode: {
      title: 'Код типу вулиці',
      type: 'string',
      enum: streetCodes,
    },
    streetName: {
      title: 'Назва вулиці',
      type: 'string',
    },
    building: {
      title: 'Номер будинку',
      type: 'string',
    },
    block: {
      title: 'Номер корпуса/блоку',
      type: 'string',
    },
    apartmentNumber: {
      title: 'Номер квартири',
      type: 'string',
    },
  },
} as const satisfies JSONSchema
