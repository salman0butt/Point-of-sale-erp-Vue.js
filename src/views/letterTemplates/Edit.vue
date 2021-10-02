<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Edit Letter Template</CCardHeader>
          <CCardBody> <LetterTemplateForm /></CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import LetterTemplateForm from "@/components/letterTemplates/LetterTemplateForm";
export default {
  name: "EditLetterTemplate",
  components: { LetterTemplateForm },
  data: () => ({}),
  methods: {},
};
</script>
