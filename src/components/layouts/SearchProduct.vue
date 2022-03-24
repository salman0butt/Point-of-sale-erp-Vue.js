<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CRow>
          <CCol sm="12" md="12" class="pt-2">
            <CInput
              label="Products"
              v-model="search"
              @input="searchProduct()"
              placeholder="Search..."
            /><br />
            <ul
              v-if="options.products && options.products.length > 0"
              class="search-content"
            >
              <li
                v-for="(item, key) in options.products"
                :key="key"
                @click="addOptions(item)"
              >
                {{ item.label }}
              </li>
            </ul>
          </CCol>
        </CRow>
        <hr v-if="form.items && form.items.length > 0" />
        <CRow
          v-if="
            searchType == 'receivings' && form.items && form.items.length > 0
          "
        >
          <CCol sm="12" md="12" class="pt-2">
            <div class="form-group" v-for="(input, k) in form.items" :key="k">
              <CRow>
                <CInput
                  label="Product"
                  class="col-md-3"
                  :value.sync="input.name"
                />
                <CInput
                  label="Qty"
                  class="col-md-2"
                  type="number"
                  placeholder="0"
                  step="any"
                  v-model="input.qty"
                  required
                  @input="calculateTotal()"
                />
                <CInput
                  label="Cost Price"
                  class="col-md-2"
                  type="number"
                  placeholder="0.00"
                  v-model="input.cost_price"
                  @input="calculateTotal()"
                  required
                />
                <CInput
                  label="Selling Price"
                  class="col-md-2"
                  type="number"
                  placeholder="0.00"
                  :value.sync="input.selling_price"
                  required
                />
                <CInput
                  class="col-md-2"
                  label="Expiry Date"
                  type="date"
                  v-model="input.expiry_date"
                />
                <CButton
                  @click="removeProduct(k)"
                  class="btn-sm del-btn"
                  style="background: transeparent"
                >
                  <CIcon :content="$options.cilTrash" style="color: red" />
                </CButton>
              </CRow>
            </div>
          </CCol>
        </CRow>

        <CRow
          v-if="searchType === 'damage' && form.items && form.items.length > 0"
        >
          <CCol sm="12" md="12" class="pt-2">
            <div class="form-group" v-for="(input, k) in form.items" :key="k">
              <CRow>
                <CInput
                  label="Product"
                  class="col-md-4"
                  :value.sync="input.name"
                />
                <CInput
                  label="Damage Qty"
                  class="col-md-3"
                  type="number"
                  placeholder="0"
                  step="any"
                  v-model="input.qty"
                  required
                />
                <CInput
                  label="Reason"
                  class="col-md-4"
                  :value.sync="input.reason"
                />
                <CButton
                  @click="removeProduct(k)"
                  class="btn-sm del-btn"
                  style="background: transeparent"
                >
                  <CIcon :content="$options.cilTrash" style="color: red" />
                </CButton>
              </CRow>
            </div>
          </CCol>
        </CRow>

        <CRow
          v-if="
            searchType == 'quotation' && form.items && form.items.length > 0
          "
        >
          <CCol sm="12" md="12" class="pt-2">
            <div class="form-group" v-for="(input, k) in form.items" :key="k">
              <CRow class="display: flex;justify-content: space-between;">
                <CInput
                  label="Product"
                  class="col-md-3"
                  :value.sync="input.name"
                  disabled
                />

                <div class="input-group mb-3 col-md-2 row">
                  <CInput
                    label="Qty"
                    type="number"
                    class="col-8"
                    placeholder="0"
                    step="any"
                    v-model="input.qty"
                    @input="calculateQutationTotal()"
                    required
                  />
                  <span
                    class="input-group-text form-control mt-4 col-4"
                    id="basic-addon2"
                    >{{ input.weight_unit }}</span
                  >
                </div>

                <CInput
                  label="Unit Price"
                  class="col-md-2"
                  type="number"
                  placeholder="0.00"
                  step="any"
                  :value.sync="input.unit_price"
                  disabled
                  required
                />

                <CInput
                  label="Unit Tax"
                  class="col-md-2"
                  type="number"
                  placeholder="0.00."
                  :value.sync="input.tax_price"
                  disabled
                />
                <CInput
                  label="Disc %"
                  class="col-md-1"
                  type="text"
                  placeholder="0.00 OR %"
                  :value.sync="input.discount"
                  @change="calculateQutationTotal()"
                />
                <CInput
                  label="Total"
                  class="col-md-2"
                  step="any"
                  type="number"
                  :value.sync="input.total"
                />
                <CInput
                  label="Description of Product"
                  class="col-md-11 col-lg-10"
                  type="text"
                  placeholder="Description of produt"
                  :value.sync="input.description"
                />
                <CButton
                  @click="removeProduct(k)"
                  class="btn-sm del-btn"
                  style="background: transparent"
                >
                  <CIcon :content="$options.cilTrash" style="color: red" />
                </CButton>
              </CRow>
            </div>
          </CCol>
        </CRow>

        <hr v-if="form.items && form.items.length > 0" />
      </CCol>
    </CRow>
    <div>
      <CModal
        title="Product Quantity Units"
        :fade="true"
        :centered="true"
        :closeOnBackdrop="true"
        color="success"
        :show.sync="toggleModel"
      >
        <form v-if="unit_form && unit_form.length > 0">
          <CRow v-for="(input, k) in unit_form" :key="k">
            <CInput
              label="Variations"
              class="col-md-6"
              :value.sync="input.name"
              disabled
            />
            <CInput
              label="Qty"
              class="col-md-6"
              type="number"
              placeholder="0"
              min="1"
              v-model="input.qty"
              @input="calculateTotal()"
            />
          </CRow>
        </form>
        <template #header>
          <h6 class="modal-title">Select Quantity Units</h6>
        </template>
        <template #footer>
          <CButton @click="saveQuantityUnits()" color="success">Save</CButton>
        </template>
      </CModal>
    </div>
  </div>
</template>
<script>
import ReceivingService from "@/services/receivings/ReceivingService";
import { cilTrash } from "@coreui/icons-pro";

export default {
  name: "SearchProduct",
  cilTrash,
  props: {
    searchType: String,
    itemsData: Array,
  },
  data: () => ({
    toggleModel: false,
    unit_form: [],
    form: {
      id: "",
      items: [],
      product_id: "",
      total_cost: 0,
    },
    pro_unit: false,
    search: "",
    products_list: [],
    options: {
      suppliers: [
        { value: "", label: "Choose Supplier", disabled: true, selected: "" },
      ],
      receiving_status: [
        {
          value: "",
          label: "Choose receiving Status",
          disabled: true,
          selected: "",
        },
        { value: "pending", label: "Pending" },
        { value: "completed", label: "Completed" },
      ],
      products: [],
    },

    // timeout
    //value: "",
    //outputValue: "",
    timeout: null,
  }),
  created() {
    this.form.id = this.$route.params.id;
  },
  computed: {
    searchItems(val) {
      return this.$store.getters.getSearchProductItems;
    },
  },
  watch: {
    itemsData: {
      handler: function (newValue) {
        this.form.items = newValue;
        this.$store.commit("set_search_product_items", newValue);
      },
      deep: true,
    },
  },
  methods: {
    searchProduct() {
      clearTimeout(this.timeout);

      var self = this.search;
      var that = this;
      var options_products = [];
      var products_list = [];

      this.timeout = setTimeout(function () {
        if (self !== "") {
          products_list = [];
          options_products = [];
          ReceivingService.searchProduct(self)
            .then(({ data }) => {
              if (data) {
                // For barcode
                if (!isNaN(parseInt(self)) && data.length == 1) {
                  // console.log("one prodcut found");
                  data.map((product) => {
                    if (product.barcode === self) {
                      let product_exist = that.form.items.find(
                        (item) => item.uuid === product.uuid
                      );
                      if (product_exist) {
                        product_exist.qty = parseInt(product_exist.qty) + 1;
                      } else {
                        let tax_price =
                          parseFloat(product.price.selling_price_without_tax) *
                          (parseFloat(product.price.tax.percentage) / 100);
                        let unit_price =
                          product.price?.selling_price_without_tax;
                        that.form.items.push({
                          uuid: product.uuid,
                          type: "product",
                          name: product.name,
                          unit_price: unit_price?.toFixed(3),
                          tax_price: tax_price?.toFixed(3),
                          qty: 1,
                          discount: 0,
                          description: "",
                          weight_unit: product.weight_unit,
                          total: product.price?.selling_price_with_tax,
                        });
                      }
                    }
                  });
                  that.resetSearch();
                  return;
                }

                data.map((product) => {
                  if (product) {
                    options_products.push({
                      value: product.uuid,
                      type: "product",
                      label: `${product.name} (Stock:  ${
                        product.current_qty && product.current_qty.balance
                          ? product.current_qty.balance
                          : 0
                      })`,
                    });

                    products_list.push({ ...product });
                  }
                });
                // this.options.products = options_products;
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          that.resetSearch();
        }

        that.products_list = products_list;
        that.options.products = options_products;
      }, 500);
    },
    removeProduct(index) {
      this.form.items.splice(index, 1);
      if (this.searchType === "receivings") {
        this.calculateTotal();
      }
      if (this.searchType === "quotation") {
        this.calculateQutationTotal();
      }
    },
    addOptions(item) {
      console.log("🚀 ~ item", item);
      this.form.product_id = item.value;
      this.unit_form = [];
      let option = item;
      if (
        !["", undefined].includes(option.is_unit) &&
        !["", undefined].includes(option.unit_id)
      ) {
        if (this.products_list && this.products_list.length > 0) {
          this.products_list.find((product) => {
            if (option.type === "product") {
              this.pro_unit = true;
              this.addProduct(option);
            } else if (option.type === "variation") {
              if (product.uuid === this.form.product_id) {
                let parts = product.variations.length;
                let num = option.unit_qty;
                let half_qty = [...Array(parts)].map(
                  (_, i) => 0 | (num / parts + (i < num % parts))
                );
                product.variations.find((variation, index) => {
                  this.unit_form.push({
                    uuid: variation.uuid,
                    type: "variation",
                    name: `${JSON.parse(variation.name)?.en}`,
                    qty: half_qty[index] ?? 1,
                    cost_price: option.unit_cost_price,
                    selling_price: option.unit_selling_price,
                  });
                });
              }
            }
          });
          if (option.type === "variation") {
            this.toggleModel = true;
          }
        }
      } else {
        if (option.type === "product") {
          this.addProduct();
        } else if (option.type === "variation") {
          this.addProductVariation();
        }
      }
      if (this.searchType === "receivings") {
        this.calculateTotal();
      }
      if (this.searchType === "quotation") {
        this.calculateQutationTotal();
      }
    },
    saveQuantityUnits() {
      this.toggleModel = false;
      this.addUnitVariation();

      if (this.searchType === "receivings") {
        this.calculateTotal();
      }
      if (this.searchType === "quotation") {
        this.calculateQutationTotal();
      }
    },
    calculateTotal() {
      let total = 0;
      this.form.items.map((item) => {
        if (item.cost_price && item.qty) {
          total += parseFloat(item.qty) * parseFloat(item.cost_price);
        }
      });
      // this.form.total_cost = parseFloat(total);
      this.$store.commit("set_total_receivings_cost", parseFloat(total));
    },
    addUnitVariation() {
      if (
        this.unit_form &&
        this.unit_form.length > 0 &&
        this.form.product_id !== "" &&
        this.form.product_id !== undefined
      ) {
        this.products_list.map((product) => {
          product.variations.map((variation) => {
            if (this.unit_form.some((item) => item.uuid === variation.uuid)) {
              if (
                this.form.items.length > 0 &&
                this.form.items.some((item) => item.uuid === variation.uuid)
              ) {
                this.form.items.map((item, key) => {
                  if (item.uuid === variation.uuid) {
                    let unit = this.unit_form.find(
                      (item) => item.uuid === variation.uuid
                    );
                    this.form.items[key].qty =
                      parseFloat(this.form.items[key].qty) + unit?.qty ?? 1;
                    unit?.qty ?? 1;
                    this.form.items[key].cost_price = unit?.cost_price ?? 0;
                    this.form.items[key].selling_price =
                      unit?.selling_price ?? 0;
                  }
                });
              } else {
                let unit = this.unit_form.find(
                  (item) => item.uuid === variation.uuid
                );
                if (this.searchType === "damage") {
                  this.form.items.push({
                    uuid: variation.uuid,
                    type: "variation",
                    name: `${product.name} (Variation: ${
                      JSON.parse(variation.name)?.en
                    })`,
                    qty: unit?.qty ?? 1,
                    reason: "",
                  });
                } else if (this.searchType === "receivings") {
                  let unit = this.unit_form.find(
                    (item) => item.uuid === variation.uuid
                  );
                  this.form.items.push({
                    uuid: variation.uuid,
                    type: "variation",
                    name: `${product.name} (Variation: ${
                      JSON.parse(variation.name)?.en
                    })`,
                    cost_price: unit?.cost_price ?? 0,
                    selling_price: unit?.selling_price ?? 0,

                    qty: unit?.qty ?? 1,
                    expiry_date: "",
                  });
                } else if (this.searchType === "quotation") {
                  // console.log(product.weight_unit);
                  this.form.items.push({
                    uuid: variation.uuid,
                    type: "variation",
                    name: `${product.name} (Variation: ${
                      JSON.parse(variation.name)?.en
                    })`,
                    unit_price: unit?.selling_price ?? 0,
                    qty: 1,
                    discount: "",
                    total: 0,
                  });
                }
              }
            }
          });
        });
        this.resetSearch();
        this.$store.commit("set_search_product_items", this.form.items);
      }
    },
    addProduct(option = {}) {
      if (this.form.product_id !== "" && this.form.product_id !== undefined) {
        let product = this.products_list.find(
          (product) => product.uuid === this.form.product_id
        );

        if (Object.keys(option).length === 0 && option.constructor === Object) {
          Object.assign(option, { unit_qty: 1 });
          if (product.price) {
            Object.assign(option, {
              unit_cost_price: product.price.cost_price,
            });
            Object.assign(option, {
              unit_selling_price: product.price.selling_price_without_tax,
            });
            Object.assign(option, {
              tax_price:
                parseFloat(product.price.selling_price_without_tax) *
                (parseFloat(product.price.tax.percentage) / 100),
            });
          }
        }

        if (
          product.uuid === this.form.product_id &&
          this.form.items &&
          this.form.items.length > 0 &&
          this.form.items.some((item) => item.uuid === product.uuid)
        ) {
          if (this.pro_unit) {
            this.form.items.map((item, key) => {
              if (item.uuid === product.uuid) {
                this.form.items[key].qty =
                  parseFloat(this.form.items[key].qty) + option.unit_qty;
                this.form.items[key].cost_price = option.unit_cost_price;
                this.form.items[key].selling_price = option.unit_selling_price;
              }
            });
          } else {
            this.form.items.map((item, key) => {
              if (item.uuid === product.uuid) {
                this.form.items[key].qty =
                  parseFloat(this.form.items[key].qty) + option.unit_qty;
              }
            });
          }
        } else {
          if (this.searchType === "damage") {
            this.form.items.push({
              uuid: product.uuid,
              type: "product",
              name: product.name,
              qty: option.unit_qty,
              reason: "",
            });
          } else if (this.searchType === "receivings") {
            this.form.items.push({
              uuid: product.uuid,
              type: "product",
              name: product.name,
              cost_price: option.unit_cost_price ?? 0,
              selling_price: option.unit_selling_price ?? 0,
              qty: option.unit_qty,
              expiry_date: "",
            });
          } else if (this.searchType === "quotation") {
            // console.log(product.weight_unit);
            this.form.items.push({
              uuid: product.uuid,
              type: "product",
              name: product.name,
              unit_price: option.unit_selling_price.toFixed(3) ?? 0,
              tax_price: option.tax_price?.toFixed(3) ?? 0,
              qty: 1,
              discount: 0,
              description: "",
              weight_unit: product.weight_unit,
              total: 0,
            });
          }
        }
        this.resetSearch();
        this.$store.commit("set_search_product_items", this.form.items);
      }
    },
    addProductVariation() {
      let data = [];
      if (this.form.product_id !== "" && this.form.product_id !== undefined) {
        this.products_list.find((product) => {
          return product.variations.find((variation) => {
            if (variation.uuid === this.form.product_id) {
              if (this.searchType === "damage") {
                data.push({
                  uuid: variation.uuid,
                  type: "variation",
                  name:
                    product.name + " (" + JSON.parse(variation.name).en + ")",
                  qty: 1,
                  reason: "",
                });
              } else if (this.searchType === "receivings") {
                data.push({
                  uuid: variation.uuid,
                  type: "variation",
                  name: `${product.name} (Variation: ${
                    JSON.parse(variation.name)?.en
                  })`,
                  cost_price: variation.price?.cost_price ?? 0,
                  selling_price:
                    variation.price?.selling_price_without_tax ?? 0,
                  qty: 1,
                  expiry_date: "",
                });
              } else if (this.searchType === "quotation") {
                data.push({
                  uuid: variation.uuid,
                  type: "variation",
                  name: `${product.name} (Variation: ${
                    JSON.parse(variation.name)?.en
                  })`,
                  unit_price: variation.price?.selling_price_without_tax ?? 0,
                  qty: 1,
                  discount: "",
                  total: 0,
                });
              }
            }
          });
        });

        if (
          data[0].uuid === this.form.product_id &&
          this.form.items.length > 0 &&
          this.form.items.some((item) => item.uuid === data[0].uuid)
        ) {
          this.form.items.map((item, key) => {
            if (item.uuid === data[0].uuid) {
              this.form.items[key].qty =
                parseFloat(this.form.items[key].qty) + 1;
            }
          });
        } else {
          this.form.items.push(data[0]);
        }
        this.resetSearch();
        this.$store.commit("set_search_product_items", this.form.items);
      }
    },
    async calculateQutationTotal() {
      let data = this.form.items;
      await new Promise(function (resolve, reject) {
        let total = 0;
        data.map((item) => {
          if (item.qty && item.unit_price) {
            if (item.discount && item.discount !== "") {
              let isPercentage = /%/gi;
              if (isPercentage.test(item.discount)) {
                let dicount = Number(item.discount.split("%")[0]);
                total =
                  parseFloat(item.qty) *
                  (parseFloat(item.unit_price) + parseFloat(item.tax_price));
                total = total - (total * dicount) / 100;
              } else {
                total =
                  (parseFloat(item.unit_price) + parseFloat(item.tax_price)) *
                    parseFloat(item.qty) -
                  parseFloat(item.discount);
              }
            } else {
              total =
                parseFloat(item.qty) *
                (parseFloat(item.unit_price) + parseFloat(item.tax_price));
            }
            item.total = total.toFixed(3);
          }
        });
        resolve();
      });
      let store = this.$store;
      await new Promise(function (resolve, reject) {
        // calculate totals
        let [subTotal, totalDiscount, totalSum, taxTotal] = [0, 0, 0, 0];
        data.map((item) => {
          // console.log(item);
          if (item.unit_price) {
            subTotal += parseFloat(item.unit_price) * parseFloat(item.qty);
          }
          if (item.tax_price) {
            taxTotal += parseFloat(item.tax_price) * parseFloat(item.qty);
          }
          if (item.discount) {
            let isPercentage = /%/gi;
            if (isPercentage.test(item.discount)) {
              totalDiscount +=
                (parseFloat(item.discount.split("%")[0]) / 100) *
                ((parseFloat(item.unit_price) + parseFloat(item.tax_price)) *
                  parseFloat(item.qty));
            } else {
              totalDiscount += parseFloat(item.discount);
            }
          }
          totalSum =
            parseFloat(subTotal) +
            parseFloat(taxTotal) -
            parseFloat(totalDiscount);
        });

        store.commit("set_quotation_sub_total", subTotal.toFixed(3));
        store.commit("set_quotation_tax_total", taxTotal.toFixed(3));
        store.commit(
          "set_quotation_total_discount",
          totalDiscount.toFixed(3) ?? 0
        );
        store.commit("set_quotation_total", totalSum.toFixed(3));
        resolve();
      });
    },

    resetSearch() {
      this.form.product_id = "";
      this.search = "";
      this.options.products = [];
    },
  },
};
</script>

<style scoped>
.search-content {
  position: absolute;
  top: 4rem;
  width: 99%;
  background-color: #fff !important;
  z-index: 99;
  padding: 10px 20px;
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
