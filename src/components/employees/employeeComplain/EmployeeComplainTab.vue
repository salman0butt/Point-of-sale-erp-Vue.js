<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Complains</CCardHeader>
          <CCardBody>
            <EmployeeComplainToggle />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeComplainToggle from "@/components/employees/employeeComplain/EmployeeComplainToggle";

export default {
  name: "EmployeeComplainTab",
  components: { EmployeeComplainToggle },
  data: () => ({}),
};
</script>
