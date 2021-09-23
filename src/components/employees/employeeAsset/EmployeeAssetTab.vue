<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Assets</CCardHeader>
          <CCardBody>
            <EmployeeAssetToggle />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeAssetToggle from "@/components/employees/employeeAsset/EmployeeAssetToggle";

export default {
  name: "EmployeeAssetTab",
  components: { EmployeeAssetToggle },
  data: () => ({}),
};
</script>
