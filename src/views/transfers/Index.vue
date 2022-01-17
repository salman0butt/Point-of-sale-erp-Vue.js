<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Transfers </CCardHeader>
          <CCardBody>
            <router-link
              class="btn btn-success"
              to="/transfers/create"
              style="float: right"
              >Create Transfer</router-link
            >
            <div style="clear: both; margin-bottom: 20px"></div>
            <TransferIndex />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import TransferIndex from "@/components/transfers/TransferIndex";
export default {
  name: "IndexTransfer",
  components: { TransferIndex },
  data() {
    return {};
  },
  methods: {},
};
</script>
