import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListAccount from '../views/ListAccount.vue'
import AddAccount from '../views/AddAccount.vue'
import EditAccount from '../views/EditAccount.vue'
import DeleteAccount from '../views/DeleteAccount.vue'
import ShowAccount from '../views/ShowAccount.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/list',
    name: 'list',
    component: ListAccount
  },
  {
    path: '/add',
    name: 'add',
    component: AddAccount
  },
  {
    path: '/edit',
    name: 'edit',
    component: EditAccount
  },
  {
    path: '/show/:id',
    name: 'show',
    component: ShowAccount
  },
  
  {
    path: '/delete',
    name: 'delete',
    component: DeleteAccount
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
