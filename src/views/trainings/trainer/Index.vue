<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Trainers </CCardHeader>
          <CCardBody>
            <router-link
              class="btn btn-success"
              to="/trainers/create"
              style="float: right"
              >Create Trainer</router-link
            >
            <div style="clear: both; margin-bottom: 20px"></div>
            <TrainerIndex />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import TrainerIndex from "@/components/trainings/trainer/TrainerIndex";
export default {
  name: "IndexTrainer",
  components: { TrainerIndex },
  data() {
    return {};
  },
  methods: {},
};
</script>
