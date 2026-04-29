import type { JSONSchema } from 'json-schema-to-ts'

import additionalObservations from '@/dicts/additional-observations.ts'
import conclusionDetails from '@/dicts/conclusion-details.ts'
import conclusionTypes from '@/dicts/conclusion-types.ts'
import consequenceClasses from '@/dicts/consequence-classes.ts'
// Dicts
import estateTypes from '@/dicts/estate-types.ts'
import landActions from '@/dicts/land-actions.ts'
import ownerTypes from '@/dicts/owner-types.ts'
import ownershipTypes from '@/dicts/ownership-types.ts'
import { address } from './address.schema.ts'
import { apartmentInternalSystems } from './apartment-internal-systems.schema.ts'
import { apartment } from './apartment.schema.ts'
import { buildingClass } from './building-class.schema.ts'
import { buildingProperty } from './building-property.schema.ts'
import { constructionElements } from './construction-elements.schema.ts'
import { documentData } from './document-data.schema.ts'

import { functionalPurpose } from './functional-purpose.schema.ts'
import { heritage } from './heritage.schema.ts'
import { internalSystems } from './internal-systems.schema.ts'
import { landCategory } from './land-category.schema.ts'
import { organization } from './organization.schema.ts'
import { person } from './person.schema.ts'
import { rentInfo } from './rent-info.schema.ts'
// Schemas
import { user } from './user.schema.ts'

const conclusionTypesValues = conclusionTypes.map((el: Record<'value', string>) => el.value)
const conclusionDetailsValues = conclusionDetails.map((el: Record<'value', string>) => el.value)

export const act = {
  title: 'Акт обстеження об’єктів нерухомого майна',
  type: 'object',
  properties: {
    // Metadata
    id: {
      title: 'Унікальний ідентифікатор',
      description: 'Унікальний ідентифікатор',
      type: 'string',
    },
    createdAt: {
      title: 'Фактичні дата та час створення документа',
      description: 'Відмітка часу',
      format: 'date-time',
      type: 'string',
    },
    updatedAt: {
      title: 'Фактичні дата та час оновлення документа',
      description: 'Відмітка часу',
      format: 'date-time',
      type: 'string',
    },
    actDate: {
      title: 'Дата складання акту',
      description: 'Дата затвердження акту',
      format: 'date-time',
      type: 'string',
    },
    actNumber: {
      title: 'Номер акту',
      description: 'Номер акту',
      type: 'string',
    },
    date: {
      title: 'Дата затвердження акту',
      description: 'Дата затвердження акту',
      format: 'date-time',
      type: 'string',
    },
    number: {
      title: 'Номер документа, яким затверджено акт',
      description: 'Номер документа, яким затверджено акт',
      type: 'string',
    },
    createdBy: {
      ...user,
      title: 'Автор',
    },
    commission: {
      ...organization,
      title: 'Комісія',
    },
    commissionMembers: {
      title: 'Члени комісії',
      type: 'array',
      items: user,
    },

    // Global data
    estateType: {
      title: 'Тип об\'єкту нерухомого майна',
      type: 'string',
      enum: estateTypes,
    },

    ownerType: {
      title: 'Тип власника',
      type: 'string',
      enum: ownerTypes,
    },

    ownershipType: {
      title: 'Тип власності',
      type: 'string',
      enum: ownershipTypes,
    },

    ownerPerson: {
      ...person,
      title: 'Власник ОНМ (фізична особа)',
    },
    ownerOrganization: {
      ...organization,
      title: 'Власник ОНМ (юридична особа)',
    },

    // Buildings
    address: {
      ...address,
      title: 'Адреса ОНМ',
    },
    coordinates: {
      type: 'array',
      items: {
        type: 'number',
        description: 'Array with longitude and latitude',
        minimum: -180,
        maximum: 180
      },
      minItems: 2,
      maxItems: 2
    },
    functionalPurpose,
    parentOrganization: {
      ...organization,
      title: 'Найменування підприємства, до складу якого входить об\'єкт',
    },
    buildingClass,
    consequenceClass: {
      title: 'Клас наслідків згідно з проектною документацією',
      description: 'за наявності',
      type: 'string',
      enum: consequenceClasses,
    },
    ownershipInfo: {
      title: 'Інформація про речові права, похідні від права власності',
      type: 'string',
    },
    culturalHeritage: {
      ...heritage,
      title: 'Дані про віднесення об’єкта до пам’яток культурної спадщини',
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
            type: 'string',
          },
          value: {
            title: 'Значення показника',
            type: 'number',
          },
        },
        required: ['title', 'value'],
        additionalProperties: false,
      },
    },
    // Lands
    cadastreNumberExist: {
      title: 'Чи сформований кадастровий номер земельної ділянки',
      type: 'boolean',
    },
    cadastreNumber: {
      title: 'Кадастровий номер земельної ділянки',
      type: 'string',
    },
    landArea: {
      title: 'Загальна площа земельної ділянки, га',
      type: 'number',
    },
    landCategory: {
      ...landCategory,
      title: 'Категорія земель',
    },
    landDocument: {
      ...documentData,
      title: 'Документи, що підтверджують право на земельну ділянку',
    },
    landRestrictions: {
      title: 'Наявність обмеження у використанні земель, охоронних зон, зон санітарної охорони, санітарно-захисних зон, зон особливого режиму використання земель',
      type: 'string',
    },
    landObservations: {
      title: 'Результати обстеження земельної ділянки',
      type: 'string',
    },

    // Final decision
    conclusionType: {
      title: 'Тип узагальнюючого висновку',
      type: 'string',
      enum: conclusionTypesValues,
    },
    conclusionDetail: {
      title: 'Уточнення висновку',
      type: 'string',
      enum: conclusionDetailsValues,
    },

    // Additional observation for the building
    additionalObservation: {
      title: 'Доцільність проведення додаткового обстеження відповідно постанові КМУ від 12 квітня 2017 року № 257',
      description: 'Доцільність проведення додаткового обстеження об\'єкта нерухомого майна відповідно до порядку проведення обстеження прийнятих в експлуатацію об\'єктів будівництва, затвердженого постановою КМУ від 12 квітня 2017 року № 257',
      enum: additionalObservations,
    },
    additionalObservationExtra: {
      title: 'Інші висновки щодо доцільності додаткового обстеження',
      type: 'string',
    },

    // Additional actions for the lands
    landAction: {
      title: 'Необхідні дії щодо земельної ділянки',
      type: 'string',
      enum: landActions,
    },
    landActionExtra: {
      title: 'Інші дії щодо земельної ділянки',
      type: 'string',
    },

    conclusionText: {
      title: 'Текстовий висновок',
      type: 'string',
    },

    // Commission members
    involved: {
      title: 'Залучені до обстеження особи',
      type: 'array',
      items: user,
    },

    isSigned: {
      title: 'Акт складено та підписано',
      type: 'boolean',
    },
    synced: {
      title: 'Акт завантажено',
      type: 'boolean',
    },
  },
  required: [
    'id',
    'date',
    'number',
    'createdBy',
    'coordinates',
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
    'commission',
  ],
} as const satisfies JSONSchema
