<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CButton
          @click="ToggleEmployeeQualification()"
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
          <EmployeeQualificationIndex
            ref="employeeQualificationRef"
            @employeeQualificationEdit="employeeQualificationEdited"
          />
        </CCollapse>
        <CCollapse :show="collapse">
          <EmployeeQualificationForm
            ref="employeeQualificationEditRef"
            @employeeQualificationCreated="employeeQualificationCreatedSend"
          />
        </CCollapse>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeQualificationIndex from "@/components/employees/employeeQualification/EmployeeQualificationIndex";
import EmployeeQualificationForm from "@/components/employees/employeeQualification/EmployeeQualificationForm";

export default {
  name: "EmployeeQualificationTab",
  components: { EmployeeQualificationIndex, EmployeeQualificationForm },
  data: () => ({
    toggleName: "Add New Qualification",
    collapse: false,
    collapse_table: true,
  }),
  methods: {
    ToggleEmployeeQualification() {
      this.resetEmployeeQualificationForm();
      this.collapse = !this.collapse;
      this.collapse_table = !this.collapse_table;
      if (this.toggleName == "Add New Qualification") {
        this.toggleName = "Go To Qualificationes";
      } else if (this.toggleName == "Go To Qualificationes") {
        this.toggleName = "Add New Qualification";
      }
    },
    employeeQualificationCreatedSend() {
      this.ToggleEmployeeQualification();
      this.$refs.employeeQualificationRef.getEmployeeQualification();
    },
    employeeQualificationEdited(uuid) {
      this.ToggleEmployeeQualification();
      this.$refs.employeeQualificationEditRef.getEditData(uuid);
    },
    resetEmployeeQualificationForm() {
      this.$refs.employeeQualificationEditRef.resetForm();
    },
  },
};
</script>

<style>
.errorMsg {
  color: red;
}
</style>
