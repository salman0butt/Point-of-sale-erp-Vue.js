<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Expenses</CCardHeader>
          <CCardBody>
            <EmployeeExpenseToggle />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeExpenseToggle from "@/components/employees/employeeExpense/EmployeeExpenseToggle";

export default {
  name: "EmployeeExpenseTab",
  components: { EmployeeExpenseToggle },
  data: () => ({}),
};
</script>
