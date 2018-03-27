import Vue from 'vue'
import Router from 'vue-router'
import WelcomeView from '@/views/WelcomeView'
import Printers from '@/views/Printers'
import InspireView from '@/views/InspireView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome-view',
      component: WelcomeView
    },
    {
      path: '/printers',
      name: 'printers',
      component: Printers
    },
    {
      path: '/inspire',
      name: 'inspire',
      component: InspireView
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
