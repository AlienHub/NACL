<template>
    <div id='card1' class="card1" @click="copyToClipboard">
        <div class="main">
            <div class="main-name">{{ data.value }}</div>
            <div class="main-num">{{ data.key }}</div>
        </div>
        <div class="end">
            <div>{{ remainingTime }}</div>
        </div>  
    </div>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core';

const props = defineProps<{
  data: {
    key: string,
    value: string
  },
  remainingTime: number
}>()


const { copy } = useClipboard({
    legacy: true, // 使用 execCommand 作为回退
})

const copyToClipboard = () => {
    copy(props.data.key)
    ElMessage.success('Copy Success !')
}

</script>

<style scoped>

.card1 {
  display: flex;
  width: 333px;
  height: 110px;
  border-radius: 5px;
  background-color: #fff;
  border: 1px solid rgba(224, 224, 224, 1);
  margin: 12px 12px;
}

#card1:hover {
  cursor: pointer;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
}

.main {
  display: flex;
  width: 70%;
  padding-left: 16px;
  flex-direction: column;
  justify-content: center;
}

.main-name {
  font-size: 20px;
  font-weight: 400;
}

.main-num {
  font-size: 32px;
  font-weight: 800;
}

.end {
  display:flex;
  width: 30%;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 800;
  background-image: url("/Rectangle.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
}

</style>