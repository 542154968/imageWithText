import Vue from 'vue'
import Router from 'vue-router'
import list from '@/components/list/index'
import renderImg from '@/components/renderImg/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'list',
      component: list
    },
    {
      path: '/render',
      component: renderImg,
      name: 'render'
    }
  ]
})
