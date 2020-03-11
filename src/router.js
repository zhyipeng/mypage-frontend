import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login.vue'
import Admin from './views/admin.vue'
import Overview from './views/overview.vue'
import PostList from './components/post/postList.vue'
import CreatePost from './components/post/create.vue'


Vue.use(Router)

const router = new Router({
    routes: [{
            path: '/admin',
            component: Admin,
            redirect: '/admin/overview',
            children: [
                { path: '/admin/overview', component: Overview },
                { path: '/admin/posts', component: PostList },
                { path: '/admin/posts/create', component: CreatePost },
            ]
        },
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