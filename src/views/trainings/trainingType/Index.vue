<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Training Type </CCardHeader>
          <CCardBody>
            <router-link
              class="btn btn-success"
              to="/trainingTypes/create"
              style="float: right"
              >Create Training Type</router-link
            >
            <div style="clear: both; margin-bottom: 20px"></div>
            <TrainingTypeIndex />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import TrainingTypeIndex from "@/components/trainings/trainingType/TrainingTypeIndex";
export default {
  name: "IndexTrainingType",
  components: { TrainingTypeIndex },
  data() {
    return {};
  },
  methods: {},
};
</script>
