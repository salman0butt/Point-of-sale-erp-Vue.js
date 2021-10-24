<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardBody>
            <router-link
              v-if="$ability.can('store', 'employee-grades')"
              class="btn btn-success"
              to="/grades/create"
              >Create Grades</router-link
            >
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
