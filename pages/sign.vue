<template>
    <ClientOnly>
    <div class="main">
        <Navbar />
        <div class="sign-from">
                <el-form label-position="top">
                    <el-form-item label="请输入密码">
                        <el-input v-model="InputKey" />
                    </el-form-item>
                    <el-form-item>
                        <el-button class='butn' color="#FF9900" type="primary" @click="login">
                            确认
                        </el-button>
                        <el-button  @click="quit">
                            取消
                        </el-button>
                    </el-form-item>
                </el-form>
        </div>
    </div>
</ClientOnly>
</template>

<script setup lang="ts">
const router = useRouter()
// const token = ref(localStorage.getItem('token'));
const InputKey = ref('');
const rdata = ref();

const quit = () => {
    router.push('/')
}

const login = async () => {
    localStorage.setItem('token', InputKey.value)
    rdata.value = await ReadRmotedata()
    // console.log('login',rdata.value.data)
    if (rdata.value.data.status === 200) {
        localStorage.setItem('remote-otp', JSON.stringify(rdata.value.data.body.data))
        router.push('/')
    } else {
        ElMessage.error('Oops, password is error!')
    }

}

onMounted(() => {
    const localStorageValue = localStorage.getItem('token');
    if (localStorageValue) {
        router.push('/')
    }
});

</script>

<style>
:root {
    --el-color-primary: #FF7701;
    --el-color-primary-light-3: #FFA04E;
    --el-color-primary-light-5: #FFBB80;
    --el-color-primary-light-7: #FFD7B3;
    --el-color-primary-light-8: #FFE4CC;
    --el-color-primary-light-9: #FFF2E6;
    --el-color-primary-dark-2: #F67504;
}
.sign-from {
    max-width: 300px;
    margin: 110px auto 0 auto;
}

.butn {
    color: #fff;
    font-weight: 600;
}


</style>