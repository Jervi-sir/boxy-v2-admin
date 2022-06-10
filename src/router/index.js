import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListAccount from '../views/ListAccount.vue'
import AddAccount from '../views/AddAccount.vue'
import ShowAccount from '../views/ShowAccount.vue'
import LoginView from '../views/LoginView.vue'
import credentials from '../api/authentication'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/list',
    name: 'list',
    component: ListAccount,
    meta: {
        requiresAuth: true
    }
  },
  {
    path: '/add',
    name: 'add',
    component: AddAccount,
    meta: {
        requiresAuth: true
    }
  },
  {
    path: '/show/:id',
    name: 'show',
    component: ShowAccount,
    meta: {
        requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

console.log("aaaa"  + credentials);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  var authenticatedUser = null;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  var saveCredentialsInSession = sessionStorage.getItem('authenticated');
  
  authenticatedUser = credentials == saveCredentialsInSession ? true : false

  if (requiresAuth && ! authenticatedUser) next('login')
  else next();
  
});

export default router;
