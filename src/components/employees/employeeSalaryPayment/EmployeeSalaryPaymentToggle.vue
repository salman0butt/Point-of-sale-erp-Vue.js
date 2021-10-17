<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CButton
          @click="ToggleEmployeeSalaryPayment()"
          color="primary"
          class="mb-2 mt-3"
          style="float: right"
        >
          {{ toggleName }}
        </CButton>
      </CCol>
    </CRow>
    <CRow>
      <CCol xs="12" lg="12">
        <CCollapse :show="collapse_table">
          <EmployeeSalaryPaymentIndex
            ref="employeeSalaryPaymentRef"
            @employee-salary-payment-edit="employeeSalaryPaymentEdited"
          />
        </CCollapse>
        <CCollapse :show="collapse">
          <EmployeeSalaryPaymentForm
            ref="employeeSalaryPaymentEditRef"
            @employee-salary-payment-update="employeeSalaryPaymentCreatedSend"
          />
        </CCollapse>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeSalaryPaymentIndex from "@/components/employees/employeeSalaryPayment/EmployeeSalaryPaymentIndex";
import EmployeeSalaryPaymentForm from "@/components/employees/employeeSalaryPayment/EmployeeSalaryPaymentForm";

export default {
  name: "EmployeeSalaryPaymentToggle",
  components: { EmployeeSalaryPaymentIndex, EmployeeSalaryPaymentForm },
  data: () => ({
    toggleName: "Add New Salary Payments",
    collapse: false,
    collapse_table: true,
  }),
  methods: {
    ToggleEmployeeSalaryPayment() {
      this.resetEmployeeSalaryPaymentForm();
      this.collapse = !this.collapse;
      this.collapse_table = !this.collapse_table;
      if (this.toggleName == "Add New Salary Payments") {
        this.toggleName = "Go To Salary Payments";
      } else if (this.toggleName == "Go To Salary Payments") {
        this.toggleName = "Add New Salary Payments";
      }
    },
    employeeSalaryPaymentCreatedSend() {
      this.ToggleEmployeeSalaryPayment();
      this.$refs.employeeSalaryPaymentRef.getEmployeeSalaryPayment();
    },
    employeeSalaryPaymentEdited(uuid) {
      this.ToggleEmployeeSalaryPayment();
      this.$refs.employeeSalaryPaymentEditRef.getEditData(uuid);
    },
    resetEmployeeSalaryPaymentForm() {
      this.$refs.employeeSalaryPaymentEditRef.resetForm();
    },
  },
};
</script>

<style>
.errorMsg {
  color: red;
}
</style>
