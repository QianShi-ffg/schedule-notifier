<template>
  <div class="popup">
    <div class="popup-mask" v-if="props.modelValue"></div>
    <div class="popup-content" ref="popup">
      <slot>
        <!-- <component :is="defaultSlot"></component> -->
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, onMounted, nextTick } from 'vue';

const props: any = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})
const emit: any = defineEmits(['update:modelValue'])
const popup = ref<any>()
const maskDom = ref<any>()
// const slots = useSlots();

// const defaultSlot = slots.default && slots.default()[0];


onMounted(() => {
  window.addEventListener('click', clickHandler)
})

watch(() => props.modelValue, (newVal: boolean) => {
  if (newVal) {
    nextTick(() => {
      console.log(document.getElementsByClassName('popup-mask')[0], 'document.getElementsByClassName')
      maskDom.value = document.getElementsByClassName('popup-mask')[0]
    })
    showPopup()
  } else {
    closePopup()
  }
})

const clickHandler = (e: any) => {
  if (!props.modelValue) {
    return 
  }
  if (e.target === popup.value || popup.value.contains(e.target)) {
    // closePopup()
    // emit('selected', e.target.dataset.value)
    // emit('update:modelValue', false)
  } else if (e.target === maskDom.value) {
    closePopup()
    emit('update:modelValue', false)
  } else {
    return
  }
}

const showPopup = () => {
  popup.value.style.visibility = 'visible'
  popup.value.style.transform = 'translateY(0)'
}

const closePopup = () => {
  popup.value.style.transform = 'translateY(150%)'
  popup.value.style.visibility = 'hidden'
}

</script>

<style scoped lang="scss">
.popup {
  .popup-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2000;
    background: #5757577a;
  }
  .popup-content {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 20px;
    margin: auto;
    z-index: 2000;
    background: #ffffffb6;
    overflow: hidden;
    backdrop-filter: blur(10px);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 90%;
    min-height: 30px;
    transform: translateY(150%);
    visibility: hidden;
    transition: transform 0.3s, visibility 0.5s;
    // padding: 5px 0;
  }
}
</style>