import type { JSONSchema7 } from 'json-schema'
import { organization } from './organizations.schema.ts'

export const administration: JSONSchema7 = {
  title: 'Адміністрація',
  type: 'object',
  properties: {
    ...(organization.properties ?? {})
  }
}
