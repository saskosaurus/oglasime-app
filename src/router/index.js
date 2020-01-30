import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Posts from '../views/Posts.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '/',
        name: 'posts',
        component: Posts,
      },
      {
        path: 'novioglas',
        name: 'novioglas',
        component: () => import(/* webpackChunkName: "novioglas" */ '../views/NoviOglas.vue')
      },
      {
        path: 'oglas/:id',
        props: true,
        name: 'oglas-detalji',
        component: () => import(/* webpackChunkName: "oglas-detail" */ '../views/OglasDetalji.vue')
      }
    ]
  },
  {
    path: '/pretrazi',
    name: 'pretrazi',
    component: () => import(/* webpackChunkName: "login" */ '../views/Pretrazi.vue')
  },
  {
    path: '/pretrazizupanije',
    name: 'pretrazizupanije',
    component: () => import(/* webpackChunkName: "login" */ '../views/PretraziZupanije.vue')
  },
  {
    path: '/pretrazidjelatnosti',
    name: 'pretrazidjelatnosti',
    component: () => import(/* webpackChunkName: "login" */ '../views/PretraziDjelatnosti.vue')
  },
  {
    path: '/editprofile',
    name: 'editprofile',
    component: () => import(/* webpackChunkName: "login" */ '../views/EditProfile.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "signup" */ '../views/Signup.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
