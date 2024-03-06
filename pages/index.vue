<template>
    <div class="main">
        <Navbar />
        <div class="container">
            <div v-for="item in data">
                <OtpCard :data="item" :remainingTime="remainingTime" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// const router = useRouter()

const token = localStorage.getItem('token');
const remotedata = ref(false);
if (token) {
    remotedata.value = true
}
console.log(remotedata.value)
const lotp = await LocalOtp(remotedata.value)
const data = ref(lotp.aotp)
// console.log(data)
const remainingTime = ref(lotp.remainingTime)
</script>

<style>
/* 媒体查询 */

.main {
    max-width: 842px;
    margin: 0 auto;
}

/* 使用媒体查询，适用于小屏幕（移动端） */
@media (max-width: 600px) {
    .main {
        width: 100%;
        /* 移动端宽度为100% */
        margin: 0 auto;
    }
}

.container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
</style>