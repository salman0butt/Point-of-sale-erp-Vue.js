<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>New Damage </CCardHeader>
          <CCardBody><DamageForm /> </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import DamageForm from "@/components/damages/DamageForm";

export default {
  name: "CreateDamage",
  components: {
    DamageForm,
  },
};
</script>
