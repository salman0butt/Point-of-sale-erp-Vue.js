<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form
          @submit.prevent="
            isEditing ? updateEmployeeSalaryPayment() : saveEmployeeSalaryPayment()
          "
        >
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Employee"
                :options="options.employees"
                :value.sync="form.employee_id"
                :class="{ error: $v.form.employee_id.$error }"
                @input="$v.form.employee_id.$touch()"
              />
              <div v-if="$v.form.employee_id.$error">
                <p v-if="!$v.form.employee_id.required" class="errorMsg">
                  Employee is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Select Salary Adjustment"
                :options="options.employee_salary_adjustments"
                :value.sync="form.employee_salary_adjustment_id"
                :class="{ error: $v.form.employee_salary_adjustment_id.$error }"
                @input="$v.form.employee_salary_adjustment_id.$touch()"
              />
              <div v-if="$v.form.employee_salary_adjustment_id.$error">
                <p
                  v-if="!$v.form.employee_salary_adjustment_id.required"
                  class="errorMsg"
                >
                  Salary Adjustment is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Select Bank Account"
                :options="options.bank_accounts"
                :value.sync="form.bank_account_id"
                :class="{ error: $v.form.bank_account_id.$error }"
                @input="$v.form.bank_account_id.$touch()"
              />
              <div v-if="$v.form.bank_account_id.$error">
                <p v-if="!$v.form.bank_account_id.required" class="errorMsg">
                  Bank Account is required
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
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Amount Paid"
                type="number"
                placeholder="0.00"
                v-model="form.amount_paid"
                :class="{ error: $v.form.amount_paid.$error }"
                @input="$v.form.amount_paid.$touch()"
              />
              <div v-if="$v.form.amount_paid.$error">
                <p v-if="!$v.form.amount_paid.required" class="errorMsg">
                  Amount Paid is required
                </p>
              </div>
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
import EmployeeSalaryPaymentService from "@/services/employees/EmployeeSalaryPaymentService";
import { required } from "vuelidate/lib/validators";
import { cibAddthis, cisMinusSquare } from "@coreui/icons-pro";

export default {
  name: "EmployeeBasicForm",
  cibAddthis,
  cisMinusSquare,
  data: () => ({
    isEditing: false,
    saveAndExit: false,
    form: {
      id: "",
      employee_id: "",
      employee_salary_adjustment_id: "",
      bank_account_id: "",
      date: "",
      amount_paid: "",
    },
    empId: "",
    options: {
      employee_salary_adjustments: [
        { value: "", label: "Choose Salary Adjustment", disabled: true, selected: "" },
      ],
      bank_accounts: [
        { value: "", label: "Choose Bank Account", disabled: true, selected: "" },
      ],
      employees: [{ value: "", label: "Choose Employee", disabled: true, selected: "" }],
    },
  }),
  validations() {
    return {
      form: {
        employee_id: { required },
        employee_salary_adjustment_id: { required },
        bank_account_id: { required },
        date: { required },
        amount_paid: { required },
      },
    };
  },
  created() {
    this.form.id = this.$route.params.id;
    this.getOptions();
    this.getAllEmployees();
    if (this.form.id !== "" && this.form.id !== undefined) {
      this.isEditing = true;
      this.getEmployeeSalaryPayment();
    }
  },
  methods: {
    saveEmployeeSalaryPayment() {
      // this.form.employee_id = this.$route.params.id;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        EmployeeSalaryPaymentService.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Salary Payment Added Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              // this.resetForm();
              if (this.saveAndExit) {
                this.$router.push({ path: "/payments/index" });
              } else {
                this.$router.push({ path: "/payments/edit/" + res.data.uuid });
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
    updateEmployeeSalaryPayment() {
      // this.form.employee_id = this.$route.params.id;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        EmployeeSalaryPaymentService.update(this.form.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Salary Payment Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              if (this.saveAndExit) {
                this.$router.push({ path: "/payments/index" });
              } else {
                this.$router.push({ path: "/payments/edit/" + res.data.uuid });
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
    getOptions() {
      EmployeeSalaryPaymentService.getAllOptions()
        .then(({ data }) => {
          if (data != undefined && data != "") {
            const employee_salary_adjustments = this.options.employee_salary_adjustments;
            const bank_accounts = this.options.bank_accounts;
            if (data.employee_salary_adjustments) {
              data.employee_salary_adjustments.map(function (val) {
                employee_salary_adjustments.push({ value: val.uuid, label: val.month });
              });
            }
            if (data.bank_accounts) {
              data.bank_accounts.map(function (val) {
                bank_accounts.push({ value: val.uuid, label: val.name });
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getEmployeeSalaryPayment() {
      EmployeeSalaryPaymentService.get(this.form.id)
        .then(({ data }) => {
          if (data != null && data != "") {
            this.isEditing = true;
            this.form.id = data.uuid;
            this.form.employee_id = data.employee.uuid;
            this.form.employee_salary_adjustment_id =
              data.employee_salary_adjustment.uuid;
            this.form.bank_account_id = data.bank_account.uuid;
            this.form.date = data.date;
            this.form.amount_paid = data.amount_paid;
          }
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
        });
    },
    getAllEmployees() {
      this.$http
        .get("/employees-create")
        .then(({ data }) => {
          if (data != undefined && data != "") {
            const employees = this.options.employees;
            if (data.employees) {
              data.employees.map(function (val) {
                employees.push({ value: val.uuid, label: val.full_name.en });
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
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
