<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>New Brand </CCardHeader>
          <CCardBody><BrandForm /> </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import BrandForm from "@/components/brands/BrandForm";

export default {
  name: "CreateProductCategory",
  components: {
    BrandForm,
  },
};
</script>
