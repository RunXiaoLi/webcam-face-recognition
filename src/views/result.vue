<template>
  <div class="main">
    <div class="img-div">
      <el-image @click="creatQrCode(item)" v-for="(item,index) in images" :key="index"
                :src="'data:image/png;base64,'+item"/>
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

export default {
  // eslint-disable-next-line vue/multi-word-component-names
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
    this.images = JSON.parse(window.sessionStorage.getItem("images"))
  },
  methods: {
    creatQrCode(item) {
      this.imageUrl = item
      this.flag = true
      this.handleDownloadQrIMg(item)
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