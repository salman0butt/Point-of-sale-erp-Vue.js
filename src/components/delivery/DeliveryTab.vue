<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CButton
          @click="ToggleDelivery()"
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
          <DeliveryIndex ref="deliveryIndex" @edit-delivery="editDelivery" />
        </CCollapse>
        <CCollapse :show="collapse">
          <DeliveryForm ref="deiveryForm" @update-delivery="updateDelivery" />
        </CCollapse>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import DeliveryIndex from "@/components/delivery/DeliveryIndex";
import DeliveryForm from "@/components/delivery/DeliveryForm";

export default {
  name: "DeliveryTab",
  components: { DeliveryIndex, DeliveryForm },
  data: () => ({
    toggleName: "Add New",
    collapse: false,
    collapse_table: true,
  }),
  methods: {
    ToggleDelivery() {
      this.resetDeliveryForm();
      this.collapse = !this.collapse;
      this.collapse_table = !this.collapse_table;
      if (this.toggleName == "Add New") {
        this.toggleName = "Back";
      } else if (this.toggleName == "Back") {
        this.toggleName = "Add New";
      }
    },
    updateDelivery() {
      this.ToggleDelivery();
      this.$refs.deliveryIndex.getDeliveries();
    },
    editDelivery(uuid) {
      this.ToggleDelivery();
      this.$refs.deiveryForm.getEditData(uuid);
    },
    resetDeliveryForm() {
      this.$refs.deiveryForm.resetForm();
    },
  },
};
</script>
