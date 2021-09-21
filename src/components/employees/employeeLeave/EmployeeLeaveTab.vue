<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Leaves</CCardHeader>
          <CCardBody>
            <EmployeeLeaveToggle />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeLeaveToggle from "@/components/employees/employeeLeave/EmployeeLeaveToggle";

export default {
  name: "EmployeeLeaveTab",
  components: { EmployeeLeaveToggle },
  data: () => ({}),
};
</script>
