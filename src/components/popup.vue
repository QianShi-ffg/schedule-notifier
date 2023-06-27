<template>
  <div class="popup">
    <div class="popup-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.popup {
  position: fixed;
  left: 0;
  right: 0;
  margin: auto;
  bottom: 20px;
  width: 90%;
  background: #eeeeee36;
  min-height: 100px;
  height: auto;
  // opacity: 0.5;
  backdrop-filter: blur(10px);
  border-radius: 10px;
  .popup-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
  }
}
</style>