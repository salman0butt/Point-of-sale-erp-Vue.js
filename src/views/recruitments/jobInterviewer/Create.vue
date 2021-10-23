<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>New Job Interviewer</CCardHeader>
          <CCardBody> <JobJobInterviewerForm /> </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import JobJobInterviewerForm from "@/components/recruitments/jobInterviewer/JobInterviewerForm";
export default {
  name: "CreateJobInterviewer",
  components: { JobJobInterviewerForm },
  data: () => ({}),
  methods: {},
};
</script>
