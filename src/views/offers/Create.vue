<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>New Offer </CCardHeader>
          <CCardBody><OfferForm /> </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import OfferForm from "@/components/offers/OfferForm";

export default {
  name: "CreateOffer",
  components: {
    OfferForm,
  },
};
</script>
