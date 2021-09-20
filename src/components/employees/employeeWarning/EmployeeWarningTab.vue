<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Warnings</CCardHeader>
          <CCardBody>
            <EmployeeWarningToggle />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeWarningToggle from "@/components/employees/employeeWarning/EmployeeWarningToggle";

export default {
  name: "EmployeeWarningTab",
  components: { EmployeeWarningToggle },
  data: () => ({}),
};
</script>
