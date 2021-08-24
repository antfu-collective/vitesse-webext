<template>
  <div class="fixed right-0 bottom-0 m-5 z-100">
    <div class="flex bg-light-blue-400 hover:bg-light-blue-500 w-10 h-10 rounded-full shadow" @click="hi()">
      <pixelarticons-power class="block m-auto text-white text-lg"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import 'virtual:windi.css'

function hi() {
  alert('Injected by Vitesse WebExt')
}
</script>
