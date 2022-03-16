import menu from './partials/menu.json';
import table from './partials/table.json';
import general from './partials/general.json';
import brands from './partials/catalogs/brands.json';
import categories from './partials/catalogs/category.json';
import products from './partials/catalogs/products.json';
import payments from './partials/sales/payments.json';

export default {
  ...menu,
  ...brands,
  ...table,
  ...general,
  ...categories,
  ...products,
  ...payments,
}
