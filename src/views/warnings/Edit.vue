<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Edit Warning</CCardHeader>
          <CCardBody> <WarningForm /></CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import WarningForm from "@/components/warnings/WarningForm";
export default {
  name: "EditWarning",
  components: { WarningForm },
  data: () => ({}),
  methods: {},
};
</script>
