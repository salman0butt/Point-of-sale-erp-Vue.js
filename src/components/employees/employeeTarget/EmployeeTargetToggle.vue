<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CButton
          @click="ToggleEmployeeTarget()"
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
          <EmployeeTargetIndex
            ref="employeeTargetRef"
            @employee-target-edit="employeeTargetEdit"
          />
        </CCollapse>
        <CCollapse :show="collapse">
          <EmployeeTargetForm
            ref="employeeTargetEditRef"
            @employee-target-update="employeeTargetUpdate"
          />
        </CCollapse>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeTargetIndex from "@/components/employees/employeeTarget/EmployeeTargetIndex";
import EmployeeTargetForm from "@/components/employees/employeeTarget/EmployeeTargetForm";

export default {
  name: "EmployeeTargetTab",
  components: { EmployeeTargetIndex, EmployeeTargetForm },
  data: () => ({
    toggleName: "Add New Target",
    collapse: false,
    collapse_table: true,
  }),
  methods: {
    ToggleEmployeeTarget() {
      this.resetEmployeeTargetForm();
      this.collapse = !this.collapse;
      this.collapse_table = !this.collapse_table;
      if (this.toggleName == "Add New Target") {
        this.toggleName = "Go To Targets";
      } else if (this.toggleName == "Go To Targets") {
        this.toggleName = "Add New Target";
      }
    },
    employeeTargetUpdate(data) {
      this.ToggleEmployeeTarget();
      this.$refs.employeeTargetRef.updateTableData(data);
    },
    employeeTargetEdit(uuid) {
      this.ToggleEmployeeTarget();
      this.$refs.employeeTargetEditRef.getEditData(uuid);
    },
    resetEmployeeTargetForm() {
      this.$refs.employeeTargetEditRef.resetForm();
    },
  },
};
</script>
