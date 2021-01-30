import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: () => import(/* webpackChunkName: "welcome" */ '../views/Welcome.vue')
      },
      {
        path: '/userlist',
        component: () => import(/* webpackChunkName: "userlist" */ '../views/user/UserList.vue')
      },
      {
        path: '/fatherlist',
        component: () => import(/* webpackChunkName: "fatherlist" */ '../views/board/FatherList.vue')
      },
      {
        path: '/sonlist',
        component: () => import(/* webpackChunkName: "sonlist" */ '../views/board/SonList.vue')
      },
      {
        path: '/managelist',
        component: () => import(/* webpackChunkName: "managelist" */ '../views/manage/ManageList.vue')
      },
      {
        path: '/system',
        component: () => import(/* webpackChunkName: "system" */ '../views/system/System.vue')
      },
      {
        path: '/contentlist',
        component: () => import(/* webpackChunkName: "contentlist" */ '../views/content/ContentList.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
