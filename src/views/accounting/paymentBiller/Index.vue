<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardBody>
            <router-link class="btn btn-success" to="/accounting/paymentBiller/create"
              >Create Payment Biller</router-link
            >
            <PaymentBillerIndex />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
// TODO:  Payment biller backend issue
import PaymentBillerIndex from "@/components/accounting/paymentBiller/PaymentBillerIndex";
export default {
  name: "IndexPaymentBiller",
  components: { PaymentBillerIndex },
};
</script>
