<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>New Course</CCardHeader>
          <CCardBody> <CourseForm /> </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import CourseForm from "@/components/courses/CourseForm";
export default {
  name: "CreateCourse",
  components: { CourseForm },
  data: () => ({}),
  methods: {},
};
</script>
