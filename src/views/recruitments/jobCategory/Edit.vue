<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Edit Job Category</CCardHeader>
          <CCardBody> <JobCategoryForm /></CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import JobCategoryForm from "@/components/recruitments/jobCategory/JobCategoryForm";
export default {
  name: "EditJobCategory",
  components: { JobCategoryForm },
  data: () => ({}),
  methods: {},
};
</script>
