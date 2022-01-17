<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Grades </CCardHeader>
          <CCardBody>
            <router-link class="btn btn-success" to="/grades/create" style="float: right"
              >Create Grades</router-link
            >
            <div style="clear: both; margin-bottom: 20px"></div>
            <EmployeeGradeIndex />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import EmployeeGradeIndex from "@/components/employees/employeeGrade/EmployeeGradeIndex";
export default {
  name: "IndexGrade",
  components: { EmployeeGradeIndex },
  data() {
    return {};
  },
  created() {},
  watch: {},
  computed: {},
  methods: {},
};
</script>
