<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Categories </CCardHeader>
          <CCardBody>
            <router-link
              class="btn btn-success"
              to="/accounting/category/create"
              style="float: right"
              >Create Account Category</router-link
            >
            <div style="clear: both; margin-bottom: 20px"></div>
            <AccountCategoryIndex />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import AccountCategoryIndex from "@/components/accounting/category/AccountCategoryIndex";
export default {
  name: "IndexAccountCategory",
  components: { AccountCategoryIndex },
};
</script>
