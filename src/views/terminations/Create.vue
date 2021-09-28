<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>New Termination</CCardHeader>
          <CCardBody> <TerminationForm /> </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import TerminationForm from "@/components/terminations/TerminationForm";
export default {
  name: "CreateTermination",
  components: { TerminationForm },
  data: () => ({}),
  methods: {},
};
</script>
