import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login.vue'
import Admin from './views/admin.vue'


Vue.use(Router)

const router = new Router({
    routes: [
        { path: '/admin', component: Admin },
        { path: '/admin/login', component: Login },
    ]
})

router.beforeEach((to, from, next) => {
    if (!to.path.startsWith('/admin')) return next();
    if (to.path === '/admin/login') return next();
    const token = window.sessionStorage.getItem('token')
    if (!token) return next('/admin/login')
    next()
})

export default router