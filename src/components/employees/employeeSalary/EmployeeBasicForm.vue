<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form
          @submit.prevent="
            isEditing ? updateEmployeeSalary() : saveEmployeeSalary()
          "
        >
          <CRow>
            <CCol sm="6" md="6" class="pt-2">
              <CSelect
                label="Select Job Type"
                :options="options.salary_type"
                :value.sync="form.salary_type"
              />
              <div v-if="$v.form.salary_type.$error">
                <p v-if="!$v.form.salary_type.required" class="errorMsg">
                  Salary Type is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="6" class="pt-2">
              <CInput
                label="Basic Salary"
                type="number"
                v-model="form.basic_salary"
                :class="{ error: $v.form.basic_salary.$error }"
                @input="$v.form.basic_salary.$touch()"
              />
              <div v-if="$v.form.basic_salary.$error">
                <p v-if="!$v.form.basic_salary.required" class="errorMsg">
                  Basic Salary is required
                </p>
              </div>
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
import EmployeeSalaryService from "@/services/employees/EmployeeSalaryService";
import { required } from "vuelidate/lib/validators";
import { cibAddthis, cisMinusSquare } from "@coreui/icons-pro";

export default {
  name: "EmployeeBasicForm",
  cibAddthis,
  cisMinusSquare,
  data: () => ({
    isEditing: false,
    form: {
      id: null,
      employee_id: "",
      salary_type: "",
      basic_salary: "",
    },
    empId: null,
    options: {
      salary_type: [
        { value: "", label: "Choose Job Type", disabled: true, selected: "" },
        { value: "full time", label: "Full Time" },
        { value: "part time", label: "Part time" },
        { value: "outsource", label: "Outsource" },
      ],
    },
  }),
  validations() {
    return {
      form: {
        salary_type: { required },
        basic_salary: { required },
      },
    };
  },
  created() {
    this.empId = this.$route.params.id;
    this.getEmployeeSalary();
  },
  methods: {
    saveEmployeeSalary() {
      this.form.employee_id = this.$route.params.id;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        EmployeeSalaryService.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Salary Added Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.getEmployeeSalary();
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
    updateEmployeeSalary() {
      this.form.employee_id = this.$route.params.id;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        EmployeeSalaryService.update(this.form.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Salary Updated Successfully",
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
    getEmployeeSalary() {
      EmployeeSalaryService.get(this.empId)
        .then(({ data }) => {
          if (data != null && data != "") {
            this.isEditing = true;
            this.form.id = data.uuid;
            this.form.salary_type = data.salary_type;
            this.form.basic_salary = data.basic_salary;
          }
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
        });
    },
  },
};
</script>

<style>
.errorMsg {
  color: red;
}
</style>
