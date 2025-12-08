import type { JSONSchema } from 'json-schema-to-ts'
import { organization } from './organization.schema.ts'

export const administration = {
  title: 'Адміністрація',
  type: 'object',
  properties: {
    ...(organization.properties ?? {})
  }
} as const satisfies JSONSchema
