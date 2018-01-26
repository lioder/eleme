import Vue from 'vue'
import goods from 'components/goods/goods.vue'
import seller from 'components/seller/seller.vue'
import ratings from 'components/ratings/ratings.vue'

import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {path: '/goods', component: goods},
  {path: '/ratings', component: ratings},
  {path: '/seller', component: seller}
]
export default new VueRouter({
  routes,
  linkActiveClass: 'active'
})
