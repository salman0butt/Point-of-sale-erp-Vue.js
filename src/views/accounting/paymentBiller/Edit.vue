<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Edit Payment Biller</CCardHeader>
          <CCardBody> <PaymentBillerForm /></CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import PaymentBillerForm from "@/components/accounting/paymentBiller/PaymentBillerForm";
export default {
  name: "EditPaymentBiller",
  components: { PaymentBillerForm },
};
</script>
