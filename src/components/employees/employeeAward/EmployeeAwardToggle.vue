<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CButton
          @click="ToggleEmployeeAward()"
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
          <EmployeeAwardIndex
            ref="employeeAwardRef"
            @employee-award-edit="employeeAwardEdit"
          />
        </CCollapse>
        <CCollapse :show="collapse">
          <EmployeeAwardForm
            ref="employeeAwardEditRef"
            @employee-award-update="employeeAwardUpdate"
          />
        </CCollapse>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeAwardIndex from "@/components/employees/employeeAward/EmployeeAwardIndex";
import EmployeeAwardForm from "@/components/employees/employeeAward/EmployeeAwardForm";

export default {
  name: "EmployeeAwardTab",
  components: { EmployeeAwardIndex, EmployeeAwardForm },
  data: () => ({
    toggleName: "Add New Award",
    collapse: false,
    collapse_table: true,
  }),
  methods: {
    ToggleEmployeeAward() {
      this.resetEmployeeAwardForm();
      this.collapse = !this.collapse;
      this.collapse_table = !this.collapse_table;
      if (this.toggleName == "Add New Award") {
        this.toggleName = "Go To Awards";
      } else if (this.toggleName == "Go To Awards") {
        this.toggleName = "Add New Award";
      }
    },
    employeeAwardUpdate() {
      this.ToggleEmployeeAward();
      // this.$refs.employeeAwardRef.updateTableData(data);
      this.$refs.employeeAwardRef.getEmployeeAward();
    },
    employeeAwardEdit(uuid) {
      this.ToggleEmployeeAward();
      this.$refs.employeeAwardEditRef.getEditData(uuid);
      console.log(uuid);
    },
    resetEmployeeAwardForm() {
      this.$refs.employeeAwardEditRef.resetForm();
    },
  },
};
</script>
