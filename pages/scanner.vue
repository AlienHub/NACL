<template>
    <ClientOnly>
        <div class="main">
            <Navbar />
            <div class="container">
                <qrcode-stream :constraints="{ facingMode }" @detect="onDetect">
                    <div class="scannerk"><img src="/scanner.svg" alt="SVG Icon"></div>
                </qrcode-stream>
                <!-- <div class="rdata">
                <div class="title"><span>{{ title }}</span></div>
                <div class="content"><span>{{ content }}</span></div>
                <div class="but">
                    <el-button style="width: 144px;">取 消</el-button>
                    <el-button style="width: 144px;" type="primary" @click="add">添 加</el-button>
                </div>
            </div> -->
            </div>
        </div>
    </ClientOnly>
</template>

<script setup lang="ts">
import { QrcodeStream } from 'vue-qrcode-reader'

const router = useRouter()

const facingMode = ref('environment')
const result = ref('')
const qr = ref(true)
const title = ref('添加')
const content = ref('')
const otpdata = ref()

function parseMfaUri(uri: string) {
    // 使用正则表达式匹配发行者和标签，使 issuer 部分变得可选
    const match = uri.match(/otpauth:\/\/totp\/([^?]+)\?secret=([^&]+)(?:&issuer=([^&]+))?/);

    if (!match) {
        // 如果匹配失败，返回空对象或适当的错误处理
        qr.value = false
        return {};
    }

    const encodedLabel = match[1];
    const secret = match[2];
    const issuer = match[3];

    // 对标签部分进行解码
    const decodedLabel = decodeURIComponent(encodedLabel);

    // 生成结果对象，根据 issuer 是否存在来确定 value 的值
    const result = {
        key: secret,
        value: issuer && !decodedLabel.includes(issuer) ? `${issuer}: ${decodedLabel}` : decodedLabel
    };

    return result;
}

// 测试 URI
// const uri1 = 'otpauth://totp/Aliyun:%E8%91%AB%E7%A6%84%E5%95%8A?secret=VQ5OMCWYPN4J3I3RR6RCXUCY37LCHBDHXI35I5E5WF3M3Q6JU2LOHCM4NLVWADLZ&issuer=Aliyun';
// const uri2 = 'otpauth://totp/alien_zhou?secret=MWZVDRNQKKIR65BZR2KI6PAI7UP2HDXG';

// const parsedResult1 = parseMfaUri(uri1);
// const parsedResult2 = parseMfaUri(uri2);

// console.log(parsedResult1);
// console.log(parsedResult2);


function onDetect(detectedCodes) {
    // console.log(detectedCodes)
    result.value = JSON.stringify(detectedCodes.map((code) => code.rawValue))
    // console.log(result.value)
    ElMessage.success(result.value)
    otpdata.value = parseMfaUri(result.value)
    ElMessage.info(result.value)
    if (qr) {
        add()
    } else {
        ElMessage.error('二维码解析失败，请使用密钥方式添加！')
        router.push('/')
    }

}


const add = () => {
    const wdata = AddOtp(otpdata.value.key, otpdata.value.value, 'local')
    if (wdata.value) {
        router.push('/')
    } else {
        ElMessage.error('Oops , 添加失败')
        router.push('/')
    }
}

</script>

<style scoped>
.main {
    max-width: 842px;
    margin: 0 auto;
}

/* 使用媒体查询，适用于小屏幕（移动端） */
@media (max-width: 600px) {
    .main {
        width: 100%;
        /* 移动端宽度为100% */
        margin: 0 auto;
    }
}

.container {
    height: calc(100vh - 48px);
}

.scannerk {
    margin-top: 150px;
    display: flex;
    justify-content: center;
}


.rdata {
    position: absolute;
    display: flex;
    flex-direction: column;
    background-color: #FF9900;
    border-radius: 8px;
    margin-top: calc(100vh - 48px - 192px);
    ;
    height: 132px;
    width: 317px;
    margin-left: 12px;
    margin-right: 12px;
    padding: 24px;
}

.title {
    font-size: 16px;
    font-weight: 800;
    color: #333;
    margin-bottom: 20px;
}

.but {
    margin: auto auto 0px auto;
}
</style>