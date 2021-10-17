<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Salary Payemnts</CCardHeader>
          <CCardBody>
            <EmployeeSalaryPaymentToggle />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeSalaryPaymentToggle from "@/components/employees/employeeSalaryPayment/EmployeeSalaryPaymentToggle";

export default {
  name: "EmployeeSalaryPaymentTab",
  components: { EmployeeSalaryPaymentToggle },
  data: () => ({}),
};
</script>
