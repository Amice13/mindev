import type { JSONSchema } from 'json-schema-to-ts'
import { person } from './person.schema.ts'

export const user = {
  title: 'Користувач',
  type: 'object',
  properties: {
    status: {
      title: 'Статус члена комісії',
      type: 'string',
      enum: ['Член комісії', 'Секретар комісії', 'Заступник голови комісії', 'Голова комісії']
    },
    ...(person.properties ?? {})
  }
} as const satisfies JSONSchema
