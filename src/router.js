import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login.vue'
import Admin from './views/admin.vue'
import Overview from './views/overview.vue'
import PostList from './components/post/postList.vue'
import CreatePost from './components/post/create.vue'
import UpdatePost from './components/post/update.vue'
import TagList from './components/post/tagList.vue'
import CategoryList from './components/post/categoryList.vue'
import Index from './views/index.vue'
import Posts from './views/posts.vue'
import PostDetail from './views/detail.vue'


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
                { path: '/admin/posts/update/:id', component: UpdatePost },
                { path: '/admin/tags', component: TagList },
                { path: '/admin/categories', component: CategoryList },
            ]
        },
        { path: '/admin/login', component: Login },
        {
            path: '/',
            component: Index,
            children: [
                { path: '/', component: Posts },
                { path: '/:id', component: PostDetail },
            ]
        },
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