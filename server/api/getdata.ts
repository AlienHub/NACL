import * as OTPAuth from "otpauth";

// const remainingTime = ref(0);

type resultotp = {
  key: string;
  value: string;
  tag: string
};

function processArray(inputArray: string[]): resultotp[] {
  if (!inputArray || inputArray.length === 0) {
    return [];
  }
  const result: resultotp[] = [];

  for (let i = 0; i < inputArray.length; i += 2) {
    const value = inputArray[i];
    const key = i + 1 < inputArray.length ? inputArray[i + 1] : '';
    const tag = '远程';
    const obj: resultotp = {
      value,
      key,
      tag
    };

    result.push(obj);
  }
  // console.log(result);
  return result;
}


const getdata = async () => {
  const url = process.env.KV_REST_API_URL
  const token = process.env.KV_REST_API_TOKEN
  console.log(url,token)
  const response = await fetch(`${process.env.KV_REST_API_URL}`, {
    headers: {
      Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
    },
    body: `["HGETALL", ${process.env.KV_REST_API_DB_NAME}]`,
    method: 'POST',
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`)
  }
  // console.log(response.json())
  // processArray(await response.json()['result'])
  return response.json()
}

const generateToken = (key:any) => {
  // console.log(key);
  const totp = new OTPAuth.TOTP({
    secret: key,
  });
  const token = totp.generate();
  return token;
};


export default defineEventHandler(async (event) => {  

  const correctToken = process.env.PASSWORD
  console.log(correctToken)
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
  // console.log(providedToken)
  if (providedToken !== correctToken) {
    return {
      status: 401,
      body: {
        message: 'Unauthorized'
      }
    }
  }
  const data = await getdata();
  const datacode = processArray(data['result'])
  // console.log(datacode)
  // datacode.forEach((item:any) => {
  //   item.key = generateToken(item.key);
  // });
  // console.log(data)
  return {
    status: 200,
    body: {
      data: datacode
    }
  }
})


