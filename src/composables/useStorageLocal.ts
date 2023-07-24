import type {
  MaybeRef,
  RemovableRef,
  StorageLikeAsync,
  UseStorageAsyncOptions,
} from '@vueuse/core'
import {
  useStorageAsync,
} from '@vueuse/core'

let storage: StorageLikeAsync

try {
  const browserStorage = (await import('webextension-polyfill')).default.storage

  storage = {
    removeItem(key: string) {
      return browserStorage.local.remove(key)
    },

    setItem(key: string, value: string) {
      return browserStorage.local.set({ [key]: value })
    },

    async getItem(key: string) {
      return (await browserStorage.local.get(key))[key]
    },
  }
}
catch (error) {
  storage = localStorage
}

export const useStorageLocal = <T>(
  key: string,
  initialValue: MaybeRef<T>,
  options?: UseStorageAsyncOptions<T>,
): RemovableRef<T> => useStorageAsync(key, initialValue, storage, options)
