import type { JSONSchema7 } from 'json-schema'

export const rentInfo: JSONSchema7 = {
  title: 'У разі, коли квартира перебуває у користуванні (оренді)',
  type: 'object',
  properties: {
    reason: {
      title: 'Правові підстави для користування',
      type: 'string'
    },
    endDate: {
      title: 'Строк, на який квартиру надано в користування',
      type: 'string'
    },
    habitants: {
      title: 'Кількість осіб, що проживають у квартирі',
      type: 'number'
    }
  }
}