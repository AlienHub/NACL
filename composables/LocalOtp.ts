import * as OTPAuth from "otpauth";
import { ref } from 'vue';

const remainingTime = ref(0);
const data = ref([]);
const result = ref([]);
const key = ref('');

const otp = ref();

export default function (localstoragekey: string) {
    key.value = localstoragekey
    getKeysFromLocalStorage(key.value);
    setInterval(() => { 
      calculateRemainingTime();
    }, 1000);
    return {
      remainingTime,
      data,
    };
}


// 从localStorage中获取密钥
function getKeysFromLocalStorage() {
  // console.log(key);
  otp.value = localStorage.getItem(key.value);
  // console.log(localotp);
  if (otp.value && otp.value !== 'null') {
    data.value = JSON.parse(otp.value);
    // console.log(data.value)
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

