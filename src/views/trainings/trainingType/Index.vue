<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardBody>
            <router-link
              v-if="$ability.can('store', 'training-types')"
              class="btn btn-success"
              to="/trainingTypes/create"
              >Create Training Types</router-link
            >
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
