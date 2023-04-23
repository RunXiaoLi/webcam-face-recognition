import Vue from 'vue'
import VueRouter from 'vue-router'
import request from '../views/request'
import init from '../views/init'
import result from '../views/result.vue'
import welcome from '../views/welcome.vue'
import confirm from '../views/confirm.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: "/init",
        component: init
    },
    {
        path: "/confirm",
        component: confirm
    },
    {
        path: "/",
        component: welcome
    },
    {
        path: "/request",
        component: request
    },
    {
        path: "/result",
        component: result
    }
]

const router = new VueRouter({
    routes
})

export default router
