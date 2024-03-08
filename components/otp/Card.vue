<template>
  <div id='card' class="card" @click="copyToClipboard">
    <div class="card-conent">
      <div class="card-tag" v-if="data.tag !== undefined">
        <div class="card-tag-text"><span>{{ data.tag }}</span></div>
      </div>
      <div class="card-name">
        <div class="card-label">{{ data.value }}</div>
        <div class="card-progress">
          <el-progress :percentage="calculatedPercentage" :color="customColorMethod" :stroke-width="3" type="circle"
            :width="32" :show-text="false">
          </el-progress>
        </div>
      </div>
      <div class="card-num">
        <div class="card-num-only">{{ data.key[0] }}</div>
        <div class="card-num-only">{{ data.key[1] }}</div>
        <div class="card-num-only">{{ data.key[2] }}</div>
        <div class="card-num-only">{{ data.key[3] }}</div>
        <div class="card-num-only">{{ data.key[4] }}</div>
        <div class="card-num-only">{{ data.key[5] }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core';

const props = defineProps<{
  data: {
    key: string,
    value: string
    tag: string
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
  return '#FF7701';
});



</script>

<style scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 361px;
  height: 120px;
  border-radius: 16px;
  background-color: #fff;
  border: 1px solid #EEEDEA;
  margin: 12px 12px;
}

#card:hover {
  cursor: pointer;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
}

.card-conent {
  display: flex;
  margin: 32px 24px;

  /* align-items: center; */
  flex-direction: column;

}

.card-name {
  display: flex;
}

.card-name .card-progress {
  margin-left: auto;
  transform: scaleX(-1);
}

.card-label {
  font-size: 20px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 230px;
  color: #484F59;
}

.card-tag {
  position: absolute;
  top: 0;
  right: 0;
  width: 48px;
  height: 24px;
  margin-top: 0px;
  /* 内容右对齐 */
  text-align: center;
  border-radius: 0 12px 0 12px;
  background-color: rgba(5, 42, 110, 0.1);

}

.card-tag span {
  color: #052A6E;
}

.card-num {
  display: flex;
  font-size: 20px;
  font-weight: 800;
  margin-left: auto;
  color: #FF7701;
  width: 100%;
  margin-top: 10px;
}

.card-num>div {
  flex-grow: 1;
  flex-basis: 0;
  margin: 0 10px;
  /* 调整间隔大小 */
}

.card-num-only {
  background-color: rgba(255, 119, 1, 0.1);
  border-radius: 4px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>