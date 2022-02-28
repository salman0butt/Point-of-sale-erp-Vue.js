<template>
  <div>
    <CModal
      title="Quick Supplier Add"
      :fade="true"
      :centered="true"
      :closeOnBackdrop="false"
      color="success"
      :show.sync="showSupplierModel"
    >
      <template #header>
        <h6 class="modal-title">Quick Supplier Add</h6>
      </template>
      <QuickAddSupplier
        :submit="isSubmit"
        @reset-model="resetModel()"
        @reset-submit="resetSubmit()"
      />
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
  data() {
    return {
      isSubmit: false,
    };
  },
  computed: {
    showSupplierModel() {
      return this.$store.getters.getSupplierModel;
    },
  },
  methods: {
    resetModel() {
      this.isSubmit = false;
      this.$store.commit("set_supplier_model", false);
    },
    saveSupplier() {
      this.isSubmit = true;
      this.$emit("update-table");
    },
    resetSubmit() {
      this.isSubmit = false;
    },
    closeModel() {
      this.isSubmit = false;
      this.$store.commit("set_supplier_model", false);
    },
  },
};
</script>
