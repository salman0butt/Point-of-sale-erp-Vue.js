<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Courses</CCardHeader>
          <CCardBody>
            <router-link class="btn btn-success" to="/courses/create" style="float: right"
              >Create Course</router-link
            >
            <div style="clear: both; margin-bottom: 20px"></div>
            <CourseIndex />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import CourseIndex from "@/components/courses/CourseIndex";
export default {
  name: "IndexCourse",
  components: { CourseIndex },
  data() {
    return {};
  },
  methods: {},
};
</script>
