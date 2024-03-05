const token = ref('')
const passtrue = ref(false)

const dataraw = async () => {
    const apidata = await useFetch('/api/getdata',
      {
        headers: {
          'authorization': `Bearer ${token.value}`
        }
      })
    if (apidata.data.value?.status === 200) {
    //   console.log('???')
      passtrue.value = true
      localStorage.setItem('remote-otp', JSON.stringify(apidata.data.value?.body.data))
    } else {
      passtrue.value = false
      ElMessage.error('Oops, password is error!')
    }
}

export default function () {
    const token = ref(localStorage.getItem('token'));
    console.log('api',token.value)
    dataraw()
    return {
        passtrue
    }
}