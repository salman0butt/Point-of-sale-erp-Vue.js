<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form @submit.prevent="isEditing ? updateEmployeeSalary() : saveEmployeeSalary()">
          <CRow v-if="!this.isEditing">
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Employee"
                :options="options.employees"
                :value.sync="salary.employee_id"
              />
            </CCol>
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
          <div v-if="showSalaryForm">
            <CRow>
              <CCol sm="12" md="12" class="pt-2">
                <h3>Detail</h3>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="6" md="3" class="pt-2">
                <CInput label="Total Days" v-model="salary.total_days" />
              </CCol>
              <CCol sm="6" md="3" class="pt-2">
                <CInput label="Total Working Days" v-model="salary.total_working_days" />
              </CCol>
              <CCol sm="6" md="3" class="pt-2">
                <CInput
                  label="Total Leaves"
                  type="number"
                  v-model="salary.total_leaves"
                />
              </CCol>
              <CCol sm="6" md="3" class="pt-2">
                <CInput
                  label="Total Absent"
                  type="number"
                  v-model="salary.total_absent"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="6" md="6" class="pt-2">
                <h3>Earnings</h3>
                <CInput
                  label="Basic Salary"
                  type="number"
                  v-model="salary.basic_salary"
                />
                <div
                  class="form-group"
                  v-for="(input, k) in salary.earnings.inputs"
                  :key="k"
                >
                  <editable-text v-model="salary.earnings.inputs[k].name" />
                  <CInput
                    type="number"
                    v-model="input.value"
                    placeholder="0.00"
                    @input="calculateSalary()"
                  />
                  <span>
                    <i
                      @click="removeEarnings(k)"
                      v-show="k || (!k && salary.earnings.inputs.length > 1)"
                      ><CIcon :content="$options.cisMinusSquare" /> Remove</i
                    ><br />
                    <i
                      @click="addEarnings(k)"
                      v-show="k == salary.earnings.inputs.length - 1"
                      ><CIcon :content="$options.cibAddthis" /> Add fields</i
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
                  <editable-text v-model="salary.deductions.inputs[k].name" />
                  <CInput
                    type="number"
                    v-model="input.value"
                    placeholder="0.00"
                    @input="calculateSalary()"
                  />
                  <span>
                    <i
                      @click="removeDeduction(k)"
                      v-show="k || (!k && salary.deductions.inputs.length > 1)"
                      ><CIcon :content="$options.cisMinusSquare" /> Remove</i
                    ><br />
                    <i
                      @click="addDeduction(k)"
                      v-show="k == salary.deductions.inputs.length - 1"
                      ><CIcon :content="$options.cibAddthis" /> Add fields</i
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

                <h6>Net Salary: {{ salary.net_salary }}</h6>
              </CCol>
            </CRow>
            <CRow>
              <CCol v-if="salary.expenses.inputs.length" sm="6" md="6" class="pt-2">
                <h3>Expenses</h3>
                <div
                  class="form-group"
                  v-for="(input, k) in salary.expenses.inputs"
                  :key="k"
                >
                  <editable-text v-model="salary.expenses.inputs[k].name" />
                  <CInput
                    type="number"
                    v-model="input.value"
                    placeholder="0.00"
                    @input="calculateSalary()"
                  />
                  <span>
                    <i
                      @click="removeExpense(k)"
                      v-show="k || (!k && salary.expenses.inputs.length > 1)"
                      ><CIcon :content="$options.cisMinusSquare" /> Remove</i
                    ><br />
                    <i
                      @click="addExpense(k)"
                      v-show="k == salary.expenses.inputs.length - 1"
                      ><CIcon :content="$options.cibAddthis" /> Add fields</i
                    >
                  </span>
                </div>
              </CCol>
              <CCol sm="12" md="12" class="pt-2">
                <h6 v-if="this.salary.total_expenses">
                  Total Expense: +{{ this.salary.total_expenses }}
                </h6>

                <h4>Total Payable Salary: {{ salary.payable_salary }}</h4>
              </CCol>
            </CRow>

            <!-- <p v-if="$v.$anyError" class="errorMsg">Please Fill the required data</p> -->
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
          </div>
        </form>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeSalaryService from "@/services/employees/EmployeeSalaryService";
import EmployeeSalaryAdjustmentService from "@/services/employees/EmployeeSalaryAdjustmentService";
import { cibAddthis, cisMinusSquare } from "@coreui/icons-pro";
import EditableText from "@marshal/vue-editable-text";

export default {
  name: "EmployeeSalaryForm",
  components: {
    EditableText,
  },
  cibAddthis,
  cisMinusSquare,
  data: () => ({
    isEditing: false,
    saveAndExit: false,
    showSalaryForm: false,
    salary: {
      id: null,
      employee_id: "",
      total_working_days: 0,
      total_days: 0,
      total_leaves: 0,
      total_absent: 0,
      basic_salary: 0,
      total_earnings: 0,
      total_deductions: 0,
      total_expenses: 0,
      net_salary: 0,
      payable_salary: 0,
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
      expenses: {
        inputs: [],
      },
    },
    year: "",
    month: "",
    months: [],
    empId: null,
    options: {
      years: [{ value: "", label: "Choose Year", disabled: true, selected: "" }],
      months: [{ value: "", label: "Choose Month", disabled: true, selected: "" }],
      employees: [{ value: "", label: "Choose Employee", disabled: true, selected: "" }],
    },
  }),
  watch: {
    "salary.basic_salary"() {
      this.calculateSalary();
    },
    deep: true,
  },

  created() {
    this.salary.id = this.$route.params.id;
    this.generateArrayOfYearsAndMonths();
    this.getAllEmployees();
    if (this.salary.id !== "" && this.salary.id !== undefined) {
      this.isEditing = true;
      this.showSalaryForm = true;
      this.getEmployeeSalary();
    }
  },
  methods: {
    addEarnings() {
      this.salary.earnings.inputs.push({
        name: "Name",
        value: "",
      });
      this.calculateSalary();
    },

    removeEarnings(index) {
      this.salary.earnings.inputs.splice(index, 1);
      this.calculateSalary();
    },
    addDeduction() {
      this.salary.deductions.inputs.push({
        name: "Name",
        value: "",
      });
      this.calculateSalary();
    },

    removeDeduction(index) {
      this.salary.deductions.inputs.splice(index, 1);
      this.calculateSalary();
    },
    addExpense() {
      this.salary.expenses.inputs.push({
        name: "Name",
        value: "",
      });
      this.calculateSalary();
    },

    removeExpense(index) {
      this.salary.expenses.inputs.splice(index, 1);
      this.calculateSalary();
    },
    saveEmployeeSalary() {
      // this.salary.employee_id = this.$route.params.id;
      // this.$v.$touch();
      // if (!this.$v.$invalid) {
      let formData = {
        employee_id: this.salary.employee_id,
        month: this.months[this.month - 1],
        year: this.year,
        basic_salary: parseFloat(this.salary.basic_salary),
        earnings: this.salary.earnings.inputs,
        deductions: this.salary.deductions.inputs,
        expenses: this.salary.expenses.inputs,
        total_earnings: parseFloat(this.salary.total_earnings),
        total_absents: parseFloat(this.salary.total_absent),
        total_leaves: parseFloat(this.salary.total_leaves),
        total_deductions: parseFloat(this.salary.total_deductions),
        total_expenses: parseFloat(this.salary.total_expenses),
        total_working_days: parseFloat(this.salary.total_working_days),
        total_days: parseFloat(this.salary.total_days),
        net_salary: parseFloat(this.salary.net_salary),
        payable_salary: parseFloat(this.salary.payable_salary),
      };

      EmployeeSalaryAdjustmentService.create(formData)
        .then((res) => {
          if (res.status == 201) {
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Salary Added Successfully",
              timer: 3600,
            });
            // this.$v.$reset();
            this.resetForm();
            if (this.saveAndExit) {
              this.$router.push({ path: "/salary/index" });
            } else {
              this.$router.push({ path: "/salary/edit/" + res.data.uuid });
            }
          }
        })
        .catch((error) => {
          this.isEditing = false;
          console.log(error);
          this.$swal.fire({
            icon: "error",
            title: "Error",
            text: "Something Went Wrong.",
            timer: 3600,
          });
        });
      // }
    },
    updateEmployeeSalary() {
      // this.salary.employee_id = this.$route.params.id;
      // this.$v.$touch();
      // if (!this.$v.$invalid) {
      let formData = {
        employee_id: this.salary.employee_id,
        month: this.month,
        year: this.year,
        basic_salary: parseFloat(this.salary.basic_salary),
        earnings: this.salary.earnings.inputs,
        deductions: this.salary.deductions.inputs,
        expenses: this.salary.expenses.inputs,
        total_earnings: parseFloat(this.salary.total_earnings),
        total_absents: parseFloat(this.salary.total_absent),
        total_leaves: parseFloat(this.salary.total_leaves),
        total_deductions: parseFloat(this.salary.total_deductions),
        total_expenses: parseFloat(this.salary.total_expenses),
        total_working_days: parseFloat(this.salary.total_working_days),
        total_days: parseFloat(this.salary.total_days),
        net_salary: parseFloat(this.salary.net_salary),
        payable_salary: parseFloat(this.salary.payable_salary),
      };

      EmployeeSalaryAdjustmentService.update(this.salary.id, formData)
        .then((res) => {
          if (res.status == 200) {
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Salary Updated Successfully",
              timer: 3600,
            });
            // this.$v.$reset();
            // this.resetForm();
            if (this.saveAndExit) {
              this.$router.push({ path: "/salary/index" });
            } else {
              this.$router.push({ path: "/salary/edit/" + res.data.uuid });
            }
          }
        })
        .catch((error) => {
          // this.isEditing = false;
          console.log(error);
          this.$swal.fire({
            icon: "error",
            title: "Error",
            text: "Something Went Wrong.",
            timer: 3600,
          });
        });
      // }
    },
    getEmployeeSalary() {
      EmployeeSalaryAdjustmentService.get(this.salary.id)
        .then(({ data }) => {
          if (data != null && data != "") {
            this.isEditing = true;
            this.salary.id = data.uuid;
            this.salary.employee_id = data.employee.uuid;
            this.month = data.month;
            this.year = data.year;
            this.salary.total_working_days = data.total_working_days;
            this.salary.total_days = data.total_days;
            this.salary.total_leaves = data.total_leaves;
            this.salary.total_absent = data.total_absents ? data.total_absents : 0;
            this.salary.basic_salary = data.basic_salary;
            this.salary.total_earnings = data.total_earnings;
            this.salary.total_deductions = data.total_deductions;
            this.salary.net_salary = data.net_salary;
            let earnings = JSON.parse(data.earnings);
            this.salary.deductions.inputs = [];
            this.salary.earnings.inputs = [];
            this.salary.expenses.inputs = [];
            if (earnings && earnings.length) {
              for (let index in earnings) {
                this.salary.earnings.inputs.push({
                  name: earnings[index].name,
                  value: earnings[index].value,
                });
              }
            } else {
              this.addEarnings();
            }

            let deductions = JSON.parse(data.deductions);
            if (deductions && deductions.length) {
              for (let index in deductions) {
                this.salary.deductions.inputs.push({
                  name: deductions[index].name,
                  value: deductions[index].value,
                });
              }
            } else {
              this.addDeduction();
            }

            let expenses = JSON.parse(data.expenses);
            if (expenses && expenses.length) {
              for (let index in expenses) {
                this.salary.expenses.inputs.push({
                  name: expenses[index].name,
                  value: expenses[index].value,
                });
              }
            } else {
              this.addExpense();
            }
            this.calculateSalary();
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
      let total_expenses = 0;
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
      //deduction
      if (this.salary.expenses.inputs.length > 0) {
        for (let index in this.salary.expenses.inputs) {
          if (this.salary.expenses.inputs[index].value) {
            total_expenses += parseInt(this.salary.expenses.inputs[index].value);
          }
        }
      }
      this.salary.total_earnings = total_earnings;
      this.salary.total_deductions = total_deductions;
      this.salary.total_expenses = total_expenses;

      this.salary.net_salary = parseFloat(total_earnings) - parseFloat(total_deductions);
      this.salary.payable_salary =
        parseFloat(this.salary.net_salary) + parseFloat(total_expenses);
    },
    genrateSalary() {
      if (this.year !== "" && this.month !== "") {
        EmployeeSalaryService.genrateSalary(
          this.salary.employee_id,
          this.year,
          this.month
        )
          .then(({ data }) => {
            console.log(data);
            if (data != undefined && data != "") {
              this.salary.basic_salary = data.emp.salary.basic_salary
                ? data.emp.salary.basic_salary
                : 0;
              this.salary.net_salary = data.emp.salary.basic_salary;
              this.salary.total_working_days = data.total_working_days;
              this.salary.total_days = data.total_days;
              this.salary.total_leaves = data.total_leaves;
              this.salary.total_absent = data.total_absent;
              this.salary.deductions.inputs = [];
              this.salary.earnings.inputs = [];
              this.salary.expenses.inputs = [];

              if (data.allowances && data.allowances.length) {
                data.allowances.forEach((element) => {
                  this.salary.earnings.inputs.unshift({
                    name: element.name.en,
                    value: parseInt(element.amount),
                  });
                });
              } else {
                this.addEarnings();
              }

              if (data.deductions && data.deductions.length) {
                data.deductions.forEach((element) => {
                  this.salary.deductions.inputs.unshift({
                    name: element.name.en,
                    value: parseInt(element.amount),
                  });
                });
              } else {
                this.addDeduction();
              }

              if (data.expenses && data.expenses.length) {
                data.expenses.forEach((element) => {
                  this.salary.expenses.inputs.unshift({
                    name: element.name.en,
                    value: parseInt(element.amount),
                  });
                });
              }

              this.showSalaryForm = true;
              this.calculateSalary();
            }
          })
          .catch((error) => {
            this.showSalaryForm = false;
            console.log(error);
          });
      }
    },
    getAllEmployees() {
      this.$http
        .get("/employees-create")
        .then(({ data }) => {
          if (data != undefined && data != "") {
            const employees = this.options.employees;

            data.employees.map(function (val) {
              employees.push({ value: val.uuid, label: val.full_name.en });
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getEditData(uuid) {
      // this.resetForm();
      this.isEditing = true;
      this.showSalaryForm = true;
      this.salary.id = uuid;
      this.getEmployeeSalary();
    },
    resetForm() {
      this.salary.total_working_days = 0;
      this.salary.total_days = 0;
      this.salary.total_leaves = 0;
      this.salary.total_absent = 0;
      this.salary.basic_salary = 0;
      this.salary.total_earnings = 0;
      this.salary.total_deductions = 0;
      this.salary.total_expenses = 0;
      this.salary.net_salary = 0;
      // this.isEditing = false;
      // this.showSalaryForm = false;
    },
  },
};
</script>

<style>
.errorMsg {
  color: red;
}
</style>
