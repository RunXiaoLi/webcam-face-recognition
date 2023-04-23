<template>
    <div class="main">
        <div class="img-div">
            <el-image @click="creatQrCode(item)" v-for="(item,index) in images" :key="index" :src="item"/>
        </div>


        <el-dialog
                width="340px"
                :visible.sync="flag">
            <vue-qr v-if="imageUrl !== ''" :text="imageUrl"
                    :size="300"></vue-qr>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="$router.push('/')">Return to the welcome page</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import vueQr from 'vue-qr'
import QRCode from 'qrcodejs2'
import {download} from '@dimplesyj/util'

export default {
    name: "result",
    components: {
        vueQr
    },
    data() {
        return {
            flag: false,
            images: [],
            imageUrl: ''
        }
    },
    created() {
        this.images = JSON.parse(window.localStorage.getItem("images"))
    },
    methods: {
        creatQrCode(item) {
            this.imageUrl = item
            this.flag = true
            download(item + '?response-content-type=application%2Foctet-stream', "test")
        },
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
    background-color: #000000;
    color: #FFFFFF;
}

.img-div {
    display: flex;
    flex-wrap: wrap;
    width: 600px;
}

.el-image {
    cursor: pointer;
    width: 300px;
    height: 300px;
}
</style>