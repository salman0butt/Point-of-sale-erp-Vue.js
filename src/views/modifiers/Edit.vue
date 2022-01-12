<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Edit Modifier </CCardHeader>
          <CCardBody> <ModifierForm /> </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import ModifierForm from "@/components/modifiers/ModifierForm";

export default {
  name: "EditModifier",
  components: {
    ModifierForm,
  },
};
</script>
