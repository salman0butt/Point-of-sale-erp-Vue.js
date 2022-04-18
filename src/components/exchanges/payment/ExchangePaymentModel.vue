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
        <h6 class="modal-title">
          {{
            Object.keys(editData) && Object.keys(editData).length === 0
              ? $t("payments.create.form.modelTitle")
              : $t("payments.create.form.editmodelTitle")
          }}
        </h6>
      </template>
      <ExchangePaymentForm
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
import ExchangePaymentForm from "./ExchangePaymentForm";

export default {
  name: "ExchangePaymentModel",
  components: {
    ExchangePaymentForm,
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
      return this.$store.getters.getExchangePaymentModel;
    },
  },
  methods: {
    resetModel() {
      this.isSubmit = false;
      this.$store.commit("set_exchange_payment_model", false);
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
      this.$store.commit("set_exchange_payment_model", false);
    },
  },
};
</script>
