<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>General</CCardHeader>
          <CCardBody>
            <CTabs add-tab-classes="mt-1" variant="pills" fade>
              <CTab active id="show">
                <template slot="title">
                  {{ tabs.product }}
                </template>
                <ProductForm />
              </CTab>
              <!-- <CTab id="show">
                <template slot="title">
                  {{ tabs.detail }}
                </template>
                <ProductGeneralForm />
              </CTab> -->
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import ProductForm from "@/components/products/ProductForm";
// import ProductGeneralForm from "@/components/products/ProductGeneralForm";

export default {
  name: "EmployeeTab",
  components: {
    ProductForm,
    // ProductGeneralForm,
  },
  data: () => ({
    tabs: {
      product: "Product",
      detail: "Detail",
    },
  }),
};
</script>
