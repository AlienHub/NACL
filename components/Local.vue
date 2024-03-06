<template>
    <ClientOnly>
        <div class="mian">
            <div class="container">
                <div v-for="item in data">
                    <OtpCard :data="item" :remainingTime="remainingTime" />
                </div>
            </div>
        </div>
    </ClientOnly>
</template>

<script setup lang="ts">
const router = useRouter()

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
    justify-content: space-between;
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
    width: 310px;
    margin-top: 110px;
    /* align-items: center; */
    border: 1px solid #E0E0E0;
    padding: 32px;
    border-radius: 8px;
}
</style>