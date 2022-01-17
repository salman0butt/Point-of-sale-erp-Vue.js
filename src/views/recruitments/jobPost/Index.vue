<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Job Posts </CCardHeader>
          <CCardBody>
            <router-link
              class="btn btn-success"
              to="/recruitment/jobPosts/create"
              style="float: right"
              >Create Job Post</router-link
            >
            <div style="clear: both; margin-bottom: 20px"></div>
            <JobPostIndex />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import JobPostIndex from "@/components/recruitments/jobPost/JobPostIndex";
export default {
  name: "IndexJobPost",
  components: { JobPostIndex },
  data() {
    return {};
  },
  methods: {},
};
</script>
