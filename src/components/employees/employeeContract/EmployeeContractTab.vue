<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Contracts</CCardHeader>
          <CCardBody>
            <EmployeeContractToggle />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeContractToggle from "@/components/employees/employeeContract/EmployeeContractToggle";

export default {
  name: "EmployeeContractTab",
  components: { EmployeeContractToggle },
  data: () => ({}),
};
</script>
