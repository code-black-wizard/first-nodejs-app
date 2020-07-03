import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import TasksList from '../views/TasksList'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/tasks-list',
    name: 'TasksList',
    component: TasksList
  }
]

const router = new VueRouter({
  routes,
  linkActiveClass: 'active'
})

export default router
