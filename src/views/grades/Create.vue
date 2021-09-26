<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>New Grade</CCardHeader>
          <CCardBody> <EmployeeGradeForm /> </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import EmployeeGradeForm from "@/components/employees/employeeGrade/EmployeeGradeForm";
export default {
  name: "CreateGrade",
  components: { EmployeeGradeForm },
  data: () => ({
    isEditing: false,
  }),
  methods: {},
};
</script>
