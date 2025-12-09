import type { JSONSchema } from 'json-schema-to-ts'

export const buildingClass = {
  title: 'Код об\'єкта згідно з Національним класифікатором НК 018:2023 "Класифікатор будівель і споруд"',
  type: 'object',
  properties: {
    class1: {
      title: 'Класс 1 рівня',
      type: 'string'
    },
    class2: {
      title: 'Класс 2 рівня',
      type: 'string'
    },
    class3: {
      title: 'Класс 3 рівня',
      type: 'string'
    },
    class: {
      title: 'Класс 4 рівня',
      type: 'string'
    },
    code1: {
      title: 'Код 1 рівня',
      type: 'string'
    },
    code2: {
      title: 'Код 2 рівня',
      type: 'string'
    },
    code3: {
      title: 'Код 3 рівня',
      type: 'string'
    },
    code: {
      title: 'Код 4 рівня',
      type: 'string'
    }
  }
} as const satisfies JSONSchema
