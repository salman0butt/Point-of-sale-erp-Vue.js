<template>
  <div>
    <CModal
      title="Return Invoice"
      :fade="true"
      :centered="true"
      :closeOnBackdrop="false"
      size="lg"
      color="success"
      :show.sync="showReturnByInvoiceModel"
    >
      <template #header>
        <h6 class="modal-title">Return Invoice</h6>
      </template>
      <ReturnByInvoiceForm
        :submit="isSubmit"
        :product="product"
        @reset-model="resetModel()"
        @reset-submit="resetSubmit()"
      />
      <template #footer>
        <CButton @click="closeModel()" color="danger">Close</CButton>
        <CButton @click="saveReturnByInvoice()" color="success">Save</CButton>
      </template>
    </CModal>
  </div>
</template>

<script>
import ReturnByInvoiceForm from "./ReturnByInvoiceForm";
export default {
  name: "ReturnByInvoiceModel",
  components: {
    ReturnByInvoiceForm,
  },
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isSubmit: false,
    };
  },
  computed: {
    showReturnByInvoiceModel() {
      return this.$store.getters.getReturnByInvoiceModel;
    },
  },
  methods: {
    resetModel() {
      this.isSubmit = false;
      this.$store.commit("set_return_by_invoice_model", false);
    },
    resetSubmit() {
      this.isSubmit = false;
    },
    saveReturnByInvoice() {
      this.isSubmit = true;

      // this.$emit("update-table");
    },
    closeModel() {
      this.isSubmit = false;
      this.$store.commit("set_return_by_invoice_model", false);
    },
  },
};
</script>
