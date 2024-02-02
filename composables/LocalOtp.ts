import * as OTPAuth from "otpauth";
import { ref } from 'vue';

const remainingTime = ref(0);
const data = ref([]);
const result = ref([]);


export default function () {
    getKeysFromLocalStorage()
    setInterval(() => { 
      calculateRemainingTime();
    }, 1000);
    return {
      data,
      remainingTime
    }
}


// 从localStorage中获取密钥
function getKeysFromLocalStorage() {
  const localotp = localStorage.getItem('otp');
  // console.log(localotp);
  if (localotp) {
    // data.value = JSON.parse(localotp);
    // data.value.key = generateToken(data.value.key);
    data.value = JSON.parse(localotp);
    data.value.forEach((item:any) => {
      item.key = generateToken(item.key);
    });
  }
  // console.log(data.value);
  return data.value;
}

const generateToken = (key:any) => {
  // console.log(key);
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