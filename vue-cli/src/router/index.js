import Vue from 'vue' // 載入vue
import Router from 'vue-router' // 載入 vue router
import HelloWorld from '@/components/HelloWorld' // 載入專案目錄下components/HelloWorld.vue *@代表專案目錄，設定在webpack中
import Home from '@/components/Home'
import Axios from '@/components/Axios'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/', // 進入點
      name: 'HelloWorld', // 別名
      component: HelloWorld // 載入的元件
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/Axios',
      component: Axios
    }
  ]
})
