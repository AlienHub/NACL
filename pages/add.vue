<template>
    <div class="main">
        <Navbar />
        <div class="add-from">
            <ClientOnly>
                <el-form label-position="top" :model="from">
                    <el-form-item label="名称">
                        <el-input v-model="from.name" />
                    </el-form-item>
                    <el-form-item label="密钥">
                        <el-input v-model="from.key" />
                    </el-form-item>
                    <el-form-item>
                        <el-button class='butn' type="primary" @click="add">
                        添加
                    </el-button>
                    <el-button @click="quit">取消</el-button>
                    </el-form-item>
                </el-form>
            </ClientOnly>
        </div>
    </div>
</template>

<script lang="ts" setup>
const router = useRouter()

const islogin = ref('local')
const from = reactive({
    name: '',
    key: ''
})

const add = () => {
    if (localStorage.getItem('token')) {
        islogin.value = 'remote'
    }
    const wdata = AddOtp(from.key, from.name, islogin.value)
    if (wdata.value) {
        router.push('/')
    } else {
        ElMessage.error('Oops , 添加失败')
    }
}
const quit = () => {
    router.push('/')
}

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
.add-from {
    max-width: 300px;
    margin: 110px auto 0 auto;
}

.butn {
    color: #fff;
    font-weight: 600;
}
</style>
