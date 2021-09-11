<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Emergency Contacts</CCardHeader>
          <CCardBody>
            <EmployeeEmergencyContactToggle />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeEmergencyContactToggle from "@/components/employees/employeeEmergencyContact/EmployeeEmergencyContactToggle";

export default {
  name: "EmployeeEmergencyContactTab",
  components: { EmployeeEmergencyContactToggle },
  data: () => ({}),
};
</script>
