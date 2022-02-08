import store from "@/store";
import router from "@/router";

export const mixin = {
  methods: {
    errorHandler: function (status) {
      let path = '';
      switch (status) {
        case 401:
          store.dispatch('auto_logout');
          path = '/login';
        break;
        case 404:
          path = '/not-found';
         break;
        case 500:
          path = '/something-wrong';
        break;
      }
      if(path) {
        router.push(path);
      }
    },
    Can(permission) {
      const permissions = store.getters.getPermissions ?? [];
      if (permissions) {
        return permissions.includes(permission);
      }
      return false;
    }
  }
}
