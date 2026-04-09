import type { Act } from '@/types'
import type { CustomFile } from '@/types/files'

const BASE_URL = 'https://mindev-proxy.vercel.app/api'

export async function uploadAct (body: Act) {
  const url = `${BASE_URL}/create`

  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
  })

  return { status: 200 }
}

export async function uploadFile (file: CustomFile) {
  if (file.parentId === undefined) {
    return false
  }
  const url = `${BASE_URL}/upload`

  const form = new FormData()
  form.append('recordId', file.parentId)
  form.append('blobId', file.id)
  form.append('file', file.file)

  await fetch(url, {
    method: 'POST',
    body: form,
  })

  return { status: 200 }
}
