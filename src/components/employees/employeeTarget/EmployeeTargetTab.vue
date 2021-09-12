<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Targets</CCardHeader>
          <CCardBody>
            <EmployeeTargetToggle />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeTargetToggle from "@/components/employees/employeeTarget/EmployeeTargetToggle";

export default {
  name: "EmployeeTargetTab",
  components: { EmployeeTargetToggle },
  data: () => ({}),
};
</script>
