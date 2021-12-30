<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form @submit.prevent="isEditing ? updateReceiving() : saveReceiving()">
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Supplier"
                :options="options.suppliers"
                :value.sync="form.supplier_id"
                :class="{ error: $v.form.supplier_id.$error }"
                @input="$v.form.supplier_id.$touch()"
              />
              <div v-if="$v.form.supplier_id.$error">
                <p v-if="!$v.form.supplier_id.required" class="errorMsg">
                  Supplier is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Date"
                type="date"
                v-model="form.date"
                :class="{ error: $v.form.date.$error }"
                @input="$v.form.date.$touch()"
              />
              <div v-if="$v.form.date.$error">
                <p v-if="!$v.form.date.required" class="errorMsg">Date is required</p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Receiving Status"
                :options="options.receiving_status"
                :value.sync="form.receiving_status"
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="12" md="12" class="pt-2">
              <CTextarea
                label="Delevery Notes"
                placeholder="Content..."
                v-model="form.reference_id"
              />
            </CCol>
            <!-- <CCol sm="12" md="12" class="pt-2">
              <CSelect
                label="Products"
                :options="options.products"
                :value.sync="form.product_id"
                @change="addOptions()"
              />
            </CCol> -->
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
          <CRow v-if="form.items && form.items.length > 0">
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
          <hr v-if="form.items && form.items.length > 0" />
          <CRow>
            <CCol sm="12" md="12" class="pt-2">
              <CInput
                label="Total Cost"
                type="number"
                v-model="form.total_cost"
                :class="{ error: $v.form.total_cost.$error }"
                @input="$v.form.total_cost.$touch()"
              />
              <div v-if="$v.form.total_cost.$error">
                <p v-if="!$v.form.total_cost.required" class="errorMsg">
                  Total Cost is required
                </p>
              </div>
            </CCol>

            <CCol sm="12" md="12" class="pt-2">
              <CTextarea label="Note" placeholder="Content..." v-model="form.note" />
            </CCol>
          </CRow>
          <p v-if="$v.$anyError" class="errorMsg">Please Fill the required data</p>
          <CRow class="mt-4">
            <CButton
              progress
              timeout="2000"
              block
              color="success"
              style="float: right; width: 200px; margin-left: 20px"
              type="submit"
              @click="saveAndExit = false"
              >Save & Continue</CButton
            >
            <CButton
              timeout="2000"
              block
              color="danger"
              style="float: right; width: 140px; margin-left: 20px; margin-top: 0"
              @click="saveAndExit = true"
              type="submit"
              >Save & Exit</CButton
            >
          </CRow>
        </form>
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
import { required } from "vuelidate/lib/validators";
import { cilTrash } from "@coreui/icons-pro";

export default {
  name: "ReceivingForm",
  cilTrash,
  data: () => ({
    isEditing: false,
    saveAndExit: false,
    toggleModel: false,
    unit_form: [],
    form: {
      id: "",
      supplier_id: "",
      date: "",
      note: "",
      reference_id: "",
      total_cost: "",
      receiving_status: "",
      items: [],
      product_id: "",
    },
    search: "",
    products_list: [],
    options: {
      suppliers: [{ value: "", label: "Choose Supplier", disabled: true, selected: "" }],
      receiving_status: [
        { value: "", label: "Choose receiving Status", disabled: true, selected: "" },
        { value: "pending", label: "Pending" },
        { value: "completed", label: "Completed" },
      ],
      products: [],
    },
  }),
  validations() {
    return {
      form: {
        supplier_id: { required },
        date: { required },
        total_cost: { required },
      },
    };
  },
  created() {
    this.form.id = this.$route.params.id;
    this.getAllSuppliers();
    if (this.form.id !== "" && this.form.id !== undefined) {
      this.isEditing = true;
      this.getReceiving();
    }
  },
  methods: {
    getAllSuppliers() {
      ReceivingService.getAllSuppliers()
        .then(({ data }) => {
          if (data !== undefined && data !== "") {
            data.data.map((supplier) => {
              this.options.suppliers.push({
                value: supplier.uuid,
                label: supplier.name,
              });
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
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
                        });
                      } else {
                        this.options.products.push({
                          value: product.uuid,
                          type: "product",
                          label: `${product.name} (Unit: ${unit.name} | Qty: ${unit.qty})`,
                          is_unit: true,
                          unit_id: unit.uuid,
                          unit_qty: unit.qty ?? 1,
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
        this.search = "";
        this.products_list = [];
        this.options.products = [];
      }
    },
    removeProduct(index) {
      this.form.items.splice(index, 1);
      this.calculateTotal();
    },
    calculateTotal() {
      let total = 0;
      this.form.items.map((item) => {
        if (item.cost_price && item.qty) {
          total += parseInt(item.qty) * parseInt(item.cost_price);
        }
      });

      this.form.total_cost = parseInt(total);
    },
    addOptions(item) {
      this.form.product_id = item.value;
      this.unit_form = [];
      let option = item;
      if (
        option.is_unit !== "" &&
        option.is_unit !== undefined &&
        option.unit_id !== "" &&
        option.unit_id !== undefined
      ) {
        if (this.products_list && this.products_list.length > 0) {
          this.products_list.find((product) => {
            if (option.type === "product") {
              this.addProduct(option.unit_qty);
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
      this.calculateTotal();
    },
    saveQuantityUnits() {
      this.toggleModel = false;
      // this.form.product_id = "";
      // this.search = "";
      // this.options.products = [];
      this.addUnitVariation();
      this.calculateTotal();
    },
    addUnitVariation() {
      if (this.unit_form && this.unit_form.length > 0) {
        if (this.form.product_id !== "" && this.form.product_id !== undefined) {
          this.products_list.map((product) => {
            product.variations.map((variation) => {
              if (this.unit_form.some((item) => item.uuid === variation.uuid)) {
                if (
                  this.form.items.length > 0 &&
                  this.form.items.some((item) => item.uuid === variation.uuid)
                ) {
                  this.form.items.map((item, key) => {
                    if (item.uuid === variation.uuid) {
                      this.form.items[key].qty =
                        parseInt(this.form.items[key].qty) +
                          this.unit_form.find((item) => item.uuid === variation.uuid)
                            ?.qty ?? 1;
                    }
                  });
                } else {
                  this.form.items.push({
                    uuid: variation.uuid,
                    type: "variation",
                    name: `${product.name} (Variation: ${
                      JSON.parse(variation.name)?.en
                    })`,
                    cost_price: variation.price?.cost_price ?? 0,
                    selling_price: variation.price?.selling_price ?? 0,
                    qty:
                      this.unit_form.find((item) => item.uuid === variation.uuid)?.qty ??
                      1,
                    expiry_date: "",
                  });
                }
              }
            });
          });
          this.form.product_id = "";
          this.search = "";
          this.options.products = [];
        }
      }
    },
    addProduct(qty = 1) {
      if (this.form.product_id !== "" && this.form.product_id !== undefined) {
        let product = this.products_list.find(
          (product) => product.uuid === this.form.product_id
        );
        if (
          product.uuid === this.form.product_id &&
          this.form.items.length > 0 &&
          this.form.items.some((item) => item.uuid === product.uuid)
        ) {
          this.form.items.map((item, key) => {
            if (item.uuid === product.uuid) {
              this.form.items[key].qty = parseInt(this.form.items[key].qty) + qty;
            }
          });
        } else {
          this.form.items.push({
            uuid: product.uuid,
            type: "product",
            name: product.name,
            cost_price: product.price?.cost_price ?? 0,
            selling_price: product.price?.selling_price ?? 0,
            qty: qty,
            expiry_date: "",
          });
        }
        this.form.product_id = "";
        this.search = "";
        this.options.products = [];
      }
    },
    addProductVariation() {
      let data = [];
      if (this.form.product_id !== "" && this.form.product_id !== undefined) {
        this.products_list.find((product) => {
          return product.variations.find((variation) => {
            if (variation.uuid === this.form.product_id) {
              data.push({
                uuid: variation.uuid,
                type: "variation",
                name: `${product.name} (Variation: ${JSON.parse(variation.name)?.en})`,
                cost_price: variation.price?.cost_price ?? 0,
                selling_price: variation.price?.selling_price ?? 0,
                qty: 1,
                expiry_date: "",
              });
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
        this.form.product_id = "";
        this.search = "";
        this.options.products = [];
      }
    },
    saveReceiving() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        ReceivingService.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Receiving Added Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.resetForm();

              if (this.saveAndExit) {
                this.$router.push({ path: "/receivings/index" });
              } else {
                this.$router.push({
                  path: "/receivings/edit/" + res.data.uuid,
                });
              }
            }
          })
          .catch((error) => {
            console.log(error);
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: "Something Went Wrong.",
              timer: 3600,
            });
          });
      }
    },
    updateReceiving() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        ReceivingService.update(this.form.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Receiving Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();

              if (this.saveAndExit) {
                this.$router.push({ path: "/receivings/index" });
              }
              //  else {
              //   this.$router.push({
              //     path: "/receivings/edit/" + res.data.uuid,
              //   });
              // }
            }
          })
          .catch((error) => {
            console.log(error);
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: "Something Went Wrong.",
              timer: 3600,
            });
          });
      }
    },
    getReceiving() {
      ReceivingService.get(this.form.id)
        .then(({ data }) => {
          if (data != null && data != "") {
            this.isEditing = true;
            this.form.id = data.uuid;
            this.form.supplier_id = data.supplier.uuid;
            this.form.date = data.date;
            this.form.note = data.note;
            this.form.reference_id = data.reference_id;
            this.form.total_cost = data.total_cost;
            this.form.receiving_status = data.receiving_status;

            if (data.items && data.items.length > 0) {
              data.items.map((item) => {
                if (item && item.product_variation && item.product_variation.uuid) {
                  this.form.items.push({
                    uuid: item.product_variation.uuid,
                    type: "variation",
                    name:
                      item.product.name +
                      " (" +
                      JSON.parse(item.product_variation.name).en +
                      ")",
                    cost_price: item.price?.cost_price ?? 0,
                    selling_price: item.price?.selling_price ?? 0,
                    qty: item.qty,
                    expiry_date: item.inventory.expiry_date,
                  });
                } else {
                  this.form.items.push({
                    uuid: item.product.uuid,
                    type: "product",
                    name: item.product.name,
                    cost_price: item.price?.cost_price ?? 0,
                    selling_price: item.price?.selling_price ?? 0,
                    qty: item.qty,
                    expiry_date: item.inventory.expiry_date,
                  });
                }
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
          this.$router.push({ path: "/receivings/index" });
        });
    },
    resetForm() {
      for (let index in this.form) {
        this.form[index] = "";
      }
      this.isEditing = false;
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
