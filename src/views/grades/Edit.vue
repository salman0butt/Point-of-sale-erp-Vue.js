<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Edit Grade</CCardHeader>
          <CCardBody> <EmployeeGradeForm /></CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import EmployeeGradeForm from "@/components/employees/employeeGrade/EmployeeGradeForm";
export default {
  name: "EditGrade",
  components: { EmployeeGradeForm },
  data: () => ({
    isEditing: true,
  }),
  created() {},
  methods: {},
};
</script>
