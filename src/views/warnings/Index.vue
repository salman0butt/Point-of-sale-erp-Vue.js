<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardBody>
            <router-link
              v-if="$ability.can('create', 'employee-warnings')"
              class="btn btn-success"
              to="/warnings/create"
              >Create Warnings</router-link
            >
            <WarningIndex />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import WarningIndex from "@/components/warnings/WarningIndex";
export default {
  name: "IndexWarning",
  components: { WarningIndex },
  data() {
    return {};
  },
  methods: {},
};
</script>
