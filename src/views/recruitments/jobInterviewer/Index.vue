<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardBody>
            <router-link class="btn btn-success" to="/recruitment/jobInterviewers/create"
              >Create Job Interviewer</router-link
            >
            <JobInterviewerIndex />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import JobInterviewerIndex from "@/components/recruitments/jobInterviewer/JobInterviewerIndex";
export default {
  name: "IndexJobInterviewer",
  components: { JobInterviewerIndex },
  data() {
    return {};
  },
  methods: {},
};
</script>
