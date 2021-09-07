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
                  {{ tabs.qualification }}
                </template>
                <EmployeeQualificationToggle />
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

export default {
  name: "EmployeeQualificationTab",
  components: { EmployeeQualificationToggle },
  data: () => ({
    tabs: {
      qualification: "Qualification",
      detail: "Detail",
    },
  }),
};
</script>
