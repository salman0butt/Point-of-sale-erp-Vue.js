<template>
  <div>
    <CModal
      title="Bill Payment"
      :fade="true"
      :centered="true"
      :closeOnBackdrop="false"
      color="success"
      :show.sync="showPaymentModel"
    >
      <template #header>
        <h6 class="modal-title">
          {{
            Object.keys(editData) && Object.keys(editData).length === 0
              ? "Create"
              : "Edit"
          }}
          Bill Payment
        </h6>
      </template>
      <BillPaymentForm
        :editData="editData"
        :submit="isSubmit"
        @reset-model="resetModel()"
        @reset-submit="resetSubmit()"
        ref="biiPaymentForm"
      />
      <template #footer>
        <CButton @click="closeModel()" color="danger">Close</CButton>
        <CButton @click="savePayment()" color="success">Save</CButton>
      </template>
    </CModal>
  </div>
</template>

<script>
import BillPaymentForm from "./BillPaymentForm";

export default {
  name: "PaymentModel",
  components: {
    BillPaymentForm,
  },
  data() {
    return {
      isSubmit: false,
    };
  },
  props: {
    editData: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    showPaymentModel() {
      return this.$store.getters.getBillPaymentModel;
    },
  },
  methods: {
    resetModel() {
      this.isSubmit = false;
      this.$store.commit("set_bill_payment_model", false);
    },
    resetSubmit() {
      this.isSubmit = false;
    },
    savePayment() {
      this.isSubmit = true;
      this.$emit("update-table");
    },
    closeModel() {
      this.$refs.biiPaymentForm.resetForm();
      this.isSubmit = false;
      this.$store.commit("set_bill_payment_model", false);
    },
  },
};
</script>
