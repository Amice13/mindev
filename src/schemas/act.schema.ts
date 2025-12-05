import type { JSONSchema7 } from 'json-schema'

// Schemas
import { user } from './user.schema.ts'
import { address } from './address.schema.ts'
import { organization } from './organization.schema.ts'
import { heritage } from './heritage.schema.ts'
import { buildingProperty } from './building-property.schema.ts'
import { constructionElements } from './construction-elements.ts'
import { internalSystems } from './internal-systems.schema.ts'
import { conclusionTypes } from '@/dicts/conclusion-types.ts'
import { rentInfo } from './rent-info.schema.ts'
import { apartment } from './apartment.schema.ts'
import { appartmentInternalSystems } from './apartment-internal-system.schema.ts'
import { documentData } from './document-data.schema.ts'
import { person } from './person.schema.ts'

// Dicts
import estateTypes from '@/dicts/estate-types.ts'

const conclusionTypesValues = conclusionTypes.map(el => el.value)

const schema: JSONSchema7 = {
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

    // Buildings
    address,
    functionalPurpose: {
      title: 'Функціональне призначення',
      type: 'string'
    },
    parentOrganization: {
      ...organization,
      title: 'Найменування підприємства, до складу якого входить об\'єкт'
    },
    buildingClass: {
      title: 'Код об\'єкта згідно з Національним класифікатором НК 018:2023 "Класифікатор будівель і споруд"',
      type: 'object',
      properties: {
        title: {
          title: 'Назва класу',
          type: 'string',
        },
        code: {
          title: 'Код класу',
          type: 'string'
        }
      }
    },
    consequenceClass: {
      title: 'Клас наслідків згідно з проектною документацією',
      description: 'за наявності',
      type: 'string',
      enum: ['СС1', 'СС2', 'СС3']
    },
    formOfOwnership: {
      title: 'Форма власності',
      description: 'за наявності',
      type: 'string',
      enum: ['Державна власність', 'Комунальна власність', 'Приватна власність']
    },
    culturalHeritage: {
      title: 'Дані про віднесення об’єкта до пам’яток культурної спадщини',
      ...heritage
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
      title: 'Документи, що підтверджують право на земельну ділянку',
      ...documentData
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
  }
}

export default schema
