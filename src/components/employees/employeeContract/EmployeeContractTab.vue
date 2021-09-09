<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Edit Employee</CCardHeader>
          <CCardBody>
            <CTabs add-tab-classes="mt-1" variant="pills" fade>
              <CTab active id="show">
                <template slot="title">
                  {{ tabs.license }}
                </template>
                <EmployeeContractToggle />
              </CTab>
            </CTabs>
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
  data: () => ({
    tabs: {
      license: "Contracts",
    },
  }),
};
</script>
