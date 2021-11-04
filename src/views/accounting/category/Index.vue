<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardBody>
            <router-link class="btn btn-success" to="/accounting/category/create"
              >Create Account Category</router-link
            >
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
