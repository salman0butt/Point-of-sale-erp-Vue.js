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
                <EmployeeQualificationForm />
              </CTab>
              <CTab>
                <template slot="title">
                  {{ tabs.detail }}
                </template>
                Detail tab
              </CTab>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeQualificationForm from "@/components/employees/employeeQualification/EmployeeQualificationForm";

export default {
  name: "EmployeeQualificationTab",
  components: { EmployeeQualificationForm },
  data: () => ({
    tabs: {
      qualification: "Qualification",
      detail: "Detail",
    },
  }),
};
</script>
