<template>
    <div>
        <el-form label-position="top" :model="from">
            <el-form-item label="名称">
                <el-input v-model="from.name" />
            </el-form-item>
            <el-form-item label="密钥">
                <el-input v-model="from.key" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="add">
                    添加
                </el-button>
                <el-button @click="quit">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
  
<script lang="ts" setup>

const back = defineModel()

const props = defineProps(['env'])

const from = reactive({
    name:'',
    key:''
})

const add = () => {
    const wdata = AddOtp(from.key,from.name,props.env)
    if (wdata.value) {
        back.value = true
    } else {
        back.value = false
        ElMessage.error('Oops , 添加失败')
    }
}
const quit = () => {
    back.value = true
}

</script>

<style scoped>
</style>
  