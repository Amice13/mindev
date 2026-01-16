import { type JSONSchema } from 'json-schema-to-ts'
import { act } from '@/schemas/act.schema'

interface ActivityInfoForm {
  id: string
  label: string
  schemaVersion: string
  databaseId: string
  elements: ActivityInfoField[]
}

interface ActivityInfoField {
  id: string
  code: string
  label: string
  description?: string
  relevanceCondition?: string
  validationCondition?: string
  key: boolean
  required: boolean
  type: 'FREE_TEXT' | 'serial' | 'month' | 'attachment' | 'geopoint' | 'FREE_TEXT' | 'quantity' | 'enumerated' | 'multiselectreference' | 'epiweek' | 'subform' | 'date' | 'calculated' | 'reversereference' | 'reference' | 'NARRATIVE'
}

const fields: ActivityInfoField[] = []

const createField = (element: JSONSchema): ActivityInfoField | undefined => {
  if (typeof element !== 'object') return
  if (element.properties)
}

console.log(act)
