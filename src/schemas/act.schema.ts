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
import { apartmentInternalSystems } from './apartment-internal-systems.schema.ts'
import { documentData } from './document-data.schema.ts'
import { person } from './person.schema.ts'
import { buildingClass } from './building-class.schema.ts'
import { functionalPurpose } from './functional-purpose.schema.ts'
import { landCategory } from './land-category.schema.ts'

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
    id: {
      title: 'Унікальний ідентифікатор',
      description: 'Унікальний ідентифікатор',
      type: 'string'
    },
    createdAt: {
      title: 'Фактичні дата та час створення документа',
      description: 'Відмітка часу',
      format: 'date-time',
      type: 'number'
    },
    updatedAt: {
      title: 'Фактичні дата та час оновлення документа',
      description: 'Відмітка часу',
      format: 'date-time',
      type: 'number'
    },
    actDate: {
      title: 'Дата складання акту',
      description: 'Дата затвердження акту',
      format: 'date-time',
      type: 'string'
    },
    actNumber: {
      title: 'Номер акту',
      description: 'Номер акту',
      type: 'string'
    },
    date: {
      title: 'Дата затвердження акту',
      description: 'Дата затвердження акту',
      format: 'date-time',
      type: 'string'
    },
    number: {
      title: 'Номер документа, яким затверджено акт',
      description: 'Номер документа, яким затверджено акт',
      type: 'string'
    },
    createdBy: {
      ...user,
      title: 'Автор'
    },
    commission: {
      ...organization,
      title: 'Комісія'
    },
    commissionMembers: {
      title: 'Члени комісії',
      type: 'array',
      items: user
    },

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

    ownerPerson: {
      ...person,
      title: 'Власник ОНМ (фізична особа)'
    },
    ownerOrganization: {
      ...organization,
      title: 'Власник ОНМ (юридична особа)'
    },

    // Buildings
    address: {
      ...address,
      title: 'Адреса ОНМ'
    },
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
    ownershipInfo: {
      title: 'Інформація про речові права, похідні від права власності',
      type: 'string'
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
    apartmentInternalSystems,

    // Additional data
    otherIndicators: {
      title: 'Інші показники (за наявності/потреби)',
      type: 'array',
      minItems: 0,
      items: {
        type: 'object',
        properties: {
          title: {
            title: 'Назва показника',
            type: 'string'
          },
          value: {
            title: 'Значення показника',
            type: 'number'
          }
        },
        required: ['title', 'value'],
        additionalProperties: false
      }
    },
    // Lands
    cadastreNumberExist: {
      title: 'Чи сформований кадастровий номер земельної ділянки',
      type: 'boolean'
    },
    cadastreNumber: {
      title: 'Кадастровий номер земельної ділянки',
      type: 'string'
    },
    landArea: {
      title: 'Загальна площа земельної ділянки, га',
      type: 'number'
    },
    landCategory: {
      ...landCategory,
      title: 'Категорія земель'
    },
    landDocument: {
      ...documentData,
      title: 'Документи, що підтверджують право на земельну ділянку'
    },
    landRestrictions: {
      title: 'Наявність обмеження у використанні земель, охоронних зон, зон санітарної охорони, санітарно-захисних зон, зон особливого режиму використання земель',
      type: 'string'
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
      items: user
    },

    isSigned: {
      title: 'Акт складено та підписано',
      type: 'boolean'
    },
    synced: {
      title: 'Акт завантажено',
      type: 'boolean'
    }
  },
  required: [
    'id',
    'date',
    'number',
    'createdBy',
    'ownerPerson',
    'ownerOrganization',
    'parentOrganization',
    'address',
    'functionalPurpose',
    'buildingClass',
    'culturalHeritage',
    'buildingProperty',
    'constructionElements',
    'internalSystems',
    'otherIndicators',
    'rentInfo',
    'apartment',
    'apartmentInternalSystems',
    'landCategory',
    'landDocument',
    'involved',
    'commission'
  ]
} as const satisfies JSONSchema
