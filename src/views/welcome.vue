<template xmlns="http://www.w3.org/1999/html">
    <div>
        <header>
            <div class="main">
            </div>
            <div class="title">
                <h1><span style="color: crimson;">My</span> Homepage</h1>
                <br />
                <br />
                <br />
                <h2 @click="$router.push('/init')" style="color: #FFFFFF;text-align: center;cursor: pointer">Start taking pictures</h2>
            </div>
        </header>

    </div>
</template>

<script>
export default {
    name: "welcome"
}
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
    font-family: "楷体";
}

header {
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.pexels.com/photos/1083822/pexels-photo-1083822.jpeg?cs=srgb&dl=pexels-lisa-1083822.jpg&fm=jpg);
    height: 100vh;
    background-size: cover;
    background-position: center;
}

ul {
    float: right;
    list-style-type: none;
    margin: 15px;
}

ul li {
    display: inline-block;
}

ul li a {
    text-decoration: none;
    color: #fff;
    padding: 5px 20px;
    border: 1px solid transparent;
    transition: .6s ease;
    border-radius: 20px;
}

ul li a:hover {
    background-color: #fff;
    color: #000;
}

ul li.active a {
    background-color: #fff;
    color: #000;
}

.title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.title h1 {
    color: #fff;
    font-size: 70px;
    font-family: Century Gothic;
}
</style>