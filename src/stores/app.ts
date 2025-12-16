import { defineStore } from 'pinia'
import type { User, Organization } from '@/types'
const persistStoreKey = 'mindev-acts'

export const useAppStore = defineStore('app', () => {
  const commission = ref<Organization>({})
  const user = ref<Partial<User>>({})
  const commissionMembers = ref<User[]>([])

  const saveUser = (newUser: User) => {
    console.log(newUser)
    console.log(user)
    user.value = newUser
  }

  const saveCommission = (newCommission: Organization): void => {
    commission.value = newCommission
  }

  const addCommisionMember = (user: User): void => {
    commissionMembers.value.push(user)
  }

  const removeCommissionMember = (id: string): void => {
    const currentUserIndex = commissionMembers.value.map(el => String(el.id)).indexOf(id)
    if (currentUserIndex === -1) return alert('Цей користувач не існує')
    const currentUser = commissionMembers.value[currentUserIndex]
    if (currentUser?.id === user.value.id) user.value = {}
    commissionMembers.value.splice(currentUserIndex, 1)
  }

  return {
    commission,
    commissionMembers,
    user,
    saveUser,
    saveCommission,
    addCommisionMember,
    removeCommissionMember
  }
}, {
  persist: {
    key: persistStoreKey
  }
})
