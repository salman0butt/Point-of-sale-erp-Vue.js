<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Inventory </CCardHeader>
          <CCardBody>
            <form @submit.prevent="saveProductInventory()">
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Current Stock"
                    @change="currentStock()"
                    type="number"
                    min="0"
                    placeholder="0"
                    v-model="form.current_quantity"
                    :class="{ error: $v.form.current_quantity.$error }"
                    @input="$v.form.current_quantity.$touch()"
                  />
                  <div v-if="$v.form.current_quantity.$error">
                    <p v-if="!$v.form.current_quantity.required" class="errorMsg">
                      Current Stock is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
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
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Add/Subtract Stock"
                    type="number"
                    @change="addSubtract()"
                    placeholder="0"
                    v-model="form.add_subtract_stock"
                    :class="{ error: $v.form.add_subtract_stock.$error }"
                    @input="$v.form.add_subtract_stock.$touch()"
                  />
                  <div v-if="$v.form.add_subtract_stock.$error">
                    <p v-if="!$v.form.add_subtract_stock.required" class="errorMsg">
                      Add/Subtract Stock is required
                    </p>
                  </div>
                </CCol>
              </CRow>

              <p v-if="$v.$anyError" class="errorMsg">Please Fill the required data</p>
              <CRow class="mt-4 d-block">
                <CButton
                  progress
                  timeout="2000"
                  block
                  color="success"
                  style="float: right; width: 150px; margin-right: 20px"
                  type="submit"
                  >Save</CButton
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
                    <CInput label="Name" v-model="input.variation_name" disabled />
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
                    />
                  </CCol>
                  <CCol sm="6" md="4" class="pt-2">
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
                  </CCol>

                  <CCol sm="6" md="4" class="pt-2">
                    <CInput
                      label="Add/Subtract Stock"
                      type="number"
                      @change="addSubtractVariation(k)"
                      placeholder="0"
                      v-model="input.add_subtract_stock"
                    />
                  </CCol>
                </CRow>

                <p v-if="$v.$anyError" class="errorMsg">Please Fill the required data</p>
                <CRow class="mt-4 d-block">
                  <CButton
                    progress
                    timeout="2000"
                    block
                    color="success"
                    style="float: right; width: 150px; margin-right: 20px"
                    type="submit"
                    >Save</CButton
                  >
                </CRow>
              </form>
            </div>
            <div>
              <br />
              <br />
              <CDataTable :items="stockHistory" :fields="fields" :loading="loading">
                <template #variation_name="{ item }">
                  <td v-if="item.variation_name">
                    {{
                      item.variation_name && JSON.parse(item.variation_name)
                        ? JSON.parse(item.variation_name).en
                        : ""
                    }}
                  </td>
                  <td v-else></td>
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
import { required } from "vuelidate/lib/validators";
import { cibAddthis, cisMinusSquare } from "@coreui/icons-pro";

const fields = [
  { key: "date", label: "DATE", _style: "min-width:40%" },
  { key: "variation_name", label: "VARIATION", _style: "min-width:15%;" },
  { key: "qty", label: "In/Out Qty", _style: "min-width:15%;" },
];

export default {
  name: "ProductInventoryForm",
  cibAddthis,
  cisMinusSquare,
  data: () => ({
    shouldShow: false,
    // isEditing: false,
    // isVariationEditing: false,
    stockHistory: [],
    loading: false,
    fields,
    form: {
      product_id: "",
      current_quantity: "",
      original_stock: "",
      add_subtract_stock: "",
      damage_qty: "",
      damage_reason: "",
    },
    isVariation: false,
    variations_form: [],
    productId: "",
  }),
  validations() {
    return {
      form: {
        product_id: { required },
        current_quantity: { required },
        add_subtract_stock: { required },
      },
    };
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
    getProductInventory() {
      this.loading = true;
      ProductInventoryService.get(this.productId)
        .then(({ data }) => {
          if (data !== "" && data !== undefined && data.length) {
            this.stockHistory = [];
            data.forEach((item) => {
              if (item.type === "product" && item.current_quantity !== 0) {
                this.form.current_quantity = Number(item.current_quantity) ?? "";
                this.form.original_stock = Number(item.current_quantity) ?? "";
              }
              if (item.type === "variation" && item.inventable) {
                let date = item.date;
                let qty = item.qty;
                this.stockHistory.push({
                  variation_name: item.inventable.name,
                  date: date,
                  qty: qty,
                });
              }
              if (item.type === "product" && item.inventable) {
                let date = item.date;
                let qty = item.qty;
                this.stockHistory.push({
                  variation_name: "",
                  date: date,
                  qty: qty,
                });
              }
            });
            this.form.add_subtract_stock = "";
            this.form.damage_qty = "";
            this.form.damage_reason = "";
          }
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addSubtract() {
      this.form.current_quantity =
        Number(this.form.original_stock) + Number(this.form.add_subtract_stock);
    },
    addSubtractVariation(key) {
      this.variations_form[key].current_quantity =
        Number(this.variations_form[key].original_stock) +
        Number(this.variations_form[key].add_subtract_stock);
    },
    addDamage() {
      this.form.current_quantity =
        Number(this.form.original_stock) - Number(this.form.damage_qty);
      this.form.add_subtract_stock = "-" + Number(this.form.damage_qty);
      if (this.form.damage_qty == "") {
        this.form.add_subtract_stock = "";
      }
    },
    currentStock() {
      this.form.add_subtract_stock =
        Number(this.form.current_quantity) - Number(this.form.original_stock);
    },
    currentVariationStock(key) {
      this.variations_form[key].add_subtract_stock =
        Number(this.variations_form[key].current_quantity) -
        Number(this.variations_form[key].original_stock);
    },
    addVariationDamage(key) {
      this.variations_form[key].current_quantity =
        Number(this.variations_form[key].original_stock) -
        Number(this.variations_form[key].damage_qty);
      this.variations_form[key].add_subtract_stock =
        "-" + Number(this.variations_form[key].damage_qty);
      if (this.variations_form[key].damage_qty == "") {
        this.variations_form[key].add_subtract_stock = "";
      }
    },
    getVariationsInventory() {
      ProductInventoryService.getVariations(this.productId)
        .then(({ data }) => {
          if (data && data.length) {
            this.variations_form = [];
            data.forEach((element) => {
              this.variations_form.unshift({
                variation_name: JSON.parse(element.name).en,
                product_variation_id: element.uuid,
                current_quantity: element.inventory[0]?.current_quantity ?? 0,
                original_stock: element.inventory[0]?.current_quantity ?? 0,
                add_subtract_stock: 0,
                damage_qty: "",
                damage_reason: "",
              });
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    saveProductInventory() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let formData = this.form;

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
            }
          })
          .catch((error) => {
            console.log(error);
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: "Something Went wrong.",
              timer: 3600,
            });
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
          }
        })
        .catch((error) => {
          console.log(error);
          this.$swal.fire({
            icon: "error",
            title: "Error",
            text: "Something Went wrong.",
            timer: 3600,
          });
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
