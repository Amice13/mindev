import type { JSONSchema } from 'json-schema-to-ts'

export const landCategory = {
  title: 'Категорія та призначення земельної ділянки',
  type: 'object',
  properties: {
    sectionCode: {
      title: 'Код категорії земель',
      type: 'string'
    },
    section: {
      title: 'Категорія земель',
      type: 'string'
    },
    subsectionCode: {
      title: 'Код цільового призначення земельної ділянки',
      type: 'string'
    },
    subsection: {
      title: 'Цільове призначення земельної ділянки',
      type: 'string'
    },
    ukcvz: {
      title: 'Застарілий класифікатор УКЦВЗ',
      type: 'string'
    },
    kvcpz: {
      title: 'Застарілий класифікатор КВЦПЗ',
      type: 'string'
    }
  },
  additionalProperties: false
} as const satisfies JSONSchema
