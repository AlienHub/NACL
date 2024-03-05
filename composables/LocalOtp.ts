import * as OTPAuth from "otpauth";
import { ref } from 'vue';

const remainingTime = ref(0);
const data = ref([]);
const result = ref([]);
const key = ref('');

const otp = ref();
const rotp = ref();
const aotp = ref([]);

export default function (remotedata: boolean) {
    // key.value = localstoragekey
    getKeysFromLocalStorage(remotedata);
    setInterval(() => { 
      calculateRemainingTime(remotedata);
    }, 1000);
    return {
      remainingTime,
      aotp,
    };
}

// 从localStorage中获取密钥
function getKeysFromLocalStorage(remotedata:boolean) {
  // console.log(key);
  otp.value = localStorage.getItem('otp');
  rotp.value = localStorage.getItem('remote-otp')
  // console.log('totp',rotp.value)
  if(remotedata && rotp.value) {
    aotp.value = JSON.parse(otp.value)
    aotp.value = aotp.value.concat(JSON.parse(rotp.value))
  }else {
    aotp.value = JSON.parse(otp.value)
  }
  // console.log(aotp.value);
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
  // console.log(key);
  const totp = new OTPAuth.TOTP({
    secret: key,
  });
  const token = totp.generate();
  return token;
};

// 计算剩余时间
function calculateRemainingTime(remotedata: boolean) {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const timestampRemainder = currentTimestamp % 30;
  remainingTime.value = 30 - timestampRemainder;
  // console.log(remainingTime.value);
  getKeysFromLocalStorage(remotedata);
}

