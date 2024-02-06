<script setup lang="ts">
import { ref } from 'vue';


// 添加数据
const addtrue = ref(true)

const token = ref(localStorage.getItem('token'));
console.log(token.value)
const passtrue = ref(false)

const dataraw = async () => {
  const apidata = await useFetch('/api/getdata',
    {
      headers: {
        'authorization': `Bearer ${token.value}`
      }
    })
  if (apidata.data.value?.status === 200) {
    // console.log('???')
    passtrue.value = true
    localStorage.setItem('remote-otp', JSON.stringify(apidata.data.value?.body.data))
  } else {
    passtrue.value = false
    ElMessage.error('Oops, password is error!')
  }
}

if (token && token.value !== null) {
  // console.log(passtrue.value)
  await dataraw()
  // console.log(passtrue.value, 'sss')
}

const lotp = LocalOtp('remote-otp')
const data = lotp.data
const remainingTime = lotp.remainingTime

const InputKey = ref('');
const login = () => {
  localStorage.setItem('token', InputKey.value)
  token.value = InputKey.value;
  dataraw()
}

const addremotekey = () => {
  if (!passtrue.value) {
    return false
  }
  addtrue.value = false
}

watch(addtrue, async (rudata) => {
  if(rudata) {
    await dataraw()
  }
})

</script>

<template>
  <ClientOnly>
    <div class="remotemain" v-if="passtrue">
      <div class="mian" v-if="addtrue">
        <div class="header">
          <el-button @click="addremotekey">添加 OTP</el-button>
        </div>
        <div class="container">
          <div v-for="item in data">
            <OtpCard :data="item" :remainingTime="remainingTime" />
          </div>
        </div>
      </div>
      <div class="mainpass" v-else>
        <Add v-model="addtrue" env="remote"/>
      </div>


    </div>
    <div class="mainpass" v-else>
      <el-form label-position="top">
            <el-form-item label="请输入密码">
                <el-input v-model="InputKey" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login">
                    确认
                </el-button>
            </el-form-item>
        </el-form>
    </div>
  </ClientOnly>
</template>


<style scoped>
.header {
  margin-left: 12px;
}

.remotemain {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  /* padding: 0 32px; */
}

.btn {
  display: flex;
  justify-content: flex-end;
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

.label-text {
  font-size: 14px;
  color: #C6C6C6;
  margin-bottom: 8px;
  display: flex;
  justify-content: flex-start;

}
</style>