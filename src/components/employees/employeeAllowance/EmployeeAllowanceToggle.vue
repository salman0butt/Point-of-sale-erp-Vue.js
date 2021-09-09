<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CButton
          @click="ToggleEmployeeAllowance()"
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
          <EmployeeAllowanceIndex
            ref="employeeAllowanceRef"
            @employeeAllowanceEdit="employeeAllowanceEdited"
          />
        </CCollapse>
        <CCollapse :show="collapse">
          <EmployeeAllowanceForm
            ref="employeeAllowanceEditRef"
            @employeeAllowanceCreated="employeeAllowanceCreatedSend"
          />
        </CCollapse>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeAllowanceIndex from "@/components/employees/employeeAllowance/EmployeeAllowanceIndex";
import EmployeeAllowanceForm from "@/components/employees/employeeAllowance/EmployeeAllowanceForm";

export default {
  name: "EmployeeAllowanceTab",
  components: { EmployeeAllowanceIndex, EmployeeAllowanceForm },
  data: () => ({
    toggleName: "Add New Allowance",
    collapse: false,
    collapse_table: true,
  }),
  methods: {
    ToggleEmployeeAllowance() {
      this.resetEmployeeAllowanceForm();
      this.collapse = !this.collapse;
      this.collapse_table = !this.collapse_table;
      if (this.toggleName == "Add New Allowance") {
        this.toggleName = "Go To Allowancees";
      } else if (this.toggleName == "Go To Allowancees") {
        this.toggleName = "Add New Allowance";
      }
    },
    employeeAllowanceCreatedSend() {
      this.ToggleEmployeeAllowance();
      this.$refs.employeeAllowanceRef.getEmployeeAllowance();
    },
    employeeAllowanceEdited(uuid) {
      this.ToggleEmployeeAllowance();
      this.$refs.employeeAllowanceEditRef.getEditData(uuid);
    },
    resetEmployeeAllowanceForm() {
      this.$refs.employeeAllowanceEditRef.resetForm();
    },
  },
};
</script>

<style>
.errorMsg {
  color: red;
}
</style>
