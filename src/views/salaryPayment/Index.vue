<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardBody>
            <router-link class="btn btn-success" to="/payments/create"
              >Create Salary Payment</router-link
            >
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
