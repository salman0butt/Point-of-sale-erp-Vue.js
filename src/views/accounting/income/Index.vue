<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardBody>
            <router-link class="btn btn-success" to="/accounting/income/create"
              >Create Income</router-link
            >
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
