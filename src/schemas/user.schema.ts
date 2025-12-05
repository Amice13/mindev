import type { JSONSchema7 } from 'json-schema'
import { person } from './person.schema.ts'

export const user: JSONSchema7 = {
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
}
