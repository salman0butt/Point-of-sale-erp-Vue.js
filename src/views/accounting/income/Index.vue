<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Incomes </CCardHeader>
          <CCardBody>
            <router-link
              class="btn btn-success"
              to="/accounting/income/create"
              style="float: right"
              >Create Income</router-link
            >
            <div style="clear: both; margin-bottom: 20px"></div>
            <IncomeIndex />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import IncomeIndex from "@/components/accounting/income/IncomeIndex";
export default {
  name: "IndexIncome",
  components: { IncomeIndex },
};
</script>
