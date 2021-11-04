<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardBody>
            <router-link class="btn btn-success" to="/accounting/expense/create"
              >Create Expense</router-link
            >
            <ExpenseIndex />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import ExpenseIndex from "@/components/accounting/expense/ExpenseIndex";
export default {
  name: "IndexExpense",
  components: { ExpenseIndex },
};
</script>
