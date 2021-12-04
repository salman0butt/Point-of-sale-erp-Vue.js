<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Prices </CCardHeader>
          <CCardBody>
            <form @submit.prevent="isEditing ? updateProductPrice() : saveProductPrice()">
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Cost Price"
                    type="number"
                    v-model="product.cost_price"
                    :class="{ error: $v.product.cost_price.$error }"
                    @input="$v.product.cost_price.$touch()"
                  />
                  <div v-if="$v.product.cost_price.$error">
                    <p v-if="!$v.product.cost_price.required" class="errorMsg">
                      Cost Price is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Selling Price"
                    type="number"
                    v-model="product.selling_price"
                    :class="{ error: $v.product.selling_price.$error }"
                    @input="$v.product.selling_price.$touch()"
                  />
                  <div v-if="$v.product.selling_price.$error">
                    <p v-if="!$v.product.selling_price.required" class="errorMsg">
                      Selling Price is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="3" md="3" class="pt-2 mt-4">
                  <CInputCheckbox
                    custom
                    :checked="product.is_vat_included"
                    label="Is Vat Include"
                    @change="toggleIsVat()"
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
            <br />
            <CCardHeader> Variations </CCardHeader>
            <form
              @submit.prevent="
                isVariationEditing
                  ? updateProductVariationPrice()
                  : saveProductVariationPrice()
              "
            >
              <CRow>
                <CCol sm="12" md="12" class="pt-2">
                  <div class="form-group" v-for="(input, k) in variations" :key="k">
                    <CRow>
                      <CCol sm="6" md="3" class="pt-2">
                        <CInput label="Name" readonly :value.sync="input.name" />
                      </CCol>
                      <!-- <CCol sm="6" md="3" class="pt-2">
                        <CInput label="Attributes" readonly :value.sync="input.values" />
                      </CCol> -->
                      <CCol sm="6" md="3" class="pt-2">
                        <CInput
                          label="Cost Price"
                          type="number"
                          v-model="input.cost_price"
                        />
                      </CCol>
                      <CCol sm="6" md="3" class="pt-2">
                        <CInput
                          label="Selling Price"
                          type="number"
                          v-model="input.selling_price"
                        />
                      </CCol>
                    </CRow>
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
import ProductPriceService from "@/services/products/ProductPriceService";
import ProductVariationService from "@/services/products/ProductVariationService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "ProductPriceForm",
  data: () => ({
    isEditing: false,
    isVariationEditing: false,
    product: {
      id: "",
      product_id: "",
      type: "product",
      cost_price: "",
      selling_price: "",
      is_vat_included: false,
    },
    variations: [
      {
        id: "",
        name: "",
        type: "variation",
        serial_number: "",
        barcode: "",
        values: [],
        cost_price: "",
        selling_price: "",
        is_vat_included: false,
      },
    ],
    productId: "",
  }),
  validations() {
    return {
      product: {
        product_id: { required },
        cost_price: { required },
        selling_price: { required },
      },
    };
  },
  created() {
    this.productId = this.$route.params.id;
    this.product.product_id = this.$route.params.id;
    if (this.productId) {
      this.getProductPrice();
      this.getProductVariation();
    }
  },
  methods: {
    toggleIsVat() {
      this.product.is_vat_included = !this.product.is_vat_included;
    },
    getProductPrice() {
      ProductPriceService.get(this.productId)
        .then(({ data }) => {
          if (data !== "" && data !== null && data !== undefined && data.uuid) {
            this.isEditing = true;
            this.product.id = data.uuid;
            this.product.cost_price = data.cost_price;
            this.product.selling_price = data.selling_price;
            this.product.is_vat_included = data.is_vat_included === 1 ? true : false;
          }
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
          // this.$router.push({ path: "/products" });
        });
    },
    getProductVariation() {
      ProductVariationService.get(this.productId)
        .then(({ data }) => {
          if (data !== "" && data !== null && data !== undefined && data.length) {
            this.isVariationEditing = true;
            this.variations = [];
            data.forEach((element) => {
              this.variations.unshift({
                uuid: element.uuid,
                name: JSON.parse(element.name).en,
                // values: element.values
                //   .map((value) => {
                //     return value.product_attribute.name + ": " + value.value;
                //   })
                //   .join(","),
                cost_price: element.price?.cost_price ?? "",
                selling_price: element.price?.selling_price ?? "",
              });
            });
          }
        })
        .catch((error) => {
          console.log(error);
          this.isVariationEditing = false;
          // this.$router.push({ path: "/products" });
        });
    },
    saveProductPrice() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let formData = this.product;
        ProductPriceService.create(formData)
          .then((res) => {
            if (res.status == 200 || res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Prices Created Successfully",
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
    saveProductVariationPrice() {
      let formData = {
        type: "variation",
        variations: this.variations,
      };
      ProductPriceService.create(formData)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Prices Created Successfully",
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
    },
    updateProductPrice() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let formData = this.product;
        ProductPriceService.update(this.product.id, formData)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Prices Updated Successfully",
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
    updateProductVariationPrice() {
      let formData = {
        type: "variation",
        variations: this.variations,
        product_id: this.productId,
      };
      ProductPriceService.update(this.productId, formData)
        .then((res) => {
          if (res.status == 200) {
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Prices Updated Successfully",
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
    },
  },
};
</script>
