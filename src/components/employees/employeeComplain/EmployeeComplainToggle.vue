<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CButton
          @click="ToggleEmployeeComplain()"
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
          <EmployeeComplainIndex
            ref="employeeComplainRef"
            @employee-complain-edit="employeeComplainEdit"
          />
        </CCollapse>
        <CCollapse :show="collapse">
          <EmployeeComplainForm
            ref="employeeComplainEditRef"
            @employee-complain-update="employeeComplainUpdate"
          />
        </CCollapse>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeComplainIndex from "@/components/employees/employeeComplain/EmployeeComplainIndex";
import EmployeeComplainForm from "@/components/employees/employeeComplain/EmployeeComplainForm";

export default {
  name: "EmployeeComplainTab",
  components: { EmployeeComplainIndex, EmployeeComplainForm },
  data: () => ({
    toggleName: "Add New Complain",
    collapse: false,
    collapse_table: true,
  }),
  methods: {
    ToggleEmployeeComplain() {
      this.resetEmployeeComplainForm();
      this.collapse = !this.collapse;
      this.collapse_table = !this.collapse_table;
      if (this.toggleName == "Add New Complain") {
        this.toggleName = "Go To Complains";
      } else if (this.toggleName == "Go To Complains") {
        this.toggleName = "Add New Complain";
      }
    },
    employeeComplainUpdate() {
      this.ToggleEmployeeComplain();
      // this.$refs.employeeComplainRef.updateTableData(data);
      this.$refs.employeeComplainRef.getEmployeeComplain();
    },
    employeeComplainEdit(uuid) {
      this.ToggleEmployeeComplain();
      this.$refs.employeeComplainEditRef.getEditData(uuid);
    },
    resetEmployeeComplainForm() {
      this.$refs.employeeComplainEditRef.resetForm();
    },
  },
};
</script>
