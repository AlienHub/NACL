<template>
  <div id='card1' class="card1" @click="copyToClipboard">
    <div class="card-conent">
      <div class="card-name">
        <div class="card-label">{{ data.value }}</div>
        <div class="card-tag"> 
          <span>远程</span>
        </div>
        </div>
      <div class="card-num">{{ data.key }}</div>
    </div>
    <div class="end">
      <div class="demo-progress">
        <el-progress :percentage="calculatedPercentage"
        :color="customColorMethod"
        :stroke-width="4"
        :show-text="false" />
      </div>
      <!-- <div>{{ remainingTime }}</div> -->
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
  ElMessage.success('复制成功')
}

const calculatedPercentage = computed(() => (props.remainingTime / 30) * 100);

const customColorMethod = computed(() => {
  if (calculatedPercentage.value < 30) {
    return '#F35959';
  }
  return '#FF9900';
});

</script>

<style scoped>
.card1 {
  display: flex;
  flex-direction: column;
  width: 361px;
  height: 120px;
  border-radius: 8px 8px 0 0;
  background-color: #fff;
  border: 1px solid #EEEDEA;
  margin: 12px 12px;
}

#card1:hover {
  cursor: pointer;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
}

.card-conent {
  display: flex;
  margin: auto 24px;
  align-items: center;
  margin-bottom: 0; /* Add this line to reset the margin-bottom */

}

.card-label {
  font-size: 20px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 170px;
}

.card-tag {
  width: 48px;
  height: 24px;
  margin-top: 8px;
  /* 内容右对齐 */
  text-align: center;
  border-radius: 4px;
  background-color: rgba(255, 153, 0, 0.1);

}

.card-tag span {
  color: #FF9900;
}

.card-num {
  font-size: 36px;
  font-weight: 800;
  margin-left: auto;
}

.end {
  margin-top: auto;
  margin-bottom: 0; /* Add this line to reset the margin-bottom */
}

.demo-progress .el-progress--line {
  max-width: 600px;
}
</style>