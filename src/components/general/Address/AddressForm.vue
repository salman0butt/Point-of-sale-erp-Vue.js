<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form @submit.prevent="isEditing ? updateAddress() : saveAddress()">
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Flat/Villa"
                v-model="form.flat"
                :class="{ error: $v.form.flat.$error }"
                @input="$v.form.flat.$touch()"
              />
              <div v-if="$v.form.flat.$error">
                <p v-if="!$v.form.flat.required" class="errorMsg">
                  Flat No is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput label="Floor (Optional)" v-model="form.floor" />
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="building"
                v-model="form.building"
                :class="{ error: $v.form.building.$error }"
                @input="$v.form.building.$touch()"
              />
              <div v-if="$v.form.building.$error">
                <p v-if="!$v.form.building.required" class="errorMsg">
                  building is required
                </p>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Street"
                v-model="form.street"
                :class="{ error: $v.form.street.$error }"
                @input="$v.form.street.$touch()"
              />
              <div v-if="$v.form.street.$error">
                <p v-if="!$v.form.street.required" class="errorMsg">
                  Street is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Block"
                v-model="form.block"
                :class="{ error: $v.form.block.$error }"
                @input="$v.form.block.$touch()"
              />
              <div v-if="$v.form.block.$error">
                <p v-if="!$v.form.block.required" class="errorMsg">
                  Block is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Area"
                v-model="form.area"
                :class="{ error: $v.form.area.$error }"
                @input="$v.form.area.$touch()"
              />
              <div v-if="$v.form.area.$error">
                <p v-if="!$v.form.area.required" class="errorMsg">
                  Area is required
                </p>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Is Default"
                :options="options.set_default"
                :value.sync="form.set_default"
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
              >Save</CButton
            >
          </CRow>
        </form>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import CustomerAddressServices from "@/services/customers/CustomerAddressServices";
import SupplierAddressServices from "@/services/supplier/SupplierAddressServices";

import { required } from "vuelidate/lib/validators";

export default {
  name: "AddressForm",
  data: () => ({
    isEditing: false,
    form: {
      flat: "",
      floor: "",
      building: "",
      street: "",
      block: "",
      area: "",
      set_default: "",
      module_uuid: "",
      module: "",
      data_uuid: null,
    },
    options: {
      set_default: [
        { value: "", label: "Choose Status", disabled: true, selected: "" },
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    },
  }),

  validations() {
    return {
      form: {
        flat: { required },
        building: { required },
        street: { required },
        block: { required },
        area: { required },
        set_default: { required },
      },
    };
  },
  props: {
    module: String,
  },

  methods: {
    saveAddress() {
      // for module customer
      if (this.module == "customer") {
        this.form.module_uuid = this.$route.params.id;
        this.form.module = this.module;
        this.$v.$touch();
        if (!this.$v.$invalid) {
          let data = this.form;
          CustomerAddressServices.store(data)
            .then((res) => {
              if (res.status == 201) {
                this.$swal.fire({
                  icon: "success",
                  title: "Success",
                  text: "Address Added Successfully",
                  timer: 3600,
                });
                this.$emit("AddressCreated");
                this.$v.$reset();
                this.resetForm();
              }
            })
            .catch((error) => {
              console.log(error);
              this.$swal.fire({
                icon: "error",
                title: "Error",
                text: "Something Went Wrong.",
                timer: 3600,
              });
            });
        }
      }
      if (this.module == "supplier") {
        this.form.module_uuid = this.$route.params.id;
        this.form.module = this.module;
        this.$v.$touch();
        if (!this.$v.$invalid) {
          let data = this.form;
          SupplierAddressServices.store(data)
            .then((res) => {
              if (res.status == 201) {
                this.$swal.fire({
                  icon: "success",
                  title: "Success",
                  text: "Address Added Successfully",
                  timer: 3600,
                });
                this.$emit("AddressCreated");
                this.$v.$reset();
                this.resetForm();
              }
            })
            .catch((error) => {
              console.log(error);
              this.$swal.fire({
                icon: "error",
                title: "Error",
                text: "Something Went Wrong.",
                timer: 3600,
              });
            });
        }
      }
    },
    getEditData(uuid) {
      this.isEditing = true;
      this.form.data_uuid = uuid;
      this.getAddress();
    },
    getAddress() {
      // for module customer
      if (this.module == "customer") {
        CustomerAddressServices.get(this.form.data_uuid)
          .then(({ data }) => {
            if (data != null && data != "") {
              this.form.flat = data.flat.en;
              this.form.floor = data.floor.en;
              this.form.building = data.building.en;
              this.form.street = data.street.en;
              this.form.block = data.block.en;
              this.form.area = data.area.en;
              this.form.set_default = data.set_default;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
      if (this.module == "supplier") {
        SupplierAddressServices.get(this.form.data_uuid)
          .then(({ data }) => {
            if (data != null && data != "") {
              this.form.flat = data.flat.en;
              this.form.floor = data.floor.en;
              this.form.building = data.building.en;
              this.form.street = data.street.en;
              this.form.block = data.block.en;
              this.form.area = data.area.en;
              this.form.set_default = data.set_default;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    updateAddress() {
      this.$v.$touch();
      if (this.module == "customer") {
        if (!this.$v.$invalid) {
          let data = this.form;
          CustomerAddressServices.update(this.form.data_uuid, data)
            .then((res) => {
              if (res.status == 200) {
                this.$swal.fire({
                  icon: "success",
                  title: "Success",
                  text: "Address Updated Successfully",
                  timer: 3600,
                });
                this.$emit("AddressCreated");
                this.$v.$reset();
                this.resetForm();
              }
            })
            .catch((error) => {
              console.log(error);
              this.$swal.fire({
                icon: "error",
                title: "Error",
                text: "Something Went Wrong.",
                timer: 3600,
              });
            });
        }
      }
      if (this.module == "supplier") {
        if (!this.$v.$invalid) {
          let data = this.form;
          SupplierAddressServices.update(this.form.data_uuid, data)
            .then((res) => {
              if (res.status == 200) {
                this.$swal.fire({
                  icon: "success",
                  title: "Success",
                  text: "Address Updated Successfully",
                  timer: 3600,
                });
                this.$emit("AddressCreated");
                this.$v.$reset();
                this.resetForm();
              }
            })
            .catch((error) => {
              console.log(error);
              this.$swal.fire({
                icon: "error",
                title: "Error",
                text: "Something Went Wrong.",
                timer: 3600,
              });
            });
        }
      }
    },

    resetForm() {
      for (let index in this.form) {
        this.form[index] = "";
      }
      this.isEditing = false;
    },
  },
};
</script>

<style>
.errorMsg {
  color: red;
}
</style>
