<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>New Leave</CCardHeader>
          <CCardBody> <LeaveForm /> </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import LeaveForm from "@/components/leaves/LeaveForm";
export default {
  name: "CreateLeave",
  components: { LeaveForm },
  data: () => ({}),
  methods: {},
};
</script>
