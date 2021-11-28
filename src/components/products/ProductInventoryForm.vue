<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Inventory </CCardHeader>
          <CCardBody>
            <form
              @submit.prevent="
                isEditing ? updateProductInventory() : saveProductInventory()
              "
              v-if="!shouldShow"
            >
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Reorder Level"
                    type="number"
                    min="0"
                    placeholder="0"
                    v-model="form.reorder_level"
                    :class="{ error: $v.form.reorder_level.$error }"
                    @input="$v.form.reorder_level.$touch()"
                  />
                  <div v-if="$v.form.reorder_level.$error">
                    <p v-if="!$v.form.reorder_level.required" class="errorMsg">
                      Reorder Level is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Replenish Level"
                    type="number"
                    min="0"
                    placeholder="0"
                    v-model="form.replenish_level"
                    :class="{ error: $v.form.replenish_level.$error }"
                    @input="$v.form.replenish_level.$touch()"
                  />
                  <div v-if="$v.form.replenish_level.$error">
                    <p v-if="!$v.form.replenish_level.required" class="errorMsg">
                      Replenish Level is required
                    </p>
                  </div>
                </CCol>

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
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Recieving Price"
                    type="number"
                    min="0"
                    placeholder="0"
                    v-model="form.recieving_price"
                    :class="{ error: $v.form.recieving_price.$error }"
                    @input="$v.form.recieving_price.$touch()"
                  />
                  <div v-if="$v.form.recieving_price.$error">
                    <p v-if="!$v.form.recieving_price.required" class="errorMsg">
                      Recieving Price is required
                    </p>
                  </div>
                </CCol>

                <CCol sm="6" md="4" class="pt-2">
                  <CTextarea
                    label="Remarks"
                    placeholder="Content..."
                    v-model="form.remarks"
                    :class="{ error: $v.form.remarks.$error }"
                    @input="$v.form.remarks.$touch()"
                  />
                  <div v-if="$v.form.remarks.$error">
                    <p v-if="!$v.form.remarks.required" class="errorMsg">
                      Remarks is required
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

            <form
              v-if="shouldShow"
              @submit.prevent="
                isVariationEditing
                  ? updateProductVariationInventory()
                  : saveProductVariationInventory()
              "
            >
              <CRow v-for="(input, k) in variations_form" :key="k">
                <CCol sm="6" md="2" class="pt-2">
                  <CInput label="Name" v-model="input.variation_name" disabled />
                </CCol>
                <CCol sm="6" md="2" class="pt-2">
                  <CInput label="Value" v-model="input.product_attribute" disabled />
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Reorder Level"
                    type="number"
                    min="0"
                    placeholder="0"
                    v-model="input.reorder_level"
                  />
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Replenish Level"
                    type="number"
                    min="0"
                    placeholder="0"
                    v-model="input.replenish_level"
                  />
                </CCol>

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
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Recieving Price"
                    type="number"
                    min="0"
                    placeholder="0"
                    v-model="input.recieving_price"
                  />
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CTextarea
                    label="Remarks"
                    placeholder="Content..."
                    v-model="input.remarks"
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
            <div>
              <br />
              <br />
              <CDataTable :items="stockHistory" :fields="fields">
                <template #product_variation="{ item }">
                  <td>
                    {{ item.product_variation ? item.product_variation : "" }}
                  </td>
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
  { key: "product_variation", label: "VARIATION", _style: "min-width:15%;" },
  { key: "type", label: "TYPE", _style: "min-width:15%;" },
  { key: "add_subtract_stock", label: "In/Out Qty", _style: "min-width:15%;" },
  { key: "stock", label: "STOCK", _style: "min-width:15%;" },
  { key: "recieving_price", label: "RECIEVING PRICE", _style: "min-width:15%;" },
  { key: "remarks", label: "REMARKS", _style: "min-width:15%;" },
];

export default {
  name: "ProductInventoryForm",
  cibAddthis,
  cisMinusSquare,
  data: () => ({
    shouldShow: false,
    isEditing: false,
    isVariationEditing: false,
    stockHistory: [],
    fields,
    form: {
      product_id: "",
      reorder_level: "",
      replenish_level: "",
      current_quantity: "",
      original_stock: "",
      add_subtract_stock: "",
      remarks: "",
      recieving_price: "",
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
        reorder_level: { required },
        replenish_level: { required },
        current_quantity: { required },
        add_subtract_stock: { required },
        remarks: { required },
        recieving_price: { required },
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
      ProductInventoryService.get(this.productId)
        .then(({ data }) => {
          if (data !== "" && data !== undefined && data.uuid) {
            this.form.reorder_level = Number(data.reorder_level) ?? "";
            this.form.replenish_level = Number(data.replenish_level) ?? "";
            this.form.current_quantity = Number(data.current_quantity) ?? "";
            this.form.original_stock = Number(data.current_quantity) ?? "";
            this.form.add_subtract_stock = "";
            this.form.remarks = "";
            this.form.recieving_price = "";
            this.form.damage_qty = "";
            this.form.damage_reason = "";
            this.isEditing = true;

            if (data.history) {
              this.stockHistory = [];
              data.history.map((item, id) => {
                this.stockHistory.push({ ...item, id });
              });
            }
          }
          if (this.variations_form && this.variations_form.length > 0) {
            this.shouldShow = true;
          } else {
            this.shouldShow = false;
          }
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
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
            this.isVariationEditing = true;
            this.variations_form = [];
            data.forEach((element) => {
              this.variations_form.unshift({
                uuid: element.inventable.inventory.uuid,
                variation_name: element.inventable.name,
                product_variation_id: element.inventable.uuid,
                product_attribute:
                  element.inventable.product_attribute.name +
                  ":" +
                  element.inventable.product_attribute_value.value,
                reorder_level: element.reorder_level,
                replenish_level: element.replenish_level,
                current_quantity: element.current_quantity,
                original_stock: element.current_quantity,
                add_subtract_stock: "",
                remarks: "",
                recieving_price: "",
                damage_qty: "",
                damage_reason: "",
              });
            });

            if (data.length > 0) {
              this.stockHistory = [];
              data.forEach((element) => {
                element.history.map((item, id) => {
                  this.stockHistory.push({ ...item, id });
                });
              });
            }
          }

          if (this.variations_form && this.variations_form.length > 0) {
            this.shouldShow = true;
          } else {
            this.shouldShow = false;
          }
        })
        .catch((error) => {
          console.log(error);
          this.isVariationEditing = false;
        });
    },
    saveProductInventory() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let formData = this.form;

        ProductInventoryService.create(formData)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Product Inventory Created Successfully",
                timer: 3600,
              });
              this.$v.$reset();
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
    updateProductInventory() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let formData = this.form;
        ProductInventoryService.update(this.productId, formData)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Product Inventory Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.getProductInventory();
            }
          })
          .catch((error) => {
            console.log(error);
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: "Something went Wrong",
              timer: 3600,
            });
          });
      }
    },
    saveProductVariationInventory() {
      let formData = {
        isVariation: true,
        product_id: this.productId,
        variations: this.variations_form,
      };

      ProductInventoryService.createVariations(formData)
        .then((res) => {
          if (res.status == 201) {
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Product Variation Inventory Created Successfully",
              timer: 3600,
            });
            this.getVariationsInventory();
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
    updateProductVariationInventory() {
      let formData = {
        isVariation: true,
        product_id: this.productId,
        variations: this.variations_form,
      };
      ProductInventoryService.updateVariations(this.productId, formData)
        .then((res) => {
          if (res.status == 200) {
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Product Variation Inventory Updated Successfully",
              timer: 3600,
            });
            this.$v.$reset();
            this.getVariationsInventory();
          }
        })
        .catch((error) => {
          console.log(error);
          this.$swal.fire({
            icon: "error",
            title: "Error",
            text: "Something went Wrong",
            timer: 3600,
          });
        });
    },
  },
};
</script>
