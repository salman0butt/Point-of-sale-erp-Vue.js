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
        @hide-total="hideTotal()"
      />

      <template #footer>
        <h3 v-if="!isHide" style="margin-right: auto">Total {{ total }} BD</h3>
        <CButton v-if="!isHide" color="success" @click="saveOpening()">Opening</CButton>
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
      total: "0.000",
      isHide: false,
    };
  },
  computed: {
    showOpeningModel() {
      return this.$store.getters.getOpeningModel;
    },
  },
  // watch: {
  //   showOpeningModel(val) {
  //     if (val) {
  //       let terminal_id = localStorage.getItem("terminal_id");
  //       if (terminal_id) {
  //         this.isHide = true;
  //       }
  //     }
  //   },
  // },
  methods: {
    calculateTotal(val) {
      this.total = val;
    },
    hideTotal() {
      this.isHide = true;
    },
    resetModel() {
      this.isSubmit = false;
      this.$store.commit("set_opening_model", false);
    },
    saveOpening() {
      this.isSubmit = true;
      // this.$emit("update-table");
    },
    closeModel() {
      this.isSubmit = false;
      this.$store.commit("set_opening_model", false);
    },
  },
};
</script>
