<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Edit Income</CCardHeader>
          <CCardBody> <IncomeForm /></CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import IncomeForm from "@/components/accounting/income/IncomeForm";
export default {
  name: "EditIncome",
  components: { IncomeForm },
};
</script>
