<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Complains </CCardHeader>
          <CCardBody>
            <router-link
              class="btn btn-success"
              to="/complains/create"
              style="float: right"
              >Create Complain</router-link
            >
            <div style="clear: both; margin-bottom: 20px"></div>
            <ComplainIndex />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import ComplainIndex from "@/components/complains/ComplainIndex";
export default {
  name: "IndexComplain",
  components: { ComplainIndex },
  data() {
    return {};
  },
  methods: {},
};
</script>
