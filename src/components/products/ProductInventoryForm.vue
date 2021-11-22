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
            >
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Current Stock"
                    type="number"
                    min="0"
                    v-model="form.current_quantity"
                    :class="{ error: $v.form.current_quantity.$error }"
                    @input="$v.form.current_quantity.$touch()"
                  />
                  <div v-if="$v.form.current_quantity.$error">
                    <p v-if="!$v.form.current_quantity.required" class="errorMsg">
                      Stock is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Alert Quantity"
                    type="number"
                    min="0"
                    v-model="form.alert_quantity"
                    :class="{ error: $v.form.alert_quantity.$error }"
                    @input="$v.form.alert_quantity.$touch()"
                  />
                  <div v-if="$v.form.alert_quantity.$error">
                    <p v-if="!$v.form.alert_quantity.required" class="errorMsg">
                      Alert Quantity is required
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

export default {
  name: "ProductInventoryForm",
  cibAddthis,
  cisMinusSquare,
  data: () => ({
    isEditing: false,
    form: {
      product_id: "",
      current_quantity: "",
      alert_quantity: "",
    },
    productId: null,
  }),
  validations() {
    return {
      form: {
        current_quantity: { required },
        alert_quantity: { required },
      },
    };
  },
  created() {
    this.productId = this.$route.params.id;
    this.form.product_id = this.$route.params.id;
    if (this.productId) {
      this.getProductInventory();
    }
  },
  methods: {
    getProductInventory() {
      ProductInventoryService.get(this.productId)
        .then(({ data }) => {
          this.form.current_quantity = data.current_quantity ?? "";
          this.form.alert_quantity = data.alert_quantity ?? "";
          this.isEditing = true;
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
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Product Inventory Created Successfully",
                timer: 3600,
              });
              this.$v.$reset();
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
  },
};
</script>
