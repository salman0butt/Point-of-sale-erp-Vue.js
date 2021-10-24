<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardBody>
            <router-link
              v-if="$ability.can('create', 'leaves')"
              class="btn btn-success"
              to="/leaves/create"
              >Create Leaves</router-link
            >
            <LeaveIndex />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import LeaveIndex from "@/components/leaves/LeaveIndex";
export default {
  name: "IndexLeave",
  components: { LeaveIndex },
  data() {
    return {};
  },
  methods: {},
};
</script>
