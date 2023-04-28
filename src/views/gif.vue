<template>
    <div class="main">
        <img src="../assets/no_start.gif" alt="">
    </div>
</template>

<script>
export default {
    name: "gif",
    created() {
        let time = 4
        let clock = window.setInterval(() => {
            time--;
            if (time < 0) {
                window.clearInterval(clock);
                this.$router.push("/welcome")
            }
        }, 1000);
    }
}
</script>

<style scoped>
* {
    background-color: #000000;
    padding: 0;
    margin: 0;
}

.main {
    width: 100%;
    height: 100vh;
}

img {
    cursor: pointer;
    width: 100%;
    height: 99vh;
}
</style>