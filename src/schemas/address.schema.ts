import type { JSONSchema7 } from 'json-schema'
import { territory } from './territory.schema.ts'

export const address: JSONSchema7 = {
  title: 'Адреса',
  type: 'object',
  properties: {
    ...(territory.properties ?? {}),
    streetType: {
      title: 'Тип вулиці',
      type: 'string'
    },
    streetName: {
      title: 'Назва вулиці',
      type: 'string'
    },
    building: {
      title: 'Номер будинку',
      type: 'string'
    },
    apartmentNumber: {
      title: 'Номер квартири',
      type: 'string'
    }
  }
}
