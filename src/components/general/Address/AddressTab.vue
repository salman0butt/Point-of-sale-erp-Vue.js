<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CButton
          @click="ToggleAddress()"
          color="primary"
          class="mb-2 mt-3"
          style="float: right"
        >
          {{ toggleName }}
        </CButton>
      </CCol>
    </CRow>
    <CCard>
      <CCardBody>
        <CRow>
          <CCol xs="12" lg="12">
            <CCollapse :show="collapse_table">
              <AddressIndex module="customer" />
            </CCollapse>
            <CCollapse :show="collapse">
              <EmployeeAddressForm
                ref="employeeAddressEditRef"
                @employeeAddressCreated="employeeAddressCreatedSend"
              />
            </CCollapse>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  </div>
</template>
<script>
import AddressIndex from "@/components/general/Address/AddressIndex";
import EmployeeAddressForm from "@/components/employees/employeeAddress/EmployeeAddressForm";

export default {
  name: "AddressTab",
  components: { AddressIndex, EmployeeAddressForm },
  data: () => ({
    toggleName: "Add New Address",
    collapse: false,
    collapse_table: true,
  }),
  methods: {
    ToggleAddress() {
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

<style>
.errorMsg {
  color: red;
}
</style>
