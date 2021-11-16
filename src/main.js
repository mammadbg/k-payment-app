import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import '@/assets/fonts.css';
import '@/assets/mdi.css';
import EventBus from "@/config/eventBus";

import VueTheMask from 'vue-the-mask';
Vue.use(VueTheMask);

Vue.prototype.$eventHub = EventBus;
Vue.config.productionTip = false;



new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app');

import '@/styles/main.scss';