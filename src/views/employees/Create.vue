<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>New Employee </CCardHeader>
          <CCardBody>
            <CTabs add-tab-classes="mt-1">
              <CTab active>
                <template slot="title">
                  {{ tabs.employee }}
                </template>
                <EmployeeForm />
              </CTab>
              <CTab disabled>
                <template slot="title">
                  {{ tabs.detail }}
                </template>
              </CTab>
              <CTab disabled>
                <template slot="title">
                  {{ tabs.salary }}
                </template>
              </CTab>
              <CTab disabled>
                <template slot="title">
                  {{ tabs.target }}
                </template>
              </CTab>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import EmployeeForm from "@/components/employees/EmployeeForm";

export default {
  name: "CreateEmployee",
  components: {
    EmployeeForm,
  },
  data: () => ({
    isEditing: false,
    saveAndExit: false,
    tabs: {
      employee: "Employee",
      detail: "Detail",
      salary: "Salary",
      target: "Traget",
    },
  }),
  methods: {},
};
</script>
