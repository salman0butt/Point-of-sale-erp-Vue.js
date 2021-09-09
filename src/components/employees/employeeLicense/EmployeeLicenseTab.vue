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
                <EmployeeLicenseToggle />
              </CTab>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeLicenseToggle from "@/components/employees/employeeLicense/EmployeeLicenseToggle";

export default {
  name: "EmployeeLicenseTab",
  components: { EmployeeLicenseToggle },
  data: () => ({
    tabs: {
      license: "Licenses",
    },
  }),
};
</script>
