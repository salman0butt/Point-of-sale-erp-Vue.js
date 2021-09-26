<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <EmployeeBankAccountToggle />
      </CCol>
    </CRow>
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
