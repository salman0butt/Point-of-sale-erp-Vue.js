<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardBody>
            <router-link
              v-if="$ability.can('create', 'employee-terminations')"
              class="btn btn-success"
              to="/terminations/create"
              >Create Terminations</router-link
            >
            <TerminationIndex />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import TerminationIndex from "@/components/terminations/TerminationIndex";
export default {
  name: "IndexTermination",
  components: { TerminationIndex },
  data() {
    return {};
  },
  created() {},
  watch: {},
  computed: {},
  methods: {},
};
</script>
