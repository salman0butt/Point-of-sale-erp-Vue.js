<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CButton
          @click="ToggleEmployeeExpense()"
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
          <EmployeeExpenseIndex
            ref="employeeExpenseRef"
            @employee-expense-edit="employeeExpenseEdit"
          />
        </CCollapse>
        <CCollapse :show="collapse">
          <EmployeeExpenseForm
            ref="employeeExpenseEditRef"
            @employee-expense-update="employeeExpenseUpdate"
          />
        </CCollapse>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeExpenseIndex from "@/components/employees/employeeExpense/EmployeeExpenseIndex";
import EmployeeExpenseForm from "@/components/employees/employeeExpense/EmployeeExpenseForm";

export default {
  name: "EmployeeExpenseTab",
  components: { EmployeeExpenseIndex, EmployeeExpenseForm },
  data: () => ({
    toggleName: "Add New Expense",
    collapse: false,
    collapse_table: true,
  }),
  methods: {
    ToggleEmployeeExpense() {
      this.resetEmployeeExpenseForm();
      this.collapse = !this.collapse;
      this.collapse_table = !this.collapse_table;
      if (this.toggleName == "Add New Expense") {
        this.toggleName = "Go To Expenses";
      } else if (this.toggleName == "Go To Expenses") {
        this.toggleName = "Add New Expense";
      }
    },
    employeeExpenseUpdate(data) {
      this.ToggleEmployeeExpense();
      // this.$refs.employeeExpenseRef.updateTableData(data);
      this.$refs.employeeExpenseRef.getEmployeeExpense();
    },
    employeeExpenseEdit(uuid) {
      this.ToggleEmployeeExpense();
      this.$refs.employeeExpenseEditRef.getEditData(uuid);
    },
    resetEmployeeExpenseForm() {
      this.$refs.employeeExpenseEditRef.resetForm();
    },
  },
};
</script>
