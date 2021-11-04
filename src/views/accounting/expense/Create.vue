<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>New Expense</CCardHeader>
          <CCardBody> <ExpenseForm /> </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import ExpenseForm from "@/components/accounting/expense/ExpenseForm";
export default {
  name: "CreateExpense",
  components: { ExpenseForm },
};
</script>
