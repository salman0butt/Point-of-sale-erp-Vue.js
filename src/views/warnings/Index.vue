<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Warnings </CCardHeader>
          <CCardBody>
            <router-link
              class="btn btn-success"
              to="/warnings/create"
              style="float: right"
              >Create Warning</router-link
            >
            <div style="clear: both; margin-bottom: 20px"></div>
            <WarningIndex />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import WarningIndex from "@/components/warnings/WarningIndex";
export default {
  name: "IndexWarning",
  components: { WarningIndex },
  data() {
    return {};
  },
  methods: {},
};
</script>
