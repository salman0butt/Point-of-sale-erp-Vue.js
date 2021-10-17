<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Edit Salary Payment</CCardHeader>
          <CCardBody> <SalaryPaymentForm /></CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import SalaryPaymentForm from "@/components/salaryPayment/SalaryPaymentForm";
export default {
  name: "EditSalaryPayment",
  components: { SalaryPaymentForm },
  data: () => ({}),
  methods: {},
};
</script>
