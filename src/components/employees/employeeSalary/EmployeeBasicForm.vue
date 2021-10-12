<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form @submit.prevent="isEditing ? updateEmployeeSalary() : saveEmployeeSalary()">
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
        <br />
        <div class="mt-4">
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect label="Select Year" :options="options.years" :value.sync="year" />
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Select Month"
                :options="options.months"
                :value.sync="month"
              />
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CButton
                progress
                timeout="2000"
                block
                color="success"
                style="margin-top: 30px"
                @click="genrateSalary()"
                >Genrate Salary</CButton
              >
            </CCol>
          </CRow>
        </div>
        <form @submit.prevent="" v-if="showSalaryForm">
          <CRow>
            <CCol sm="12" md="12" class="pt-2">
              <h3>Detail</h3>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="6" md="6" class="pt-2">
              <CInput label="Employee Name" v-model="salary.emp_name" disabled />
            </CCol>
            <CCol sm="6" md="6" class="pt-2">
              <CInput
                label="Employee Designation"
                v-model="salary.emp_designation"
                disabled
              />
            </CCol>
            <CCol sm="6" md="3" class="pt-2">
              <CInput label="Total Days" v-model="salary.total_days" />
            </CCol>
            <CCol sm="6" md="3" class="pt-2">
              <CInput label="Total Working Days" v-model="salary.total_working_days" />
            </CCol>
            <CCol sm="6" md="3" class="pt-2">
              <CInput label="Total Leaves" type="number" v-model="salary.total_leaves" />
            </CCol>
            <CCol sm="6" md="3" class="pt-2">
              <CInput label="Total Absent" type="number" v-model="salary.total_absent" />
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="6" md="6" class="pt-2">
              <h3>Earnings</h3>
              <CInput label="Basic Salary" type="number" v-model="salary.basic_salary" />
              <div
                class="form-group"
                v-for="(input, k) in salary.earnings.inputs"
                :key="k"
              >
                <p contenteditable>{{ input.name }}</p>
                <CInput type="number" v-model="input.value" @input="calculateSalary()" />
                <span>
                  <i
                    class="fas fa-minus-circle"
                    @click="removeEarnings(k)"
                    v-show="k || (!k && salary.earnings.inputs.length > 1)"
                    >Remove</i
                  ><br />
                  <i
                    class="fas fa-plus-circle"
                    @click="addEarnings(k)"
                    placeholder="0.00"
                    v-show="k == salary.earnings.inputs.length - 1"
                    >Add fields</i
                  >
                </span>
              </div>
            </CCol>
            <CCol sm="6" md="6" class="pt-2">
              <h3>Deductions</h3>
              <div
                class="form-group"
                v-for="(input, k) in salary.deductions.inputs"
                :key="k"
              >
                <p contenteditable>{{ input.name }}</p>
                <CInput
                  type="number"
                  v-model="input.value"
                  placeholder="0.00"
                  @input="calculateSalary()"
                />
                <span>
                  <i
                    class="fas fa-minus-circle"
                    @click="removeDeduction(k)"
                    v-show="k || (!k && salary.deductions.inputs.length > 1)"
                    >Remove</i
                  ><br />
                  <i
                    class="fas fa-plus-circle"
                    @click="addDeduction(k)"
                    v-show="k == salary.deductions.inputs.length - 1"
                    >Add fields</i
                  >
                </span>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="6" md="6" class="pt-2"
              ><h6>Basic Salary: {{ this.salary.basic_salary }}</h6>

              <h6 v-if="this.salary.total_earnings">
                Total Earnings: {{ this.salary.total_earnings }}
              </h6>

              <h6 v-if="salary.total_deductions">
                Total Deductions: -{{ salary.total_deductions }}
              </h6>

              <h4>Net Salary: {{ salary.net_salary }}</h4>
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
              @click="genrateSlip()"
              >Genrate Slip</CButton
            >
          </CRow>
        </form>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeSalaryService from "@/services/employees/EmployeeSalaryService";
import EmployeeSalaryAdjustmentService from "@/services/employees/EmployeeSalaryAdjustmentService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "EmployeeBasicForm",
  data: () => ({
    isEditing: false,
    showSalaryForm: false,
    form: {
      id: null,
      employee_id: "",
      salary_type: "",
      basic_salary: "",
    },
    salary: {
      emp_name: "",
      emp_designation: "",
      total_working_days: 0,
      total_days: 0,
      total_leaves: 0,
      total_absent: 0,
      basic_salary: 0,
      total_earnings: 0,
      total_deductions: 0,
      net_salary: 0,
      deductions: {
        inputs: [
          {
            name: "Name",
            value: "",
          },
        ],
      },
      earnings: {
        inputs: [
          {
            name: "Name",
            value: "",
          },
        ],
      },
    },
    year: "",
    month: "",
    months: [],
    empId: null,
    options: {
      salary_type: [
        { value: "", label: "Choose Job Type", disabled: true, selected: "" },
        { value: "full time", label: "Full Time" },
        { value: "part time", label: "Part time" },
        { value: "outsource", label: "Outsource" },
      ],
      years: [{ value: "", label: "Choose Year", disabled: true, selected: "" }],
      months: [{ value: "", label: "Choose Month", disabled: true, selected: "" }],
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
  watch: {
    "salary.basic_salary"() {
      this.calculateSalary();
    },
    deep: true,
  },

  created() {
    this.empId = this.$route.params.id;
    this.getEmployeeSalary();
    this.generateArrayOfYearsAndMonths();
  },
  methods: {
    addEarnings() {
      this.salary.earnings.inputs.push({
        name: "Name",
        party: "",
      });
      console.log(this.inputs);
    },

    removeEarnings(index) {
      this.salary.earnings.inputs.splice(index, 1);
    },
    addDeduction() {
      this.salary.deductions.inputs.push({
        name: "Name",
        party: "",
      });
      console.log(this.inputs);
    },

    removeDeduction(index) {
      this.salary.deductions.inputs.splice(index, 1);
    },

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
    generateArrayOfYearsAndMonths() {
      Array.from({ length: 12 }, (e, i) => {
        this.options.months.push({
          value: i + 1,
          label: new Date(null, i + 1, null).toLocaleDateString("en", { month: "short" }),
        });

        this.months.push(
          new Date(null, i + 1, null).toLocaleDateString("en", { month: "short" })
        );
      });

      let max = new Date().getFullYear();
      let min = max - 5;
      for (let i = max; i >= min; i--) {
        this.options.years.push(i);
      }
    },
    calculateSalary() {
      let basic_salary = parseFloat(this.salary.basic_salary);
      let total_earnings = 0;
      let total_deductions = 0;
      if (this.salary.earnings.inputs.length > 0) {
        total_earnings += basic_salary;
        for (let index in this.salary.earnings.inputs) {
          if (this.salary.earnings.inputs[index].value) {
            total_earnings += parseInt(this.salary.earnings.inputs[index].value);
          }
        }
      }
      //deduction
      if (this.salary.deductions.inputs.length > 0) {
        for (let index in this.salary.deductions.inputs) {
          if (this.salary.deductions.inputs[index].value) {
            total_deductions += parseInt(this.salary.deductions.inputs[index].value);
          }
        }
      }
      this.salary.total_earnings = total_earnings;
      this.salary.total_deductions = total_deductions;

      this.salary.net_salary = parseFloat(total_earnings) - parseFloat(total_deductions);
    },
    genrateSlip() {
      let formData = {
        employee_id: this.empId,
        month: this.months[this.month - 1],
        basic_salary: parseFloat(this.salary.basic_salary),
        total_earning: parseFloat(this.salary.total_earnings),
        total_deductions: parseFloat(this.salary.total_deductions),
        net_salary: parseFloat(this.salary.net_salary),
      };

      EmployeeSalaryAdjustmentService.create(formData)
        .then((res) => {
          if (res.status === 201) {
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Salary Slip Added Successfully",
              timer: 3600,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    genrateSalary() {
      if (this.year !== "" && this.month !== "") {
        EmployeeSalaryService.genrateSalary(this.empId, this.year, this.month)
          .then(({ data }) => {
            console.log(data);
            if (data != undefined && data != "") {
              if (data.total_present > 0) {
                this.salary.emp_name = data.emp.full_name.en;
                this.salary.emp_designation = "salesman";
                this.salary.basic_salary = data.emp.salary.basic_salary;
                this.salary.net_salary = data.emp.salary.basic_salary;
                this.salary.total_working_days = data.total_working_days;
                this.salary.total_days = data.total_days;
                this.salary.total_leaves = data.total_leaves;
                this.salary.total_absent = data.total_absent;
                this.showSalaryForm = true;
              } else {
                this.$swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Something Went Wrong.",
                  timer: 3600,
                });
                this.showSalaryForm = false;
              }
            }
          })
          .catch((error) => {
            this.showSalaryForm = false;
            console.log(error);
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
