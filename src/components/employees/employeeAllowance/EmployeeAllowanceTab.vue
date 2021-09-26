<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <EmployeeAllowanceToggle />
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeAllowanceToggle from "@/components/employees/employeeAllowance/EmployeeAllowanceToggle";

export default {
  name: "EmployeeAllowanceTab",
  components: { EmployeeAllowanceToggle },
  data: () => ({}),
};
</script>
