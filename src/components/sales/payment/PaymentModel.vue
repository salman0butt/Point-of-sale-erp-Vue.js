<template>
  <div>
    <CModal
      :title="$t('payments.create.form.modelTitle')"
      :fade="true"
      :centered="true"
      :closeOnBackdrop="false"
      color="success"
      :show.sync="showPaymentModel"
    >
      <template #header>
        <h6 class="modal-title">{{ $t("payments.create.form.modelTitle") }}</h6>
      </template>
      <PaymentForm
        :editData="editData"
        :submit="isSubmit"
        @reset-model="resetModel()"
        @reset-submit="resetSubmit()"
        ref="paymentForm"
      />
      <template #footer>
        <CButton @click="closeModel()" color="danger">{{
          $t("payments.create.form.close")
        }}</CButton>
        <CButton @click="savePayment()" color="success">{{
          $t("payments.create.form.save")
        }}</CButton>
      </template>
    </CModal>
  </div>
</template>

<script>
import PaymentForm from "@/components/sales/payment/PaymentForm";

export default {
  name: "PaymentModel",
  components: {
    PaymentForm,
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
      return this.$store.getters.getPaymentModel;
    },
  },
  methods: {
    resetModel() {
      this.isSubmit = false;
      this.$store.commit("set_payment_model", false);
    },
    resetSubmit() {
      this.isSubmit = false;
    },
    savePayment() {
      this.isSubmit = true;
      this.$emit("update-table");
    },
    closeModel() {
      this.$refs.paymentForm.resetForm();
      this.isSubmit = false;
      this.$store.commit("set_payment_model", false);
    },
  },
};
</script>
