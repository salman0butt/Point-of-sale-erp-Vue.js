<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Address</CCardHeader>
          <CCardBody>
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

            <CRow>
              <CCol xs="12" lg="12">
                <CCollapse :show="collapse_table">
                  <AddressIndex
                    module="customer"
                    ref="AddressRef"
                    @AddressEdit="AddressEdited"
                  />
                </CCollapse>
                <CCollapse :show="collapse">
                  <AddressForm
                    module="customer"
                    ref="AddressEditRef"
                    @AddressCreated="AddressCreatedSend"
                  />
                </CCollapse>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import AddressIndex from "@/components/general/Address/AddressIndex";
import AddressForm from "@/components/general/Address/AddressForm";

export default {
  name: "AddressTab",
  components: { AddressIndex, AddressForm },
  data: () => ({
    toggleName: "Add New Address",
    collapse: false,
    collapse_table: true,
  }),

  methods: {
    ToggleAddress() {
      this.collapse = !this.collapse;
      this.collapse_table = !this.collapse_table;
      if (this.toggleName == "Add New Address") {
        this.toggleName = "Go To Addresses";
      } else if (this.toggleName == "Go To Addresses") {
        this.toggleName = "Add New Address";
      }
    },
    AddressCreatedSend() {
      this.ToggleAddress();
      this.$refs.AddressRef.getAddressData();
    },
    AddressEdited(uuid) {
      this.ToggleAddress();
      this.$refs.AddressEditRef.getEditData(uuid);
    },
    resetAddressForm() {
      this.$refs.AddressEditRef.resetForm();
    },
  },
};
</script>

<style>
.errorMsg {
  color: red;
}
</style>
