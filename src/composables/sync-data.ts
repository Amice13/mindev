import { uploadAct, uploadFile } from '@/composables/activity-info'
import { useActs, useFiles } from '@/composables/database'

export const syncData = async () => {
  if (process.env.IS_TEST && !navigator.onLine) return false

  const { acts: actsRepository } = useActs()
  const { files: filesRepository } = useFiles()

  const acts = await actsRepository
    .filter(el => !Boolean(el.synced))
    .toArray()

  for (const act of acts) {
    await uploadAct(act).catch(error => {
      console.log(error)
      alert('Неможливо завантажити акт')
      return false
    })
    act.synced = true
    actsRepository.put(act)

    const files = await filesRepository
      .where('parentId')
      .equals(act.id)
      .toArray()

    for (const file of files) {
      await uploadFile(file).catch(error => {
        console.log(error)
        alert(`Неможливо завантажити файл ${file.name}`)
        return false
      })
    }
  }
}
