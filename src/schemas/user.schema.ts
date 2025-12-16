import type { JSONSchema } from 'json-schema-to-ts'
import { person } from './person.schema.ts'
import commissionMemberTypes from '@/dicts/commission-member-types.ts'

export const user = {
  title: 'Користувач',
  type: 'object',
  properties: {
    id: {
      title: 'Унікальний ідентифікатор',
      type: 'string'
    },
    status: {
      title: 'Статус члена комісії',
      type: 'string',
      enum: commissionMemberTypes
    },
    ...(person.properties ?? {})
  },
  required: ['id']
} as const satisfies JSONSchema
