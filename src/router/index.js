import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [{
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [{
            path: '/redirect/:path*',
            component: () =>
                import ('@/views/redirect/index')
        }]
    },
    {
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },
    {
        path: '/auth-redirect',
        component: () =>
            import ('@/views/login/auth-redirect'),
        hidden: true
    },
    {
        path: '/404',
        component: () =>
            import ('@/views/error-page/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () =>
            import ('@/views/error-page/401'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            component: () =>
                import ('@/views/dashboard/index'),
            name: 'Dashboard',
            meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
        }]
    }
]

export const asyncRoutes = [{
        path: '/book',
        name: 'book',
        component: Layout,
        redirect: '/book/create',
        meta: { title: '图书管理', icon: 'education', roles: ['admin', 'editor'] },
        children: [{
                name: 'bookCreate',
                path: '/book/create',
                component: () =>
                    import ('@/views/book/create'),
                meta: { title: '图书上传', icon: 'edit', roles: ['admin'] }
            },
            {
                name: 'bookEdit',
                path: '/book/edit',
                component: () =>
                    import ('@/views/book/edit'),
                hidden: true,
                meta: { title: 'edit book', icon: 'edit', roles: ['admin', 'editor'], activeMenu: '/book/list' }
            },
            {
                name: 'bookList',
                path: '/book/list',
                component: () =>
                    import ('@/views/book/list'),
                meta: { title: '图书列表', icon: 'list', roles: ['admin', 'editor'] }
            }
        ]

    },
    // {
    //     path: '/nfts',
    //     name: 'nfts',
    //     component: Layout,
    //     redirect: '/nfts/list',
    //     meta: { title: '我的NFTs', icon: 'documentation', roles: ['admin', 'editor'] },
    //     children: [{
    //         name: 'NFTs',
    //         path: '/nfts/list',
    //         // component: () =>
    //         //     import ('@/nfts/list'),
    //         meta: { title: '我的NFTs', icon: 'edit', roles: ['admin'] }
    //     }]

    // },
    {
        path: '/nfts',
        component: Layout,
        children: [{
            path: 'list',
            component: () =>
                import ('@/views/nfts/list'),
            name: 'nfts',
            meta: { title: '我的NFTs', icon: 'list', noCache: true }
        }]
    },
    {
        path: '/shares',
        component: Layout,
        children: [{
            path: 'list',
            component: () =>
                import ('@/views/share/list'),
            name: 'shares',
            meta: { title: '我的分享', icon: 'guide', noCache: true, roles: ['admin', 'editor'] }
        }]
    },
    // {
    //     path: '/share',
    //     name: 'MyShare',
    //     component: Layout,
    //     redirect: '/nft/create',
    //     meta: { title: '我的分享', icon: 'documentation', roles: ['admin', 'editor'] }

    // },
    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router