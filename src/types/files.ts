export interface CustomFile {
  id: string
  parentId?: string
  name: string
  type: string
  size: number
  lastModified: number
  synced?: boolean
  file: File
}
