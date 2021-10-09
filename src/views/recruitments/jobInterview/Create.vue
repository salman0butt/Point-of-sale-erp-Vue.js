<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>New Job Interview</CCardHeader>
          <CCardBody> <JobInterviewForm /> </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import JobInterviewForm from "@/components/recruitments/jobInterview/JobInterviewForm";
export default {
  name: "CreateJobInterview",
  components: { JobInterviewForm },
  data: () => ({}),
  methods: {},
};
</script>
