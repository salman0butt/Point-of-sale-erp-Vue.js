<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CButton
          @click="ToggleEmployeeLicense()"
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
          <EmployeeLicenseIndex
            ref="employeeLicenseRef"
            @employeeLicenseEdit="employeeLicenseEdited"
          />
        </CCollapse>
        <CCollapse :show="collapse">
          <EmployeeLicenseForm
            ref="employeeLicenseEditRef"
            @employeeLicenseCreated="employeeLicenseCreatedSend"
          />
        </CCollapse>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeLicenseIndex from "@/components/employees/employeeLicense/EmployeeLicenseIndex";
import EmployeeLicenseForm from "@/components/employees/employeeLicense/EmployeeLicenseForm";

export default {
  name: "EmployeeLicenseTab",
  components: { EmployeeLicenseIndex, EmployeeLicenseForm },
  data: () => ({
    toggleName: "Add New License",
    collapse: false,
    collapse_table: true,
  }),
  methods: {
    ToggleEmployeeLicense() {
      this.resetEmployeeLicenseForm();
      this.collapse = !this.collapse;
      this.collapse_table = !this.collapse_table;
      if (this.toggleName == "Add New License") {
        this.toggleName = "Go To Licenses";
      } else if (this.toggleName == "Go To Licenses") {
        this.toggleName = "Add New License";
      }
    },
    employeeLicenseCreatedSend() {
      this.ToggleEmployeeLicense();
      this.$refs.employeeLicenseRef.getEmployeeLicense();
    },
    employeeLicenseEdited(uuid) {
      this.ToggleEmployeeLicense();
      this.$refs.employeeLicenseEditRef.getEditData(uuid);
    },
    resetEmployeeLicenseForm() {
      this.$refs.employeeLicenseEditRef.resetForm();
    },
  },
};
</script>
