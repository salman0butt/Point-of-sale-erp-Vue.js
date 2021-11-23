<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form @submit.prevent="isEditing ? updateProductGeneral() : saveProductGeneral()">
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Weight"
                v-model="form.weight"
                :class="{ error: $v.form.weight.$error }"
                @input="$v.form.weight.$touch()"
              />
              <div v-if="$v.form.weight.$error">
                <p v-if="!$v.form.weight.required" class="errorMsg">Weight is required</p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Weight Unit"
                :options="options.weight_units"
                :value.sync="form.weight_unit"
                :class="{ error: $v.form.weight_unit.$error }"
                @input="$v.form.weight_unit.$touch()"
              />
              <div v-if="$v.form.weight_unit.$error">
                <p v-if="!$v.form.weight_unit.required" class="errorMsg">
                  Weight Unit is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Length"
                v-model="form.length"
                :class="{ error: $v.form.length.$error }"
                @input="$v.form.length.$touch()"
              />
              <div v-if="$v.form.length.$error">
                <p v-if="!$v.form.length.required" class="errorMsg">Length is required</p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Width"
                v-model="form.width"
                :class="{ error: $v.form.width.$error }"
                @input="$v.form.width.$touch()"
              />
              <div v-if="$v.form.width.$error">
                <p v-if="!$v.form.width.required" class="errorMsg">Width is required</p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Height"
                v-model="form.height"
                :class="{ error: $v.form.height.$error }"
                @input="$v.form.height.$touch()"
              />
              <div v-if="$v.form.height.$error">
                <p v-if="!$v.form.height.required" class="errorMsg">Height is required</p>
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
      </CCol>
    </CRow>
  </div>
</template>
<script>
import ProductGeneralService from "@/services/products/ProductGeneralService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "ProductGeneralForm",
  data: () => ({
    isEditing: false,
    form: {
      product_id: "",
      weight: "",
      weight_unit: "",
      length: "",
      width: "",
      height: "",
    },
    id: "",
    productId: "",
    options: {
      weight_units: [
        { value: "", label: "Choose Unit", disabled: true, selected: "" },
        { value: "g", label: "G" },
        { value: "kg", label: "KG" },
        { value: "liter", label: "Liter" },
      ],
    },
  }),
  validations() {
    return {
      form: {
        product_id: { required },
        weight: { required },
        weight_unit: { required },
        length: { required },
        width: { required },
        height: { required },
      },
    };
  },
  created() {
    this.productId = this.$route.params.id;
    this.form.product_id = this.$route.params.id;
    if (this.productId) {
      this.getProductGeneral();
    }
  },
  methods: {
    getProductGeneral() {
      ProductGeneralService.get(this.productId)
        .then(({ data }) => {
          this.isEditing = true;
          this.id = data.uuid;
          this.form.weight = data.weight ?? "";
          this.form.weight_unit = data.weight_unit ?? "";
          this.form.length = data.length ?? "";
          this.form.width = data.width ?? "";
          this.form.height = data.height ?? "";
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
        });
    },
    saveProductGeneral() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let formData = this.form;
        ProductGeneralService.create(formData)
          .then((res) => {
            if (res.status == 200 || res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Product General Created Successfully",
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
    updateProductGeneral() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let formData = this.form;
        ProductGeneralService.update(this.id, formData)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Product General Updated Successfully",
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
