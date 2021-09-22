<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CButton
          @click="ToggleEmployeeDeduction()"
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
          <EmployeeDeductionIndex
            ref="employeeDeductionRef"
            @employee-deduction-edit="employeeDeductionEdit"
          />
        </CCollapse>
        <CCollapse :show="collapse">
          <EmployeeDeductionForm
            ref="employeeDeductionEditRef"
            @employee-deduction-update="employeeDeductionUpdate"
          />
        </CCollapse>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeDeductionIndex from "@/components/employees/employeeDeduction/EmployeeDeductionIndex";
import EmployeeDeductionForm from "@/components/employees/employeeDeduction/EmployeeDeductionForm";

export default {
  name: "EmployeeDeductionTab",
  components: { EmployeeDeductionIndex, EmployeeDeductionForm },
  data: () => ({
    toggleName: "Add New Deduction",
    collapse: false,
    collapse_table: true,
  }),
  methods: {
    ToggleEmployeeDeduction() {
      this.resetEmployeeDeductionForm();
      this.collapse = !this.collapse;
      this.collapse_table = !this.collapse_table;
      if (this.toggleName == "Add New Deduction") {
        this.toggleName = "Go To Deductions";
      } else if (this.toggleName == "Go To Deductions") {
        this.toggleName = "Add New Deduction";
      }
    },
    employeeDeductionUpdate() {
      this.ToggleEmployeeDeduction();
      // this.$refs.employeeDeductionRef.updateTableData(data);
      this.$refs.employeeDeductionRef.getEmployeeDeduction();
    },
    employeeDeductionEdit(uuid) {
      this.ToggleEmployeeDeduction();
      this.$refs.employeeDeductionEditRef.getEditData(uuid);
      console.log(uuid);
    },
    resetEmployeeDeductionForm() {
      this.$refs.employeeDeductionEditRef.resetForm();
    },
  },
};
</script>
