
// layout 布局入口,如有需要请手动切换
import layoutIntrance from '@/layout/sideOuter'
/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutIntrance,
    children: [
      {
        path: 'index',
        name: 'index',
        meta: {
          title: 'index',
          name: '主页',
          icon: 'home',
          noCache: true,
          requiresAuth: true
        },
        component: () => import('@/pages/main/Home.vue')
      },
      {
        path: 'about',
        name: 'about',
        meta: {
          title: 'about',
          name: '关于',
          icon: 'dashboard',
          noCache: true,
          requiresAuth: true
        },
        component: () => import('@/pages/main/About.vue')
      },
      {
        path: '/ua',
        name: 'ua',
        component: () => import('@/pages/main/Ua.vue'),
        meta: {
          title: '浏览器信息',
          name: '浏览器代理',
          icon: 'dashboard',
          noCache: true,
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/system',
    redirect: { name: 'users' },
    component: layoutIntrance,
    children: [
      {
        path: 'users',
        name: 'users',
        meta: {
          title: 'users',
          name: '用户列表',
          icon: 'group',
          noCache: true,
          requiresAuth: true,
          router: '/system/users'
        },
        component: () => import('@/pages/main/system/users/List.vue')
      },
      {
        path: 'roles',
        name: 'roles',
        meta: {
          title: 'roles',
          name: '角色管理',
          icon: 'local_mall',
          noCache: true,
          requiresAuth: true
        },
        component: () => import('@/pages/main/system/role/List.vue')
      },
      {
        path: 'menus',
        name: 'menus',
        meta: {
          title: 'menus',
          name: '菜单管理',
          icon: 'queue_music',
          noCache: true,
          requiresAuth: true
        },
        component: () => import('@/pages/main/system/menu/List.vue')
      }, {
        path: 'apis',
        name: 'apis',
        meta: {
          title: 'apis',
          name: '接口管理',
          icon: 'developer_board',
          noCache: true,
          requiresAuth: true
        },
        component: () => import('@/pages/main/system/api/List.vue')
      }, {
        path: 'notice',
        name: 'notice',
        meta: {
          title: 'notice',
          name: '通知公告',
          icon: 'developer_board',
          noCache: true,
          requiresAuth: true,
          router: '/system/notice'
        },
        component: () => import('@/pages/main/system/notice/List.vue')
      }, {
        path: 'help',
        name: 'help',
        meta: {
          title: 'help',
          name: '帮助中心',
          icon: 'developer_board',
          noCache: true,
          requiresAuth: true
        },
        component: () => import('@/pages/main/system/help/List.vue')
      }, {
        path: 'option',
        name: 'option',
        meta: {
          title: 'option',
          name: '操作日志',
          icon: 'developer_board',
          noCache: true,
          requiresAuth: true
        },
        component: () => import('@/pages/main/system/option/List.vue')
      }, {
        path: 'feedback',
        name: 'feedback',
        meta: {
          title: 'feedback',
          name: '问题反馈',
          icon: 'developer_board',
          noCache: true,
          requiresAuth: true
        },
        component: () => import('@/pages/main/system/feedback/List.vue')
      },
      {
        path: 'message',
        name: 'message',
        meta: {
          title: 'message',
          name: '消息中心',
          icon: 'developer_board',
          noCache: true,
          requiresAuth: true
        },
        component: () => import('@/pages/main/system/message/List.vue')
      }

    ]
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登陆
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'login',
      name: '登陆',
      icon: 'home',
      noCache: true,
      requiresAuth: false
    },
    component: () => import('@/pages/login/Login.vue')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  // 404
  {
    path: '*',
    name: '404',
    meta: { title: '404', name: '404', icon: 'error', noCache: true },
    component: () => import('@/pages/error/404.vue')
  }
]

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
