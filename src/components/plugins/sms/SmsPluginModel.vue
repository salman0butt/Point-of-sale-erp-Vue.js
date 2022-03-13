<template>
  <div id="contact-model-list">
    <CModal
      title="Contacts"
      :fade="true"
      :centered="true"
      :closeOnBackdrop="false"
      color="success"
      :show.sync="showSmsPluginModel"
    >
      <template #header>
        <h6 class="modal-title">Contacts</h6>
      </template>
      <SmsPluginForm
        :contacts="contacts"
        :type="type"
        :submit="isSubmit"
        @reset-model="resetModel()"
        @reset-submit="resetSubmit()"
      />
      <template #footer>
        <CButton @click="closeModel()" color="danger">Close</CButton>
        <!-- <CButton @click="saveSmsPlugin()" color="success">Send</CButton> -->
      </template>
    </CModal>
  </div>
</template>

<script>
import SmsPluginForm from "./SmsPluginForm";
export default {
  name: "SmsPluginModel",
  props: {
    contacts: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: "",
    },
  },
  components: {
    SmsPluginForm,
  },
  data() {
    return {
      isSubmit: false,
    };
  },
  computed: {
    showSmsPluginModel() {
      return this.$store.getters.getSmsPluginModel;
    },
  },
  methods: {
    resetModel() {
      this.isSubmit = false;
      this.$store.commit("set_sms_plugin_model", false);
    },
    resetSubmit() {
      this.isSubmit = false;
    },
    saveSmsPlugin() {
      this.isSubmit = true;

      this.$emit("update-table");
    },
    closeModel() {
      this.isSubmit = false;
      this.$store.commit("set_sms_plugin_model", false);
    },
  },
};
</script>
