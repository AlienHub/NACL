<template>
    <div class="container"
    v-for="item in data">
        <OtpCard :data="item" :remainingTime="remainingTime" />
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';

const lotp = LocalOtp()
const data = ref(lotp.data)
const remainingTime = ref(lotp.remainingTime)

// console.log(data.value)
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    /* margin: 0 auto; */
}
</style>