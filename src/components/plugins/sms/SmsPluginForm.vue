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
                @change.prevent="changeSmsContact()"
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
import { smsMixin } from "@/mixins/plugins/smsMixin";
export default {
  name: "SmsPluginForm",
  mixins: [smsMixin],
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
    changeSmsContact() {
      if (this.contact) {
        const contact = JSON.parse(this.contact);
        this.sms.name = contact.name;
        this.sms.number = contact.number;
        this.sendSms(this.type);
        this.$store.commit("set_sms_plugin_model", false);
      } else {
        this.sms.name = "";
        this.sms.number = "";
      }
    },
  },
};
</script>
