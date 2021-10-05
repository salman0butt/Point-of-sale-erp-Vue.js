<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Edit Course</CCardHeader>
          <CCardBody> <CourseForm /></CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import CourseForm from "@/components/courses/CourseForm";
export default {
  name: "EditCourse",
  components: { CourseForm },
  data: () => ({}),
  methods: {},
};
</script>
