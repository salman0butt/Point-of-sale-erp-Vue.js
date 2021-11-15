<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardBody>
            <form @submit.prevent="isEditing ? updateProduct() : saveProduct()">
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Name"
                    v-model="form.name"
                    :class="{ error: $v.form.name.$error }"
                    @input="$v.form.name.$touch()"
                  />
                  <div v-if="$v.form.name.$error">
                    <p v-if="!$v.form.name.required" class="errorMsg">Name is required</p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Type"
                    :options="options.types"
                    :value.sync="form.type"
                    :class="{ error: $v.form.type.$error }"
                    @input="$v.form.type.$touch()"
                  />
                  <div v-if="$v.form.type.$error">
                    <p v-if="!$v.form.type.required" class="errorMsg">Type is required</p>
                  </div>
                </CCol>

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
              </CRow>
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Brand"
                    :options="options.brands"
                    :value.sync="form.brand_id"
                    :class="{ error: $v.form.brand_id.$error }"
                    @input="$v.form.brand_id.$touch()"
                  />
                  <div v-if="$v.form.brand_id.$error">
                    <p v-if="!$v.form.brand_id.required" class="errorMsg">
                      Brand is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Cost Price"
                    type="number"
                    :value.sync="form.cost_price"
                    placeholder="0.00"
                    :class="{ error: $v.form.cost_price.$error }"
                    @input="$v.form.cost_price.$touch()"
                  />
                  <div v-if="$v.form.cost_price.$error">
                    <p v-if="!$v.form.cost_price.required" class="errorMsg">
                      Cost Price is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Selling Price"
                    type="number"
                    placeholder="0.00"
                    :value.sync="form.selling_price"
                    :class="{ error: $v.form.selling_price.$error }"
                    @input="$v.form.selling_price.$touch()"
                  />
                  <div v-if="$v.form.selling_price.$error">
                    <p v-if="!$v.form.selling_price.required" class="errorMsg">
                      Selling Price is required
                    </p>
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput label="Barcode" :value.sync="form.barcode" />
                </CCol>
                <CCol sm="6" md="4" class="pt-2" id="categories">
                  <label class="typo__label">Categories</label>
                  <multiselect
                    v-model="form.categories"
                    :options="options.categories"
                    :multiple="true"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    placeholder="Select Categories"
                    label="label"
                    track-by="label"
                    :preselect-first="true"
                  >
                    <template slot="selection" slot-scope="{ values, search, isOpen }">
                      <span
                        class="multiselect__single"
                        v-if="values.value &amp;&amp; !isOpen"
                        >{{ values.length }} options selected</span
                      ></template
                    >
                  </multiselect>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <label class="typo__label">Branches</label>
                  <multiselect
                    v-model="form.branches"
                    :options="options.branches"
                    :multiple="true"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    placeholder="Select Branches"
                    label="label"
                    track-by="label"
                    :preselect-first="true"
                  >
                    <template slot="selection" slot-scope="{ values, search, isOpen }">
                      <span
                        class="multiselect__single"
                        v-if="values.value &amp;&amp; !isOpen"
                        >{{ values.length }} options selected</span
                      ></template
                    >
                  </multiselect>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="12" md="12" class="pt-2">
                  <label class="typo__label">Short Description</label>
                  <vue-editor v-model="form.short_description"></vue-editor>
                  <!-- <CTextarea
                    label="Short Description"
                    placeholder="Content..."
                    v-model="form.short_description"
                  /> -->
                </CCol>
                <CCol sm="12" md="12" class="pt-2">
                  <label class="typo__label">Long Description</label>
                  <vue-editor v-model="form.product_description"></vue-editor>
                  <!-- <CTextarea
                    label="Long Description"
                    placeholder="Content..."
                    v-model="form.product_description"
                  /> -->
                </CCol>
              </CRow>

              <CRow>
                <CCol v-if="isEditing" sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Status"
                    :options="options.status"
                    :value.sync="form.status"
                  />
                </CCol>
                <CCol sm="3" md="3" class="pt-2">
                  <CInputCheckbox
                    custom
                    :checked="form.is_ecommerce_product"
                    label="is Ecommerce Product"
                  />
                </CCol>
                <CCol sm="3" md="3" class="pt-2">
                  <CInputCheckbox
                    custom
                    :checked="form.is_vat_include"
                    label="is Vat (included)"
                  />
                </CCol>
                <CCol sm="3" md="3" class="pt-2">
                  <CInputCheckbox
                    custom
                    :checked="form.is_favorite"
                    label="is Favorite"
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="12" md="12" class="pt-2">
                  <div
                    class="form-group"
                    v-for="(input, k) in form.serial_numbers"
                    :key="k"
                  >
                    <CRow>
                      <CInput
                        label="Serial Number"
                        class="col-md-4"
                        :value.sync="input.serial_no"
                      />
                      <CInput
                        type="number"
                        label="Cost Price"
                        class="col-md-4"
                        :value.sync="input.cost_price"
                      />
                      <CInput
                        type="number"
                        label="Selling Price"
                        class="col-md-4"
                        :value.sync="input.selling_price"
                      />
                      <span class="ml-4">
                        <i
                          @click="removeSerial(k)"
                          class="thumb"
                          v-show="k || (!k && form.serial_numbers.length > 1)"
                        >
                          <CIcon :content="$options.cisMinusSquare" /> Remove</i
                        ><br />
                        <i
                          class="thumb"
                          @click="addSerial(k)"
                          v-show="k == form.serial_numbers.length - 1"
                          ><CIcon :content="$options.cibAddthis" /> Add More</i
                        >
                      </span>
                    </CRow>
                  </div>
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
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import ProductService from "@/services/products/ProductService";
import { required, email, numeric, minLength, maxLength } from "vuelidate/lib/validators";
import Multiselect from "vue-multiselect";
import { VueEditor } from "vue2-editor";
import { cibAddthis, cisMinusSquare } from "@coreui/icons-pro";

export default {
  name: "ProductForm",
  components: { Multiselect, VueEditor },
  cibAddthis,
  cisMinusSquare,
  data: () => ({
    isEditing: false,
    saveAndExit: false,
    form: {
      name: "",
      type: "",
      supplier_id: "",
      brand_id: "",
      barcode: "",
      cost_price: "",
      selling_price: "",
      short_description: "",
      product_description: "",
      is_ecommerce_product: "",
      is_vat_include: "",
      is_favorite: "",
      categories: "",
      branches: "",
      images: "",
      status: "",
      serial_numbers: [
        {
          serial_no: "",
          cost_price: "",
          selling_price: "",
        },
      ],
    },
    productId: null,
    options: {
      suppliers: [
        {
          value: "",
          label: "Choose Supplier",
          disabled: true,
          selected: "",
        },
      ],
      brands: [
        {
          value: "",
          label: "Choose Brand",
          disabled: true,
          selected: "",
        },
      ],
      categories: [],
      branches: [],
      types: [
        {
          value: "",
          label: "Choose Type",
          disabled: true,
          selected: "",
        },
        {
          value: "product",
          label: "Product",
        },
        {
          value: "service",
          label: "Service",
        },
        {
          value: "subscription",
          label: "Subscription",
        },
      ],
      status: [
        { value: "", label: "Choose Status", disabled: true, selected: "" },
        { value: "active", label: "Active" },
        { value: "inactive", label: "InActive" },
      ],
    },
  }),
  validations() {
    return {
      form: {
        name: { required },
        type: { required },
        supplier_id: { required },
        brand_id: { required },
        cost_price: { required },
        selling_price: { required },
      },
    };
  },
  created() {
    this.productId = this.$route.params.id;
    this.getProductOptions();
    if (this.productId) {
      this.getProduct();
      this.isEditing = true;
    }
  },
  methods: {
    getProductOptions() {
      ProductService.getProductOptions()
        .then(({ data }) => {
          let suppliers = this.options.suppliers;
          let brands = this.options.brands;
          let categories = this.options.categories;
          let branches = this.options.branches;

          if (data.suppliers) {
            data.suppliers.map(function (val) {
              suppliers.push({ value: val.uuid, label: val.name });
            });
          }

          if (data.brands) {
            data.brands.map(function (val) {
              brands.push({ value: val.uuid, label: val.name });
            });
          }

          if (data.categories) {
            data.categories.map(function (val) {
              categories.push({ value: val.uuid, label: val.name });
            });
          }

          if (data.branches) {
            data.branches.map(function (val) {
              branches.push({ value: val.uuid, label: val.name });
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addSerial() {
      this.form.serial_numbers.push({ name: "", cost_price: "", selling_price: "" });
    },
    removeSerial(index) {
      this.form.serial_numbers.splice(index, 1);
    },
    getProduct() {
      ProductService.get(this.productId)
        .then(({ data }) => {
          this.form.name = data.name ?? "";
          this.form.type = data.type ?? "";
          this.form.supplier_id = data.supplier_id ?? "";
          this.form.brand_id = data.brand_id ?? "";
          this.form.barcode = data.barcode ?? "";
          this.form.cost_price = data.cost_price ?? "";
          this.form.selling_price = data.selling_price ?? "";
          this.form.short_description = data.short_description ?? "";
          this.form.product_description = data.product_description ?? "";
          this.form.is_ecommerce_product = data.is_ecommerce_product ?? "";
          this.form.is_vat_include = data.is_vat_include ?? "";
          this.form.is_favorite = data.is_favorite ?? "";
          this.form.categories = data.categories ?? "";
          this.form.branches = data.branches ?? "";
          this.form.images = data.images ?? "";
          this.form.status = data.status ?? "";
        })
        .catch((error) => {
          console.log(error);
        });
    },
    saveProduct() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.form.status = "active";
        const config = {
          headers: { "Content-Type": "multipart/form-data" },
        };
        let formData = this.formData();

        ProductService.create(formData, config)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Product Created Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              if (this.saveAndExit) {
                this.$router.push({ path: "/products/index" });
              } else {
                this.$router.push({ path: "/products/edit/" + res.data.uuid });
              }
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
    updateProduct() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const config = {
          headers: { "Content-Type": "multipart/form-data" },
        };
        let formData = this.formData(true);
        ProductService.update(this.productId, formData, config)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Product Updated Successfully",
                timer: 3600,
              });
              if (res.data.personal_photo !== "") {
                this.$store.commit("set_emp_img", res.data.personal_photo);
                if (res.data.uuid && res.data.uuid === this.$store.state.employee_id) {
                  this.$store.commit("set_profile_img", res.data.personal_photo);
                }
              }

              this.$v.$reset();
              if (this.saveAndExit) {
                this.$router.push({ path: "/products/index" });
              } else {
                this.$router.push({ path: "/products/edit/" + res.data.uuid });
              }
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
    formData(update = false) {
      let formData = new FormData();
      for (const index in this.form) {
        if (index === "images") {
          for (const img of this.form.images) {
            formData.append("images[]", img);
          }
        } else if (index === "categories") {
          const cats = this.form.categories;
          if (cats !== "" || cats !== undefined) {
            const get_cats = cats?.map(function (item) {
              return item.value;
            });
            for (const cts of get_cats) {
              formData.append("categories[]", cts);
            }
          }
        } else if (index === "branches") {
          const branches = this.form.branches;
          if (branches !== "" || branches !== undefined) {
            const get_branchs = branches?.map(function (item) {
              return item.value;
            });

            for (const brnch of get_branchs) {
              formData.append("branches[]", brnch);
            }
          }
        } else if (index === "serial_numbers") {
          const serial_numbers = this.form.serial_numbers;
          if (serial_numbers !== "" || serial_numbers !== undefined) {
            const get_serial_numbers = serial_numbers?.map(function (item) {
              return item.value;
            });
            for (const numb of get_serial_numbers) {
              formData.append("serial_numbers[]", numb);
            }
          }
        } else {
          formData.append(index, this.form[index]);
        }
      }
      if (update) {
        formData.append("_method", "patch");
      }

      return formData;
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.thumb {
  cursor: pointer;
}
</style>
