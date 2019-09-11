import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant'
import 'vant/lib/index.css'
import VueRouterApp from '../lib'
Vue.use(Vant)

Vue.config.productionTip = false

Vue.use(VueRouterApp)
const home1 = () => import('./pages/home1.vue')
const home2 = () => import('./pages/home2.vue')
const page1 = () => import('./pages/page1.vue')
const page2 = () => import('./pages/page2.vue')

const router = new VueRouterApp({
  routes: [
    {
      path: '/',
      component: home1,
      meta: {
        pageType: 'tabBar'
      }
    },
    {
      path: '/home2',
      component: home2,
      meta: {
        pageType: 'tabBar'
      }
    },
    {
      path: '/page1',
      component: page1
    },
    {
      path: '/page2',
      component: page2
    }
  ]
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
