import type { JSONSchema } from 'json-schema-to-ts'

export const apartmentInternalSystems = {
  title: 'Внутрішні інженерні системи',
  type: 'object',
  properties: {
    powerSupply: {
      title: 'Система електропостачання (обладнання функціонуючою системою електропостачання (крім випадків аварійного або планового відключення)',
      type: 'string'
    },
    heating: {
      title: 'Система опалення (обладнання безперебійно функціонуючою системою опалення (крім випадків аварійного або планового відключення) ',
      type: 'string'
    },
    waterSupply: {
      title: 'Система водопостачання (обладнання безперебійно функціонуючою системою водопостачання (крім випадків аварійного або планового відключення)',
      type: 'string'
    },
    drainage: {
      title: 'Система водовідведення (обладнання безперебійно функціонуючою системою водовідведення)',
      type: 'string'
    },
    ventilation: {
      title: 'Система вентиляції (обладнання безперебійно функціонуючою системою вентиляції)',
      type: 'string'
    }
  },
  additionalProperties: false
} as const satisfies JSONSchema
