import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from "firebase/app";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        meta: {layout: "main", auth: true},
        component: () => import('../views/pages-app/Home')
    },
    {
        path: '/login',
        name: "Login",
        meta: {layout: "auth"},
        component: () => import('../views/pages-auth/Login')
    }, {
        path: '/register',
        name: "Register",
        meta: {layout: "auth"},
        component: () => import('../views/pages-auth/Register')
    },
    {
        path: '/history',
        name: 'history',
        meta: {layout: "main", auth: true},

        component: () => import('../views/pages-app/History')
    },
    {
        path: '/detail/:id',
        name: 'detail',
        meta: {layout: "main", auth: true},

        component: () => import('../views/pages-app/Detail')
    },
    {
        path: '/planning',
        name: 'planning',
        meta: {layout: "main", auth: true},

        component: () => import('../views/pages-app/Planning')
    },
    {
        path: '/profile',
        name: 'profile',
        meta: {layout: "main", auth: true},

        component: () => import('../views/pages-app/Profile')
    },
    {
        path: '/record',
        name: 'record',
        meta: {layout: "main", auth: true},

        component: () => import('../views/pages-app/Record')
    },
    {
        path: '/categories',
        name: 'categories',
        meta: {layout: "main", auth: true},

        component: () => import('../views/pages-app/Categories')
    }, {
        path: '/detailrecord',
        name: 'detailrecord',
        meta: {layout: "main", auth: true},

        component: () => import('../views/pages-app/Detail')
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser
    const requireTo = to.matched.some(record => record.meta.auth)
    if (requireTo && !currentUser) {
next('/login?message=login')
    }else {
      next()
    }
})
export default router
