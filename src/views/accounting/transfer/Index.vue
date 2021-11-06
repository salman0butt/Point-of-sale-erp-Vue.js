<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardBody>
            <router-link class="btn btn-success" to="/accounting/transfer/create"
              >Create Transfer</router-link
            >
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
