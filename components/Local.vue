<template>
    <div class="zhu">
        <ClientOnly>
            <div class="mian" v-if="addtrue">
                <div class="header">
                    <el-button @click="addKey">添加 OTP</el-button>
                </div>
                <div class="container">
                    <div v-for="item in data">
                        <OtpCard :data="item" :remainingTime="remainingTime" />
                    </div>
                </div>
            </div>
            <div class="mainpass" v-else>
                <Add v-model="addtrue" env="local"/>
            </div>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 添加数据
const addtrue = ref(true)

const lotp = LocalOtp('otp')
const data = ref(lotp.data)
const remainingTime = ref(lotp.remainingTime)

const addKey = () => {
    addtrue.value = false
};


// console.log(data.value)
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    justify-content: flex-start;
    padding: 0 32px;
    flex-wrap: wrap;
}

.header {
    padding-left: 32px;
    margin-left: 12px;
}
.mainpass {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 400px;
  width: 400px;
  margin-top: 110px;
  /* align-items: center; */
  border: 1px solid #E0E0E0;
  padding: 32px;
  border-radius: 8px;
}

</style>