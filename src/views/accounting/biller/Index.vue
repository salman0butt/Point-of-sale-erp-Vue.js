<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Billers </CCardHeader>
          <CCardBody>
            <router-link
              class="btn btn-success"
              to="/accounting/biller/create"
              style="float: right"
              >Create Biller</router-link
            >
            <div style="clear: both; margin-bottom: 20px"></div>
            <BillerIndex />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import BillerIndex from "@/components/accounting/biller/BillerIndex";
export default {
  name: "IndexBiller",
  components: { BillerIndex },
};
</script>
