<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Discounts</CCardHeader>
          <CCardBody>
            <EmployeeDiscountToggle />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeDiscountToggle from "@/components/employees/employeeDiscount/EmployeeDiscountToggle";

export default {
  name: "EmployeeDiscountTab",
  components: { EmployeeDiscountToggle },
  data: () => ({}),
};
</script>
