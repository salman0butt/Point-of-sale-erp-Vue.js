<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Edit Transfer</CCardHeader>
          <CCardBody> <TransferForm /></CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import TransferForm from "@/components/accounting/transfer/TransferForm";
export default {
  name: "EditTransfer",
  components: { TransferForm },
};
</script>
