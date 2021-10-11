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
              <CInput
                label="Total Working Days"
                v-model="salary.total_working_days"
                disabled
              />
            </CCol>
            <CCol sm="6" md="3" class="pt-2">
              <CInput
                label="Total Working Horus"
                v-model="salary.total_working_hours"
                disabled
              />
            </CCol>

            <CCol sm="6" md="3" class="pt-2">
              <CInput
                label="Total Present"
                type="number"
                v-model="salary.total_present"
                disabled
              />
            </CCol>
            <CCol sm="6" md="3" class="pt-2">
              <CInput
                label="Total Leaves"
                type="number"
                v-model="salary.total_leaves"
                disabled
              />
            </CCol>
            <CCol sm="6" md="3" class="pt-2">
              <CInput
                label="Total Absent"
                type="number"
                v-model="salary.total_absent"
                disabled
              />
            </CCol>
            <CCol sm="6" md="3" class="pt-2">
              <CInput
                label="Total Late"
                type="number"
                v-model="salary.total_late"
                disabled
              />
            </CCol>
            <CCol sm="6" md="3" class="pt-2">
              <CInput
                label="Total Overtime"
                type="number"
                v-model="salary.total_overtime"
                disabled
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="6" md="6" class="pt-2">
              <h3>Earnings</h3>
              <CInput label="Basic Salary" type="number" v-model="salary.basic_salary" />
              <CInput
                label="Overtime"
                type="number"
                v-model="salary.earnings.overtime_price"
              />
              <CInput
                label="Allowances"
                type="number"
                v-model="salary.earnings.allowance_price"
              />
              <CInput
                label="Commission"
                type="number"
                v-model="salary.earnings.commision"
              />
            </CCol>
            <CCol sm="6" md="6" class="pt-2">
              <h3>Deductions</h3>
              <CInput
                label="Absents"
                type="number"
                v-model="salary.deduction.absent_price"
              />
              <CInput
                label="Loans"
                type="number"
                v-model="salary.deduction.loans_price"
              />
              <CInput
                label="Advance Salary"
                type="number"
                v-model="salary.deduction.advance_salary"
              />
              <!-- <CInput
                label="Remaining Salary"
                type="number"
                v-model="salary.remaining_salary"
              /> -->
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="6" md="6" class="pt-2"
              ><h6>Basic Salary: {{ this.salary.basic_salary }}</h6>

              <h6>Earned Salary: {{ this.salary.remaining_salary }}</h6>

              <h6>Allowances: +{{ salary.earnings.allowance_price }}</h6>
              <h6>Overtime: +{{ salary.earnings.overtime_price }}</h6>
              <h6>Commission: +{{ salary.earnings.commision }}</h6>

              <h6>Total Deductions: -{{ salary.total_deductions }}</h6>

              <h4>Net Salary: {{ salary.total_remeaning_salary }}</h4>
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
      total_working_hours: 0,
      total_leaves: 0,
      total_absent: 0,
      total_present: 0,
      total_late: 0,
      total_overtime: 0,
      basic_salary: 0,
      month_days: 0,
      remaining_salary: 0,
      total_remeaning_salary: 0,
      total_deductions: 0,
      deduction: {
        absent_price: 0,
        loans_price: 0,
        advance_salary: 0,
      },
      earnings: {
        overtime_price: 0,
        allowance_price: 0,
        commision: 0,
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
    "salary.deduction.absent_price"() {
      this.calculateSalary();
    },
    "salary.deduction.loans_price"() {
      this.calculateSalary();
    },
    "salary.deduction.advance_salary"() {
      this.calculateSalary();
    },
    "salary.earnings.overtime_price"() {
      this.calculateSalary();
    },
    "salary.earnings.allowance_price"() {
      this.calculateSalary();
    },
    "salary.earnings.commision"() {
      this.calculateSalary();
    },
    "salary.remaining_salary"() {
      this.calculateSalary();
    },
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
      let per_day_salary = parseFloat(this.salary.basic_salary) / this.salary.month_days;
      let absent_deduction = 0;
      let loan_deduction = 0;
      let commission_deduction = 0;
      basic_salary = parseFloat(this.salary.remaining_salary);

      if (per_day_salary && this.salary.total_present) {
        this.salary.remaining_salary = per_day_salary * this.salary.total_present;
      }

      if (this.salary.earnings.overtime_price > 0) {
        basic_salary += parseFloat(this.salary.earnings.overtime_price);
      }

      if (this.salary.earnings.allowance_price > 0) {
        basic_salary += parseFloat(this.salary.earnings.allowance_price);
      }

      if (this.salary.earnings.commision > 0) {
        basic_salary += parseFloat(this.salary.earnings.commision);
      }
      // salary genrate issue absent not counting
      //deduction
      // this.salary.deduction.absent_price = per_day_salary * this.salary.total_absent;
      if (this.salary.deduction.absent_price > 0) {
        absent_deduction = parseFloat(this.salary.deduction.absent_price);
        basic_salary -= parseFloat(this.salary.deduction.absent_price);
      }
      console.log(this.salary.deduction.absent_price);
      if (this.salary.deduction.loans_price > 0) {
        loan_deduction = parseFloat(this.salary.deduction.loans_price);
        basic_salary -= parseFloat(this.salary.deduction.loans_price);
      }
      if (this.salary.deduction.advance_salary > 0) {
        commission_deduction = parseFloat(this.salary.deduction.advance_salary);
        basic_salary -= parseFloat(this.salary.deduction.advance_salary);
      }

      this.salary.total_deductions =
        absent_deduction + loan_deduction + commission_deduction;
      this.salary.total_remeaning_salary = parseFloat(basic_salary);
    },
    genrateSlip() {
      let formData = {
        employee_id: this.empId,
        month: this.months[this.month - 1],
        basic_salary: parseFloat(this.salary.basic_salary),
        allowances: parseFloat(this.salary.earnings.allowance_price),
        other: parseFloat(this.salary.earnings.commision),
        total_earning: parseFloat(this.salary.remaining_salary),
        absent: parseFloat(this.salary.deduction.absent_price),
        advance: parseFloat(this.salary.deduction.advance_salary),
        total_deductions: parseFloat(this.salary.total_deductions),
        net_salary: parseFloat(this.salary.total_remeaning_salary),
      };
      console.log(formData);

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
            if (data != undefined && data != "") {
              if (
                data.emp.leave > 0 ||
                data.emp.absent > 0 ||
                data.emp.late > 0 ||
                data.emp.present > 0 ||
                data.emp.total_working_hours > 0
              ) {
                let absent_deduction = 0;
                let loan_deduction = 0;
                this.salary.emp_name = data.emp.full_name.en;
                this.salary.emp_designation = data.emp.designation.name;
                this.salary.basic_salary = data.emp.salary.basic_salary;
                this.salary.total_working_days = data.total_working_days;
                this.salary.total_working_hours = data.emp.total_working_hours;
                this.salary.total_leaves = data.emp.leave;
                this.salary.total_absent = data.emp.absent;
                this.salary.total_late = data.emp.late;
                this.salary.total_present = data.emp.present;
                this.salary.total_overtime = data.overtime;
                if (data.per_day_salary && data.emp.absent) {
                  absent_deduction = data.per_day_salary * data.emp.absent;
                  this.salary.deduction.absent_price = absent_deduction;
                }

                this.salary.earnings.overtime_price = data.per_day_salary * data.overtime;
                this.salary.remaining_salary = data.per_day_salary * data.emp.present;
                this.salary.earnings.allowance_price = data.allowances_price;
                if (data.loans_price) {
                  loan_deduction = data.loans_price;
                  this.salary.deduction.loans_price = loan_deduction;
                }
                this.salary.total_remeaning_salary = data.remeaning_salary;
                this.salary.earnings.commision = this.salary.deduction.advance_salary = 0;
                this.salary.total_deductions = absent_deduction + loan_deduction;
                this.salary.month_days = data.month_days;
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
