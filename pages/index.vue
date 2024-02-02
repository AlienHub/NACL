<template>
    <Navbar></Navbar>
    <div class="zhu">
        <ClientOnly>
            <div class="header">
                <button class="btn" @click="addKey">添加 OTP</button>
            </div>
            <div v-if="addT == 1">
                <div class="container">
                    <local></local>
                </div>
            </div>
            <div class="labeladd" v-else>
                    <label class="form-control w-full max-w-xs">
                        <div class="label">
                            <span class="label-text">名称</span>
                        </div>
                        <input v-model="InputName" class="input" type="text"  placeholder="输入名称" />
                        <div class="label">
                            <span class="label-text">密钥</span>
                        </div>
                        <input v-model="InputKey" class="input" type="text"  placeholder="输入密钥" />
                    </label>
                    <div class="label-btn">
                        <button class="btn" @click="createKey">添加</button>
                        <button class="btn" @click="noaddkey">取消</button>
                    </div>
            </div>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">


const InputKey = ref('');
const InputName = ref('');

const addT = ref(1)

const addKey = () => {
    InputKey.value = '';
    InputName.value = '';
    addT.value = 0;
    
};

const createKey = () => {
    if (InputKey.value && InputName.value ) {
        const newKey = {
            key: InputKey.value,
            value: InputName.value
        }
        const storeArray = localStorage.getItem('otp')
        if (storeArray) {
            const storeArrayJson = JSON.parse(storeArray)
            storeArrayJson.push(newKey)
            localStorage.setItem('otp', JSON.stringify(storeArrayJson))
        } else {
            localStorage.setItem('otp', JSON.stringify([newKey]))
        }
    }
    addT.value = 1;
};

const noaddkey = () => {
    addT.value = 1;
};

</script>

<style scoped>
.zhu {
    max-width: 1200px;
    margin: 0 auto;
}

.header {
    display: flex;
    justify-content: flex-start;
    padding: 0 16px;
    height: 48px;
    margin-bottom: 16px;
}

.btn {
    padding: 8px 16px;
    border-radius: 4px;
    background-color: #fff;
    border: 1px solid #fff;
    /* color: #fff; */
    margin-right: 16px;
    cursor: pointer;
    font-size: 14px;
}

.btn:hover {
    background-color: #C6C6C6;
    border: 1px solid #f0f0f0;
    font-weight: 500;
}

.container {
    display: flex;
    padding: 0 32px;
    /* align-items: center; */
    /* position: relative; */
    flex-wrap: wrap;
}

.labeladd {
    display: flex;
    max-width: 300px;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
}

.input {
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #f0f0f0;
    margin-bottom: 16px;
}

.label {
    font-size: 14px;
    font-weight: 500;
    color: #333;
    margin-bottom: 8px;
}
</style>