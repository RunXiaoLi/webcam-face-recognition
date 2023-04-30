<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>

export default {
    name: 'Recognize',
    data() {
        return {}
    },

}
</script>

<style>
@font-face  {
    font-family: 'Lack-Line-Regular';
    src: url("assets/font/Lack-Line-Regular.otf") format('truetype');
}

@font-face  {
    font-family: 'Lack-Italic';
    src: url("assets/font/Lack-Italic.otf") format('truetype');
}
* {
    margin: 0;
    padding: 0;
}
#app{
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
}
</style>