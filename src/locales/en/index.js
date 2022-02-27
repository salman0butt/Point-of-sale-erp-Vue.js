import menu from './partials/menu';
import table from './partials/table';
import general from './partials/general';
import brands from './partials/catalogs/brands/index';
import categories from './partials/catalogs/category/index';

export default {
  ...menu,
  ...brands,
  ...table,
  ...general,
  ...categories,
}
