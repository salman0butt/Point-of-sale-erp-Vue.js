<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Training </CCardHeader>
          <CCardBody>
            <router-link
              class="btn btn-success"
              to="/trainings/create"
              style="float: right"
              >Create Training</router-link
            >
            <div style="clear: both; margin-bottom: 20px"></div>
            <TrainingIndex />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import TrainingIndex from "@/components/trainings/training/TrainingIndex";
export default {
  name: "IndexTraining",
  components: { TrainingIndex },
  data() {
    return {};
  },
  methods: {},
};
</script>
