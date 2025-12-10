import type { JSONSchema } from 'json-schema-to-ts'

export const constructionElements = {
  type: 'object',
  properties: {
    ceiling: {
      title: 'Конструкції перекриттів',
      type: 'string'
    },
    coating: {
      title: 'Конструкції покриття',
      type: 'string'
    },
    stairs: {
      title: 'Сходи',
      type: 'string'
    },
    roofing: {
      title: 'Покрівля',
      type: 'string'
    },
    partitions: {
      title: 'Перегородки',
      type: 'string'
    },
    floor: {
      title: 'Підлога',
      type: 'string'
    },
    windowsAndDoors: {
      title: 'Вікна, двері',
      type: 'string'
    },
    facade: {
      title: 'Опорядження фасадів',
      type: 'string'
    },
    decoration: {
      title: 'Внутрішнє опорядження',
      type: 'string'
    },
    disabilitiesSupport: {
      title: 'Пристосування для задоволення потреб осіб з інвалідністю та інших маломобільних груп населення',
      type: 'string'
    },
    defense: {
      title: 'Об’єкти фонду захисних споруд цивільного захисту, зокрема ті, що використовуються як найпростіші укриття (на об\'єкті або на відстані до 500 метрів)',
      type: 'string'
    }
  },
  additionalProperties: false
} as const satisfies JSONSchema
