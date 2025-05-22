import { useWebExtensionStorage } from '~/composables/useWebExtensionStorage'

export const { data: storageDemo, dataReady: storageDemoReady } = useWebExtensionStorage('webext-demo', 'Storage Demo')
