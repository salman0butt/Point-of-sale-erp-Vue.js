<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Variations </CCardHeader>
          <CCardBody>
            <form
              @submit.prevent="
                isEditing ? updateProductVariation() : saveProductVariation()
              "
            >
              <CRow>
                <CCol sm="12" md="12" class="pt-2">
                  <div class="form-group" v-for="(input, k) in form.variations" :key="k">
                    <CRow>
                      <CInput label="Name" class="col-md-3" :value.sync="input.name" />
                      <CSelect
                        label="Attribute"
                        class="col-md-3"
                        :options="options.attributes"
                        :value.sync="input.product_attribute_id"
                        @change="selectAttribute(k)"
                      />
                      <CSelect
                        label="Value"
                        class="col-md-3"
                        :options="input.options.attribute_values"
                        :value.sync="input.product_attribute_value_id"
                      />
                      <CInput
                        label="Cost Price"
                        placeholder="0.00"
                        type="number"
                        class="col-md-3"
                        :value.sync="input.cost_price"
                      />
                      <CInput
                        label="Selling Price"
                        placeholder="0.00"
                        type="number"
                        class="col-md-3"
                        :value.sync="input.selling_price"
                      />
                      <span class="ml-4 mt-4">
                        <i
                          @click="removeVariation(k)"
                          class="thumb"
                          v-show="k || (!k && form.variations.length > 1)"
                        >
                          <CIcon :content="$options.cisMinusSquare" /> Remove</i
                        ><br />
                        <i
                          class="thumb"
                          @click="addVariation(k)"
                          v-show="k == form.variations.length - 1"
                          ><CIcon :content="$options.cibAddthis" /> Add More</i
                        >
                      </span>
                    </CRow>
                  </div>
                </CCol>
              </CRow>

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
import ProductVariationService from "@/services/products/ProductVariationService";
import { cibAddthis, cisMinusSquare } from "@coreui/icons-pro";

export default {
  name: "ProductVariationForm",
  cibAddthis,
  cisMinusSquare,
  data: () => ({
    isEditing: false,
    form: {
      product_id: "",
      variations: [
        {
          name: "",
          product_attribute_id: "",
          product_attribute_value_id: "",
          cost_price: "",
          selling_price: "",
          options: {
            attribute_values: [
              { value: "", label: "Choose Value", disabled: true, selected: "" },
            ],
          },
        },
      ],
    },
    productId: "",
    allOptions: [],
    options: {
      attributes: [
        { value: "", label: "Choose Attribute", disabled: true, selected: "" },
      ],
    },
  }),
  created() {
    this.productId = this.$route.params.id;
    this.form.product_id = this.$route.params.id;
    this.getProductVariationOptions();
    if (this.productId !== "" && this.productId !== undefined) {
      this.getProductVariation();
    }
  },
  methods: {
    addVariation() {
      this.form.variations.push({
        name: "",
        product_attribute_id: "",
        product_attribute_value_id: "",
        cost_price: "",
        selling_price: "",
        options: {
          attribute_values: [
            { value: "", label: "Choose Value", disabled: true, selected: "" },
          ],
        },
      });
    },
    removeVariation(index) {
      this.form.variations.splice(index, 1);
    },
    getProductVariation() {
      ProductVariationService.get(this.productId)
        .then(({ data }) => {
          if (data && data.length) {
            this.isEditing = true;
            this.form.variations = [];
            data.forEach((element, index) => {
              this.form.variations.unshift({
                uuid: element.uuid,
                name: element.name,
                product_attribute_id: element.product_attribute.uuid,
                product_attribute_value_id: element.product_attribute_value.uuid,
                cost_price: element.product_sku.cost_price,
                selling_price: element.product_sku.selling_price,
                options: {
                  attribute_values: [
                    {
                      value: element.product_attribute_value.uuid,
                      label: "Choose Value",
                    },
                  ],
                },
              });
            });
            this.getSelectVariation();
          }
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
          this.$router.push({ path: "/products" });
        });
    },
    getProductVariationOptions() {
      ProductVariationService.getProductVariationOptions(this.productId)
        .then(({ data }) => {
          if (data && data.length) {
            data.forEach((element) => {
              this.options.attributes.push({
                label: element.name,
                value: element.uuid,
              });
              this.allOptions.push({
                uuid: element.uuid,
                name: element.name,
                values: element.values,
              });
              // element.values.forEach((value) => {
              //   this.options.attribute_values.push({
              //     label: value.value,
              //     value: value.uuid,
              //   });
              // });
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getSelectVariation() {
      this.form.variations.map((element, index) => {
        this.allOptions.map((option) => {
          if (element.product_attribute_id === option.uuid) {
            element.options.attribute_values = option.values.map((value) => {
              return {
                label: value.value,
                value: value.uuid,
              };
            });
          }
        });
      });
      // this.allOptions.map((element) => {
      //   if (element.uuid === attribute_id) {
      //     this.form.variations[index].options.attribute_values = element.values.map(
      //       (value) => {
      //         return {
      //           label: value.value,
      //           value: value.uuid,
      //         };
      //       }
      //     );
      //   }
      // });
    },
    selectAttribute(index) {
      let attribute_id = this.form.variations[index].product_attribute_id;
      this.allOptions.map((element) => {
        if (element.uuid === attribute_id) {
          this.form.variations[index].options.attribute_values = element.values.map(
            (value) => {
              return {
                label: value.value,
                value: value.uuid,
              };
            }
          );
        }
      });
      this.form.variations[index].options.attribute_values.unshift({
        value: "",
        label: "Choose Value",
        disabled: true,
        selected: "",
      });
    },
    saveProductVariation() {
      let formData = this.form;
      ProductVariationService.create(formData)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Product Variation Created Successfully",
              timer: 3600,
            });
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
    updateProductVariation() {
      let formData = this.form;
      ProductVariationService.update(this.productId, formData)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Product Variation Updated Successfully",
              timer: 3600,
            });
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
