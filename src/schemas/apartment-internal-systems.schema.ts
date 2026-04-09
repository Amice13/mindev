import type { JSONSchema } from 'json-schema-to-ts'
import constructionConditions from '@/dicts/construction-conditions'
import defectsPresence from '@/dicts/defects-presence'
import internalSystemTypes from '@/dicts/internal-system-types'
import powerSupplyTypes from '@/dicts/power-supply-types'
import ventilationTypes from '@/dicts/ventilation-types'

export const apartmentInternalSystems = {
  title: 'Внутрішні інженерні системи',
  type: 'object',
  properties: {
    powerSupplyType: {
      title: 'Тип системи електропостачання',
      type: 'string',
      enum: powerSupplyTypes,
    },
    powerSupplyCondition: {
      title: 'Стан системи електропостачання',
      type: 'string',
      enum: constructionConditions,
    },
    powerSupplyDefects: {
      title: 'Наявність дефектів і пошкоджень системи електропостачання',
      type: 'string',
      enum: defectsPresence,
    },
    powerSupply: {
      title: 'Опис системи електропостачання (обладнання функціонуючою системою електропостачання (крім випадків аварійного або планового відключення)',
      type: 'string',
    },
    heatingType: {
      title: 'Тип системи опалення',
      type: 'string',
      enum: internalSystemTypes,
    },
    heatingCondition: {
      title: 'Стан системи опалення',
      type: 'string',
      enum: constructionConditions,
    },
    heatingDefects: {
      title: 'Наявність дефектів і пошкоджень системи опалення',
      type: 'string',
      enum: defectsPresence,
    },
    heating: {
      title: 'Опис системи опалення (обладнання безперебійно функціонуючою системою опалення (крім випадків аварійного або планового відключення) ',
      type: 'string',
    },
    waterSupplyType: {
      title: 'Тип системи водопостачання',
      type: 'string',
      enum: internalSystemTypes,
    },
    waterSupplyCondition: {
      title: 'Стан системи водопостачання',
      type: 'string',
      enum: constructionConditions,
    },
    waterSupplyDefects: {
      title: 'Наявність дефектів і пошкоджень системи водопостачання',
      type: 'string',
      enum: defectsPresence,
    },
    waterSupply: {
      title: 'Опис системи водопостачання (обладнання безперебійно функціонуючою системою водопостачання (крім випадків аварійного або планового відключення)',
      type: 'string',
    },
    drainageType: {
      title: 'Тип системи водовідведення',
      type: 'string',
      enum: internalSystemTypes,
    },
    drainageCondition: {
      title: 'Стан системи водовідведення',
      type: 'string',
      enum: constructionConditions,
    },
    drainageDefects: {
      title: 'Наявність дефектів і пошкоджень системи водовідведення',
      type: 'string',
      enum: defectsPresence,
    },
    drainage: {
      title: 'Опис системи водовідведення (обладнання безперебійно функціонуючою системою водовідведення)',
      type: 'string',
    },
    ventilationType: {
      title: 'Тип системи вентиляції',
      type: 'string',
      enum: ventilationTypes,
    },
    ventilationCondition: {
      title: 'Стан системи вентиляції',
      type: 'string',
      enum: constructionConditions,
    },
    ventilationDefects: {
      title: 'Наявність дефектів і пошкоджень системи вентиляції',
      type: 'string',
      enum: defectsPresence,
    },
    ventilation: {
      title: 'Опис системи вентиляції (обладнання безперебійно функціонуючою системою вентиляції)',
      type: 'string',
    },
  },
  additionalProperties: false,
} as const satisfies JSONSchema
