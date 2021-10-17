<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardBody>
            <router-link class="btn btn-success" to="/salary/create"
              >Create Salary</router-link
            >
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
