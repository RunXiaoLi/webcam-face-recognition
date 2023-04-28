<template>
  <div class="main">
    <div>
      <div class="img"><img src="../assets/time.png"/></div>
      <div class="text">
        <p v-show="num >=0">FROM THE SEEDS OF LIFE WE GROW</p>
        <p v-show="num >=1">OUR PETALS UNFOLDING AS WE GO</p>
        <p v-show="num >=2">A FLOWER'S BEAUTY, A FLEETING THING</p>
        <p v-show="num >=3">A REMINDER OF LIFE'S FRAGILE WING</p>
        <p v-show="num >=4"></p>
        <p v-show="num >=5" style="margin-top: 10px">ANITA, THE CREATURE WE CREATE</p>
        <p v-show="num >=6">HALF-HUMAN, HALF-FLOWER, A CELEBRATION OF FATE</p>
        <p v-show="num >=7">A SYMBOL OF THE CYCLE OF LIFE</p>
        <p v-show="num >=8">AND THE NEED TO EMBRACE IT, FREE FROM STRIFE</p>
        <p v-show="num >=9"></p>
        <p v-show="num >=10" style="margin-top: 10px">FOR THE SOCIAL CLOCK TICKS ON</p>
        <p v-show="num >=12">A FORCE THAT OFTEN MAKES US FEEL ALONE</p>
        <p v-show="num >=13">BUT IN ANITA, WE FIND CONNECTION</p>
        <p v-show="num >=14">A COMMUNITY THAT SPANS ALL DIRECTIONS</p>
        <p v-show="num >=15"></p>
        <p v-show="num >=16" style="margin-top: 10px">WITH EACH PASSING MOMENT, WE BLOOM AND GROW</p>
        <p v-show="num >=17">OUR TIME ON EARTH, A PRECIOUS WINDOW</p>
        <p v-show="num >=18">SO LET US CHERISH EVERY AGE AND STAGE</p>
        <p v-show="num >=19">AND EMBRACE THE BEAUTY OF LIFE'S FLEETING GAUGE.</p>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import {v4 as uuidv4} from "uuid";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "request",
  data() {
    return {
      num: -1,
      clock: undefined,
      sdForm: {
        denoising_strength: 0.5,
        // 使用的模型ID
        model_id: 'midjourney',
        // 提示词
        prompt: "Emma Watson as a powerful mysterious sorceress, casting lightning magic, detailed clothing, digital painting, hyperrealistic, fantasy, Surrealist, full body, by Stanley Artgerm Lau and Alphonse Mucha, artstation, highly detailed, sharp focus, sci-fi, stunningly beautiful, dystopian, iridescent gold",
        //生成的图片数量
        batch_size: 4,
        width: 512,
        seed: "-1",
        height: "512",
        track_id: uuidv4(),
        num_inference_steps: "50",
        init_images: []
      },
    }
  },
  created() {
    this.request()
    this.addNum()
  },
  methods: {
    addNum() {
      window.setInterval(() => {
        this.num++;
      }, 1000);
    },
    getBase64() {
      return window.localStorage.getItem("img")
    },
    request() {
      // TODO 跳转到 request页面
      this.loading = true
      this.loading_text = "upload image ..."
      this.sdForm.init_images.push(window.localStorage.getItem("img"))
      request.post("/sdapi/v1/img2img", this.sdForm).then(res => {
        let images = res.data.images
        window.sessionStorage.setItem("images",JSON.stringify(images))
        this.$router.push('/result')
        // eslint-disable-next-line no-unused-vars
      }).catch((err) => {
        console.log(err)
        this.$message.error("Connection timeout.......")
        this.$router.push("/")
      })
    },


  }
}
</script>

<style scoped>
.main {
  width: 100%;
  height: 100vh;
  background-color: #000000;
  color: #FFFFFF;
}

.img {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
}

.img {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

}

img {
  text-align: center;
  width: 300px;
  height: 300px;
}

.text {
  font-family: 'Julius Sans One';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 22px;
  text-align: center;
  color: #F5F5F5;

}
</style>