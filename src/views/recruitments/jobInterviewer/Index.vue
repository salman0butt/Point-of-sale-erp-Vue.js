<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Interviewers </CCardHeader>
          <CCardBody>
            <router-link
              class="btn btn-success"
              to="/recruitment/jobInterviewers/create"
              style="float: right"
              >Create Job Interviewer</router-link
            >
            <div style="clear: both; margin-bottom: 20px"></div>
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
