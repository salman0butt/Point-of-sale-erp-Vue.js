<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Edit Training</CCardHeader>
          <CCardBody> <TrainingForm /></CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import TrainingForm from "@/components/trainings/training/TrainingForm";
export default {
  name: "EditTraining",
  components: { TrainingForm },
  data: () => ({}),
  methods: {},
};
</script>
