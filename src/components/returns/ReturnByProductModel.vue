<template>
  <div>
    <CModal
      title="Return Product"
      :fade="true"
      :centered="true"
      :closeOnBackdrop="false"
      color="success"
      :show.sync="showReturnByProductModel"
    >
      <template #header>
        <h6 class="modal-title">Return Product</h6>
      </template>
      <ReturnByProductForm
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
import ReturnByProductForm from "./ReturnByProductForm";
export default {
  name: "ReturnByProductModel",
  components: {
    ReturnByProductForm,
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
    showReturnByProductModel() {
      return this.$store.getters.getReturnByProductModel;
    },
  },
  methods: {
    resetModel() {
      this.isSubmit = false;
      this.$store.commit("set_return_by_product_model", false);
    },
    resetSubmit() {
      this.isSubmit = false;
    },
    saveReturnByProduct() {
      this.isSubmit = true;

      // this.$emit("update-table");
    },
    closeModel() {
      this.isSubmit = false;
      this.$store.commit("set_return_by_product_model", false);
    },
    changeReplacement(val) {
      this.isReplace = val;
    },
    nextReturnByInvoice() {
      const id = this.product.uuid;
      this.$store.commit("set_return_by_product_model", false);
      this.$router.push({ path: "/returns/new/" + id });
    },
  },
};
</script>
