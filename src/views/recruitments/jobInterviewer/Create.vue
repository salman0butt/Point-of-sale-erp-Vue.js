<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>New Job Interviewer</CCardHeader>
          <CCardBody> <JobInterviewerForm /> </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import JobInterviewerForm from "@/components/recruitments/jobInterviewer/JobInterviewerForm";
export default {
  name: "CreateJobInterviewer",
  components: { JobInterviewerForm },
  data: () => ({}),
  methods: {},
};
</script>
