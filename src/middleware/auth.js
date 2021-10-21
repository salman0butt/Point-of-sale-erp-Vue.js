import store from '../store'

const auth = (to, from, next) => {
  if (!store.getters.isLoggedIn) {
    next('/login');
    return;
  }
  console.log('auth', store.state.permissions);

  next();
}


export default auth;
