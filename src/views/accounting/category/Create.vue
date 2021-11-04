<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>New Account Category</CCardHeader>
          <CCardBody> <AccountCategoryForm /> </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import AccountCategoryForm from "@/components/accounting/category/AccountCategoryForm";
export default {
  name: "CreateAccountCategory",
  components: { AccountCategoryForm },
};
</script>
