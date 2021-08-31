<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Create Employee </CCardHeader>
          <CCardBody>
            <form @submit.prevent="saveEmployee">
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Fullname"
                    v-model="form.full_name"
                    :class="{ error: $v.form.full_name.$error }"
                    @blur="$v.form.full_name.$touch()"
                  />
                  <div v-if="$v.form.full_name.$error">
                    <p v-if="!$v.form.full_name.required" class="errorMsg">
                      Fullname is required
                    </p>
                    <p v-if="!$v.form.full_name.minLength" class="errorMsg">
                      Fullname should be at least 4 character
                    </p>
                  </div>
                </CCol>

                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Gender"
                    :options="options.gender"
                    :value.sync="form.gender"
                  />
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Martial Status"
                    :options="options.marital_status"
                    :value.sync="form.marital_status"
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput label="Phone" type="number" :value.sync="form.phone_number" />
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput label="Email" type="email" :value.sync="form.email" />
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput label="DOB" type="date" :value.sync="form.dob" />
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput label="Nationality" :value.sync="form.nationality" />
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput label="Address" :value.sync="form.address" />
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Manager"
                    :options="options.managers"
                    :value.sync="form.manager_id"
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput label="CPR No" type="text" :value.sync="form.cpr_no" />
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="CPR Expiry"
                    type="date"
                    :value.sync="form.cpr_no_expiry"
                  />
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Branches"
                    :options="options.branches"
                    :value.sync="form.branch_id"
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Passport No"
                    type="text"
                    :value.sync="form.passport_no"
                  />
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Passport Expiry"
                    type="date"
                    :value.sync="form.passport_expiry"
                  />
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Status"
                    :options="options.status"
                    :value.sync="form.status"
                  />
                </CCol>
              </CRow>
              <p v-if="$v.$anyError" class="errorMsg">Please Fill the required data</p>
              <!-- <CButton
                block
                color="success"
                type="submit"
                style="float: right; width: 100px"
                @click="saveAndExit = !saveAndExit"
                >Save</CButton
              > -->

              <CButton
                progress
                timeout="2000"
                block
                color="success"
                style="float: right; width: 200px"
                type="submit"
                @click="saveAndExit = false"
                :disabled="$v.$invalid"
                >Save & Continue</CButton
              >
              <CButton
                timeout="2000"
                block
                color="danger"
                style="float: right; width: 140px; margin-right: 20px; margin-top: 0"
                @click="saveAndExit = true"
                type="submit"
                :disabled="$v.$invalid"
                >Save & Exit</CButton
              >
            </form>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import EmployeeService from "@/services/employees/EmployeeService";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "CreateEmployee",
  data: () => ({
    isEditing: false,
    saveAndExit: false,
    form: {
      full_name: "",
      gender: "",
      marital_status: "",
      phone_number: "",
      email: "",
      dob: "",
      nationality: "",
      address: "",
      cpr_no: "",
      cpr_no_expiry: "",
      passport_no: "",
      passport_expiry: "",
      manager_id: "",
      branch_id: "",
      status: "",
    },
    options: {
      branches: [{ value: "", label: "Choose Branch" }],
      managers: [{ value: "", label: "Choose Manager" }],
      gender: [
        { value: "", label: "Choose Gender" },
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
      ],
      marital_status: [
        { value: "", label: "Choose Status" },
        { value: "single", label: "Single" },
        { value: "married", label: "Married" },
      ],
      status: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "InActive" },
      ],
    },
  }),
  validations() {
    return {
      form: {
        full_name: { required, minLength: minLength(4) },
      },
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      EmployeeService.getCreateDetail()
        .then(({ data }) => {
          let branches = this.options.branches;
          let managers = this.options.managers;
          data.branches.map(function (val) {
            branches.push({ value: val.id, label: val.name.en });
          });
          data.employees.map(function (val) {
            managers.push({ value: val.id, label: val.full_name.en });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    saveEmployee() {
      this.$v.$touch();
      console.log(this.$v);
      if (!this.$v.$invalid) {
        let data = this.form;
        EmployeeService.create(data)
          .then((res) => {
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Employee Created Successfully",
              timer: 3600,
            });
            if (this.saveAndExit) {
              this.$router.push({ path: "/employees/index" });
            } else {
              let fields = this.form;
              for (let field in fields) {
                this.form[field] = "";
              }
            }
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style scoped>
.errorMsg {
  color: red;
}
</style>
