import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import pagePolychromatic from "./PagePolychromatic.vue"
import pageJeu from "./PageJeu.vue"
import bibliography from  "./bibliography.vue"
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),

  },
  {
    path: '/bichromatic',
    name: 'bichromatic',
    component: pagePolychromatic,

  },
  {
    path:'/jeu',
    name: 'jeu',
    component:pageJeu,

  },
  {
    path:'/bibliography',
    name: 'bibliography',
    component:bibliography,

  }
]

const router = new VueRouter({
  routes
});


export default router
