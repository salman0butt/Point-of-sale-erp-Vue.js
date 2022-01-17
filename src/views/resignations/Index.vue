<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Resignations </CCardHeader>
          <CCardBody>
            <router-link
              class="btn btn-success"
              to="/resignations/create"
              style="float: right"
              >Create Resignation</router-link
            >
            <div style="clear: both; margin-bottom: 20px"></div>
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
