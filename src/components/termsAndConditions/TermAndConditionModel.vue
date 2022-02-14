<template>
  <div>
    <CModal
      title="Terms & Condition"
      :fade="true"
      :centered="true"
      :closeOnBackdrop="false"
      color="success"
      :show.sync="showTermAndConditionModel"
    >
      <template #header>
        <h6 class="modal-title">{{ editData.label }} Terms & Condition</h6>
      </template>
      <TermAndConditionForm
        :submit="isSubmit"
        @reset-model="resetModel()"
        :editData="editData"
      />
      <template #footer>
        <CButton @click="closeModel()" color="danger">Close</CButton>
        <CButton @click="saveTermAndCondition()" color="success">Save</CButton>
      </template>
    </CModal>
  </div>
</template>

<script>
import TermAndConditionForm from "./TermAndConditionForm";
export default {
  name: "TermAndConditionModel",
  components: {
    TermAndConditionForm,
  },
  props: {
    editData: {
      type: Object,
      default: () => ({}),
      required: true,
    },
  },
  data() {
    return {
      isSubmit: false,
    };
  },
  computed: {
    showTermAndConditionModel() {
      return this.$store.getters.getTermAndConditionModel;
    },
  },
  methods: {
    resetModel() {
      this.isSubmit = false;
      this.$store.commit("set_term_and_condition_model", false);
    },
    saveTermAndCondition() {
      this.isSubmit = true;
      this.$emit("update-table");
    },
    closeModel() {
      this.isSubmit = false;
      this.$store.commit("set_term_and_condition_model", false);
    },
  },
};
</script>
