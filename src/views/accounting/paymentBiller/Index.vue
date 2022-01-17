<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Payment Billers </CCardHeader>
          <CCardBody>
            <router-link
              class="btn btn-success"
              to="/accounting/paymentBiller/create"
              style="float: right"
              >Create Payment Biller</router-link
            >
            <div style="clear: both; margin-bottom: 20px"></div>
            <PaymentBillerIndex />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import PaymentBillerIndex from "@/components/accounting/paymentBiller/PaymentBillerIndex";
export default {
  name: "IndexPaymentBiller",
  components: { PaymentBillerIndex },
};
</script>
