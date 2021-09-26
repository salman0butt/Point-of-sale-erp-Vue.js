<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardBody>
            <router-link class="btn btn-success" to="/grades/create"
              >Create Grades</router-link
            >
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
export default {
  name: "IndexGrade",
  data() {
    return {};
  },
  created() {},
  watch: {},
  computed: {},
  methods: {},
};
</script>
