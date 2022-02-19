<template>
  <div>
    <CModal
      title="Opening"
      :fade="true"
      :centered="true"
      :closeOnBackdrop="false"
      size="lg"
      color="success"
      :show.sync="showOpeningModel"
    >
      <template #header>
        <h6 class="modal-title">Opening</h6>
      </template>
      <OpeningForm
        :submit="isSubmit"
        @total="calculateTotal($event)"
        @reset-model="resetModel()"
      />

      <template #footer>
        <h3 style="margin-right: auto">Total {{ total }} BD</h3>
        <CButton color="success">Opening</CButton>
        <CButton @click="closeModel" color="danger">Close</CButton>
      </template>
    </CModal>
  </div>
</template>

<script>
import OpeningForm from "./OpeningForm";
import { cisX } from "@coreui/icons-pro";
export default {
  name: "OpeningModel",
  components: {
    OpeningForm,
  },
  cisX,
  data() {
    return {
      isSubmit: false,
      total: "0.00",
    };
  },
  computed: {
    showOpeningModel() {
      return this.$store.getters.getOpeningModel;
    },
  },
  methods: {
    calculateTotal(val) {
      this.total = val;
    },
    resetModel() {
      this.isSubmit = false;
      this.$store.commit("set_opening_model", false);
    },
    saveOpening() {
      this.isSubmit = true;
      this.$emit("update-table");
    },
    closeModel() {
      this.isSubmit = false;
      this.$store.commit("set_opening_model", false);
    },
  },
};
</script>
