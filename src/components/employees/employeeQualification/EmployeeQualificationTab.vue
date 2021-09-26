<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Qualifications</CCardHeader>
          <CCardBody>
            <CTabs add-tab-classes="mt-1" variant="pills" fade>
              <CTab active id="show">
                <template slot="title">
                  {{ tabs.qualification }}
                </template>
                <EmployeeQualificationToggle />
              </CTab>
              <CTab id="show">
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
import EmployeeQualificationToggle from "@/components/employees/employeeQualification/EmployeeQualificationToggle";
import EmployeeLicenseToggle from "@/components/employees/employeeLicense/EmployeeLicenseToggle";

export default {
  name: "EmployeeQualificationTab",
  components: { EmployeeQualificationToggle, EmployeeLicenseToggle },
  data: () => ({
    tabs: {
      qualification: "Qualifications",
      license: "Licenses",
    },
  }),
};
</script>
