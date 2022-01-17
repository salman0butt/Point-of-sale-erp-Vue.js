<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Job Candidates </CCardHeader>
          <CCardBody>
            <router-link
              class="btn btn-success"
              to="/recruitment/jobCandidates/create"
              style="float: right"
              >Create Job Candidate</router-link
            >
            <div style="clear: both; margin-bottom: 20px"></div>
            <JobCandidateIndex />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import JobCandidateIndex from "@/components/recruitments/jobCandidates/JobCandidateIndex";
export default {
  name: "IndexJobCandidate",
  components: { JobCandidateIndex },
  data() {
    return {};
  },
  methods: {},
};
</script>
