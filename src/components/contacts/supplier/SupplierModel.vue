<template>
  <div>
    <CModal
      title="Modal title"
      :fade="true"
      :centered="true"
      :closeOnBackdrop="false"
      color="success"
      :show.sync="showSupplierModel"
    >
      <template #header>
        <h6 class="modal-title">Quick Supplier Add</h6>
      </template>
      <QuickAddSupplier />
      <template #footer>
        <CButton @click="closeModel()" color="danger">Close</CButton>
        <CButton @click="saveSupplier()" color="success">Save</CButton>
      </template>
    </CModal>
  </div>
</template>

<script>
import QuickAddSupplier from "./QuickAddSupplier";
export default {
  name: "SupplierModel",
  components: {
    QuickAddSupplier,
  },
  computed: {
    showSupplierModel() {
      return this.$store.getters.getSupplierModel;
    },
  },
  methods: {
    saveSupplier() {
      if (this.$store.getters.getSaveSupplierModel) {
        this.$store.commit("set_save_supplier_model", false);
      } else {
        this.$store.commit("set_save_supplier_model", true);
      }
    },
    closeModel() {
      this.$store.commit("set_supplier_model", false);
    },
  },
};
</script>
