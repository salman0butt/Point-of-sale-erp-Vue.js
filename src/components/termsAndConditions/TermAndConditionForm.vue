<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CRow>
          <CCol xs="12" lg="12">
            <form @submit.prevent="saveTermAndCondition()">
              <CRow>
                <CCol sm="12" md="12" class="pt-2">
                  <vue-editor
                    v-model="form.term_and_condition"
                    :editor-toolbar="customToolbar"
                    :class="{ error: $v.form.term_and_condition.$error }"
                    @input="$v.form.term_and_condition.$touch()"
                  ></vue-editor>
                  <div v-if="$v.form.term_and_condition.$error">
                    <p v-if="!$v.form.term_and_condition.required" class="errorMsg">
                      Contetent is required
                    </p>
                  </div>
                </CCol>
              </CRow>
              <p v-if="$v.$anyError" class="errorMsg">Please Fill the required data</p>
            </form>
          </CCol>
        </CRow>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import SettingService from "@/services/settings/SettingService";
import { required } from "vuelidate/lib/validators";
import { cilTrash } from "@coreui/icons-pro";
import { VueEditor } from "vue2-editor";

export default {
  name: "CreateOrUpdateTermAndCondition",
  components: { VueEditor },
  props: {
    submit: {
      type: Boolean,
      default: false,
    },
    editData: {
      type: Object,
      default: () => ({}),
      required: true,
    },
  },
  cilTrash,
  data: () => ({
    key: "",
    form: {
      term_and_condition: "",
    },
    customToolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  }),
  validations() {
    return {
      form: {
        term_and_condition: { required },
      },
    };
  },

  watch: {
    submitForm() {
      this.$v.$touch();
      if (this.submit && !this.$v.$invalid) {
        this.saveTermAndCondition();
        this.$emit("reset-model");
      }
    },
    editData(val) {
      this.key = val.key;
      this.form.term_and_condition = val.data;
    },
  },
  computed: {
    submitForm() {
      return this.submit;
    },
  },
  methods: {
    saveTermAndCondition() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.commit("set_loader");
        this.settingData = [];

        this.settingData.push({
          key: this.key,
          value: this.form.term_and_condition,
          type: "accounting",
        });
        let data = this.settingData;
        SettingService.update(data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Terms & Conditions Updated Successfully",
                timer: 3600,
              });

              this.$v.$reset();
              this.$store.commit("close_loader");
            }
          })
          .catch((error) => {
            console.log(error);
            this.$store.commit("close_loader");
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: "Something Went Wrong.",
              timer: 3600,
            });
          });
      }
    },
    resetForm() {
      for (let index in this.form) {
        this.form[index] = "";
      }
    },
  },
};
</script>
