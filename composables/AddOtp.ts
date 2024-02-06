
const token = ref(localStorage.getItem('token'))

// 添加远程数据
const addremotedata = async(key:string,name:string) => {
    const wdata = await useFetch('/api/writedata',
    {
    headers: {
        'authorization': `Bearer ${token.value}`
    },
    method: 'POST',
    body: JSON.stringify({ key: key, value: name })
    })
    if (wdata.data.value?.status === 200) {
        return true
    } else {
        ElMessage.error('Oops, error!')
        return false
    }
}


const addlocaldata = (key:string,name:string) => {
    const newKey = {
        key: key,
        value:name
    }
    const storeArray = localStorage.getItem('otp')
    if (storeArray) {
        const storeArrayJson = JSON.parse(storeArray)
        storeArrayJson.push(newKey)
        localStorage.setItem('otp', JSON.stringify(storeArrayJson))
    } else {
        localStorage.setItem('otp', JSON.stringify([newKey]))
    }
    return true
};

export default function (key:string,name:string,env:string) {
    const result = ref(false)
    if (key && name){
        if (env === 'local') {
            result.value = addlocaldata(key,name)
        } else if (env === 'remote') {
            result.value = addremotedata(key,name)
        }
    }
    return result
}