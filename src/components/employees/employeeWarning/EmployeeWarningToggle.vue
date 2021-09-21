<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CButton
          @click="ToggleEmployeeWarning()"
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
          <EmployeeWarningIndex
            ref="employeeWarningRef"
            @employee-warning-edit="employeeWarningEdit"
          />
        </CCollapse>
        <CCollapse :show="collapse">
          <EmployeeWarningForm
            ref="employeeWarningEditRef"
            @employee-warning-update="employeeWarningUpdate"
          />
        </CCollapse>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeWarningIndex from "@/components/employees/employeeWarning/EmployeeWarningIndex";
import EmployeeWarningForm from "@/components/employees/employeeWarning/EmployeeWarningForm";

export default {
  name: "EmployeeWarningTab",
  components: { EmployeeWarningIndex, EmployeeWarningForm },
  data: () => ({
    toggleName: "Add New Warning",
    collapse: false,
    collapse_table: true,
  }),
  methods: {
    ToggleEmployeeWarning() {
      this.resetEmployeeWarningForm();
      this.collapse = !this.collapse;
      this.collapse_table = !this.collapse_table;
      if (this.toggleName == "Add New Warning") {
        this.toggleName = "Go To Warnings";
      } else if (this.toggleName == "Go To Warnings") {
        this.toggleName = "Add New Warning";
      }
    },
    employeeWarningUpdate() {
      this.ToggleEmployeeWarning();
      // this.$refs.employeeWarningRef.updateTableData(data);
      this.$refs.employeeWarningRef.getEmployeeWarning();
    },
    employeeWarningEdit(uuid) {
      this.ToggleEmployeeWarning();
      this.$refs.employeeWarningEditRef.getEditData(uuid);
    },
    resetEmployeeWarningForm() {
      this.$refs.employeeWarningEditRef.resetForm();
    },
  },
};
</script>
