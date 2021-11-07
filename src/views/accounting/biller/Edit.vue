<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Edit Biller</CCardHeader>
          <CCardBody> <BillerForm /></CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import BillerForm from "@/components/accounting/biller/BillerForm";
export default {
  name: "EditBiller",
  components: { BillerForm },
};
</script>
