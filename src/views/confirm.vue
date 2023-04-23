<template>
    <div class="main">
        <div class="img">
            <img :src="image" alt="image"/>
        </div>
        <div class="button">
            <span style="display:block">image captured</span>
        </div>
    </div>

</template>

<script>
export default {
    name: "confirm",
    data() {
        return {
            image: undefined
        }
    },
    created() {
        this.image = window.localStorage.getItem("img")
    }
}
</script>

<style scoped>
.main {
    width: 100%;
    height: 100vh;
    background-color: #000000;
    color: #FFFFFF;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;

}

.img {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 512px;
    height: 512px;
    text-align: center;
}

img{
    width: 512px;
    height: 512px;
}
.button {
    margin-top: 20px;
}
</style>