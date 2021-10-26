<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardBody>
            <router-link class="btn btn-success" to="/complains/create"
              >Create Complains</router-link
            >
            <ComplainIndex />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import ComplainIndex from "@/components/complains/ComplainIndex";
export default {
  name: "IndexComplain",
  components: { ComplainIndex },
  data() {
    return {};
  },
  methods: {},
};
</script>
