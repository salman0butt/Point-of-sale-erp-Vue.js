<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>New Job Post</CCardHeader>
          <CCardBody> <JobPostForm /> </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import JobPostForm from "@/components/recruitments/jobPost/JobPostForm";
export default {
  name: "CreateJobPost",
  components: { JobPostForm },
  data: () => ({}),
  methods: {},
};
</script>
