import type { Act } from '@/types'
import type { JSONSchema } from "json-schema-to-ts"
import { act as actSchema } from '@/schemas/act.schema'
import { checkCode } from './edrpou-validator'
import get from 'get-value'
import conclusionDetails from '@/dicts/conclusion-details'

const requiredFields = [
  'id',
  'createdAt',
  'updatedAt',
  'actDate',
  'actNumber',
  'date',
  'number',
  'createdBy',
  'commissionMembers',
  'estateType',
  'ownershipType',
  'conclusionType',
  'conclusionDetail'
]

const requiredForHouses = [
  'buildingClass.code',
  'consequenceClass'
]

const constructionElements = [
  'ceilingType',
  'coatingType',
  'stairsType',
  'roofingType',
  'partitionsType',
  'floorType',
  'windowsAndDoorsType',
  'facadeType',
  'decorationType',
  'disabilitiesSupportType',
  'defenseType'
]

const internalSystems = [
  'coldWaterType',
  'hotWaterType',
  'drainageType',
  'heatingType',
  'powerSupplyType',
  'gasType',
  'ventilationType',
  'fireProtectionType',
  'firefightingWaterSupplyType'
]

const buildingPropertiesFirst = [
  'numberOfFloors',
  'areaGeneral',
  'apartmentArea',
  'commonSpaceArea',
  'nonLivingArea',
  'notUsedArea',
  'idpLivingArea',
  'idpProjectedArea',
  'numberOfHabitants',
  'numberOfFreePlaces'
]

const buildingPropertiesSecond = [
  'numberOfFloors',
  'areaGeneral',
  'functionalArea',
  'officeArea',
  'cateringArea',
  'commercialArea',
  'nonLivingArea',
  'otherArea',
  'notUsedArea',
  'idpLivingArea',
  'idpProjectedArea',
  'numberOfHabitants',
  'numberOfFreePlaces'
]

const buildingPropertiesThird = [
  'numberOfFloors',
  'floorHeight',
  'areaGeneral',
  'productionArea',
  'warehouseArea',
  'administrativeArea',
  'householdArea',
  'otherArea',
  'additionalArea'
]

const requiredForHousesAndApartments = [
  'ownerType',
  'functionalPurpose.code'
]

const requiredForLands = [
  'landArea',
  'landCategory.subsectionCode',
  'landRestrictions',
  'landObservations'
]

const addressForLands = [
  'code4'
]

const addressForHouses = [
  'code4',
  'streetType',
  'streetName',
  'building'
]

const addressForApartments = [
  'code4',
  'streetType',
  'streetName',
  'building',
  'apartmentNumber'
]

const ownerPerson = [
  'documentType',
  'familyName',
  'givenName'
]

const organization = [
  'title',
  'code'
]

const culturalHeritage = [
  'monumentName',
  'monumentType',
  'monumentCategory',
  'protectionDecision.number',
  'protectionDecision.date',
  'protectionNumber'
]

const doc = [
  'name',
  'number',
  'date'
]

const apartment = [
  'area',
  'livingArea',
  'idpLivingArea',
  'idpProjectedArea',
  'rooms',
  'idpRooms',
  'idpProjectedRooms'
]

const apartmentInternalSystems = [
  'powerSupplyType',
  'heatingType',
  'waterSupplyType',
  'drainageType',
  'ventilationType'
]

const rent = [
  'reason',
  'endDate',
  'habitants'
]

const isNa = (value: unknown) => ['відсутні', 'відомості відсутні', undefined, null].includes(value as string)

const checkEmptyField = (obj: Record<string, any>, field: string, schema: JSONSchema): false | string => {
  if (obj === undefined) return `Відсутнє поле: ${field}`
  const value = get(obj, field)
  if (typeof schema === 'boolean') return false
  if (schema.properties === undefined) return false
  if (value === undefined || value === null || value === '') {
    const rawKey = field.split(/\./)[0] as keyof typeof schema.properties
    if (schema.properties[rawKey] === undefined) return false
    if (typeof schema.properties[rawKey] === 'boolean') return false
    if (!('title' in schema.properties[rawKey])) return false
    return `Відсутнє поле: ${schema.properties[rawKey].title}`
  }
  return false
}

export const validateAct = (act: Act) => {
  const errors: string[] = []

  // Global fields check
  for (const key of requiredFields) {
    const error = checkEmptyField(act, key, actSchema)
    if (error) errors.push(error)
  }

  // Check lands
  if (act.estateType === 'Земельні ділянки') {
    for (const key of requiredForLands) {
      const error = checkEmptyField(act, key, actSchema)
      if (error) errors.push(error)
    }
    if (act.cadastreNumberExist) {
      const error = checkEmptyField(act, 'cadastreNumber', actSchema)
      if (error) errors.push(error)
    }
    for (const key of addressForLands) {
      const error = checkEmptyField(act.address, key, actSchema.properties.address)
      if (error) errors.push(error)
    }
    for (const key of doc) {
      const error = checkEmptyField(act.landDocument, key, actSchema.properties.landDocument)
      if (error) errors.push(error + ' документа земельної ділянки')
    }
  }

  // Check non-lands
  if (act.estateType !== 'Земельні ділянки') {
    for (const key of requiredForHousesAndApartments) {
      const error = checkEmptyField(act, key, actSchema)
      if (error) errors.push(error)
    }
    if (act.ownerType === 'Фізична особа') {
      for (const key of ownerPerson) {
        const error = checkEmptyField(act.ownerPerson, key, actSchema.properties.ownerPerson)
        if (error) errors.push(error + ' власника')
      }
      if (act.ownerPerson.documentType === 'Паспорт громадянина України') {
        const error = /^\d{9}$|^[а-я]{2} \d{6}$/i.test(act.ownerPerson.passportNumber ?? '')
        if (error) errors.push('Невірний номер паспорта власника')
      }
      if (act.ownerPerson.documentType === 'РНОКПП') {
        const error = checkCode(act.ownerOrganization.code)
        if (error) errors.push('Невірний номер РНОКПП власника')
      }
    }
    if (act.ownerType === 'Юридична особа') {
      for (const key of organization) {
        const error = checkEmptyField(act.ownerOrganization, key, actSchema.properties.ownerOrganization)
        if (error) errors.push(error + ' власника')
      }
    }
  }

  // Check houses
  if (act.estateType === 'Житлові будинки, будівлі, споруди (їх окремі частини)') {
    for (const key of requiredForHouses) {
      const error = checkEmptyField(act, key, actSchema)
      if (error) errors.push(error)
    }
    for (const key of addressForHouses) {
      const error = checkEmptyField(act.address, key, actSchema.properties.address)
      if (error) errors.push(error)
    }

    for (const key of internalSystems) {
      const error = checkEmptyField(act.internalSystems, key, actSchema.properties.internalSystems)
      if (error) errors.push(error)
    }
    for (const key of Object.keys(actSchema.properties.internalSystems.properties)) {
      const baseKey = key.replace(/[A-Z][a-z]+$/, '')
      const typeKey = baseKey + 'Type'
      if (key === typeKey) continue
      if (key + 'Type' === typeKey) continue
      if (!(typeKey in act.internalSystems)) continue
      const skip = isNa(act.internalSystems[typeKey as keyof typeof act.internalSystems])
      if (skip) continue
      const error = checkEmptyField(act.internalSystems, key, actSchema.properties.internalSystems)
      if (error) errors.push(error)
    }

    for (const key of constructionElements) {
      const error = checkEmptyField(act.constructionElements, key, actSchema.properties.constructionElements)
      if (error) errors.push(error)
    }
    for (const key of Object.keys(actSchema.properties.constructionElements.properties)) {
      const baseKey = key.replace(/[A-Z][a-z]+$/, '')
      const typeKey = baseKey + 'Type'
      if (key === typeKey) continue
      if (key + 'Type' === typeKey) continue
      if (!(typeKey in act.constructionElements)) continue
      const skip = isNa(act.constructionElements[typeKey as keyof typeof act.constructionElements])
      if (skip) continue
      const error = checkEmptyField(act.constructionElements, key, actSchema.properties.constructionElements)
      if (error) errors.push(error)
    }

    if (['112', '113'].includes(act.buildingClass?.code3 ?? 'N/A')) {
      for (const key of buildingPropertiesFirst) {
        const error = checkEmptyField(act.buildingProperty, key, actSchema.properties.buildingProperty)
        if (error) errors.push(error)
      }
    }

    if (['121', '122', '123', '124', '126'].includes(act.buildingClass?.code3 ?? 'N/A')) {
      for (const key of buildingPropertiesSecond) {
        const error = checkEmptyField(act.buildingProperty, key, actSchema.properties.buildingProperty)
        if (error) errors.push(error)
      }
    }

    if (['125', '127'].includes(act.buildingClass?.code3 ?? 'N/A')) {
      for (const key of buildingPropertiesThird) {
        const error = checkEmptyField(act.buildingProperty, key, actSchema.properties.buildingProperty)
        if (error) errors.push(error)
      }
    }
  }

  // Check apartments
  if (act.estateType === 'Квартири, житлові та нежитлові приміщення') {
    for (const key of addressForApartments) {
      const error = checkEmptyField(act.address, key, actSchema.properties.address)
      if (error) errors.push(error)
    }
    for (const key of apartment) {
      const error = checkEmptyField(act.apartment, key, actSchema.properties.apartment)
      if (error) errors.push(error)
    }
    for (const key of apartmentInternalSystems) {
      const error = checkEmptyField(act.apartmentInternalSystems, key, actSchema.properties.apartmentInternalSystems)
      if (error) errors.push(error)
    }
    for (const key of Object.keys(actSchema.properties.apartmentInternalSystems.properties)) {
      const baseKey = key.replace(/[A-Z][a-z]+$/, '')
      const typeKey = baseKey + 'Type'
      if (key === typeKey) continue
      if (key + 'Type' === typeKey) continue
      if (!(typeKey in act.apartmentInternalSystems)) continue
      const skip = isNa(act.apartmentInternalSystems[typeKey as keyof typeof act.apartmentInternalSystems])
      if (skip) continue
      const error = checkEmptyField(act.apartmentInternalSystems, key, actSchema.properties.apartmentInternalSystems)
      if (error) errors.push(error)
    }
    if (act.rentInfo.isRent) {
      for (const key of rent) {
        const error = checkEmptyField(act.rentInfo, key, actSchema.properties.rentInfo)
        if (error) errors.push(error)
      }
    }
  }

  // Required explanation for no conclusion
  if (act.conclusionType === 'Інший висновок') {
    const error = checkEmptyField(act, 'conclusionText', actSchema)
    if (error) errors.push(error)
  }

  // Cultural heritage
  if (act.culturalHeritage?.isHeritage) {
    for (const key of culturalHeritage) {
      const error = checkEmptyField(act.culturalHeritage, key, actSchema.properties.culturalHeritage)
      if (error) errors.push(error + ' культурної пам\'ятки')
    }
  }

  // Parent organization
  if (act.parentOrganization?.title) {
    for (const key of organization) {
      const error = checkEmptyField(act.parentOrganization, key, actSchema.properties.parentOrganization)
      if (error) errors.push(error + ' батьківської організації')
    }
    const error = checkCode(act.parentOrganization.code)
    if (error) errors.push('Невірний номер РНОКПП батьківської організації')
  }

  if (!act.commission) errors.push('Інформація про комісію не зазначена')

  for (const key of organization) {
    const error = checkEmptyField(act.commission, key, actSchema.properties.commission)
    if (error) errors.push(error)
  }

  for (const key of addressForLands) {
    const error = checkEmptyField(act.commission.address!, key, actSchema.properties.commission)
    if (error) errors.push(error + ' комісії')
  }

  // Extra fields for conclusion
  if (act.conclusionType === 'Інший висновок') {
    const error = checkEmptyField(act.commission.address!, 'conclusionText', actSchema.properties.commission)
    if (error) errors.push(error)
  }

  if (act.estateType === 'Житлові будинки, будівлі, споруди (їх окремі частини)') {
    const error = checkEmptyField(act.commission.address!, 'additionalObservation', actSchema.properties.commission)
    if (error) errors.push(error)    
  }

  if (act.additionalObservation === 'Інше') {
    const error = checkEmptyField(act.commission.address!, 'additionalObservationExtra', actSchema.properties.commission)
    if (error) errors.push(error)
  }

  return errors
}
