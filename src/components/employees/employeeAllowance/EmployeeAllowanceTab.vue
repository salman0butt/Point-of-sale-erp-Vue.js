<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Allowances</CCardHeader>
          <CCardBody>
            <EmployeeAllowanceToggle />
          </CCardBody>
        </CCard>
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
