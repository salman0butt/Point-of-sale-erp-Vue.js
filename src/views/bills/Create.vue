<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>New Bill </CCardHeader>
          <CCardBody><BillForm /> </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import BillForm from "@/components/bills/BillForm";

export default {
  name: "CreateBill",
  components: {
    BillForm,
  },
};
</script>
