import type { JSONSchema } from 'json-schema-to-ts'

export const buildingProperty = {
  title: 'Дані про житлові будинки',
  type: 'object',
  properties: {
    numberOfFloors: {
      title: 'Поверховість',
      type: 'number'
    },
    // Common parameters
    area: {
      title: 'Площа, кв. метрів',
      type: 'number'
    },
    areaGeneral: {
      title: 'Площа загальна',
      type: 'number'
    },

    // Living buildings
    apartmentArea: {
      title: 'Площа квартир (житлових номерів)',
      type: 'number'
    },
    commonSpaceArea: {
      title: 'Площа приміщень загального користування',
      type: 'number'
    },
    nonLivingArea: {
      title: 'Площа нежитлових (офісних) приміщень',
      type: 'number'
    },

    // Office buildings
    functionalArea: {
      title: 'Площа приміщень основного призначення',
      type: 'number'
    },

    // Office buildings
    officeArea: {
      title: 'Площа офісних (адміністративних) приміщень',
      type: 'number'
    },
    cateringArea: {
      title: 'Площа приміщень для громадського харчування',
      type: 'number'
    },
    commercialArea: {
      title: 'Площа торговельних приміщень',
      type: 'number'
    },

    // Warehouses
    productionArea: {
      title: 'Площа виробничих приміщень',
      type: 'number'
    },
    warehouseArea: {
      title: 'Площа складських приміщень',
      type: 'number'
    },
    administrativeArea: {
      title: 'Площа адміністративних приміщень',
      type: 'number'
    },
    householdArea: {
      title: 'Площа побутових приміщень',
      type: 'number'
    },
    additionalArea: {
      title: 'Площа приміщень, що не використовуються за призначенням',
      type: 'number'
    },

    // Misc
    otherArea: {
      title: 'Площа інших приміщень',
      type: 'number'
    },

    // IDP related data
    notUsedArea: {
      title: 'Площа приміщень, що не використовуються за призначенням, для проживання внутрішньо переміщених осіб',
      type: 'number'
    },
    idpLivingArea: {
      title: 'Площа приміщень, що використовуються для проживання внутрішньо переміщених осіб',
      type: 'number'
    },
    idpProjectedArea: {
      title: 'Площа приміщень, що можуть бути використані для проживання внутрішньо переміщених осіб (вільна площа)',
      type: 'number'
    },
    numberOfHabitants: {
      title: 'Кількість осіб, які проживають у приміщеннях',
      type: 'number'
    },
    numberOfFreePlaces: {
      title: 'Кількість вільних місць для проживання',
      type: 'number'
    },

    otherIndicators: {
      title: 'Інші показники (за наявності/потреби)',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: {
            title: 'Назва показника',
            type: 'string'
          },
          value: {
            title: 'Значення показника',
            type: 'string'
          }
        }
      }
    }
  }
} as const satisfies JSONSchema
