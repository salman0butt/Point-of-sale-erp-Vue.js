<template>
  <div>
    <CCard>
      <CCardHeader>Bank Accounts</CCardHeader>
      <CCardBody>
        <CRow>
          <CCol xs="12" lg="12">
            <EmployeeBankAccountToggle />
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  </div>
</template>
<script>
import EmployeeBankAccountToggle from "@/components/employees/employeeBankAccount/EmployeeBankAccountToggle";

export default {
  name: "EmployeeBankAccountTab",
  components: { EmployeeBankAccountToggle },
  data: () => ({}),
};
</script>
