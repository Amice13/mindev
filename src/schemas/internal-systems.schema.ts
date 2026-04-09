import type { JSONSchema } from 'json-schema-to-ts'
import constructionConditions from '@/dicts/construction-conditions'
import defectsPresence from '@/dicts/defects-presence'
import fireProtectionTypes from '@/dicts/fire-protection-types'
import gasSupplyTypes from '@/dicts/gas-supply-types'
import internalSystemTypes from '@/dicts/internal-system-types'
import powerSupplyTypes from '@/dicts/power-supply-types'
import ventilationTypes from '@/dicts/ventilation-types'

export const internalSystems = {
  title: 'Внутрішні інженерні системи',
  type: 'object',
  properties: {
    coldWaterType: {
      title: 'Тип системи холодного водопостачання',
      type: 'string',
      enum: internalSystemTypes,
    },
    coldWaterDefects: {
      title: 'Наявність пошкоджень та дефектів системи холодного водопостачання',
      type: 'string',
      enum: defectsPresence,
    },
    coldWater: {
      title: 'Опис системи холодного водопостачання',
      type: 'string',
    },
    hotWaterType: {
      title: 'Тип системи гарячого водопостачання',
      type: 'string',
      enum: internalSystemTypes,
    },
    hotWaterDefects: {
      title: 'Наявність пошкоджень та дефектів системи гарячого водопостачання',
      type: 'string',
      enum: defectsPresence,
    },
    hotWater: {
      title: 'Опис системи гарячого водопостачання',
      type: 'string',
    },
    drainageType: {
      title: 'Тип системи водовідведення',
      type: 'string',
      enum: internalSystemTypes,
    },
    drainageDefects: {
      title: 'Наявність пошкоджень та дефектів системи водовідведення',
      type: 'string',
      enum: defectsPresence,
    },
    drainage: {
      title: 'Опис система водовідведення',
      type: 'string',
    },
    heatingType: {
      title: 'Тип системи опалення (теплопостачання)',
      type: 'string',
      enum: internalSystemTypes,
    },
    heatingDefects: {
      title: 'Наявність пошкоджень та дефектів системи опалення (теплопостачання)',
      type: 'string',
      enum: defectsPresence,
    },
    heating: {
      title: 'Опис системи опалення (теплопостачання)',
      type: 'string',
    },
    powerSupplyType: {
      title: 'Тип системи електропостачання',
      type: 'string',
      enum: powerSupplyTypes,
    },
    powerSupplyDefects: {
      title: 'Наявність пошкоджень та дефектів системи електропостачання',
      type: 'string',
      enum: defectsPresence,
    },
    powerSupply: {
      title: 'Опис системи електропостачання',
      type: 'string',
    },
    gasType: {
      title: 'Тип системи газопостачання',
      type: 'string',
      enum: gasSupplyTypes,
    },
    gasDefects: {
      title: 'Наявність пошкоджень та дефектів системи газопостачання',
      type: 'string',
      enum: defectsPresence,
    },
    gas: {
      title: 'Опис системи газопостачання',
      type: 'string',
    },
    ventilationType: {
      title: 'Тип системи вентиляції',
      type: 'string',
      enum: ventilationTypes,
    },
    ventilationDefects: {
      title: 'Наявність пошкоджень та дефектів системи вентиляції',
      type: 'string',
      enum: defectsPresence,
    },
    ventilation: {
      title: 'Опис системи вентиляції',
      type: 'string',
    },
    fireProtectionType: {
      title: 'Наявність системи протипожежного захисту',
      type: 'string',
      enum: fireProtectionTypes,
    },
    fireProtectionCondition: {
      title: 'Стан системи протипожежного захисту',
      type: 'string',
      enum: constructionConditions,
    },
    fireProtectionDefects: {
      title: 'Наявність пошкоджень та дефектів системи протипожежного захисту',
      type: 'string',
      enum: defectsPresence,
    },
    fireProtection: {
      title: 'Опис системи протипожежного захисту та функціонально пов\'язані інженерні системи',
      type: 'string',
    },
    firefightingWaterSupplyType: {
      title: 'Наявність протипожежного водопостачання',
      type: 'string',
      enum: fireProtectionTypes,
    },
    firefightingWaterSupplyCondition: {
      title: 'Стан протипожежного водопостачання',
      type: 'string',
      enum: constructionConditions,
    },
    firefightingWaterSupplyDefects: {
      title: 'Наявність пошкоджень та дефектів протипожежного водопостачання',
      type: 'string',
      enum: defectsPresence,
    },
    firefightingWaterSupply: {
      title: 'Опис протипожежного водопостачання (зовнішнього та внутрішнього)',
      type: 'string',
    },
  },
  additionalProperties: false,
} as const satisfies JSONSchema
