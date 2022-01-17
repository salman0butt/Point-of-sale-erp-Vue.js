<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Job Categories </CCardHeader>
          <CCardBody>
            <router-link
              class="btn btn-success"
              to="/recruitment/jobCategories/create"
              style="float: right"
              >Create Job Category</router-link
            >
            <div style="clear: both; margin-bottom: 20px"></div>
            <JobCategoryIndex />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import JobCategoryIndex from "@/components/recruitments/jobCategory/JobCategoryIndex";
export default {
  name: "IndexJobCategory",
  components: { JobCategoryIndex },
  data() {
    return {};
  },
  methods: {},
};
</script>
