<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>New User</CCardHeader>
          <CCardBody> <UserForm /> </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import UserForm from "@/components/users/UserForm";
export default {
  name: "CreateUser",
  components: { UserForm },
  data: () => ({}),
  methods: {},
};
</script>
