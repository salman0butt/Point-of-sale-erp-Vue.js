<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Edit Trainer</CCardHeader>
          <CCardBody> <TrainerForm /></CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import TrainerForm from "@/components/trainings/trainer/TrainerForm";
export default {
  name: "EditTrainer",
  components: { TrainerForm },
  data: () => ({}),
  methods: {},
};
</script>
