import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/RankPage.vue'
import Tag from '../views/TagPage.vue'
import Mes from '../views/MessagePage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/tags',
    name: 'tags',
    component: Tag
  },
  {
    path: '/message',
    name: 'message',
    component: Mes
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
