<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>New Salary</CCardHeader>
          <CCardBody> <SalaryForm /> </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import SalaryForm from "@/components/salary/SalaryForm";
export default {
  name: "CreateSalary",
  components: { SalaryForm },
  data: () => ({}),
  methods: {},
};
</script>
