<template>
  <div class="content">
    <div class="top">
      <div class="start" @click="start" :class="isStart ? 'actived' : ''">{{ isStart ? '运行中' : '开始' }}</div>
    </div>
    <div class="bottom">
      <div class="item" @click="toMenuClick('day')">重复天数</div>
      <div class="item" @click="toMenuClick('hour')">提醒区间</div>
      <div class="item" @click="toMenuClick('minute')">分钟</div>
    </div>
  </div>
  <popup v-model="isShow">
    <div class="day-btn" v-for="(item, i) in dataObj[currentMenu]" :key="i" @click="btnClick(currentMenu, item.value)">{{ item.title }}</div>
  </popup>
  <!-- <popup v-model="isShow" v-if="currentMenu === 'hour'">
    <div class="day-btn" v-for="(item, i) in dayList" :key="i">{{ item.title }}</div>
  </popup>
  <popup v-model="isShow" v-if="currentMenu === 'minute'">
    <div class="day-btn" v-for="(item, i) in mList" :key="i">{{ item.title }}</div>
  </popup>
  <popup v-model="isShow" v-if="currentMenu === 'second'">
    <div class="day-btn" v-for="(item, i) in sList" :key="i">{{ item.title }}</div>
  </popup> -->
</template>

<script setup lang="ts">
import data from './components/data.json';
import popup from './components/popup.vue'
import { onMounted, ref, reactive } from 'vue';

const isShow = ref<boolean>(false);
const currentMenu = ref<string>('');
const dataObj = ref<any>({});
const submitObj = reactive<any>({});
const isStart = ref<boolean>(false);

onMounted(() => {
  dataObj.value = data
})

const toMenuClick = (value: string) => {
  currentMenu.value = value
  isShow.value = true
}

const btnClick = async(type: string, value: string) => {
  console.log(value)
  if (type === 'day') {
    submitObj.day = value
  } else if (type === 'minute') {
    submitObj.minute = value
  } else {
    return
  }
  isShow.value = false
}

const start = async () => {
  if (JSON.stringify(submitObj) == "{}") {
    return
  }
  isStart.value = !isStart.value
  // if (isStart.value) {
    submitObj.isStart = isStart.value
    const time = await (window as any).electronAPI.openFile(Object.assign({}, submitObj))
    console.log(time)
    console.log(submitObj, 'submitObjsubmitObj')
  // }
}
</script>

<style scoped lang="scss">
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

.day-btn {
  line-height: 30px;
  width: 100%;
  height: 30px;
  cursor: pointer;
  padding: 5px 0;
  &:hover {
    background: #d1d1d1d7;
  }
}


.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px 0;
  box-sizing: border-box;
  .top {
    position: relative;
    width: 100%;
  }
  .start {
    position: absolute;
    top: 20px;
    left: 0;
    right: 0;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 140px;
    height: 140px;
    border-radius: 70px;
    background: #16d992;
    color: #fff;
    font-size: 20px;
    transition: all 0.5s;
    cursor: pointer;
    &:hover {
      background: #57e6b1;
    }
    &.actived {
      &::before {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 100%;
        height: 100%;
        box-shadow: 0 0 0 0 #16d992;
        transform: translate(-50%, -50%);
        content: '';
        border-radius: 70px;
        animation: btn-active 1s ease-out infinite;
      }
    }
  }
  .bottom {
    width: 100%;
    .item  {
      position: relative;
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      padding: 0 30px;
      box-sizing: border-box;
      cursor: pointer;
      &:hover {
        background: #ececec;
      }
      &:after {
        position: absolute;
        inset: 0;
        left: unset;
        right: 30px;
        margin: auto;
        display: inline-block;
        width: 8px;
        height: 4px;
        background: #333;
        content: '';
        clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
      }
    }
  }
}
@keyframes btn-active {
  0% {
    opacity: 1;
    box-shadow: 0 0 0px 0 #16d992;
  }
  100% {
    opacity: 0;
    box-shadow: 0 0 0px 20px #57e6b1;
  }
}

</style>
