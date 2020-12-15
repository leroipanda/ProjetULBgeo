import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
//import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-load
import router from './router'

Vue.config.productionTip = false;


new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app');




Vue.use(vuetify as any, {
  iconfont: 'md'
});
