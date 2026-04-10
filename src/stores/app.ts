import type { Organization, User } from '@/types'
import { defineStore } from 'pinia'
const persistStoreKey = 'mindev-acts'

const priority: Record<string, number> = {
  'Голова комісії': 3,
  'Заступник голови комісії': 2,
  'Секретар комісії': 1,
}

export const useAppStore = defineStore('app', () => {
  const commissionIsPredefined = ref<boolean>(true)
  const commission = ref<Organization>()
  const user = ref<Partial<User>>({})
  const commissionMembers = ref<User[]>([])

  const changePredefinedComission = (value: boolean) => {
    commissionIsPredefined.value = value
  }

  const saveUser = (newUser: User) => {
    user.value = newUser
  }

  const saveCommission = (newCommission: Organization): void => {
    commission.value = newCommission
  }

  const addCommisionMember = (user: User): void => {
    commissionMembers.value.push(user)
    const members = toRaw(commissionMembers.value)
    members.sort((a, b) => {
      const pa = priority[a.status ?? ''] ?? 0
      const pb = priority[b.status ?? ''] ?? 0
      if (pa !== pb) {
        return pb - pa
      }
      return (a.familyName ?? '').localeCompare(b.familyName ?? '')
    })
    commissionMembers.value = [...members]
  }

  const removeCommissionMember = (id: string): void => {
    const currentUserIndex = commissionMembers.value.map(el => String(el.id)).indexOf(id)
    if (currentUserIndex === -1) {
      return alert('Цей користувач не існує')
    }
    const currentUser = commissionMembers.value[currentUserIndex]
    if (currentUser?.id === user.value.id) {
      user.value = {}
    }
    commissionMembers.value.splice(currentUserIndex, 1)
  }

  return {
    commissionIsPredefined,
    changePredefinedComission,
    commission,
    commissionMembers,
    user,
    saveUser,
    saveCommission,
    addCommisionMember,
    removeCommissionMember,
  }
}, {
  persist: {
    key: persistStoreKey,
  },
})
