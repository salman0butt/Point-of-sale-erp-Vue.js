<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Interview</CCardHeader>
          <CCardBody>
            <router-link
              class="btn btn-success"
              to="/recruitment/jobInterviews/create"
              style="float: right"
              >Create Job Interview</router-link
            >
            <div style="clear: both; margin-bottom: 20px"></div>
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
