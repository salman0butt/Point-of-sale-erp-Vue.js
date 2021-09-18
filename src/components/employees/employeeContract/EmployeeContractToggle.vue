<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CButton
          @click="ToggleEmployeeContract()"
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
          <EmployeeContractIndex
            ref="employeeContractRef"
            @employee-contract-edit="employeeContractEdit"
          />
        </CCollapse>
        <CCollapse :show="collapse">
          <EmployeeContractForm
            ref="employeeContractEditRef"
            @employee-contract-update="employeeContractUpdate"
          />
        </CCollapse>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeContractIndex from "@/components/employees/employeeContract/EmployeeContractIndex";
import EmployeeContractForm from "@/components/employees/employeeContract/EmployeeContractForm";

export default {
  name: "EmployeeContractTab",
  components: { EmployeeContractIndex, EmployeeContractForm },
  data: () => ({
    toggleName: "Add New Contract",
    collapse: false,
    collapse_table: true,
  }),
  methods: {
    ToggleEmployeeContract() {
      this.resetEmployeeContractForm();
      this.collapse = !this.collapse;
      this.collapse_table = !this.collapse_table;
      if (this.toggleName == "Add New Contract") {
        this.toggleName = "Go To Contracts";
      } else if (this.toggleName == "Go To Contracts") {
        this.toggleName = "Add New Contract";
      }
    },
    employeeContractUpdate(data) {
      this.ToggleEmployeeContract();
      // this.$refs.employeeContractRef.updateTableData(data);
      this.$refs.employeeContractRef.getEmployeeContract();
    },
    employeeContractEdit(uuid) {
      this.ToggleEmployeeContract();
      this.$refs.employeeContractEditRef.getEditData(uuid);
    },
    resetEmployeeContractForm() {
      this.$refs.employeeContractEditRef.resetForm();
    },
  },
};
</script>
