import { useLocalStorage } from '@vueuse/core'

export const storageDemo = useLocalStorage('webext-demo', 'Storage Demo', { listenToStorageChanges: true })
