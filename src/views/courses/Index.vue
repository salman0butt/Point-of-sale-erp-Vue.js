<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardBody>
            <router-link
              v-if="$ability.can('create', 'courses')"
              class="btn btn-success"
              to="/courses/create"
              >Create Courses</router-link
            >
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
