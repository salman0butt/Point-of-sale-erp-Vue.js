import Vue from 'vue'
import Vuex from 'vuex'
import http from '../src/http-common'

Vue.use(Vuex)

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false,
  asideShow: false,
  darkMode: false,
  status: '',
  token: localStorage.getItem('token') || '',
  user: {},
  errors: [],
  msgs: [],
  employee_name:"",
  loading: false,
}

const mutations = {
  toggleSidebarDesktop(state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile(state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set(state, [variable, value]) {
    state[variable] = value
  },
  toggle(state, variable) {
    // console.log("llllllllllllllllll", state[variable]);
    state[variable] = !state[variable]
  },
  auth_success(state, token){
    state.status = 'success'
    state.token = token
  },
  auth_error(state){
    state.status = 'error'
  },
  logout(state){
    state.status = ''
    state.token = ''
  },
  post_errors(state, errors) {
    state.errors.push(errors);
  },
  post_msgs(state, msg) {
    state.msgs.push(msg);
  },
  remove_errors(state) {
    state.errors = [];
  },
  remove_msgs(state) {
    state.msgs = [];
  },
  set_employee_name(state, name) {
    state.employee_name = name;
  },
  set_loader(state) {
    state.loading = true;
  },
  close_loader(state) {
    state.loading = false;
  }
}

const actions = {
  login({commit}, user){
    return new Promise((resolve, reject) => {
      commit('remove_errors');
        http.post('/auth/login', user).then(res => {
          const token = res.data.token;
          const business_id = res.data.business_id;
          localStorage.setItem('token', token);
          localStorage.setItem('business_id', business_id);
          localStorage.setItem('employee_id', res.data.employee_id);
          http.defaults.headers.common['Authorization'] = "Bearer "+token;
          commit('auth_success', token);
          resolve(res);
        }).catch(err => {
          commit('auth_error');
          localStorage.removeItem('token');
          reject(err);
        });

    })
},
logout({commit}){
  return new Promise((resolve, reject) => {
    commit('logout');
    http.post('/auth/logout').then((res) => {
    localStorage.clear();
    delete http.defaults.headers.common['Authorization'];
    resolve(res);
    }).catch((err) => {
      reject(err);
        // console.log(err);
    });
    resolve();
  })
},
auto_logout({commit}){
  return new Promise((resolve) => {
    commit('logout');
    localStorage.clear();
    resolve();
  })
},
set_errors({commit}, errorMsg){
  return new Promise((resolve) => {
    commit('post_errors', errorMsg);
    resolve();
  });
},
deleteAttachment({commit}, uuid){
  return new Promise((resolve, reject) => {
      http.delete('/attachments/'+uuid).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      });
  })
},

}
const getters = {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,
  errors: state => state.errors,
  msgs: state => state.msgs,
  get_employee_name: state => state.employee_name,
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
