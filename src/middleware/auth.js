import store from '@/store'

const auth = (to, from, next) => {

  if (!store.getters.isLoggedIn) {
    next('/login');
    return;
  }

  next();
}


export default auth;
