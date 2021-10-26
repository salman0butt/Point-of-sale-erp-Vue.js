// import { defineAbility } from '@casl/ability';
import store from './store'

// export default defineAbility((can, cannot) => {

//   const permissions = store.getters.getPermissions ?? [];

//   console.log('perm',permissions);
//   if (permissions) {
//     permissions.map(function (item) {
//       let permission = item.split(" ");
//       can(permission[0], permission[1]);
//     });
//   }
//   // can('manage', 'designation');
//   // cannot('delete', 'User');
// });
// Or
import { AbilityBuilder, Ability } from '@casl/ability'

export default function defineAbilityFor() {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  const permissions = store.getters.getPermissions ?? [];
  // const permissions = ['create branches'];
  console.log('perm',permissions);
  if (permissions) {
    permissions.map(function (item) {
      let permission = item.split(" ");
      can(permission[0], permission[1]);
    });
  }

  return build();
}
