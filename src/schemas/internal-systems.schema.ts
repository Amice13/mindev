import type { JSONSchema } from 'json-schema-to-ts'

export const internalSystems: JSONSchema7 = {
  title: 'Внутрішні інженерні системи',
  type: 'object',
  properties: {
    coldWater: {
      title: 'Система холодного водопостачання',
      type: 'string'
    },
    hotWater: {
      title: 'Система гарячого водопостачання',
      type: 'string'
    },
    drainage: {
      title: 'Система водовідведення',
      type: 'string'
    },
    heating: {
      title: 'Система опалення (теплопостачання)',
      type: 'string'
    },
    powerSupply: {
      title: 'Система електропостачання',
      type: 'string'
    },
    gas: {
      title: 'Система газопостачання',
      type: 'string'
    },
    ventilation: {
      title: 'Система вентиляції',
      type: 'string'
    },
    fireProtection: {
      title: 'Системи протипожежного захисту та функціонально пов\'язані інженерні системи',
      type: 'string'
    },
    firefightingWaterSupply: {
      title: 'Протипожежне водопостачання (зовнішнє та внутрішнє)',
      type: 'string'
    }
  }
} as const satisfies JSONSchema
