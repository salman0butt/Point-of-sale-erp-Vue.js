<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CButton
          @click="ToggleEmployeeLeave()"
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
          <EmployeeLeaveIndex
            ref="employeeLeaveRef"
            @employee-leave-edit="employeeLeaveEdit"
          />
        </CCollapse>
        <CCollapse :show="collapse">
          <EmployeeLeaveForm
            ref="employeeLeaveEditRef"
            @employee-leave-update="employeeLeaveUpdate"
          />
        </CCollapse>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeLeaveIndex from "@/components/employees/employeeLeave/EmployeeLeaveIndex";
import EmployeeLeaveForm from "@/components/employees/employeeLeave/EmployeeLeaveForm";

export default {
  name: "EmployeeLeaveTab",
  components: { EmployeeLeaveIndex, EmployeeLeaveForm },
  data: () => ({
    toggleName: "Add New Leave",
    collapse: false,
    collapse_table: true,
  }),
  methods: {
    ToggleEmployeeLeave() {
      this.resetEmployeeLeaveForm();
      this.collapse = !this.collapse;
      this.collapse_table = !this.collapse_table;
      if (this.toggleName == "Add New Leave") {
        this.toggleName = "Go To Leaves";
      } else if (this.toggleName == "Go To Leaves") {
        this.toggleName = "Add New Leave";
      }
    },
    employeeLeaveUpdate() {
      this.ToggleEmployeeLeave();
      // this.$refs.employeeLeaveRef.updateTableData(data);
      this.$refs.employeeLeaveRef.getEmployeeLeave();
    },
    employeeLeaveEdit(uuid) {
      this.ToggleEmployeeLeave();
      this.$refs.employeeLeaveEditRef.getEditData(uuid);
      console.log(uuid);
    },
    resetEmployeeLeaveForm() {
      this.$refs.employeeLeaveEditRef.resetForm();
    },
  },
};
</script>
