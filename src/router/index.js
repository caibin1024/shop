import { createRouter, createWebHistory } from 'vue-router'

const login = () => import('../components/Login.vue')
const home = () => import('../components/Home.vue')
const welcome = () => import('../components/Welcome.vue')
const users = () => import('../components/user/Users.vue')
const rights = () => import('../components/power/Rights.vue')
const roles = () => import('../components/power/Roles.vue')
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/home',
    name: 'homge',
    component: home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: welcome
      },
      {
        path: '/users',
        name: 'users',
        component: users
      },
      {
        path: '/rights',
        name: 'rights',
        component: rights
      },
      {
        path: '/roles',
        name: 'roles',
        component: roles
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})
export default router
