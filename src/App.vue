<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
import { onMounted, ref, watch } from 'vue';

const aaa = ref('')
// console.log(window.electronAPI)
onMounted(async() => {
  (window as any).electronAPI.handleCounter((event: any, value: any) => {
    console.log(event, value)
    aaa.value = value
    // const oldValue = Number(counter.innerText)
    // const newValue = oldValue + value
    // counter.innerText = newValue
    // event.sender.send('counter-value', newValue)
  })
})

watch(() => aaa.value, (value:any) => {
  console.log('watch',value)
})

</script>

<template>
  <div>
    <button type="button" id="btn">Open a File</button>
    File path: <strong id="filePath"></strong>
    <!-- <a href="https://vitejs.dev" target="_blank">
      <img src="/electron-vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a> -->
  </div>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
