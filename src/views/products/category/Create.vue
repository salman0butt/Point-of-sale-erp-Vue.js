<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>New Product Category </CCardHeader>
          <CCardBody><ProductCategoryForm /> </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import ProductCategoryForm from "@/components/products/category/ProductCategoryForm";

export default {
  name: "CreateProductCategory",
  components: {
    ProductCategoryForm,
  },
};
</script>
