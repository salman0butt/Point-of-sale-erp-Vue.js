<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Salary </CCardHeader>
          <CCardBody>
            <router-link class="btn btn-success" to="/salary/create" style="float: right"
              >Create Salary</router-link
            >
            <div style="clear: both; margin-bottom: 20px"></div>
            <SalaryIndex />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import SalaryIndex from "@/components/salary/SalaryIndex";
export default {
  name: "IndexSalary",
  components: { SalaryIndex },
  data() {
    return {};
  },
  methods: {},
};
</script>
