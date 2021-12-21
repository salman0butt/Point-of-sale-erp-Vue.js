<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>New Receiving </CCardHeader>
          <CCardBody><ReceivingForm /> </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import ReceivingForm from "@/components/receivings/ReceivingForm";

export default {
  name: "CreateProductCategory",
  components: {
    ReceivingForm,
  },
};
</script>
