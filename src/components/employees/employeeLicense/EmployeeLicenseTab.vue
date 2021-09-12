<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Licenses</CCardHeader>
          <CCardBody>
            <EmployeeLicenseToggle />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeLicenseToggle from "@/components/employees/employeeLicense/EmployeeLicenseToggle";

export default {
  name: "EmployeeLicenseTab",
  components: { EmployeeLicenseToggle },
  data: () => ({}),
};
</script>
