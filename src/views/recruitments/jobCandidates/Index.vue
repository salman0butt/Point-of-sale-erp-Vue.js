<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardBody>
            <router-link class="btn btn-success" to="/recruitment/jobCandidates/create"
              >Create Job Candidate</router-link
            >
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
