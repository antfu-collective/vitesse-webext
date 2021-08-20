import { useEventListener } from '@vueuse/core'
import { ref, Ref } from 'vue-demi'

const defaultWindow = window

export interface ConfigurableWindow {
  /*
   * Specify a custom `window` instance, e.g. working with iframes or in testing environments.
   */
  window?: Window
}

export interface MouseOptions extends ConfigurableWindow {
  initialValue?: { x: number; y: number }
}

export function useMouse(options: MouseOptions = {}) {
  const { window = defaultWindow, initialValue = { x: 0, y: 0 } } = options

  const x = ref(initialValue.x)
  const y = ref(initialValue.y)
  const target = ref(null) as Ref<HTMLElement | null>

  const mouseHandler = (event: MouseEvent) => {
    x.value = event.pageX
    y.value = event.pageY
    target.value = <HTMLElement>event.target
  }

  if (window)
    useEventListener(window, 'mousemove', mouseHandler, { passive: true })

  return {
    x, y, target,
  }
}
