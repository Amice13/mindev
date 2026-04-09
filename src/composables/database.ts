import type { Act } from '@/types'
import type { CustomFile } from '@/types/files'
import { Dexie, type EntityTable } from 'dexie'

const db = new Dexie('mindev') as Dexie & {
  acts: EntityTable<Act, 'id'>
  files: EntityTable<CustomFile, 'id'>
}

const actsFields = [
  '&id',
  'date',
  'estateType',
  'ownerType',
  'address.admin1',
  'address.admin2',
  'address.admin3',
  'address.admin4',
  'conclusionType',
]

const filesFields = [
  '&id',
  'parentId',
  'name',
  '[parentId+name]',
  'size',
  'lastModified',
  'synced',
]

db.version(2).stores({
  acts: actsFields.join(','),
  files: filesFields.join(','),
})

export function useActs () {
  return { acts: db.acts }
}

export function useFiles () {
  return { files: db.files }
}
