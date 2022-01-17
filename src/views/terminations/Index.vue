<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Terminations </CCardHeader>
          <CCardBody>
            <router-link
              class="btn btn-success"
              to="/terminations/create"
              style="float: right"
              >Create Terminations</router-link
            >
            <div style="clear: both; margin-bottom: 20px"></div>
            <TerminationIndex />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import TerminationIndex from "@/components/terminations/TerminationIndex";
export default {
  name: "IndexTermination",
  components: { TerminationIndex },
  data() {
    return {};
  },
  created() {},
  watch: {},
  computed: {},
  methods: {},
};
</script>
