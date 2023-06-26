<template>
  <form id="form" class="form">
    <p>
      <label for="appt-time">开始时间: </label>
      <input type="number" v-model="formData.startTime" />
    </p>
    <p>
      <label for="appt-time">结束时间: </label>
      <input type="number" v-model="formData.endTime" />
    </p>
    <button onsubmit>确定</button>
  </form>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
import { onMounted, ref, watch, reactive } from 'vue';

const aaa = ref('')
const formData = reactive({
  startTime: '',
  endTime: ''
})

onMounted(() => {
  const form: any = document.getElementById('form')
  form.addEventListener('submit',async function(e: any){
    e.preventDefault();
    // const params = `${formData.startTime || 10}-${formData.endTime || 20}`
    const params = `0,5,10,15,20,25,30,35`
    const time = await (window as any).electronAPI.openFile(params)
    console.log(time)
      console.log(66633333)
      formData.startTime
  });
})

watch(() => aaa.value, (value:any) => {
  console.log('watch',value)
})
watch(() => formData.startTime, (value:any) => {
  console.log(value, 'startTimestartTimestartTime')
})

</script>

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
