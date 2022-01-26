<template>
  <div>
    <CModal
      title="Modal title"
      :fade="true"
      :centered="true"
      :closeOnBackdrop="false"
      color="success"
      :show.sync="showCustomerModel"
    >
      <template #header>
        <h6 class="modal-title">Quick Customer Add</h6>
      </template>
      <QuickAddCustomer />
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
    return {};
  },
  watch: {},
  created() {},
  computed: {
    showCustomerModel() {
      return this.$store.getters.getCustomerModel;
    },
  },
  methods: {
    saveCustomer() {
      if (this.$store.getters.getSaveCustomerModel) {
        this.$store.commit("set_save_customer_model", false);
      } else {
        this.$store.commit("set_save_customer_model", true);
      }
    },
    closeModel() {
      this.$store.commit("set_customer_model", false);
    },
  },
};
</script>
