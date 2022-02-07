<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Expenses </CCardHeader>
          <CCardBody>
            <router-link
              v-if="$can('create expense')"
              class="btn btn-success"
              to="/accounting/expense/create"
              style="float: right"
              >Create Expense</router-link
            >
            <div style="clear: both; margin-bottom: 20px"></div>
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
