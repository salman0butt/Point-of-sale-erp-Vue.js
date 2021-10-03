<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Experiance Certifcates</CCardHeader>
          <CCardBody>
            <ExperianceCertifcateToggle />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import ExperianceCertifcateToggle from "@/components/experianceCertifcate/ExperianceCertifcateToggle";

export default {
  name: "ExperianceCertifcateTab",
  components: { ExperianceCertifcateToggle },
  data: () => ({}),
};
</script>
