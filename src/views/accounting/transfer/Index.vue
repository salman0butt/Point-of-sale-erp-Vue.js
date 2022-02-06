<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Transfers </CCardHeader>
          <CCardBody>
            <router-link
              v-if="$can('create transfer')"
              class="btn btn-success"
              to="/accounting/transfer/create"
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
import TransferIndex from "@/components/accounting/transfer/TransferIndex";
export default {
  name: "IndexTransfer",
  components: { TransferIndex },
};
</script>
