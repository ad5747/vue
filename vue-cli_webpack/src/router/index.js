import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/index'
import Bootstrap from '@/components/bootstrap'
import axios from '@/components/axios'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      component: Index

    },
    {
      path: '/bootstrap',
      component: Bootstrap

    },
    {
      path: '/axios',
      component: axios

    }
  ]
})
