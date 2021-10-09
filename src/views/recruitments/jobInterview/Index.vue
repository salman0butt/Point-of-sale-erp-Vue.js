<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardBody>
            <router-link class="btn btn-success" to="/recruitment/jobInterviews/create"
              >Create Job Interview</router-link
            >
            <JobInterviewIndex />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import JobInterviewIndex from "@/components/recruitments/jobInterview/JobInterviewIndex";
export default {
  name: "IndexJobJobInterview",
  components: { JobInterviewIndex },
  data() {
    return {};
  },
  methods: {},
};
</script>
