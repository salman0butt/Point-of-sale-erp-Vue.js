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
        <CRow v-if="searchType == 'receivings' && form.items && form.items.length > 0">
          <CCol sm="12" md="12" class="pt-2">
            <div class="form-group" v-for="(input, k) in form.items" :key="k">
              <CRow>
                <CInput label="Product" class="col-md-3" :value.sync="input.name" />
                <CInput
                  label="Qty"
                  class="col-md-2"
                  type="number"
                  placeholder="0"
                  min="1"
                  v-model="input.qty"
                  @input="calculateTotal()"
                />
                <CInput
                  label="Cost Price"
                  class="col-md-2"
                  type="number"
                  placeholder="0.00"
                  v-model="input.cost_price"
                  @input="calculateTotal()"
                />
                <CInput
                  label="Selling Price"
                  class="col-md-2"
                  type="number"
                  placeholder="0.00"
                  :value.sync="input.selling_price"
                />
                <CInput
                  class="col-md-2"
                  label="Expiry Date"
                  type="date"
                  v-model="input.expiry_date"
                />
                <CButton
                  @click="removeProduct(k)"
                  class="btn-sm"
                  style="background: transeparent"
                >
                  <CIcon :content="$options.cilTrash" style="color: red" />
                </CButton>
              </CRow>
            </div>
          </CCol>
        </CRow>

        <CRow v-if="searchType === 'damage' && form.items && form.items.length > 0">
          <CCol sm="12" md="12" class="pt-2">
            <div class="form-group" v-for="(input, k) in form.items" :key="k">
              <CRow>
                <CInput label="Product" class="col-md-4" :value.sync="input.name" />
                <CInput
                  label="Damage Qty"
                  class="col-md-3"
                  type="number"
                  placeholder="0"
                  min="1"
                  v-model="input.qty"
                />
                <CInput label="Reason" class="col-md-4" :value.sync="input.reason" />
                <CButton
                  @click="removeProduct(k)"
                  class="btn-sm"
                  style="background: transeparent"
                >
                  <CIcon :content="$options.cilTrash" style="color: red" />
                </CButton>
              </CRow>
            </div>
          </CCol>
        </CRow>

        <CRow v-if="searchType == 'quotation' && form.items && form.items.length > 0">
          <CCol sm="12" md="12" class="pt-2">
            <div class="form-group" v-for="(input, k) in form.items" :key="k">
              <CRow>
                <CInput
                  label="Product"
                  class="col-md-3"
                  :value.sync="input.name"
                  disabled
                />
                <CInput
                  label="Qty"
                  class="col-md-2"
                  type="number"
                  placeholder="0"
                  min="1"
                  v-model="input.qty"
                  @input="calculateQutationTotal()"
                />

                <CInput
                  label="Unit Price"
                  class="col-md-2"
                  type="number"
                  placeholder="0.00"
                  :value.sync="input.unit_price"
                  disabled
                />
                <CInput
                  label="Discount %"
                  class="col-md-2"
                  type="text"
                  placeholder="0.00 OR %"
                  :value.sync="input.discount"
                  @change="calculateQutationTotal()"
                />
                <CInput
                  label="Total"
                  class="col-md-2"
                  type="number"
                  :value.sync="input.total"
                />

                <CButton
                  @click="removeProduct(k)"
                  class="btn-sm"
                  style="background: transeparent"
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
      suppliers: [{ value: "", label: "Choose Supplier", disabled: true, selected: "" }],
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
      if (this.search !== "") {
        this.products_list = [];
        this.options.products = [];
        this.unit_form = [];
        ReceivingService.searchProduct(this.search)
          .then(({ data }) => {
            if (data !== undefined && data !== "") {
              this.options.products = [];
              data.map((product) => {
                if (product) {
                  if (product.quantity_units && product.quantity_units.length > 0) {
                    product.quantity_units.map((unit) => {
                      if (product.variations && product.variations.length > 0) {
                        this.options.products.push({
                          value: product.uuid,
                          type: "variation",
                          label: `${product.name} (Unit: ${unit.name} | Qty: ${unit.qty})`,
                          is_unit: true,
                          unit_id: unit.uuid,
                          unit_qty: unit.qty ?? 1,
                          unit_cost_price: unit.price?.cost_price,
                          unit_selling_price: unit.price?.selling_price,
                        });
                      } else {
                        this.options.products.push({
                          value: product.uuid,
                          type: "product",
                          label: `${product.name} (Unit: ${unit.name} | Qty: ${unit.qty})`,
                          is_unit: true,
                          unit_id: unit.uuid,
                          unit_qty: unit.qty ?? 1,
                          unit_cost_price: unit.price?.cost_price,
                          unit_selling_price: unit.price?.selling_price,
                        });
                      }
                    });
                  }
                  if (product.variations && product.variations.length > 0) {
                    product.variations.map((variation) => {
                      this.options.products.push({
                        value: variation.uuid,
                        type: "variation",
                        label: `${product.name} (Variation: ${
                          JSON.parse(variation.name)?.en
                        } | Stock:  ${
                          variation.inventory && variation.inventory.length
                            ? variation.inventory[0]?.current_quantity
                            : 0
                        })`,
                      });
                    });
                  } else {
                    this.options.products.push({
                      value: product.uuid,
                      type: "product",
                      label: `${product.name} (Stock:  ${
                        product.inventory && product.inventory.length
                          ? product.inventory[0]?.current_quantity
                          : 0
                      })`,
                    });
                  }

                  this.products_list.push({ ...product });
                }
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.resetSearch();
      }
    },
    removeProduct(index) {
      this.form.items.splice(index, 1);
      if (this.searchType === "receivings") {
        this.calculateTotal();
      }
    },
    addOptions(item) {
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
          total += parseInt(item.qty) * parseInt(item.cost_price);
        }
      });
      // this.form.total_cost = parseInt(total);
      this.$store.commit("set_total_receivings_cost", parseInt(total));
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
                      parseInt(this.form.items[key].qty) + unit?.qty ?? 1;
                    unit?.qty ?? 1;
                    this.form.items[key].cost_price = unit?.cost_price ?? 0;
                    this.form.items[key].selling_price = unit?.selling_price ?? 0;
                  }
                });
              } else {
                let unit = this.unit_form.find((item) => item.uuid === variation.uuid);
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
                  let unit = this.unit_form.find((item) => item.uuid === variation.uuid);
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
              unit_selling_price: product.price.selling_price,
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
                  parseInt(this.form.items[key].qty) + option.unit_qty;
                this.form.items[key].cost_price = option.unit_cost_price;
                this.form.items[key].selling_price = option.unit_selling_price;
              }
            });
          } else {
            this.form.items.map((item, key) => {
              if (item.uuid === product.uuid) {
                this.form.items[key].qty =
                  parseInt(this.form.items[key].qty) + option.unit_qty;
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
            this.form.items.push({
              uuid: product.uuid,
              type: "product",
              name: product.name,
              unit_price: option.unit_selling_price ?? 0,
              qty: 1,
              discount: "",
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
                  name: product.name + " (" + JSON.parse(variation.name).en + ")",
                  qty: 1,
                  reason: "",
                });
              } else if (this.searchType === "receivings") {
                data.push({
                  uuid: variation.uuid,
                  type: "variation",
                  name: `${product.name} (Variation: ${JSON.parse(variation.name)?.en})`,
                  cost_price: variation.price?.cost_price ?? 0,
                  selling_price: variation.price?.selling_price ?? 0,
                  qty: 1,
                  expiry_date: "",
                });
              } else if (this.searchType === "quotation") {
                data.push({
                  uuid: variation.uuid,
                  type: "variation",
                  name: `${product.name} (Variation: ${JSON.parse(variation.name)?.en})`,
                  unit_price: variation.price?.selling_price ?? 0,
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
              this.form.items[key].qty = parseInt(this.form.items[key].qty) + 1;
            }
          });
        } else {
          this.form.items.push(data[0]);
        }
        this.resetSearch();
        this.$store.commit("set_search_product_items", this.form.items);
      }
    },
    calculateQutationTotal() {
      let total = 0;
      this.form.items.map((item) => {
        if (item.qty && item.unit_price) {
          if (item.discount && item.discount !== "") {
            let isPercentage = /%/gi;
            if (isPercentage.test(item.discount)) {
              let dicount = Number(item.discount.split("%")[0]);
              total =
                parseInt(item.unit_price) * parseInt(item.qty) -
                (parseInt(dicount) / 100) * parseInt(item.unit_price);
            } else {
              total =
                parseInt(item.unit_price) * parseInt(item.qty) - parseInt(item.discount);
            }
          } else {
            total = parseInt(item.qty) * parseInt(item.unit_price);
          }
          item.total = total;
        }
      });

      // calculate totals
      let [subTotal, totalDiscount, totalSum] = [0, 0, 0];
      this.form.items.map((item) => {
        if (item.total) {
          subTotal += parseInt(item.total);
        }
        let isPercentage = /%/gi;
        if (isPercentage.test(item.discount)) {
          totalDiscount +=
            (parseInt(item.discount.split("%")[0]) / 100) * parseInt(item.unit_price);
        } else {
          totalDiscount += parseInt(item.discount);
        }
        totalSum += item.total;
      });
      this.$store.commit("set_quotation_sub_total", subTotal);
      this.$store.commit("set_quotation_total_discount", totalDiscount ?? 0);
      this.$store.commit("set_quotation_total", totalSum);
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
</style>
