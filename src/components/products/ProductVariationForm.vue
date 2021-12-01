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
                      <div class="form-group">
                        <label class="typo__label">Attributes</label>
                        <vue-tags-input
                          v-model="input.value"
                          class="col-md-6"
                          placeholder="Attributes"
                          :autocomplete-items="filteredItems(k)"
                          :add-only-from-autocomplete="true"
                          :tags="input.values"
                          @tags-changed="(newTags) => (input.values = newTags)"
                        />
                      </div>
                      <CInput
                        label="Serial Number"
                        class="col-md-3"
                        :value.sync="input.serial_number"
                      />
                      <CInput
                        label="Barcode"
                        class="col-md-3"
                        :value.sync="input.barcode"
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
import { VueTagsInput } from "@johmun/vue-tags-input";

export default {
  name: "ProductVariationForm",
  components: { VueTagsInput },
  cibAddthis,
  cisMinusSquare,
  data: () => ({
    isEditing: false,
    autocompleteItems: [],
    form: {
      product_id: "",
      variations: [
        {
          name: "",
          serial_number: "",
          barcode: "",
          values: [],
          value: "",
        },
      ],
    },
    productId: "",
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
        serial_number: "",
        barcode: "",
        values: [],
        value: "",
      });
    },
    removeVariation(index) {
      this.form.variations.splice(index, 1);
    },
    filteredItems(key) {
      if (this.autocompleteItems.length === 0) return;
      return this.autocompleteItems.filter((i) => {
        return (
          i.text.toLowerCase().indexOf(this.form.variations[key].value.toLowerCase()) !==
          -1
        );
      });
    },
    getProductVariation() {
      ProductVariationService.get(this.productId)
        .then(({ data }) => {
          if (data && data.length) {
            this.isEditing = true;
            this.form.variations = [];
            data.forEach((element) => {
              this.form.variations.unshift({
                uuid: element.uuid,
                name: JSON.parse(element.name).en,
                serial_number: element.serial_number,
                barcode: element.barcode,
                values: element.values.map((value) => {
                  return {
                    text: value.product_attribute.name + ": " + value.value,
                    value: value.uuid,
                  };

                  // return this.autocompleteItems.map((item) => {
                  //   if (item.value === value.uuid) {
                  //     return item;
                  //   }
                  // });
                }),
                value: "",
              });
            });
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
              let name = element.name;
              if (element.values && element.values.length) {
                element.values.forEach((value) => {
                  this.autocompleteItems.push({
                    text: name + ": " + value.value,
                    value: value.uuid,
                  });
                });
              }

              // this.allOptions.push({
              //   uuid: element.uuid,
              //   name: element.name,
              //   values: element.values,
              // });
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    saveProductVariation() {
      let formData = this.form;
      ProductVariationService.create(formData)
        .then((res) => {
          if ((res && res.status == 200) || res.status == 201) {
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
          if ((res && res.status == 200) || res.status == 201) {
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

<style scoped>
.vue-tags-input.col-md-6 {
  min-width: 230px;
}
</style>
