import { defineAbility } from '@casl/ability';
import store from './store'

export default defineAbility((can, cannot) => {

  let permissions = store.state.permissions;
<<<<<<< Updated upstream
  // console.log('test',permissions);
  if (permissions) {

    permissions.map(function (item) {
      let permission = item.split(" ");
      can(permission[0], permission[1]);
    });
  }
=======
  if(permissions && permissions.length) {
    permissions.map(function(item) {
      let permission = item.split(" ");
     can(permission[0], permission[1]);
   });
  }

>>>>>>> Stashed changes
  // can('manage', 'designation');
  // can('delete', 'designation');
  // cannot('delete', 'User');
});
