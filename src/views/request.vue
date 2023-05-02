<template>
    <div class="main">

        <div class="text">
            <p v-show="num >=0">From the seeds of life we grow</p>
            <p v-show="num >=1">Our petals unfolding as we go</p>
            <p v-show="num >=2">A flower's beauty, a fleeting thing</p>
            <p v-show="num >=3">A reminder of life's fragile wing</p>
            <p v-show="num >=4"></p>
            <p v-show="num >=5" style="margin-top: 10px">Anita, the creature we create</p>
            <p v-show="num >=6">Half-human, half-flower, a celebration of fate</p>
            <p v-show="num >=7">A symbol of the cycle of life</p>
            <p v-show="num >=8">And the need to embrace it, free from strife</p>
            <p v-show="num >=9"></p>
            <p v-show="num >=10" style="margin-top: 10px">For the social clock ticks on</p>
            <p v-show="num >=12">A force that often makes us feel alone</p>
            <p v-show="num >=13">But in Anita, we find connection</p>
            <p v-show="num >=14">A community that spans all directions</p>
            <p v-show="num >=15"></p>
            <p v-show="num >=16" style="margin-top: 10px">With each passing moment, we bloom and grow</p>
            <p v-show="num >=17">Our time on earth, a precious window </p>
            <p v-show="num >=18">So let us cherish every age and stage</p>
            <p v-show="num >=19">And embrace the beauty of life's fleeting gauge.</p>
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
            prompt: [
                "Very Very Beautiful modern Impressionism Painting of a NIANTAAXZ with background a fractal garden and flowers by Pablo Picasso , octane render Blur , Greyscale",
                "Very Very Beautiful modern Dadaism Painting of a Unisex NIANTAAXZ with background a fractal garden and flowers by Andy Warhol , octane render Blur, Black and white",
                "Very Very Beautiful modern Drip Painting of a Unisex NIANTAAXZ with background a fractal garden and flowers by Pablo Picasso , octane render Blur, colorful",
                "Very Very Beautiful modern Expressionism Painting of a Unisex NIANTAAXZ with background a fractal garden and flowers by Georgia O'Keeffe , octane render Blur, Greyscale",
                "Good Looking modern Abstract Painting of a NIANTAAXZ with background a fractal garden by Édouard Manet , octane render, Greyscale"
            ],
            imageLoading: false,
            loading_text: "init",

            percent: 0,
            circumference: 339.292,
            loading: true,
            intervalId: null,
            num: -1,
            clock: undefined,
            sdForm: {
                denoising_strength: 0.65,
                // 使用的模型ID
                // 提示词
                //prompt: "",
                //生成的图片数量
                batch_size: 4,
                width: 512,
                seed: "-1",
                height: "512",
                track_id: uuidv4(),
                cfg_scale: 10,
                restore_faces: true,
                num_inference_steps: "60",
                init_images: []
            },
        }
    },
    created() {
        this.request()
        this.addNum()
    },
    mounted() {
        this.intervalId = setInterval(() => {
            this.percent += 1;
            if (this.percent > 100) {
                clearInterval(this.intervalId);
            }
            // this.updateCircle();
        }, 1000);
    },
    methods: {
        updateCircle() {
            const offset = this.circumference - (this.percent / 100) * this.circumference;
            const circle = this.$el.querySelector('.circle');
            circle.style.strokeDashoffset = offset;
        },
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
            this.sdForm.prompt = this.prompt[Math.floor(Math.random() * 5) + 1]
            request.post("/sdapi/v1/img2img", this.sdForm).then(res => {
                let images = res.data.images
                window.sessionStorage.setItem("images", JSON.stringify(images))
                this.$router.push('/result')
                // eslint-disable-next-line no-unused-vars
            }).catch((err) => {
                console.log(err)
                // this.$message.error("Connection timeout.......")
                // this.$router.push("/")
            })
        },


    }
}
</script>

<style scoped>
.main {
    background-image: url("../assets/clockclock.gif");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 100vh;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    /*align-items: center;*/
}


img {
    text-align: center;
    width: 300px;
    height: 300px;
}

.text {
    font-family: Lack-Italic, serif;
    width: 600px;
    height: 400px;
    position: absolute;
    left: 51px;
    bottom: 0;
}


</style>