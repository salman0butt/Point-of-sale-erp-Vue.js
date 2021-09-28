<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>New Resignation</CCardHeader>
          <CCardBody> <ResignationForm /> </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import ResignationForm from "@/components/resignations/ResignationForm";
export default {
  name: "CreateResignation",
  components: { ResignationForm },
  data: () => ({}),
  methods: {},
};
</script>
