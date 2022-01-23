<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CButton
          @click="ToggleEmployeeAddress()"
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
          <EmployeeAddressIndex
            ref="employeeAddressRef"
            @employeeAddressEdit="employeeAddressEdited"
          />
        </CCollapse>
        <CCollapse :show="collapse">
          <EmployeeAddressForm
            ref="employeeAddressEditRef"
            @employeeAddressCreated="employeeAddressCreatedSend"
          />
        </CCollapse>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeAddressIndex from "@/components/employees/employeeAddress/EmployeeAddressIndex";
import EmployeeAddressForm from "@/components/employees/employeeAddress/EmployeeAddressForm";

export default {
  name: "EmployeeAddressTab",
  components: { EmployeeAddressIndex, EmployeeAddressForm },
  data: () => ({
    toggleName: "Add New Address",
    collapse: false,
    collapse_table: true,
  }),
  methods: {
    ToggleEmployeeAddress() {
      this.resetEmployeeAddressForm();
      this.collapse = !this.collapse;
      this.collapse_table = !this.collapse_table;
      if (this.toggleName == "Add New Address") {
        this.toggleName = "Go To Addresses";
      } else if (this.toggleName == "Go To Addresses") {
        this.toggleName = "Add New Address";
      }
    },
    employeeAddressCreatedSend() {
      this.ToggleEmployeeAddress();
      this.$refs.employeeAddressRef.getEmployeeAddressData();
    },
    employeeAddressEdited(uuid) {
      this.ToggleEmployeeAddress();
      this.$refs.employeeAddressEditRef.getEditData(uuid);
    },
    resetEmployeeAddressForm() {
      this.$refs.employeeAddressEditRef.resetForm();
    },
  },
};
</script>
