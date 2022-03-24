import 'core-js/stable'
import Vue from 'vue'
//import CoreuiVuePro from '@coreui/vue-pro'
import CoreuiVuePro from '../node_modules/@coreui/vue-pro/src/index.js'
import "regenerator-runtime/runtime.js";
import App from './App'
import router from './router/index'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'
import i18n from './i18n.js'
// import axios from 'axios'
import http from '../src/http-common';
import Swal from "sweetalert2";
import Vuelidate from 'vuelidate'
import { mixin } from './mixins/mixin';
import Skeleton from 'vue-loading-skeleton';
import { ColorPicker, ColorPanel } from 'one-colorpicker'
import VueHtmlToPaper from 'vue-html-to-paper';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const { errorHandler, Can } = mixin.methods;

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css'
  ],
  timeout: 1000, // default timeout before the print window appears
  autoClose: true, // if false, the window will not close after printing
  windowTitle: window.document.title, // override the window title
}

Vue.use(VueHtmlToPaper, options);
Vue.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true
});

Vue.use(ColorPanel)
Vue.use(ColorPicker)
// import { abilitiesPlugin } from '@casl/vue';
// import defineAbilityFor from './defineAbility'

// Vue.use(abilitiesPlugin, defineAbilityFor());

Vue.use(Skeleton)
Vue.use(Vuelidate);
Vue.use(CoreuiVuePro);
Vue.prototype.$log = console.log.bind(console);
Vue.prototype.$swal = Swal;
Vue.prototype.$http = http;
// Vue.prototype.$ability = defineAbility;
Vue.prototype.$can = Can;

const token = 'Bearer ' + localStorage.getItem('token');
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}

http.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  let routerPath = router.app?._router?.history?.current.path !== '/login';
  if (error && error.response && routerPath) {
    errorHandler(error.response.status);
  }

  return Promise.reject(error);
});

Vue.config.errorHandler = err => {
  console.error('Exception: ', err)
}

new Vue({
  el: '#app',
  mixins: [mixin],
  router,
  store,
  //CIcon component documentation: https://coreui.io/vue/docs/components/icon
  icons,
  i18n,
  template: '<App/>',
  components: {
    App
  }
})

