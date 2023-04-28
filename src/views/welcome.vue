<template xmlns="http://www.w3.org/1999/html">
    <div class="main">
        <img @click="$router.push('/init')"  src="../assets/e971d4dbe2f89ee4ddf6ce32838c2c2.png" alt="">
    </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
    name: "welcome"
}
</script>

<style scoped>
* {
    background-color: #000000;
    padding: 0;
    margin: 0;
}
.main{
    width: 100%;
    height: 100vh;
}
img{
    cursor: pointer;
    width: 100%;
    height: 99vh;
}
</style>