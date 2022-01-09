<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CButton
          @click="ToggleEmployeeBankAccount()"
          color="primary"
          class="mb-2 mt-3"
          style="float: right"
        >
          {{ toggleName }}
        </CButton>
      </CCol>
    </CRow>
    <CRow>
      <CCol xs="12" lg="12">
        <CCollapse :show="collapse_table">
          <EmployeeBankAccountIndex
            ref="employeeBankAccountRef"
            @employeeBankAccountEdit="employeeBankAccountEdited"
          />
        </CCollapse>
        <CCollapse :show="collapse">
          <EmployeeBankAccountForm
            ref="employeeBankAccountEditRef"
            @employeeBankAccountCreated="employeeBankAccountCreatedSend"
          />
        </CCollapse>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeBankAccountIndex from "@/components/employees/employeeBankAccount/EmployeeBankAccountIndex";
import EmployeeBankAccountForm from "@/components/employees/employeeBankAccount/EmployeeBankAccountForm";

export default {
  name: "EmployeeBankAccountTab",
  components: { EmployeeBankAccountIndex, EmployeeBankAccountForm },
  data: () => ({
    toggleName: "Add New Bank Account",
    collapse: false,
    collapse_table: true,
  }),
  methods: {
    ToggleEmployeeBankAccount() {
      this.resetEmployeeBankAccountForm();
      this.collapse = !this.collapse;
      this.collapse_table = !this.collapse_table;
      if (this.toggleName == "Add New Bank Account") {
        this.toggleName = "Go To Bank Accounts";
      } else if (this.toggleName == "Go To Bank Accounts") {
        this.toggleName = "Add New Bank Account";
      }
    },
    employeeBankAccountCreatedSend() {
      this.ToggleEmployeeBankAccount();
      this.$refs.employeeBankAccountRef.getEmployeeBankAccount();
    },
    employeeBankAccountEdited(uuid) {
      this.ToggleEmployeeBankAccount();
      this.$refs.employeeBankAccountEditRef.getEditData(uuid);
    },
    resetEmployeeBankAccountForm() {
      this.$refs.employeeBankAccountEditRef.resetForm();
    },
  },
};
</script>

<style>
.errorMsg {
  color: red;
}
</style>
