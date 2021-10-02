<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form @submit.prevent="isEditing ? updateEmployeeGrade() : saveEmployeeGrade()">
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Employee"
                :options="options.employees"
                :value.sync="form.employee_id"
              />
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Old Designation"
                :options="options.designations"
                :value.sync="form.old_designation"
                :class="{ error: $v.form.old_designation.$error }"
                @input="$v.form.old_designation.$touch()"
              />
              <div v-if="$v.form.old_designation.$error">
                <p v-if="!$v.form.old_designation.required" class="errorMsg">
                  Old Designation is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="New Designation"
                :options="options.designations"
                :value.sync="form.new_designation"
                :class="{ error: $v.form.new_designation.$error }"
                @input="$v.form.new_designation.$touch()"
              />
              <div v-if="$v.form.new_designation.$error">
                <p v-if="!$v.form.new_designation.required" class="errorMsg">
                  New Designation is required
                </p>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Old Salary"
                type="number"
                v-model="form.old_salary"
                :class="{ error: $v.form.old_salary.$error }"
                @input="$v.form.old_salary.$touch()"
              />
              <div v-if="$v.form.old_salary.$error">
                <p v-if="!$v.form.old_salary.required" class="errorMsg">
                  Old Salary is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="New Salary"
                type="number"
                v-model="form.new_salary"
                :class="{ error: $v.form.new_salary.$error }"
                @input="$v.form.new_salary.$touch()"
              />
              <div v-if="$v.form.new_salary.$error">
                <p v-if="!$v.form.new_salary.required" class="errorMsg">
                  New Salary is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Date"
                type="date"
                v-model="form.date"
                :class="{ error: $v.form.date.$error }"
                @input="$v.form.date.$touch()"
              />
              <div v-if="$v.form.date.$error">
                <p v-if="!$v.form.date.required" class="errorMsg">Date is required</p>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Status"
                :options="options.status"
                :value.sync="form.status"
              />
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
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeGradeService from "@/services/employees/EmployeeGradeService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "EmployeeGradeForm",
  data: () => ({
    isEditing: false,
    saveAndExit: false,
    form: {
      id: null,
      employee_id: "",
      old_designation: "",
      new_designation: "",
      old_salary: "",
      new_salary: "",
      status: "",
      date: "",
    },
    options: {
      designations: [
        { value: "", label: "Choose Designation", disabled: true, selected: "" },
      ],
      employees: [{ value: "", label: "Choose Employee", disabled: true, selected: "" }],
      status: [
        { value: "", label: "Choose Status", disabled: true, selected: "" },
        { value: "pending", label: "Pending" },
      ],
    },
  }),
  validations() {
    return {
      form: {
        old_designation: { required },
        new_designation: { required },
        old_salary: { required },
        new_salary: { required },
        date: { required },
      },
    };
  },
  created() {
    this.form.id = this.$route.params.id;
    this.getAllEmployees();
    this.getAllDesignations();
    if (this.form.id !== "" && this.form.id !== undefined) {
      this.isEditing = true;
      this.getEmployeeGrade();
    }
  },
  methods: {
    saveEmployeeGrade() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        EmployeeGradeService.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Grade Added Successfully",
                timer: 3600,
              });
              this.$emit("employee-grade-update");
              this.$v.$reset();
              this.resetForm();

              if (this.saveAndExit) {
                this.$router.push({ path: "/grades/index" });
              } else {
                this.$router.push({ path: "/grades/edit/" + res.data.uuid });
              }
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
    updateEmployeeGrade() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        EmployeeGradeService.update(this.form.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Grade Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.$emit("employee-grade-update");
              if (this.saveAndExit) {
                this.$router.push({ path: "/grades/index" });
              } else {
                this.$router.push({ path: "/grades/edit/" + res.data.uuid });
              }
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
    getEmployeeGrade() {
      EmployeeGradeService.get(this.form.id)
        .then(({ data }) => {
          console.log(data);
          if (data != null && data != "") {
            this.isEditing = true;
            this.form.id = data.uuid;
            this.form.employee_id = data.employee.uuid;
            this.form.old_designation = data.old_designation.uuid;
            this.form.new_designation = data.new_designation.uuid;
            this.form.old_salary = data.old_salary;
            this.form.new_salary = data.new_salary;
            this.form.status = data.status;
            this.form.date = data.date;
          }
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
        });
    },
    getAllDesignations() {
      EmployeeGradeService.getAllDesignations()
        .then(({ data }) => {
          if (data != null && data != "") {
            let designations = this.options.designations;
            if (data.data) {
              data.data.map(function (val) {
                designations.push({ value: val.uuid, label: val.name });
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
        });
    },
    getAllEmployees() {
      EmployeeGradeService.getAllEmployees()
        .then(({ data }) => {
          if (data != null && data != "") {
            let employees = this.options.employees;
            if (data.data) {
              data.data.map(function (val) {
                employees.push({ value: val.uuid, label: val.full_name });
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
        });
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
