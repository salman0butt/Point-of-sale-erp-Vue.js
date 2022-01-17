<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Users </CCardHeader>
          <CCardBody>
            <router-link class="btn btn-success" to="/users/create" style="float: right"
              >Create Users</router-link
            >
            <div style="clear: both; margin-bottom: 20px"></div>
            <UserIndex />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import UserIndex from "@/components/users/UserIndex";
export default {
  name: "IndexUser",
  components: { UserIndex },
  data() {
    return {};
  },
  methods: {},
};
</script>
