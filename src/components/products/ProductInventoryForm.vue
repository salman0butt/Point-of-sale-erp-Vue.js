<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Inventory </CCardHeader>
          <CCardBody>
            <form @submit.prevent="saveProductInventory()">
              <CRow>
                <Loader />
                <CCol sm="6" md="6" class="pt-2">
                  <CInput
                    label="Current Stock"
                    @change="currentStock()"
                    type="number"
                    min="0"
                    placeholder="0"
                    v-model="form.current_quantity"
                    disabled
                  />
                </CCol>
                <!-- <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Damage Qty"
                    type="number"
                    min="0"
                    placeholder="0"
                    v-model="form.damage_qty"
                    @change="addDamage()"
                  />
                </CCol>
                <CCol v-if="form.damage_qty" sm="6" md="4" class="pt-2">
                  <CInput label="Damage Reason" v-model="form.damage_reason" />
                </CCol> -->
                <CCol sm="6" md="6" class="pt-2">
                  <CInput
                    label="Opening Stock"
                    type="number"
                    @change="addStock()"
                    placeholder="0"
                    v-model="form.add_stock"
                    :class="{ error: $v.form.add_stock.$error }"
                    @input="$v.form.add_stock.$touch()"
                  />
                  <div v-if="$v.form.add_stock.$error">
                    <p v-if="!$v.form.add_stock.required" class="errorMsg">
                      Add Stock is required
                    </p>
                    <p v-if="!$v.form.add_stock.minValue" class="errorMsg">
                      Add Stock greater then 0
                    </p>
                  </div>
                </CCol>
                <CCol sm="2" md="2" class="pt-2 mt-4">
                  <CInputCheckbox
                    custom
                    :checked="form.is_expiry"
                    label="Is Expiry"
                    @change="toggleIsExpiry"
                  />
                </CCol>
                <CCol v-if="form.is_expiry" sm="3" md="3" class="pt-2">
                  <CInput
                    label="Expiry Date"
                    type="date"
                    v-model="form.expiry_date"
                  />
                </CCol>
              </CRow>

              <p v-if="$v.$anyError" class="errorMsg">
                Please Fill the required data
              </p>
              <CRow class="mt-4 d-block">
                <CButton
                  progress
                  timeout="2000"
                  block
                  color="success"
                  style="float: right; width: 150px; margin-right: 20px"
                  type="submit"
                  :disabled="loading"
                  >{{ loading ? "loading..." : "Save" }}</CButton
                >
              </CRow>
            </form>
            <br />
            <div v-if="variations_form && variations_form.length > 0">
              <CCardHeader> Variations </CCardHeader>
              <br />
              <form
                v-if="variations_form && variations_form.length > 0"
                @submit.prevent="saveProductVariationInventory()"
              >
                <CRow v-for="(input, k) in variations_form" :key="k">
                  <CCol sm="6" md="4" class="pt-2">
                    <CInput label="Name" v-model="input.module" disabled />
                  </CCol>
                  <!-- <CCol sm="6" md="2" class="pt-2">
                  <CInput label="Value" v-model="input.product_attribute" disabled />
                </CCol> -->
                  <CCol sm="6" md="4" class="pt-2">
                    <CInput
                      label="Current Stock"
                      @change="currentVariationStock(k)"
                      type="number"
                      min="0"
                      placeholder="0"
                      v-model="input.current_quantity"
                      disabled
                    />
                  </CCol>
                  <!-- <CCol sm="6" md="4" class="pt-2">
                    <CInput
                      label="Damage Qty"
                      type="number"
                      min="0"
                      placeholder="0"
                      v-model="input.damage_qty"
                      @change="addVariationDamage(k)"
                    />
                  </CCol>
                  <CCol v-if="input.damage_qty" sm="6" md="4" class="pt-2">
                    <CInput label="Damage Reason" v-model="input.damage_reason" />
                  </CCol> -->

                  <CCol sm="6" md="4" class="pt-2">
                    <CInput
                      label="Add Stock"
                      type="number"
                      @change="addStockVariation(k)"
                      placeholder="0"
                      v-model="input.add_stock"
                    />
                  </CCol>
                  <CCol sm="2" md="2" class="pt-2 mt-4">
                    <CInputCheckbox
                      custom
                      :checked="input.is_expiry"
                      label="Is Expiry"
                      @change="toggleVariationIsExpiry(k)"
                    />
                  </CCol>
                  <CCol v-if="input.is_expiry" sm="3" md="3" class="pt-2">
                    <CInput
                      label="Expiry Date"
                      type="date"
                      v-model="input.expiry_date"
                    />
                  </CCol>
                </CRow>

                <p v-if="$v.$anyError" class="errorMsg">
                  Please Fill the required data
                </p>
                <CRow class="mt-4 d-block">
                  <CButton
                    progress
                    timeout="2000"
                    block
                    color="success"
                    style="float: right; width: 150px; margin-right: 20px"
                    type="submit"
                    :disabled="loading"
                    >{{ loading ? "loading..." : "Save" }}</CButton
                  >
                </CRow>
              </form>
            </div>
            <div>
              <br />
              <br />
              <CDataTable
                :items="stockHistory"
                :fields="fields"
                :loading="loading"
              >
                <template #module="{ item }">
                  <td v-if="item.module">
                    {{ item.module }}
                  </td>
                  <td v-else></td>
                </template>
                <template #detail="{ item }">
                  <td v-if="item.detail"><span v-html="item.detail"></span></td>
                </template>
              </CDataTable>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import ProductInventoryService from "@/services/products/ProductInventoryService";
import { required, minValue } from "vuelidate/lib/validators";
import { cibAddthis, cisMinusSquare } from "@coreui/icons-pro";
import Loader from "@/components/layouts/Loader";

const fields = [
  { key: "date", label: "DATE", _style: "min-width:40%" },
  { key: "user", label: "User", _style: "min-width:15%" },
  { key: "module", label: "Module", _style: "min-width:15%;" },
  { key: "qty", label: "In/Out Qty", _style: "min-width:15%;" },
  { key: "balance", label: "Balance", _style: "min-width:15%;" },
  { key: "expiry_date", label: "EXPIRY DATE", _style: "min-width:15%" },
  { key: "detail", label: "Detail", _style: "min-width:15%" },
];

export default {
  name: "ProductInventoryForm",
  cibAddthis,
  cisMinusSquare,
  components: { Loader },
  data: () => ({
    shouldShow: false,
    // isEditing: false,
    // isVariationEditing: false,
    stockHistory: [],
    fields,
    form: {
      is_expiry: false,
      expiry_date: "",
      product_id: "",
      current_quantity: "",
      original_stock: "",
      add_stock: "",
      // damage_qty: "",
      // damage_reason: "",
    },
    isVariation: false,
    variations_form: [],
    productId: "",
  }),
  validations() {
    return {
      form: {
        product_id: { required },
        add_stock: { required, minValueValue: minValue(1) },
      },
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
  },
  created() {
    this.productId = this.$route.params.id;
    this.form.product_id = this.$route.params.id;
    this.getVariationsInventory();
    if (
      this.productId !== null &&
      this.productId !== "" &&
      this.productId !== undefined
    ) {
      this.getProductInventory();
    }
  },
  methods: {
    toggleIsExpiry() {
      this.form.is_expiry = !this.form.is_expiry;
    },
    toggleVariationIsExpiry(key) {
      this.variations_form[key].is_expiry =
        !this.variations_form[key].is_expiry;
    },
    getProductInventory() {
      this.$store.commit("set_loader");
      ProductInventoryService.get(this.productId)
        .then(({ data }) => {
          if (data !== "" && data !== undefined && data.length) {
            this.stockHistory = [];
            data.forEach((item, index) => {
              if (
                item.type === "receiving" ||
                item.type === "sales" ||
                item.type === "damage" ||
                item.type === "product"
              ) {
                let date = item.date;
                let qty = item.qty;
                let detail = "";
                let module = "";
                if (item.type == "receiving") {
                  module = "Receiving";
                  detail =
                    "<a href='/receivings/edit/" +
                    item.type_uuid +
                    "'>Detail</a>";
                } else if (item.type == "sales") {
                  detail =
                    "<a href='/sales/invoices/edit/" +
                    item.type_uuid +
                    "'>Detail</a>";
                  module = "Sales";
                } else if (item.type == "damage") {
                  module = "Damage";
                  detail =
                    "<a href='/catalogs/damages/edit/" +
                    item.type_uuid +
                    "'>Detail</a>";
                } else if (item.type == "product") {
                  module = "Opening";
                }
                this.stockHistory.push({
                  user: item.created_by?.name,
                  module: module,
                  date: date,
                  qty: qty,
                  balance: item.balance ?? "",
                  expiry_date: item.expiry_date ?? "",
                  detail: detail,
                });
              }
            });
            this.form.add_stock = "";
            if (data[0] && data[0].balance) {
              this.form.current_quantity = data[0].balance;
            }
            // this.form.damage_qty = "";
            // this.form.damage_reason = "";
          }
          this.$store.commit("close_loader");
        })
        .catch((error) => {
          this.$store.commit("close_loader");
          console.log(error);
          this.$router.push("/products");
        });
    },
    addStock() {
      this.form.current_quantity =
        Number(this.form.original_stock) + Number(this.form.add_stock);
    },
    addStockVariation(key) {
      this.variations_form[key].current_quantity =
        Number(this.variations_form[key].original_stock) +
        Number(this.variations_form[key].add_stock);
    },
    // addDamage() {
    //   this.form.current_quantity =
    //     Number(this.form.original_stock) - Number(this.form.damage_qty);
    //   this.form.add_stock = "-" + Number(this.form.damage_qty);
    //   if (this.form.damage_qty == "") {
    //     this.form.add_stock = "";
    //   }
    // },
    currentStock() {
      this.form.add_stock =
        Number(this.form.current_quantity) - Number(this.form.original_stock);
    },
    currentVariationStock(key) {
      this.variations_form[key].add_stock =
        Number(this.variations_form[key].current_quantity) -
        Number(this.variations_form[key].original_stock);
    },
    // addVariationDamage(key) {
    //   this.variations_form[key].current_quantity =
    //     Number(this.variations_form[key].original_stock) -
    //     Number(this.variations_form[key].damage_qty);
    //   this.variations_form[key].add_stock =
    //     "-" + Number(this.variations_form[key].damage_qty);
    //   if (this.variations_form[key].damage_qty == "") {
    //     this.variations_form[key].add_stock = "";
    //   }
    // },
    getVariationsInventory() {
      this.$store.commit("set_loader");
      ProductInventoryService.getVariations(this.productId)
        .then(({ data }) => {
          if (data && data.length) {
            this.variations_form = [];
            data.forEach((element) => {
              this.variations_form.push({
                module: JSON.parse(element.name).en,
                product_variation_id: element.uuid,
                current_quantity: element.inventory[0]?.current_quantity ?? 0,
                original_stock: element.inventory[0]?.current_quantity ?? 0,
                add_stock: 0,
                is_expiry: false,
                expiry_date: "",
                // damage_qty: "",
                // damage_reason: "",
              });
            });
          }
          this.$store.commit("close_loader");
        })
        .catch((error) => {
          this.$store.commit("close_loader");
          console.log(error);
          this.$router.push("/products");
        });
    },
    saveProductInventory() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let formData = this.form;
        this.$store.commit("set_loader");
        ProductInventoryService.create(formData)
          .then((res) => {
            if (res.status == 201 || res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Product Inventory Created Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.getVariationsInventory();
              this.getProductInventory();
              this.form.expiry_date = "";
              this.form.is_expiry = false;
              this.$store.commit("close_loader");
            }
          })
          .catch((error) => {
            console.log(error);
            this.$store.commit("close_loader");
            if (error.response && error.response.status === 422) {
              let errors = error.response.data.errors;
              for (const err in errors) {
                this.$toast.error(errors[err][0]);
              }
            } else {
              this.$toast.error("Something went wrong.");
            }
          });
      }
    },
    // updateProductInventory() {
    //   this.$v.$touch();
    //   if (!this.$v.$invalid) {
    //     let formData = this.form;
    //     ProductInventoryService.update(this.productId, formData)
    //       .then((res) => {
    //         if (res.status == 200) {
    //           this.$swal.fire({
    //             icon: "success",
    //             title: "Success",
    //             text: "Product Inventory Updated Successfully",
    //             timer: 3600,
    //           });
    //           this.$v.$reset();
    //           this.getProductInventory();
    //         }
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //         this.$swal.fire({
    //           icon: "error",
    //           title: "Error",
    //           text: "Something went Wrong",
    //           timer: 3600,
    //         });
    //       });
    //   }
    // },
    saveProductVariationInventory() {
      let formData = {
        isVariation: true,
        product_id: this.productId,
        variations: this.variations_form,
      };
      this.$store.commit("set_loader");
      ProductInventoryService.createVariations(formData)
        .then((res) => {
          if (res.status == 201 || res.status == 200) {
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Product Variation Inventory Created Successfully",
              timer: 3600,
            });
            this.getVariationsInventory();
            this.getProductInventory();
            this.$store.commit("close_loader");
            this.variations_form.map((element) => {
              element.expiry_date = "";
              element.is_expiry = false;
            });
          }
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("close_loader");
          if (error.response && error.response.status === 422) {
            let errors = error.response.data.errors;
            for (const err in errors) {
              this.$toast.error(errors[err][0]);
            }
          } else {
            this.$toast.error("Something went wrong.");
          }
        });
    },
    // updateProductVariationInventory() {
    //   let formData = {
    //     isVariation: true,
    //     product_id: this.productId,
    //     variations: this.variations_form,
    //   };
    //   ProductInventoryService.updateVariations(this.productId, formData)
    //     .then((res) => {
    //       if (res.status == 200) {
    //         this.$swal.fire({
    //           icon: "success",
    //           title: "Success",
    //           text: "Product Variation Inventory Updated Successfully",
    //           timer: 3600,
    //         });
    //         this.$v.$reset();
    //         this.getVariationsInventory();
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       this.$swal.fire({
    //         icon: "error",
    //         title: "Error",
    //         text: "Something went Wrong",
    //         timer: 3600,
    //       });
    //     });
    // },
  },
};
</script>
