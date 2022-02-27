import menu from './partials/menu';
import table from './partials/table';
import general from './partials/general';
import brands from './partials/catalogs/brands/index';

export default {
  ...menu,
  ...brands,
  ...table,
  ...general,
}
