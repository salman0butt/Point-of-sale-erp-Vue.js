<template>
  <div>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Item Details</th>
          <th scope="col">Account</th>
          <th scope="col">Quantity</th>
          <th scope="col">Rate</th>
          <th scope="col">Tax</th>
          <th scope="col">Amount</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody v-if="form.items && form.items.length > 0">
        <tr v-for="(item, k) in form.items" :key="k">
          <th style="position: relative">
            <!-- <CInput
              placeholder="Products"
              v-model="item.name"
              @input="searchProduct(k)"
              required
            /><br />
            <ul
              v-if="item.options.products && item.options.products.length > 0"
              class="search-content"
            >
              <li
                v-for="(i, key) in item.options.products"
                :key="key"
                @click="addOptions(i, k)"
              >
                {{ i.label }}
              </li>
            </ul> -->
            <ProductSearchSelect
              ref="selectProduct"
              @product-change="updateProductSearch($event, k)"
              @add-new="addItem()"
              :previousValue="
                item && item.uuid && item.name && item.qty
                  ? {
                      value: item.uuid,
                      label: item.name,
                      type: 'product',
                    }
                  : {}
              "
            />
          </th>
          <td>
            <!-- <CSelect
                                :options="options.accounts"
                                :value.sync="item.account"
                                required
                              /> -->
            <AccountDropdown
              :showLabel="false"
              @getAccountDropdown="getAccountDropDown($event, k)"
              :previousValue.sync="item.previousAccount"
              :key="k"
            />
          </td>
          <td>
            <CInput
              type="number"
              placeholder="0"
              v-model="item.qty"
              min="1"
              step="any"
              style="width: 100px"
              required
              @change="calculateAmount(k)"
            />
          </td>
          <td>
            <CInput
              type="number"
              placeholder="0.00"
              v-model="item.rate"
              step="any"
              style="width: 100px"
              required
              @change="calculateAmount(k)"
            />
          </td>
          <td>
            <CSelect
              :options="options.taxes"
              :value.sync="item.tax"
              @change="calculateAmount(k)"
            />
          </td>
          <td>
            <CInput
              type="number"
              placeholder="0.00"
              v-model="item.amount"
              step="any"
              style="width: 100px"
              required
              @change="updateAmount()"
            />
          </td>
          <td>
            <CButton @click="removeItem(k)">
              <CIcon :content="$options.cilTrash" style="color: red" />
            </CButton>
          </td>
        </tr>
      </tbody>
      <tfoot v-else>
        <tr>
          <td colspan="7">
            <p class="text-center">No items added</p>
          </td>
        </tr>
      </tfoot>
    </table>
    <CButton progress timeout="2000" color="default" @click="addItem()"
      >Add another line <CIcon :content="$options.cisCaretBottom" style="width: 10px"
    /></CButton>
  </div>
</template>

<script>
// import Multiselect from "vue-multiselect";
import AccountDropdown from "@/components/general/AccountDropdown.vue";
import PurchaseService from "@/services/accounting/purchaseOrder/PurchaseOrderServices";
// import ReceivingService from "@/services/receivings/ReceivingService";
import { cilTrash, cisCaretBottom, cisFile } from "@coreui/icons-pro";
import ProductSearchSelect from "@/components/general/search/ProductSearchSelect.vue";

export default {
  name: "ProductSearch",
  components: { AccountDropdown, ProductSearchSelect },
  props: {
    previousValue: {
      type: Array,
      default: () => [],
    },
  },
  cilTrash,
  cisCaretBottom,
  cisFile,
  data: () => ({
    form: {
      product_id: "",
      subTotal: "",
      total_tax: 0,
      items: [
        {
          uuid: "",
          name: "",
          // type: "",
          account: "",
          previousAccount: {},
          qty: "",
          rate: "",
          tax: "",
          amount: "",
          options: {
            products: [],
          },
        },
      ],
    },
    products_list: [],
    options: {
      taxes: [{ value: "", label: "Choose Tax" }],
    },
  }),
  computed: {},
  created() {
    this.getTaxes();
  },
  watch: {
    previousValue: {
      handler: function (val) {
        if (val) {
          // console.log(val);
          this.form.items = val;
        }
      },
      deep: true,
    },
  },
  methods: {
    addItem() {
      this.form.items.push({
        uuid: "",
        name: "",
        // type: "",
        account: "",
        previousAccount: {},
        qty: "",
        rate: "",
        tax: "",
        amount: "",
        options: {
          products: [],
        },
      });

      let last_index = this.form.items.length - 1;
      this.$nextTick(() => {
        this.$refs.selectProduct[last_index].open();
      });

      // this.form.items.push({
      //   uuid: "",
      //   name: "",
      //   // type: "",
      //   account: "",
      //   previousAccount: {},
      //   qty: "",
      //   rate: "",
      //   tax: "",
      //   amount: "",
      //   options: {
      //     products: [],
      //   },
      // });
      // let last_index = this.form.items.length - 1;
      // this.$nextTick(() => {
      //   this.$refs.selectProduct[last_index].open();
      // });
    },
    removeItem(index) {
      this.form.items.splice(index, 1);
      this.updateAmount();
    },
    getAccountDropDown(val, key) {
      this.form.items[key].account = val.value;
    },
    // searchProduct(k) {
    //   if (!this.form.items[k].name) {
    //     this.resetSearch();
    //     return;
    //   }
    //   this.products_list = [];
    //   this.unit_form = [];
    //   ReceivingService.searchProduct(this.form.items[k].name)
    //     .then(({ data }) => {
    //       if (data !== undefined && data !== "") {
    //         this.form.items[k].options.products = [];
    //         data.map((product) => {
    //           if (product) {
    //             if (product.quantity_units && product.quantity_units.length > 0) {
    //               product.quantity_units.map((unit) => {
    //                 if (product.variations && product.variations.length > 0) {
    //                   this.form.items[k].options.products.push({
    //                     value: product.uuid,
    //                     type: "variation",
    //                     label: `${product.name} (Unit: ${unit.name} | Qty: ${unit.qty})`,
    //                     is_unit: true,
    //                     unit_id: unit.uuid,
    //                     unit_qty: unit.qty ?? 1,
    //                     unit_cost_price: unit.price?.cost_price,
    //                     unit_selling_price: unit.price?.selling_price_without_tax,
    //                   });
    //                 } else {
    //                   this.form.items[k].options.products.push({
    //                     value: product.uuid,
    //                     type: "product",
    //                     label: `${product.name} (Unit: ${unit.name} | Qty: ${unit.qty})`,
    //                     is_unit: true,
    //                     unit_id: unit.uuid,
    //                     unit_qty: unit.qty ?? 1,
    //                     unit_cost_price: unit.price?.cost_price,
    //                     unit_selling_price: unit.price?.selling_price_without_tax,
    //                   });
    //                 }
    //               });
    //             }
    //             if (product.variations && product.variations.length > 0) {
    //               product.variations.map((variation) => {
    //                 this.form.items[k].options.products.push({
    //                   value: variation.uuid,
    //                   type: "variation",
    //                   label: `${product.name} (Variation: ${
    //                     JSON.parse(variation.name)?.en
    //                   } | Stock:  ${
    //                     variation.inventory && variation.inventory.length
    //                       ? variation.inventory[0]?.current_quantity
    //                       : 0
    //                   })`,
    //                 });
    //               });
    //             } else {
    //               this.form.items[k].options.products.push({
    //                 value: product.uuid,
    //                 type: "product",
    //                 label: `${product.name} (Stock:  ${
    //                   product.inventory && product.inventory.length
    //                     ? product.inventory[0]?.current_quantity
    //                     : 0
    //                 })`,
    //               });
    //             }

    //             this.products_list.push({ ...product });
    //           }
    //         });
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
    // addOptions(item, k) {
    //   this.form.product_id = item.value;
    //   let option = item;
    //   if (
    //     !["", undefined].includes(option.is_unit) &&
    //     !["", undefined].includes(option.unit_id)
    //   ) {
    //     if (this.products_list && this.products_list.length > 0) {
    //       this.products_list.find((product) => {
    //         if (option.type === "product") {
    //           this.pro_unit = true;
    //           this.addProduct(option);
    //         }
    //       });
    //     }
    //   } else {
    //     if (option.type === "product") {
    //       this.addProduct({}, k);
    //     }
    //   }
    // },
    // addProduct(option = {}, k = null) {
    //   if (this.form.product_id !== "" && this.form.product_id !== undefined) {
    //     let product = this.products_list.find(
    //       (product) => product.uuid === this.form.product_id
    //     );

    //     if (Object.keys(option).length === 0 && option.constructor === Object) {
    //       Object.assign(option, { unit_qty: 1 });
    //       if (product.price) {
    //         Object.assign(option, {
    //           unit_cost_price: product.price.cost_price,
    //         });
    //         Object.assign(option, {
    //           unit_selling_price: product.price.selling_price_without_tax,
    //         });
    //         Object.assign(option, {
    //           tax_price:
    //             parseFloat(product.price.selling_price_without_tax) *
    //             (parseFloat(product.price.tax.percentage) / 100),
    //         });
    //       }
    //     }

    //     if (k !== null) {
    //       let item = this.form.items[k];
    //       item.uuid = product.uuid;
    //       // item.type = "product";
    //       item.name = product.name;
    //       item.account = Object;
    //       item.rate = option.unit_cost_price;
    //       item.qty = option.unit_qty;
    //       item.amount = "";
    //     }

    //     this.calculateAmount(k);
    //     this.resetSearch();
    //   }
    // },
    calculateAllItems() {
      this.form.items.map((item, key) => {
        this.calculateAmount(key);
      });
    },
    calculateAmount(k) {
      let amount = 0;
      if (this.form.items[k].qty && this.form.items[k].rate) {
        amount = parseFloat(this.form.items[k].qty) * parseFloat(this.form.items[k].rate);
        // calculate tax
        // if (this.form.items[k].tax) {
        //   let tax = this.options.taxes.find(
        //     (tax) => tax.value === this.form.items[k].tax
        //   );
        //   if (tax) {
        //     amount = amount + amount * (parseFloat(tax.percentage) / 100);
        //   }
        // }
        this.form.items[k].amount = amount;
      }
      this.calculateTotalTax();
      this.updateAmount();
      // this.$forceUpdate();

      // this.calculateTotalAmount();
    },
    calculateTotalTax() {
      let total_tax = 0;
      this.form.items.map((item) => {
        if (item.tax && this.options.taxes) {
          this.options.taxes.find((tax) => {
            if (tax.value == item.tax) {
              total_tax += item.amount * (tax.percentage / 100);
            }
          });
        }
      });
      this.form.total_tax = total_tax.toFixed(3) ?? 0;
    },
    updateAmount() {
      let sub_total = 0;
      this.form.items.map((item) => {
        if (item.amount) {
          sub_total = sub_total + parseFloat(item.amount);
        }
      });
      this.form.subTotal = sub_total;
      if (this.form.subTotal) {
        this.$emit("update-items", {
          items: this.form.items,
          sub_total: this.form.subTotal,
          total_tax: this.form.total_tax,
        });
      }
    },
    updateProductSearch(data, k) {
      if (data) {
        // console.log(data);
        const { product } = data;
        if (data.searchType === "product") {
          let item = this.form.items[k];
          item.uuid = product.uuid;
          (item.name = product.name + " (serial: " + product.serial_number + ")"),
            (item.account = Object);
          item.rate = product.price?.cost_price;
          item.qty = 1;
          item.amount = product.price?.cost_price * item.qty;
        } else if (data.searchType === "empty") {
          let item = this.form.items[k];
          item.uuid = "";
          item.name = data.label;
          item.account = Object;
          item.rate = 0;
          item.qty = 1;
          item.amount = "";
        }
      }
      this.calculateTotalTax();
      this.calculateAllItems();
      this.updateAmount();
    },
    getTaxes() {
      this.$store.commit("set_loader");
      PurchaseService.getAllTaxes()
        .then(({ data }) => {
          if (data && data.data) {
            let taxes = this.options.taxes;
            data.data.forEach((tax) => {
              taxes.push({
                value: tax.uuid,
                label: tax.name,
                percentage: tax.percentage,
              });
            });

            this.$store.commit("close_loader");
          }
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("close_loader");
        });
    },
    resetSearch() {
      this.form.product_id = "";
      // this.search = "";
      this.form.items.map((item) => {
        item.options.products = [];
      });
      // this.options.products = [];
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.ra {
  align-items: baseline;
}
.search-content {
  position: absolute;
  width: 94%;
  top: 3rem;
  background-color: #fff !important;
  z-index: 99;
  padding: 10px 20px;
  -webkit-box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  cursor: pointer;
  font-weight: 600;
}
.search-content li {
  list-style-type: none;
  padding: 5px 0;
  border-bottom: 1px solid #80808045;
}
span#basic-addon2 {
  margin-top: 1.8rem !important;
}
.del-btn {
  background: transparent;
  height: fit-content;
  margin-top: 2rem;
}
</style>
