const writedata = async (key: string, value: string) => {
    const url = process.env.KV_REST_API_URL
    const token = process.env.KV_REST_API_TOKEN
    const response = await fetch(`${process.env.KV_REST_API_URL}`, {
      headers: {
        Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
      },
      body: `["HSET", "otp", "${key}", "${value}"]`,
      method: 'POST',
    })
    if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`)
      }
    return response.statusText
  }


export default defineEventHandler(async (event) => {  
    const body = await readBody(event)
    console.log(body)
    const correctToken = process.env.PASSWORD
    // console.log(event.headers,'ssss')
    const token = event.headers.get('authorization')
    // console.log(token)
    // 如果 Authorization 头不存在，返回凭据错误的响应
    if (!token) {
      return {
        status: 401,
        body: {
          message: 'Unauthorized'
        }
      }
    }
    // 检查 Authorization 头中的凭据是否正确
    const providedToken = token.replace('Bearer ', '');
    console.log(providedToken)
    if (providedToken !== correctToken) {
      return {
        status: 401,
        body: {
          message: 'Unauthorized'
        }
      }
    }
    const result = await writedata(body.value, body.key);
    // console.log(result)
    if (result !== 'OK') {
      return {
        status: 404,
        body: {
          message: 'Not Found'
        }
      }
    }
    return {
        status: 200,
    }
  })