<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form
          @submit.prevent="isEditing ? updateEmployeeContract() : saveEmployeeContract()"
        >
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Contract Name"
                v-model="form.name"
                :class="{ error: $v.form.name.$error }"
                @input="$v.form.name.$touch()"
              />
              <div v-if="$v.form.name.$error">
                <p v-if="!$v.form.name.required" class="errorMsg">
                  Contract Name is required
                </p>
              </div>
            </CCol>

            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Value"
                v-model="form.value"
                :class="{ error: $v.form.value.$error }"
                @input="$v.form.value.$touch()"
              />
              <div v-if="$v.form.value.$error">
                <p v-if="!$v.form.value.required" class="errorMsg">Value is required</p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CTextarea
                label="Terms & Conditions"
                placeholder="Content..."
                v-model="form.additional_terms_and_conditions"
              />
              <div v-if="$v.form.additional_terms_and_conditions.$error">
                <p
                  v-if="!$v.form.additional_terms_and_conditions.required"
                  class="errorMsg"
                >
                  Terms & Conditions is required
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
import EmployeeContractService from "@/services/employees/EmployeeContractService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "EmployeeContractForm",
  data: () => ({
    isEditing: false,
    form: {
      id: null,
      employee_id: "",
      name: "",
      value: "",
      additional_terms_and_conditions: "",
    },
    empId: null,
  }),
  validations() {
    return {
      form: {
        name: { required },
        value: { required },
        additional_terms_and_conditions: { required },
      },
    };
  },
  created() {
    this.empId = this.empId = this.$route.params.id;
  },
  methods: {
    saveEmployeeContract() {
      this.form.employee_id = this.$route.params.id;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        EmployeeContractService.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Contract Added Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.$emit("employeeContractCreated");
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
    },
    updateEmployeeContract() {
      this.form.employee_id = this.$route.params.id;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        EmployeeContractService.update(this.form.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Contract Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.$emit("employeeContractCreated");
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
    getEmployeeContract() {
      EmployeeContractService.get(this.empId)
        .then(({ data }) => {
          if (data != null && data != "") {
            this.isEditing = true;
            this.form.id = data.uuid;
            this.form.employee_id = data.employee_id;
            this.form.name = data.name;
            this.form.value = data.value;
            this.form.additional_terms_and_conditions =
              data.additional_terms_and_conditions;
          }
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
        });
    },
    getEditData(uuid) {
      this.isEditing = true;
      this.empId = uuid;
      this.getEmployeeContract();
    },
    resetForm() {
      this.form.name = "";
      this.form.value = "";
      this.form.additional_terms_and_conditions = "";
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
