<template>
  <div> [vitesse-webext] Mouse Position: x: {{ x }} y: {{ y }}</div>
</template>

<script setup lang="ts">
import { useMouse } from './useMouse'

const props = defineProps({ globalWindow: Window })
const { x, y } = useMouse({ window: props.globalWindow })
</script>
