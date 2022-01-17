<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Payments </CCardHeader>
          <CCardBody>
            <router-link
              class="btn btn-success"
              to="/payments/create"
              style="float: right"
              >Create Salary Payment</router-link
            >
            <div style="clear: both; margin-bottom: 20px"></div>
            <SalaryPaymentIndex />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import SalaryPaymentIndex from "@/components/salaryPayment/SalaryPaymentIndex";
export default {
  name: "IndexSalaryPayment",
  components: { SalaryPaymentIndex },
  data() {
    return {};
  },
  methods: {},
};
</script>
