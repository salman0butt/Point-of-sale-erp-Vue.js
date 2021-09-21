<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Loan Installments</CCardHeader>
          <CCardBody>
            <EmployeeLoanInstallmentToggle />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeLoanInstallmentToggle from "@/components/employees/employeeLoanInstallment/EmployeeLoanInstallmentToggle";

export default {
  name: "EmployeeLoanInstallmentTab",
  components: { EmployeeLoanInstallmentToggle },
  data: () => ({}),
};
</script>
