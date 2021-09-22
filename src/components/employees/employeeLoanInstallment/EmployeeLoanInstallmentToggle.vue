<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CButton
          @click="ToggleEmployeeLoanInstallment()"
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
          <EmployeeLoanInstallmentIndex
            ref="employeeLoanInstallmentRef"
            @employee-loaninstallment-edit="employeeLoanInstallmentEdit"
          />
        </CCollapse>
        <CCollapse :show="collapse">
          <EmployeeLoanInstallmentForm
            ref="employeeLoanInstallmentEditRef"
            @employee-loaninstallment-update="employeeLoanInstallmentUpdate"
          />
        </CCollapse>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeLoanInstallmentIndex from "@/components/employees/employeeLoanInstallment/EmployeeLoanInstallmentIndex";
import EmployeeLoanInstallmentForm from "@/components/employees/employeeLoanInstallment/EmployeeLoanInstallmentForm";

export default {
  name: "EmployeeLoanInstallmentTab",
  components: { EmployeeLoanInstallmentIndex, EmployeeLoanInstallmentForm },
  data: () => ({
    toggleName: "Add New Loan Installment",
    collapse: false,
    collapse_table: true,
  }),
  methods: {
    ToggleEmployeeLoanInstallment() {
      this.resetEmployeeLoanInstallmentForm();
      this.collapse = !this.collapse;
      this.collapse_table = !this.collapse_table;
      if (this.toggleName == "Add New Loan Installment") {
        this.toggleName = "Go To Loan Installments";
      } else if (this.toggleName == "Go To Loan Installments") {
        this.toggleName = "Add New Loan Installment";
      }
    },
    employeeLoanInstallmentUpdate() {
      this.ToggleEmployeeLoanInstallment();
      // this.$refs.employeeLoanInstallmentRef.updateTableData(data);
      this.$refs.employeeLoanInstallmentRef.getEmployeeLoanInstallment();
    },
    employeeLoanInstallmentEdit(uuid) {
      this.ToggleEmployeeLoanInstallment();
      this.$refs.employeeLoanInstallmentEditRef.getEditData(uuid);
      console.log(uuid);
    },
    resetEmployeeLoanInstallmentForm() {
      this.$refs.employeeLoanInstallmentEditRef.resetForm();
    },
  },
};
</script>
