<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Edit Job Candidate</CCardHeader>
          <CCardBody> <JobCandidateForm /></CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import JobCandidateForm from "@/components/recruitments/jobCandidates/JobCandidateForm";
export default {
  name: "EditJobCandidate",
  components: { JobCandidateForm },
  data: () => ({}),
  methods: {},
};
</script>
