<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardBody>
            <router-link
              v-if="$ability.can('create', 'job-posts')"
              class="btn btn-success"
              to="/recruitment/jobPosts/create"
              >Create Job Post</router-link
            >
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
