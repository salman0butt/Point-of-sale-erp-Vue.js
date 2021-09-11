<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form
          @submit.prevent="isEditing ? updateEmployeeLicense() : saveEmployeeLicense()"
        >
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
              <CSelect label="Type" :options="options.type" :value.sync="form.type" />
              <div v-if="$v.form.type.$error">
                <p v-if="!$v.form.type.required" class="errorMsg">Type is required</p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Issuance Date"
                type="date"
                v-model="form.issuance"
                :class="{ error: $v.form.issuance.$error }"
                @input="$v.form.issuance.$touch()"
              />
              <div v-if="$v.form.issuance.$error">
                <p v-if="!$v.form.issuance.required" class="errorMsg">
                  Issuance Date is required
                </p>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Expiry"
                type="date"
                v-model="form.expiry"
                :class="{ error: $v.form.expiry.$error }"
                @input="$v.form.expiry.$touch()"
              />
              <div v-if="$v.form.expiry.$error">
                <p v-if="!$v.form.expiry.required" class="errorMsg">Expiry is required</p>
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
import EmployeeLicenseService from "@/services/employees/EmployeeLicenseService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "EmployeeLicenseForm",
  data: () => ({
    isEditing: false,
    form: {
      id: null,
      employee_id: "",
      name: "",
      type: "",
      issuance: "",
      expiry: "",
    },
    empId: null,
    options: {
      type: [
        { value: "", label: "Choose Type", disabled: true, selected: "" },
        { value: "type1", label: "Type1" },
        { value: "type2", label: "Type2" },
      ],
    },
  }),
  validations() {
    return {
      form: {
        name: { required },
        type: { required },
        issuance: { required },
        expiry: { required },
      },
    };
  },
  created() {
    this.empId = this.empId = this.$route.params.id;
  },
  methods: {
    saveEmployeeLicense() {
      this.form.employee_id = this.$route.params.id;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        EmployeeLicenseService.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "License Added Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.$emit("employeeLicenseCreated");
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
    updateEmployeeLicense() {
      this.form.employee_id = this.$route.params.id;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        EmployeeLicenseService.update(this.form.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "License Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.$emit("employeeLicenseCreated");
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
    getEmployeeLicense() {
      EmployeeLicenseService.get(this.empId)
        .then(({ data }) => {
          if (data != null && data != "") {
            this.isEditing = true;
            this.form.id = data.uuid;
            this.form.employee_id = data.employee_id;
            this.form.name = data.name;
            this.form.type = data.type;
            this.form.issuance = data.issuance;
            this.form.expiry = data.expiry;
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
      this.getEmployeeLicense();
    },
    resetForm() {
      this.form.name = "";
      this.form.type = "";
      this.form.issuance = "";
      this.form.expiry = "";
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
