<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>New Training</CCardHeader>
          <CCardBody> <TrainingForm /> </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import TrainingForm from "@/components/trainings/training/TrainingForm";
export default {
  name: "CreateTraining",
  components: { TrainingForm },
  data: () => ({}),
  methods: {},
};
</script>
