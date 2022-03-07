<template>
  <div>
    <CRow>
      <Loader />
      <CCol xs="12" lg="12">
        <form @submit.prevent="saveBrand()">
          <CRow>
            <CCol :sm="12" :md="12" class="pt-2">
              <CSelect
                v-if="contacts && contacts.length > 1"
                :options="contacts"
                :value.sync="contact"
                @change.prevent="changeWhatsappContact()"
              />
            </CCol>
          </CRow>
        </form>
      </CCol>
    </CRow>
  </div>
</template>
<script>
// import { required } from "vuelidate/lib/validators";
import Loader from "@/components/layouts/Loader.vue";
import { whatsappMixin } from "@/mixins/plugins/whatsappMixin";
export default {
  name: "WhatsappPluginForm",
  mixins: [whatsappMixin],
  components: {
    Loader,
  },
  props: {
    submit: {
      type: Boolean,
      default: false,
    },
    contacts: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    contact: "",
  }),
  // validations() {
  //   return {
  //     form: {
  //       name: { required },
  //     },
  //   };
  // },
  // created() {
  //   this.form.id = this.$route.params.id;
  // },
  watch: {
    submitForm() {
      if (this.submit) {
        this.saveBrand();
        this.$emit("reset-model");
      } else {
        this.$emit("reset-submit");
      }
    },
  },
  computed: {
    submitForm() {
      return this.submit;
    },
  },
  methods: {
    saveBrand() {
      alert("send");
    },
    changeWhatsappContact() {
      if (this.contact) {
        const contact = JSON.parse(this.contact);
        this.whatsapp.name = contact.name;
        this.whatsapp.number = contact.number;
        this.sendWhatsapp(this.type);
        this.$store.commit("set_whatsapp_plugin_model", false);
      } else {
        this.whatsapp.name = "";
        this.whatsapp.number = "";
      }
    },
  },
};
</script>
