const token = ref()

export default async function () {
  token.value = localStorage.getItem('token')
  console.log('api', token.value)
  const apidata = await useFetch('/api/getdata',
    {
      headers: {
        'authorization': `Bearer ${token.value}`
      }
    })
  // console.log(apidata.data.value)
  // if (apidata.data.value?.status === 200) {
  //   localStorage.setItem('remote-otp', JSON.stringify(apidata.data.value?.body.data))
  // } else {
  //   ElMessage.error('Oops, password is error!')
  // }
  return apidata
}