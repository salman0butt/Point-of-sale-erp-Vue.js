<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Edit Training Type</CCardHeader>
          <CCardBody> <TrainingTypeForm /></CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import TrainingTypeForm from "@/components/trainings/trainingType/TrainingTypeForm";
export default {
  name: "EditTrainingType",
  components: { TrainingTypeForm },
  data: () => ({}),
  methods: {},
};
</script>
