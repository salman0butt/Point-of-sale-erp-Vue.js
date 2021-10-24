<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardBody>
            <router-link
              v-if="$ability.can('create', 'trainers')"
              class="btn btn-success"
              to="/trainers/create"
              >Create Trainer</router-link
            >
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
