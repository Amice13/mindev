import type { JSONSchema7 } from 'json-schema'
import { documentData } from './document-data.schema.ts'
import heritageCategories from '@/dicts/heritage-categories.ts'
import heritageTypes from '@/dicts/heritage-types.ts'

export const heritage: JSONSchema7 = {
  title: 'Культурна пам\'ятка',
  properties: {
    monumentName: {
      title: 'Назва пам\'ятки / об\'єкта',
      type: 'string'
    },
    monumentType: {
      title: 'Вид пам\'ятки / об\'єкта',
      type: 'string',
      enum: heritageTypes
    },
    monumentCategory: {
      title: 'Категорія пам\'ятки / об\'єкта',
      type: 'string',
      enum: heritageCategories
    },
    protectionDecision: {
      ...documentData,
      title: 'Номер та дата рішення про взяття під охорону'
    },
    protectionNumber: {
      title: 'Охоронний номер'
    }
  }
}
