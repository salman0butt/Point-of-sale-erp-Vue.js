<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Awards</CCardHeader>
          <CCardBody>
            <EmployeeAwardToggle />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeAwardToggle from "@/components/employees/employeeAward/EmployeeAwardToggle";

export default {
  name: "EmployeeAwardTab",
  components: { EmployeeAwardToggle },
  data: () => ({}),
};
</script>
