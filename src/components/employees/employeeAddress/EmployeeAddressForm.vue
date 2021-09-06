<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form
          @submit.prevent="isEditing ? updateEmployeeAddress() : saveEmployeeAddress()"
        >
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Address"
                v-model="form.address"
                :class="{ error: $v.form.address.$error }"
                @input="$v.form.address.$touch()"
              />
              <div v-if="$v.form.address.$error">
                <p v-if="!$v.form.address.required" class="errorMsg">
                  Address is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput label="Second Address (Optional)" v-model="form.address2" />
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="City"
                v-model="form.city"
                :class="{ error: $v.form.city.$error }"
                @input="$v.form.city.$touch()"
              />
              <div v-if="$v.form.city.$error">
                <p v-if="!$v.form.city.required" class="errorMsg">City is required</p>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Postal Code"
                v-model="form.postal_code"
                :class="{ error: $v.form.postal_code.$error }"
                @input="$v.form.postal_code.$touch()"
              />
              <div v-if="$v.form.postal_code.$error">
                <p v-if="!$v.form.postal_code.required" class="errorMsg">
                  Postal Code is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Is Default"
                :options="options.set_default"
                :value.sync="form.set_default"
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
              :disabled="$v.$invalid"
              >Save</CButton
            >
          </CRow>
        </form>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeAddressService from "@/services/employees/EmployeeAddressService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "EmployeeAddressForm",
  data: () => ({
    isEditing: false,
    form: {
      address: "",
      address2: "",
      city: "",
      postal_code: "",
      set_default: "",
      employee_id: "",
    },
    empId: null,
    options: {
      set_default: [
        { value: "", label: "Choose Status" },
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    },
  }),
  validations() {
    return {
      form: {
        address: { required },
        city: { required },
        postal_code: { required },
      },
    };
  },
  methods: {
    saveEmployeeAddress() {
      this.form.employee_id = this.$route.params.id;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        EmployeeAddressService.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Address Added Successfully",
                timer: 3600,
              });
              this.$emit("employeeAddressCreated");
              this.$v.$reset();
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
    },
    updateEmployeeAddress() {
      this.form.employee_id = this.$route.params.id;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        EmployeeAddressService.update(this.empId, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Address Updated Successfully",
                timer: 3600,
              });
              this.$emit("employeeAddressCreated");
              this.$v.$reset();
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
    },
    getEmployeeAddress() {
      EmployeeAddressService.get(this.empId)
        .then(({ data }) => {
          console.log(data);
          this.empId = data.uuid;
          this.form.address = data.address;
          this.form.address2 = data.address2;
          this.form.city = data.city;
          this.form.postal_code = data.postal_code;
          this.form.set_default = data.set_default;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getEditData(uuid) {
      this.isEditing = true;
      this.empId = uuid;
      this.getEmployeeAddress();
    },
    resetForm() {
      this.form.address = "";
      this.form.address2 = "";
      this.form.city = "";
      this.form.postal_code = "";
      this.form.set_default = "";
      this.form.employee_id = "";
    },
  },
};
</script>

<style>
.errorMsg {
  color: red;
}
</style>
