import type { JSONSchema } from 'json-schema-to-ts'
import ceilingTypes from '@/dicts/ceiling-types'
import constructionConditions from '@/dicts/construction-conditions'
import defectsPresence from '@/dicts/defects-presence'
import coatingTypes from '@/dicts/coating-types'
import stairsTypes from '@/dicts/stairs-types'
import roofingTypes from '@/dicts/roofing-types'
import partitionsTypes from '@/dicts/partitions-types'
import floorTypes from '@/dicts/floor-types'
import fenestrationTypes from '@/dicts/fenestration-types'
import facadeTypes from '@/dicts/facade-types'
import decorationTypes from '@/dicts/decoration-types'
import disabilitiesSupportTypes from '@/dicts/disabilities-support-types'
import defenseTypes from '@/dicts/defense-types'

export const constructionElements = {
  type: 'object',
  properties: {
    ceilingType: {
      title: 'Тип конструкції перекриттів',
      type: 'string',
      enum: ceilingTypes
    },
    ceilingCondition: {
      title: 'Стан конструкції перекриттів',
      type: 'string',
      enum: constructionConditions
    },
    ceilingDefects: {
      title: 'Наявність дефектів у конструкціях перекриттів',
      type: 'string',
      enum: defectsPresence
    },
    ceiling: {
      title: 'Опис конструкції перекриттів',
      type: 'string'
    },
    coatingType: {
      title: 'Тип конструкції покриття',
      type: 'string',
      enum: coatingTypes
    },
    coatingCondition: {
      title: 'Стан конструкції покриття',
      type: 'string',
      enum: constructionConditions
    },
    coating: {
      title: 'Опис онструкції покриття',
      type: 'string'
    },
    stairsType: {
      title: 'Тип сходів',
      type: 'string',
      enum: stairsTypes
    },
    stairs: {
      title: 'Опис сходів',
      type: 'string'
    },
    roofingType: {
      title: 'Тип покрівлі',
      type: 'string',
      enum: roofingTypes
    },
    roofingCondition: {
      title: 'Стан покрівлі',
      type: 'string',
      enum: constructionConditions
    },
    roofingDefects: {
      title: 'Наявність дефектів покрівлі',
      type: 'string',
      enum: defectsPresence
    },
    roofing: {
      title: 'Опис покрівлі',
      type: 'string'
    },
    partitionsType: {
      title: 'Тип перегородок',
      type: 'string',
      enum: partitionsTypes
    },
    partitionsCondition: {
      title: 'Стан перегородок',
      type: 'string',
      enum: constructionConditions
    },
    partitionsDefects: {
      title: 'Наявність дефектів перегородок',
      type: 'string',
      enum: defectsPresence
    },
    partitions: {
      title: 'Опис перегородок',
      type: 'string'
    },
    floorType: {
      title: 'Тип підлоги',
      type: 'string',
      enum: floorTypes
    },
    floorCondition: {
      title: 'Стан підлоги',
      type: 'string',
      enum: constructionConditions
    },
    floorDefects: {
      title: 'Наявність дефектів підлоги',
      type: 'string',
      enum: defectsPresence
    },
    floor: {
      title: 'Опис підлоги',
      type: 'string'
    },
    windowsAndDoorsType: {
      title: 'Тип вікон та дверей',
      type: 'string',
      enum: fenestrationTypes
    },
    windowsAndDoorsCondition: {
      title: 'Стан вікон та дверей',
      type: 'string',
      enum: constructionConditions
    },
    windowsAndDoorsDefects: {
      title: 'Наявність дефектів вікон та дверей',
      type: 'string',
      enum: defectsPresence
    },
    windowsAndDoors: {
      title: 'Опис вікон та дверей',
      type: 'string'
    },
    facadeType: {
      title: 'Тип опорядження фасадів',
      type: 'string',
      enum: facadeTypes
    },
    facadeCondition: {
      title: 'Стан опорядження фасадів',
      type: 'string',
      enum: constructionConditions
    },
    facadeDefects: {
      title: 'Наявність дефектів опорядження фасадів',
      type: 'string',
      enum: defectsPresence
    },
    facade: {
      title: 'Опис опорядження фасадів',
      type: 'string'
    },
    decorationType: {
      title: 'Тип внутрішнього опорядження',
      type: 'string',
      enum: decorationTypes
    },
    decorationCondition: {
      title: 'Стан внутрішнього опорядження',
      type: 'string',
      enum: constructionConditions
    },
    decorationDefects: {
      title: 'Наявність дефектів внутрішнього опорядження',
      type: 'string',
      enum: defectsPresence
    },
    decoration: {
      title: 'Опис внутрішнього опорядження',
      type: 'string'
    },
    disabilitiesSupportType: {
      title: 'Тип пристосування для задоволення потреб осіб з інвалідністю та інших маломобільних груп населення',
      type: 'string',
      enum: disabilitiesSupportTypes
    },
    disabilitiesSupport: {
      title: 'Опис пристосування для задоволення потреб осіб з інвалідністю та інших маломобільних груп населення',
      type: 'string'
    },
    defenseType: {
      title: 'Наявність об\'єктів фонду захисних споруд цивільного захисту',
      type: 'string',
      enum: defenseTypes
    },
    defense: {
      title: 'Опис об\'єктів фонду захисних споруд цивільного захисту, зокрема тих, що використовуються як найпростіші укриття (на об\'єкті або на відстані до 500 метрів)',
      type: 'string'
    }
  },
  additionalProperties: false
} as const satisfies JSONSchema
