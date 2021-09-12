<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Qualifications</CCardHeader>
          <CCardBody>
            <EmployeeQualificationToggle />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeQualificationToggle from "@/components/employees/employeeQualification/EmployeeQualificationToggle";

export default {
  name: "EmployeeQualificationTab",
  components: { EmployeeQualificationToggle },
  data: () => ({}),
};
</script>
