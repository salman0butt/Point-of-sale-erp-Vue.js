<template>
  <div>
    <CModal
      title="Add Custom Plugin"
      :fade="true"
      :centered="true"
      :closeOnBackdrop="false"
      color="success"
      :show.sync="showCustomPluginModel"
    >
      <template #header>
        <h6 class="modal-title">Add Custom Plugin</h6>
      </template>
      <CustomPluginForm
        :submit="isSubmit"
        @reset-model="resetModel()"
        @reset-submit="resetSubmit()"
      />

      <template #footer>
        <CButton @click="closeModel()" color="danger"> Close </CButton>
        <CButton @click="saveCustomPlugin()" color="success"> Save </CButton>
      </template>
    </CModal>
  </div>
</template>

<script>
import CustomPluginForm from "./CustomPluginForm";
export default {
  name: "CustomPluginModel",
  components: {
    CustomPluginForm,
  },
  data() {
    return {
      isSubmit: false,
    };
  },
  computed: {
    showCustomPluginModel() {
      return this.$store.getters.getCustomPluginModel;
    },
  },
  methods: {
    resetModel() {
      this.isSubmit = false;
      this.$store.commit("set_custom_plugin_model", false);
    },
    resetSubmit() {
      this.isSubmit = false;
    },
    saveCustomPlugin() {
      this.isSubmit = true;

      this.$emit("update-table");
    },
    closeModel() {
      this.isSubmit = false;
      this.$store.commit("set_custom_plugin_model", false);
    },
  },
};
</script>
