<template>
  <div>
    <CModal
      id="closing-model"
      title="Closing"
      :fade="true"
      :centered="true"
      :closeOnBackdrop="false"
      size="lg"
      color="success"
      :show.sync="showClosingModel"
    >
      <template #header>
        <h6 class="modal-title">Closing</h6>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
          style="outline: none"
          @click="closeModel()"
        >
          <CIcon :content="$options.cisX" />
        </button>
      </template>
      <ClosingForm
        :submit="isSubmit"
        @reset-model="resetModel()"
        @hide-button="hideButton()"
      />

      <template #footer> </template>
    </CModal>
  </div>
</template>

<script>
import ClosingForm from "./ClosingForm";
import { cisX } from "@coreui/icons-pro";
export default {
  name: "ClosingModel",
  components: {
    ClosingForm,
  },
  cisX,
  data() {
    return {
      isSubmit: false,
    };
  },
  computed: {
    showClosingModel() {
      return this.$store.getters.getClosingModel;
    },
  },
  methods: {
    hideButton() {
      this.$emit("hide-button");
    },
    resetModel() {
      this.isSubmit = false;
      this.$store.commit("set_closing_model", false);
    },
    saveClosing() {
      this.isSubmit = true;
      this.$emit("update-table");
    },
    closeModel() {
      this.isSubmit = false;
      this.$store.commit("set_closing_model", false);
    },
  },
};
</script>

<style>
#closing-model footer.modal-footer {
  display: none !important;
}
</style>
