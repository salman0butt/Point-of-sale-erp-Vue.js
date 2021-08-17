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
  errors: []
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
  remove_errors(state) {
    state.errors = [];
  }
}

const actions = {
  login({commit}, user){
    return new Promise((resolve, reject) => {
      commit('remove_errors');
      http.post('/auth/login', user).then(res => {
        const token = res.data.token;
        localStorage.setItem('token', token);
        http.defaults.headers.common['Authorization'] = token;
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
  return new Promise((resolve) => {
    commit('logout');
    localStorage.clear();
    delete http.defaults.headers.common['Authorization'];
    resolve();
  })
},
set_errors({commit}, errorMsg){
  return new Promise((resolve) => {
    commit('post_errors', errorMsg);
    resolve();
  });
}
}
const getters = {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,
  errors: state => state.errors,
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
