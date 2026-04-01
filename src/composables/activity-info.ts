import { type Act } from '@/types'

const BASE_URL = 'https://mindev-proxy.vercel.app/api'

const post = async (body: Act): Promise<null | Response> => {
  const url = `${BASE_URL}/create`
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body)
  }).catch(err => {
    alert(err)
    return null
  })
  return response
}

export const put = async (body: Act) => {
  const response = await post(body)
  const json = await response?.json()
  return { status: 200, data: json }
}

export const uploadFile = async (recordId: string, file: unknown) => {
  const url = `${BASE_URL}/upload`
  const form = new FormData()
  form.append('recordId', recordId)
  form.append('blobId', 'helloworld01')
  form.append('file', file.file)

  const response = await fetch(url, {
    method: 'POST',
    body: form
  }).catch(err => {
    console.log(err)
    alert(err)
    return null
  })
  console.log(file)
}

