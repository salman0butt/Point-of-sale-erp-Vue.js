<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Edit Employee</CCardHeader>
          <CCardBody>
            <CTabs add-tab-classes="mt-1" variant="pills" fade>
              <CTab active id="show">
                <template slot="title">
                  {{ tabs.contacts }}
                </template>
                <EmployeeEmergencyContactToggle />
              </CTab>
            </CTabs>
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
  data: () => ({
    tabs: {
      contacts: "Emergency Contacts",
    },
  }),
};
</script>
