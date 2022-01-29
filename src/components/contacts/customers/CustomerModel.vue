<template>
  <div>
    <CModal
      title="Quick Customer Add"
      :fade="true"
      :centered="true"
      :closeOnBackdrop="false"
      color="success"
      :show.sync="showCustomerModel"
    >
      <template #header>
        <h6 class="modal-title">Quick Customer Add</h6>
      </template>
      <QuickAddCustomer :submit="isSubmit" @reset-model="resetModel()" />
      <template #footer>
        <CButton @click="closeModel()" color="danger">Close</CButton>
        <CButton @click="saveCustomer()" color="success">Save</CButton>
      </template>
    </CModal>
  </div>
</template>

<script>
import QuickAddCustomer from "./QuickAddCustomer";
export default {
  name: "CustomerModel",
  components: {
    QuickAddCustomer,
  },
  data() {
    return {
      isSubmit: false,
    };
  },
  computed: {
    showCustomerModel() {
      return this.$store.getters.getCustomerModel;
    },
  },
  methods: {
    resetModel() {
      this.isSubmit = false;
      this.$store.commit("set_customer_model", false);
    },
    saveCustomer() {
      this.isSubmit = true;
      this.$emit("update-table");
    },
    closeModel() {
      this.isSubmit = false;
      this.$store.commit("set_customer_model", false);
    },
  },
};
</script>
