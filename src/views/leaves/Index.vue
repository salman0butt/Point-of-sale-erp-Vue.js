<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Leaves</CCardHeader>
          <CCardBody>
            <router-link class="btn btn-success" to="/leaves/create" style="float: right"
              >Create Leaves</router-link
            >
            <div style="clear: both; margin-bottom: 20px"></div>
            <LeaveIndex />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import LeaveIndex from "@/components/leaves/LeaveIndex";
export default {
  name: "IndexLeave",
  components: { LeaveIndex },
  data() {
    return {};
  },
  methods: {},
};
</script>
