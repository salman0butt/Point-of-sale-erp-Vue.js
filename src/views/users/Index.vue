<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardBody>
            <router-link class="btn btn-success" to="/users/create"
              >Create Users</router-link
            >
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
