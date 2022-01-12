<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>New Quoation </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="6" md="4" class="pt-2">
                <CustomerSearchField />
              </CCol>
              <CCol sm="6" md="4" class="pt-2">
                <CInput label="Dated" type="date" />
              </CCol>
              <CCol sm="6" md="4" class="pt-2">
                <CInput label="Due Date" type="date" />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import CustomerSearchField from "@/components/general/CustomerSearchField";

export default {
  name: "CreateBrand",
  components: {
    CustomerSearchField,
  },
};
</script>
