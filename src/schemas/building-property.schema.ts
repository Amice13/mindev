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
    floorHeight: {
      title: 'Висота поверхів, метрів',
      type: 'number'
    },
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
    categoryOfDanger: {
      title: 'Категорія підвищеної небезпеки',
      type: 'number'
    },
    fireSafety: {
      title: 'Категорія вибухопожежної і пожежної небезпеки',
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
    }
  },
  additionalProperties: false
} as const satisfies JSONSchema
