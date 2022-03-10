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
        @replacement-change="changeReplacement($event)"
      />
      <template #footer>
        <CButton @click="closeModel()" color="danger">Close</CButton>
        <CButton v-if="!isReplace" @click="saveReturnByInvoice()" color="success"
          >Save</CButton
        >
        <CButton v-else @click="nextReturnByInvoice()" color="success">Next</CButton>
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
      isReplace: false,
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
    changeReplacement(val) {
      this.isReplace = val;
    },
    nextReturnByInvoice() {
      const id = this.product.product.uuid;
      this.$store.commit("set_return_by_invoice_model", false);
      this.$router.push({ path: "/returns/new/" + id });
    },
  },
};
</script>
