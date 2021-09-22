<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Deductions</CCardHeader>
          <CCardBody>
            <EmployeeDeductionToggle />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeDeductionToggle from "@/components/employees/employeeDeduction/EmployeeDeductionToggle";

export default {
  name: "EmployeeDeductionTab",
  components: { EmployeeDeductionToggle },
  data: () => ({}),
};
</script>
