import Vue from 'vue'
import Router from 'vue-router'

// admin
import Login from './views/admin/login.vue'
import Admin from './views/admin/admin.vue'
import Overview from './views/admin/overview.vue'
import Todos from './views/admin/todos.vue'
import TodoLists from './views/admin/todoList.vue'

import PostList from './views/admin/postList.vue'
import CreatePost from './views/admin/create.vue'
import UpdatePost from './views/admin/update.vue'
import TagList from './views/admin/tagList.vue'
import CategoryList from './views/admin/categoryList.vue'

// index
import Index from './views/index/index.vue'
import Posts from './views/index/posts.vue'
import PostDetail from './views/index/detail.vue'
import Archieve from './views/index/archieve.vue'


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
                { path: '/admin/todolists/:id', component: Todos },
                { path: '/admin/todolists', component: TodoLists },
            ]
        },
        { path: '/admin/login', component: Login },
        {
            path: '/',
            component: Index,
            children: [
                { path: '/', component: Posts },
                { path: '/archieve', component: Archieve },
                { path: '/:id', component: PostDetail },
            ]
        },
    ]
})

router.beforeEach((to, from, next) => {
    if (!to.path.startsWith('/admin')) return next();
    if (to.path === '/admin/login') return next();
    const token = window.localStorage.getItem('token')
    if (!token) return next('/admin/login')
    next()
})

export default router