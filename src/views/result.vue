<template>
    <div class="main">
        <div class="img-div">
            <img @click="creatQrCode('data:image/png;base64,'+item)" v-for="(item,index) in images" :key="index"
                 :src="'data:image/png;base64,'+item"/>
        </div>
        <div v-show="isShow" @click="$router.push('/')" class="exit">
            <img src="../assets/exit.png" alt="" />
        </div>
        <el-dialog
                width="340px"
                :visible.sync="flag">
            <vue-qr v-if="imageUrl !== ''" :text="imageUrl"
                    :size="300"></vue-qr>
        </el-dialog>
    </div>
</template>

<script>
import vueQr from 'vue-qr'
import OSS from 'ali-oss';
import {v4 as uuidv4} from "uuid";

// 配置阿里云 OSS 访问密钥和 Bucket 地址
const client = new OSS({
    region: 'oss-cn-hongkong',
    accessKeyId: 'LTAI5tGXJjPFqwm7Kck8VopQ',
    accessKeySecret: 'qpiC2x5s2SJEXDIqh0Tb0QTlnkymFC',
    bucket: 'webcam-ace-recognition',
});
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "result",
    components: {
        vueQr
    },
    data() {
        return {
            isShow:false,
            flag: false,
            images: [],
            imageUrl: ''
        }
    },
    created() {
        this.images = JSON.parse(window.sessionStorage.getItem("images"))
    },
    methods: {
        creatQrCode(item) {

            this.uploadImage(item)
            this.handleDownloadQrIMg(item.split(',')[1])

        },
        //qrBase64是后台传回来的base64数据
        handleDownloadQrIMg(qrBase64) {
            // 这里是获取到的图片base64编码,这里只是个例子哈，要自行编码图片替换这里才能测试看到效果
            const imgUrl = `data:image/png;base64,${qrBase64}`
            // 如果浏览器支持msSaveOrOpenBlob方法（也就是使用IE浏览器的时候），那么调用该方法去下载图片
            if (window.navigator.msSaveOrOpenBlob) {
                const bstr = atob(imgUrl.split(',')[1])
                let n = bstr.length
                const u8arr = new Uint8Array(n)
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n)
                }
                const blob = new Blob([u8arr])
                window.navigator.msSaveOrOpenBlob(blob, 'chart-download' + '.' + 'png')
            } else {
                // 这里就按照chrome等新版浏览器来处理
                const a = document.createElement('a')
                a.href = imgUrl
                a.setAttribute('download', 'chart-download')
                a.click()
            }
        },
        // 将 Base64 图片转换为 Blob 对象
        // 将 base64 格式的图片转换为 Blob 格式
        dataURItoBlob(base64Str) {
            console.log(base64Str)
            const arr = base64Str.split(',');
            const mime = arr[0].match(/:(.*?);/)[1];
            const bstr = atob(arr[1]);
            let n = bstr.length;
            const u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], {type: mime});
        },
        // 上传图片
        uploadImage(base64Data) {

            console.log(base64Data)
            const blobData = this.dataURItoBlob(base64Data);
            return client.put(uuidv4()+".jpg", blobData).then((res) => {
                this.flag = true
                this.imageUrl = res.url
                this.isShow = true
                // eslint-disable-next-line no-unused-vars
            }).catch((err) => {

            });
        }
    }
}
</script>

<style scoped>
.main {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-image: url("../assets/anita_result_BG.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.img-div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    position: relative;
    right: 35px;
    top: -30px;
    /*width: 900px;*/
}


img {
    width: 267px;
    height: 267px;
    padding: 10px;
    cursor: pointer;
    text-align: center;
}
.exit{
    position: absolute;
    left: 50%;
    top: 86%;
    transform: translate(-50%, -50%);
}

.exit img{
    width: 393px;
    height: 297px;
}

/*img:nth-child(odd) {*/
/*    margin-right: 0;*/
/*}*/
/*img:nth-child(even) {*/
/*    margin-left: 0;*/
/*}*/
</style>