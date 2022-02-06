<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Users </CCardHeader>
          <CCardBody>
            <router-link
              v-if="$can('read roles')"
              class="btn btn-success"
              to="/rolesandpermissions/roles/index"
              style="float: right"
              >Roles & Permissions</router-link
            >
            <router-link
              v-if="$can('create users')"
              class="btn btn-success"
              to="/users/create"
              style="float: right; margin-right: 10px"
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
