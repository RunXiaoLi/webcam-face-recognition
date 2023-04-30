<template>
    <div class="init">
        <div class="videoImage" v-loading="imageLoading" ref="faceBox">
            <span class="time" v-if="time > 0">{{ time }}</span>
            <video ref="video" style="display: none;"></video>
            <canvas ref="canvas" width="342" height="342" class="canvas-cls" v-show="videoShow"></canvas>
            <img ref="image" :src="picture" alt="" v-show="pictureShow">
        </div>
    </div>
</template>

<script>
import * as faceApi from "face-api.js";

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "init",
    data() {
        return {
            loading: true,
            flag: false,
            time: 0,
            videoShow: false,
            pictureShow: false,
            // 图片地址
            picture: '',
            // 用于视频识别的节点
            canvas: null,
            video: null,
            image: null,
            timeout: 0,
            // 模型识别的条件
            options: '',
            // // 提示控制
            // noOne: '',
            // moreThanOne: '',
            // 不是通过Https访问提示
            httpsAlert: '',
            context: undefined,
            clock: undefined,
            isFlag: true
        }
    },
    mounted() {
        // 初始化
        this.init()
        this.useCamera()
    },
    beforeDestroy() {
        clearTimeout(this.timeout);
    },
    methods: {
        getCountdown() {
            this.clock = window.setInterval(() => {
                this.time--;
                if (this.time < 0) {
                    window.clearInterval(this.clock);
                    this.photoShoot()
                }
            }, 1000);
        },
        init() {
            window.localStorage.clear()
            faceApi.nets.ssdMobilenetv1.loadFromUri("models");
            faceApi.loadFaceLandmarkModel("/models");
            this.options = new faceApi.SsdMobilenetv1Options({
                minConfidence: 0.9, // 0.1 ~ 0.9
            });
            // 视频中识别使用的节点
            this.video = this.$refs.video
            this.canvas = this.$refs.canvas
            this.image = this.$refs.image

        },
        /**
         * 使用视频来成像摄像头
         */
        useCamera() {
            this.videoShow = true
            this.pictureShow = false
            this.cameraOptions()
            //this.$message.success("摄像头已打开")
        },
        /**
         * 使用摄像头
         */
        cameraOptions() {
            const loading = this.$loading({
                lock: true,
                text: 'Loading Models',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let constraints = {
                video: {
                    width: 342,
                    height: 342
                }
            }
            // 如果不是通过loacalhost或者通过https访问会将报错捕获并提示
            try {
                let promise = navigator.mediaDevices.getUserMedia(constraints);
                promise.then((MediaStream) => {
                    // 返回参数
                    this.video.srcObject = MediaStream;
                    this.video.play();
                    this.recognizeFace()
                    this.loading = false
                }).catch((error) => {
                    console.log(error);
                });
            } catch (err) {
                this.httpsAlert = `您现在在使用非Https访问，
            请先在chrome://flags/#unsafely-treat-insecure-origin-as-secure中修改配置,
            添将当前链接${window.location.href}添加到列表,
            并且将Insecure origins treated as secure修改为enabled,
            修改完成后请重启浏览器后再次访问！`
            }
            setTimeout(() => {
                loading.close();
            }, 3000);
        },
        /**
         * 人脸识别方法
         * 通过canvas节点识别
         * 节点对象执行递归识别绘制
         */
        async recognizeFace() {
            if (this.video.paused) return clearTimeout(this.timeout);
            this.canvas.getContext('2d', {willReadFrequently: true}).drawImage(this.video, 0, 0, 342, 342);
            const results = await faceApi.detectAllFaces(this.canvas, this.options).withFaceLandmarks();
            if (results.length > 0) {
                // this.context = this.canvas.getContext("2d");
                // this.context.strokeStyle = '#4f7b98'
                // this.context.lineWidth = 2
                // this.isFlag && results.forEach((item) => {
                //     this.context.strokeRect(item.alignedRect._box._x, item.alignedRect._box._y, item.alignedRect._box._width, item.alignedRect._box._height)
                // })g
                if (!this.flag) {
                    this.time = 3
                    this.flag = true
                    this.getCountdown()
                    this.$message.success(`检查到人脸${this.time}s开始拍照`)
                }
            } else {
                this.time = 3
                this.flag = false
                window.clearInterval(this.clock);
            }
            // 通过canvas显示video信息
            this.timeout = setTimeout(() => {
                return this.recognizeFace()
            });
        },
        /**
         * 拍照上传
         */
        async photoShoot() {
            this.isFlag = false
            // 拿到图片的base64
            let canvas = this.canvas.toDataURL("image/png");
            this.isFlag = true
            // 拍照以后将video隐藏
            this.videoShow = false
            this.pictureShow = true
            // 停止摄像头成像
            this.video.srcObject.getTracks()[0].stop()
            this.video.pause()
            this.picture = canvas
            if (canvas) {
                this.imageLoading = true
                window.localStorage.setItem("img", canvas)
                let time = 2;
                let temp = window.setInterval(() => {
                    time--;
                    if (time < 0) {
                        window.clearInterval(temp);
                        this.$router.push('/request')
                    }
                }, 1600);

            } else {
                console.log('canvas生成失败')
            }
        },

    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

.time {
    font-family: Lack-Line-Regular, serif;
    position: absolute;
    top: -30%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    font-weight: 400;
    font-size: 158px;
    line-height: 180px;
    color: #FFFFFF;
}

.videoImage {
    top: -20px;
    position: relative;
}


.init {
    position: relative;
    background-image: url("../assets/e971d4dbe2f89ee4ddf6ce32838c2c222.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>