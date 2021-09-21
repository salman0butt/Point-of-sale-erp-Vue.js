<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form
          @submit.prevent="
            isEditing ? updateEmployeeLoanInstallment() : saveEmployeeLoanInstallment()
          "
        >
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Loan"
                :options="options.loans"
                :value.sync="form.employee_loan_id"
                :class="{ error: $v.form.employee_loan_id.$error }"
                @input="$v.form.employee_loan_id.$touch()"
              />
              <div v-if="$v.form.employee_loan_id.$error">
                <p v-if="!$v.form.employee_loan_id.required" class="errorMsg">
                  Loan is required
                </p>
              </div>
            </CCol>

            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Installment"
                type="number"
                v-model="form.installment"
                :class="{ error: $v.form.installment.$error }"
                @input="$v.form.installment.$touch()"
              />
              <div v-if="$v.form.installment.$error">
                <p v-if="!$v.form.installment.required" class="errorMsg">
                  Installment is required
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
                <p v-if="!$v.form.date.required" class="errorMsg">
                  Installment is required
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
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeLoanInstallmentService from "@/services/employees/EmployeeLoanInstallmentService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "EmployeeLoanInstallmentForm",
  data: () => ({
    isEditing: false,
    form: {
      id: null,
      employee_loan_id: "",
      installment: "",
      date: "",
    },
    empId: null,
    options: {
      loans: [{ value: "", label: "Choose loan", disabled: true, selected: "" }],
    },
  }),
  validations() {
    return {
      form: {
        employee_loan_id: { required },
        installment: { required },
        date: { required },
      },
    };
  },
  created() {
    this.empId = this.$route.params.id;
    this.getAllEmployeeLoans();
  },
  methods: {
    saveEmployeeLoanInstallment() {
      this.form.employee_id = this.$route.params.id;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        EmployeeLoanInstallmentService.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Loan Installment Added Successfully",
                timer: 3600,
              });
              this.$emit("employee-loaninstallment-update");
              this.$v.$reset();
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
    updateEmployeeLoanInstallment() {
      this.form.employee_id = this.$route.params.id;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        EmployeeLoanInstallmentService.update(this.form.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Loan Installment Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.$emit("employee-loaninstallment-update");
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
    getAllEmployeeLoans() {
      EmployeeLoanInstallmentService.fetchEmployeeLoans(this.empId)
        .then(({ data }) => {
          // console.log(data);
          if (data !== "" && data !== undefined) {
            const loans = this.options.loans;
            if (data.loans) {
              data.loans.map(function (val) {
                loans.push({ value: val.uuid, label: val.name.en });
              });
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getEmployeeLoanInstallment() {
      EmployeeLoanInstallmentService.get(this.empId)
        .then(({ data }) => {
          if (data != null && data != "") {
            this.isEditing = true;
            this.form.id = data.uuid;
            this.form.employee_loan_id = data.employee_loan_id;
            this.form.installment = data.installment;
            this.form.date = data.date;
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
      this.getEmployeeLoanInstallment();
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
