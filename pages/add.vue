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
                    <el-button class='butn' color="#FF9900" type="primary" @click="add">
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

const from = reactive({
    name: '',
    key: ''
})

const add = () => {
    const wdata = AddOtp(from.key, from.name, 'local')
    console.log('s',wdata)
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

<style scoped>

.add-from {
    max-width: 300px;
    margin: 110px auto 0 auto;
}

.butn {
    color: #fff;
    font-weight: 600;
}

</style>
