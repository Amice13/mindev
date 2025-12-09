import type { JSONSchema } from 'json-schema-to-ts'

// Schemas
import { user } from './user.schema.ts'
import { address } from './address.schema.ts'
import { organization } from './organization.schema.ts'
import { heritage } from './heritage.schema.ts'
import { buildingProperty } from './building-property.schema.ts'
import { constructionElements } from './construction-elements.schema.ts'
import { internalSystems } from './internal-systems.schema.ts'
import { rentInfo } from './rent-info.schema.ts'
import { apartment } from './apartment.schema.ts'
import { appartmentInternalSystems } from './apartment-internal-systems.schema.ts'
import { documentData } from './document-data.schema.ts'
import { person } from './person.schema.ts'
import { buildingClass } from './building-class.schema.ts'
import { functionalPurpose } from './functional-purpose.schema.ts'

// Dicts
import estateTypes from '@/dicts/estate-types.ts'
import conclusionTypes from '@/dicts/conclusion-types.ts'
import ownerTypes from '@/dicts/owner-types.ts'
import ownershipTypes from '@/dicts/ownership-types.ts'
import consequenceClasses from '@/dicts/consequence-classes.ts'

const conclusionTypesValues = conclusionTypes.map((el: Record<'value', string>) => el.value)

export const act = {
  title: 'Акт обстеження об’єктів нерухомого майна',
  type: 'object',
  properties: {
    // Metadata
    createdAt: {
      title: 'Фактичні дата та час створення документа',
      description: 'Відмітка часу',
      type: 'number'
    },
    updatedAt: {
      title: 'Фактичні дата та час оновлення документа',
      description: 'Відмітка часу',
      type: 'number'
    },
    date: {
      title: 'Дата затвердження акту',
      description: 'Дата затвердження акту',
      type: 'string'
    },
    number: {
      title: 'Номер документа',
      description: 'Номер акту',
      type: 'string'
    },
    createdBy: user,
    userOrganization: organization,

    // Global data
    estateType: {
      title: 'Тип об\'єкту нерухомого майна',
      type: 'string',
      enum: estateTypes
    },

    ownerType: {
      title: 'Тип власника',
      type: 'string',
      enum: ownerTypes
    },

    ownerPerson: person,
    ownerOrganization: organization,

    // Buildings
    address,
    functionalPurpose,
    parentOrganization: {
      ...organization,
      title: 'Найменування підприємства, до складу якого входить об\'єкт'
    },
    buildingClass,
    consequenceClass: {
      title: 'Клас наслідків згідно з проектною документацією',
      description: 'за наявності',
      type: 'string',
      enum: consequenceClasses
    },
    formOfOwnership: {
      title: 'Форма власності',
      description: 'за наявності',
      type: 'string',
      enum: ownershipTypes
    },
    culturalHeritage: {
      ...heritage,
      title: 'Дані про віднесення об’єкта до пам’яток культурної спадщини'
    },
    buildingProperty,
    constructionElements,
    internalSystems,

    // Apartments
    rentInfo,
    apartment,
    appartmentInternalSystems,

    // Lands
    cadastreNumber: {
      title: 'Кадастровий номер земельної ділянки',
      type: 'string'
    },
    landArea: {
      title: 'Загальна площа земельної ділянки, га',
      type: 'number'
    },
    landCategory: {
      title: 'Категорія земель',
      type: 'string'
    },
    landDocument: {
      ...documentData,
      title: 'Документи, що підтверджують право на земельну ділянку'
    },
    landObservations: {
      title: 'Результати обстеження земельної ділянки',
      type: 'string'
    },

    // Final decision
    conclusionType: {
      title: 'Тип узагальнюючого висновку',
      type: 'string',
      enum: conclusionTypesValues
    },
    conclusionText: {
      title: 'Текстовий висновок',
      type: 'string'
    },

    // Commission members
    involved: {
      title: 'Залучені до обстеження особи',
      type: 'array',
      items: person
    }
  },
  required: [
    'ownerPerson',
    'ownerOrganization',
    'parentOrganization',
    'address',
    'functionalPurpose',
    'buildingClass',
    'culturalHeritage'
  ]
} as const satisfies JSONSchema
