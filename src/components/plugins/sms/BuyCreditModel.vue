<template>
  <div>
    <CModal
      title="Buy Credits"
      :fade="true"
      :centered="true"
      :closeOnBackdrop="false"
      color="success"
      :show.sync="showBuyCreditModel"
    >
      <template #header>
        <h6 class="modal-title">Buy Credits</h6>
      </template>
      <BuyCreditForm
        :submit="isSubmit"
        @reset-model="resetModel()"
        @reset-submit="resetSubmit()"
      />
      <template #footer>
        <CButton @click="closeModel()" color="danger">Close</CButton>
        <CButton @click="saveBuyCredit()" color="success">Save</CButton>
      </template>
    </CModal>
  </div>
</template>

<script>
import BuyCreditForm from "./BuyCreditForm";
export default {
  name: "BuyCreditModel",
  components: {
    BuyCreditForm,
  },
  data() {
    return {
      isSubmit: false,
    };
  },
  computed: {
    showBuyCreditModel() {
      return this.$store.getters.getBuyCreditModel;
    },
  },
  methods: {
    resetModel() {
      this.isSubmit = false;
      this.$store.commit("set_buy_credit_model", false);
    },
    resetSubmit() {
      this.isSubmit = false;
    },
    saveBuyCredit() {
      this.isSubmit = true;

      this.$emit("update-table");
    },
    closeModel() {
      this.isSubmit = false;
      this.$store.commit("set_buy_credit_model", false);
    },
  },
};
</script>
