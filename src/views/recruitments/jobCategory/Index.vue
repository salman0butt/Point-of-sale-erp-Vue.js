<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardBody>
            <router-link class="btn btn-success" to="/recruitment/jobCategories/create"
              >Create Job Category</router-link
            >
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
