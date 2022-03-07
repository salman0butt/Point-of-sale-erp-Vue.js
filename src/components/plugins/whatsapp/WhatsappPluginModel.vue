<template>
  <div id="contact-model-list">
    <CModal
      title="Contacts"
      :fade="true"
      :centered="true"
      :closeOnBackdrop="false"
      color="success"
      :show.sync="showWhatsappPluginModel"
    >
      <template #header>
        <h6 class="modal-title">Contacts</h6>
      </template>
      <WhatsappPluginForm
        :contacts="contacts"
        :type="type"
        :submit="isSubmit"
        @reset-model="resetModel()"
        @reset-submit="resetSubmit()"
      />
      <template #footer>
        <CButton @click="closeModel()" color="danger">Close</CButton>
        <!-- <CButton @click="saveWhatsappPlugin()" color="success">Send</CButton> -->
      </template>
    </CModal>
  </div>
</template>

<script>
import WhatsappPluginForm from "./WhatsappPluginForm";
export default {
  name: "WhatsappPluginModel",
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
    WhatsappPluginForm,
  },
  data() {
    return {
      isSubmit: false,
    };
  },
  computed: {
    showWhatsappPluginModel() {
      return this.$store.getters.getWhatsappPluginModel;
    },
  },
  methods: {
    resetModel() {
      this.isSubmit = false;
      this.$store.commit("set_whatsapp_plugin_model", false);
    },
    resetSubmit() {
      this.isSubmit = false;
    },
    saveWhatsappPlugin() {
      this.isSubmit = true;

      this.$emit("update-table");
    },
    closeModel() {
      this.isSubmit = false;
      this.$store.commit("set_whatsapp_plugin_model", false);
    },
  },
};
</script>
