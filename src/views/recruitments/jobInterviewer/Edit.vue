<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Edit Job Interviewer</CCardHeader>
          <CCardBody> <JobInterviewerForm /></CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import JobInterviewerForm from "@/components/recruitments/jobInterviewer/JobInterviewerForm";
export default {
  name: "EditJobInterviewer",
  components: { JobInterviewerForm },
  data: () => ({}),
  methods: {},
};
</script>
