import * as OTPAuth from "otpauth";
import { ref } from 'vue';

const remainingTime = ref(0);

const otp = ref();
const rotp = ref();
const aotp = ref([]);
const rdata = ref();
const apidata = ref(false);

export default async function (remotedata: boolean) {
    // key.value = localstoragekey
    if (remotedata) {
      rdata.value = await ReadRmotedata()
      if (rdata.value.data.status === 200) {
        localStorage.setItem('remote-otp', JSON.stringify(rdata.value.data.body.data))
        rotp.value = localStorage.getItem('remote-otp')
        apidata.value = true
    } 
    }
    getKeysFromLocalStorage();
    // console.log('login',rdata.value.data)
    setInterval(() => { 
      calculateRemainingTime();
    }, 1000);
    return {
      remainingTime,
      aotp,
    };
}

// 从localStorage中获取密钥
function getKeysFromLocalStorage() {
  otp.value = localStorage.getItem('otp');
  if (apidata.value) {
    // 确保 parsedOtp 是一个数组
    if (otp.value) {
      aotp.value = JSON.parse(otp.value).concat(JSON.parse(rotp.value));
    }else {
      aotp.value = JSON.parse(rotp.value)
    }
  }else {
    aotp.value = JSON.parse(otp.value)
  }
  if (aotp.value) {
    // console.log(aotp.value)
    aotp.value.forEach((item:any) => {
      item.key = generateToken(item.key);
    });
  }
  // console.log(aotp.value);
  return aotp.value;
}

const generateToken = (key:any) => {
  const totp = new OTPAuth.TOTP({
    secret: key,
  });
  const token = totp.generate();
  return token;
};

// 计算剩余时间
function calculateRemainingTime() {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const timestampRemainder = currentTimestamp % 30;
  remainingTime.value = 30 - timestampRemainder;
  // console.log(remainingTime.value);
  getKeysFromLocalStorage();
}

