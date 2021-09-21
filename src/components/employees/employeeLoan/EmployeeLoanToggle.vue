<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CButton
          @click="ToggleEmployeeLoan()"
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
          <EmployeeLoanIndex
            ref="employeeLoanRef"
            @employee-loan-edit="employeeLoanEdit"
          />
        </CCollapse>
        <CCollapse :show="collapse">
          <EmployeeLoanForm
            ref="employeeLoanEditRef"
            @employee-loan-update="employeeLoanUpdate"
          />
        </CCollapse>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeLoanIndex from "@/components/employees/employeeLoan/EmployeeLoanIndex";
import EmployeeLoanForm from "@/components/employees/employeeLoan/EmployeeLoanForm";

export default {
  name: "EmployeeLoanTab",
  components: { EmployeeLoanIndex, EmployeeLoanForm },
  data: () => ({
    toggleName: "Add New Loan",
    collapse: false,
    collapse_table: true,
  }),
  methods: {
    ToggleEmployeeLoan() {
      this.resetEmployeeLoanForm();
      this.collapse = !this.collapse;
      this.collapse_table = !this.collapse_table;
      if (this.toggleName == "Add New Loan") {
        this.toggleName = "Go To Loans";
      } else if (this.toggleName == "Go To Loans") {
        this.toggleName = "Add New Loan";
      }
    },
    employeeLoanUpdate() {
      this.ToggleEmployeeLoan();
      // this.$refs.employeeLoanRef.updateTableData(data);
      this.$refs.employeeLoanRef.getEmployeeLoan();
    },
    employeeLoanEdit(uuid) {
      this.ToggleEmployeeLoan();
      this.$refs.employeeLoanEditRef.getEditData(uuid);
      console.log(uuid);
    },
    resetEmployeeLoanForm() {
      this.$refs.employeeLoanEditRef.resetForm();
    },
  },
};
</script>
