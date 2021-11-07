<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>New Payment Biller</CCardHeader>
          <CCardBody> <PaymentBillerForm /> </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import PaymentBillerForm from "@/components/accounting/paymentBiller/PaymentBillerForm";
export default {
  name: "CreatePaymentBiller",
  components: { PaymentBillerForm },
};
</script>
