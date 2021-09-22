<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Loans</CCardHeader>
          <CCardBody>
            <EmployeeLoanToggle />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeLoanToggle from "@/components/employees/employeeLoan/EmployeeLoanToggle";

export default {
  name: "EmployeeLoanTab",
  components: { EmployeeLoanToggle },
  data: () => ({}),
};
</script>
