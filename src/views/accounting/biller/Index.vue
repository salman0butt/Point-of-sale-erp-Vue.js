<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardBody>
            <router-link class="btn btn-success" to="/accounting/biller/create"
              >Create Biller</router-link
            >
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
