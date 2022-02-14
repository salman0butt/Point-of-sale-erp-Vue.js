<template>
  <div>
    <CModal
      title="Payment Terms"
      :fade="true"
      :centered="true"
      :closeOnBackdrop="false"
      color="success"
      :show.sync="showPaymentTermModel"
    >
      <template #header>
        <h6 class="modal-title">Payment Terms</h6>
      </template>
      <PaymentTermForm
        :submit="isSubmit"
        @reset-model="resetModel()"
        ref="paymentTermForm"
      />
      <template #footer>
        <CButton @click="closeModel()" color="danger">Close</CButton>
        <CButton @click="savePaymentTerm()" color="success">Save</CButton>
      </template>
    </CModal>
  </div>
</template>

<script>
import PaymentTermForm from "./PaymentTermForm";
export default {
  name: "PaymentTermModel",
  components: {
    PaymentTermForm,
  },
  data() {
    return {
      isSubmit: false,
    };
  },
  computed: {
    showPaymentTermModel() {
      return this.$store.getters.getPaymentTermModel;
    },
  },
  methods: {
    resetModel() {
      this.isSubmit = false;
      this.$store.commit("set_payment_term_model", false);
      // this.$refs.paymentTermForm.resetForm();
    },
    savePaymentTerm() {
      this.isSubmit = true;
      this.$emit("update-table");
    },
    closeModel() {
      this.isSubmit = false;
      this.$store.commit("set_payment_term_model", false);
    },
  },
};
</script>
