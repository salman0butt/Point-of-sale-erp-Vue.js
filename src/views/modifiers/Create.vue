<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>New Modifier </CCardHeader>
          <CCardBody><ModifierForm /> </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import ModifierForm from "@/components/modifiers/ModifierForm";

export default {
  name: "CreateModifier",
  components: {
    ModifierForm,
  },
};
</script>
