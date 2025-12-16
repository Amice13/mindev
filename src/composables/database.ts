import type { Act } from '@/types'
import { Dexie, type EntityTable } from 'dexie'

const db = new Dexie('mindev') as Dexie & {
  acts: EntityTable<Act, 'id'>
}

const fields = [
  '&id',
  'date',
  'estateType',
  'ownerType',
  'address.admin1',
  'address.admin2',
  'address.admin3',
  'address.admin4',
  'conclusionType'
]

db.version(1).stores({ acts: fields.join(',') })

const useActs = () => {
  return { acts: db.acts }
}

export default useActs
