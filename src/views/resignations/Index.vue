<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardBody>
            <router-link class="btn btn-success" to="/resignations/create"
              >Create Resignations</router-link
            >
            <ResignationIndex />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import ResignationIndex from "@/components/resignations/ResignationIndex";
export default {
  name: "IndexResignation",
  components: { ResignationIndex },
  data() {
    return {};
  },
  methods: {},
};
</script>
