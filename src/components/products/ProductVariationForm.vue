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
                      <div class="col-md-3">
                        <CInput
                          label="Name"
                          :value.sync="input.name"
                          :class="{ error: $v.form.variations.$each[k].name.$error }"
                          @input="$v.form.variations.$each[k].name.$touch()"
                        />
                        <div v-if="$v.form.variations.$each[k].name.$error">
                          <p
                            v-if="!$v.form.variations.$each[k].name.required"
                            class="errorMsg"
                          >
                            Name is required
                          </p>
                        </div>
                      </div>
                      <div class="form-group col-md-6">
                        <label class="typo__label">Attributes</label>
                        <vue-tags-input
                          v-model="input.value"
                          placeholder="Search Attributes"
                          :autocomplete-items="filteredItems(k)"
                          :add-only-from-autocomplete="true"
                          :tags="input.values"
                          @tags-changed="(newTags) => (input.values = newTags)"
                          :class="{ error: $v.form.variations.$each[k].values.$error }"
                          @input="$v.form.variations.$each[k].values.$touch()"
                        />
                        <div v-if="$v.form.variations.$each[k].values.$error">
                          <p
                            v-if="!$v.form.variations.$each[k].values.required"
                            class="errorMsg mt-3"
                          >
                            Attributes is required
                          </p>
                        </div>
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
                        <!-- <i
                          @click="removeVariation(k)"
                          class="thumb"
                          v-show="k || (!k && form.variations.length > 1)"
                        > -->
                        <i
                          @click="removeVariation(k)"
                          class="thumb"
                          v-show="k || (!k && form.variations[0].uuid)"
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
              <p v-if="$v.$anyError" class="errorMsg">Please Fill the required data</p>
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
import { required } from "vuelidate/lib/validators";

export default {
  name: "ProductVariationForm",
  components: { VueTagsInput },
  cibAddthis,
  cisMinusSquare,
  data: () => ({
    isEditing: false,
    autocompleteItems: [],
    deleteRows: [],
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
  validations() {
    return {
      product_id: required,
      form: {
        variations: {
          required: true,
          $each: {
            name: { required },
            values: { required },
          },
        },
      },
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
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
      if (
        this.form.variations &&
        this.form.variations.length > 0 &&
        this.form.variations[index].uuid &&
        this.form.variations[index].uuid !== ""
      ) {
        let uuid = this.form.variations[index].uuid;
        this.deleteRows = JSON.stringify([uuid]);
        this.$swal
          .fire({
            title: "Do you want to delete this record",
            text: "This will be record from Database",
            showCancelButton: true,
            confirmButtonColor: "#e55353",
            confirmButtonText: "Yes, remove it it!",
          })
          .then((result) => {
            if (result.isConfirmed) {
              ProductVariationService.delete(this.deleteRows)
                .then((res) => {
                  if (res.status == 200) {
                    this.$swal.fire({
                      icon: "success",
                      title: "Success",
                      text: "Variation Deleted Successfully",
                      timer: 3600,
                    });
                    this.form.variations.splice(index, 1);
                    if (this.form.variations.length == 0) {
                      this.form.variations.push({
                        name: "",
                        serial_number: "",
                        barcode: "",
                        values: [],
                        value: "",
                      });
                    }
                  }
                })
                .catch((error) => {
                  this.$swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Something went Wrong",
                    timer: 3600,
                  });
                });
              this.deleteRows = [];
            }
          });
      } else {
        this.form.variations.splice(index, 1);
      }
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
          this.displayData(data);
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
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    displayData(data = null) {
      if (data && data.length) {
        this.isEditing = true;
        this.form.variations = [];
        data.forEach((element) => {
          this.form.variations.push({
            uuid: element.uuid,
            name: JSON.parse(element.name).en,
            serial_number: element.serial_number,
            barcode: element.barcode,
            values: element.values?.map((value) => {
              return {
                text: value.product_attribute.name + ": " + value.value,
                value: value.uuid,
              };
            }),
            value: "",
          });
        });
      }
    },
    saveProductVariation() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let formData = this.form;
        this.$store.commit("set_loader");
        ProductVariationService.create(formData)
          .then((res) => {
            if ((res && res.status == 200) || res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Product Variation Created Successfully",
                timer: 3600,
              });
              this.displayData(res.data);
              this.$store.commit("close_loader");
            }
          })
          .catch((error) => {
            console.log(error);
            this.$store.commit("close_loader");
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: "Something Went wrong.",
              timer: 3600,
            });
          });
      }
    },
    updateProductVariation() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let formData = this.form;
        this.$store.commit("set_loader");
        ProductVariationService.update(this.productId, formData)
          .then((res) => {
            if ((res && res.status == 200) || res.status == 201) {
              this.displayData(res.data);
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Product Variation Updated Successfully",
                timer: 3600,
              });
              this.$store.commit("close_loader");
            }
          })
          .catch((error) => {
            console.log(error);
            this.$store.commit("close_loader");
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

<style scoped>
.vue-tags-input.col-md-6 {
  min-width: 230px;
}
</style>
