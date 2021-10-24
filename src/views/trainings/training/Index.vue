<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardBody>
            <router-link
              v-if="$ability.can('create', 'trainings')"
              class="btn btn-success"
              to="/trainings/create"
              >Create Training</router-link
            >
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
