<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form @submit.prevent="saveEmployeeAddress">
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
  name: "EmployeeAddressTab",
  data: () => ({
    form: {
      address: "",
      address2: "",
      city: "",
      postal_code: "",
      set_default: "",
      employee_id: "",
    },
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
  created() {
    // this.getEmployee();
  },
  methods: {
    getEmployee() {
      this.form.employee_id = this.$route.params.id;
      EmployeeAddressService.get(this.form.employee_id)
        .then(({ data }) => {
          console.log(data);
          // this.form.full_name = data.full_name;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    saveEmployeeAddress() {
      this.form.employee_id = this.$route.params.id;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        EmployeeAddressService.create(data)
          .then((res) => {
            if (res.status == 201 || res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Address Added Successfully",
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
              text: "Something Went Wrong.",
              timer: 3600,
            });
          });
      }
    },
  },
};
</script>

<style>
.errorMsg {
  color: red;
}
</style>
