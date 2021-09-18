<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CButton
          @click="ToggleEmployeeEmergencyContact()"
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
          <EmployeeEmergencyContactIndex
            ref="employeeEmergencyContactRef"
            @employee-emergency-contact-edit="employeeEmergencyContactEdit"
          />
        </CCollapse>
        <CCollapse :show="collapse">
          <EmployeeEmergencyContactForm
            ref="employeeEmergencyContactEditRef"
            @employee-emergency-contact-update="employeeEmergencyContactUpdate"
          />
        </CCollapse>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeEmergencyContactIndex from "@/components/employees/employeeEmergencyContact/EmployeeEmergencyContactIndex";
import EmployeeEmergencyContactForm from "@/components/employees/employeeEmergencyContact/EmployeeEmergencyContactForm";

export default {
  name: "EmployeeEmergencyContactTab",
  components: { EmployeeEmergencyContactIndex, EmployeeEmergencyContactForm },
  data: () => ({
    toggleName: "Add New Emergency Contact",
    collapse: false,
    collapse_table: true,
  }),
  methods: {
    ToggleEmployeeEmergencyContact() {
      this.resetEmployeeEmergencyContactForm();
      this.collapse = !this.collapse;
      this.collapse_table = !this.collapse_table;
      if (this.toggleName == "Add New Emergency Contact") {
        this.toggleName = "Go To Emergency Contacts";
      } else if (this.toggleName == "Go To Emergency Contacts") {
        this.toggleName = "Add New Emergency Contact";
      }
    },
    employeeEmergencyContactUpdate(data) {
      this.ToggleEmployeeEmergencyContact();
      // this.$refs.employeeEmergencyContactRef.updateTableData(data);
      this.$refs.employeeEmergencyContactRef.getEmployeeEmergencyContact();
    },
    employeeEmergencyContactEdit(uuid) {
      this.ToggleEmployeeEmergencyContact();
      this.$refs.employeeEmergencyContactEditRef.getEditData(uuid);
    },
    resetEmployeeEmergencyContactForm() {
      this.$refs.employeeEmergencyContactEditRef.resetForm();
    },
  },
};
</script>
