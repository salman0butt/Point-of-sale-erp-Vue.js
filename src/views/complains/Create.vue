<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>New Complain</CCardHeader>
          <CCardBody> <ComplainForm /> </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import ComplainForm from "@/components/complains/ComplainForm";
export default {
  name: "CreateComplain",
  components: { ComplainForm },
  data: () => ({}),
  methods: {},
};
</script>
