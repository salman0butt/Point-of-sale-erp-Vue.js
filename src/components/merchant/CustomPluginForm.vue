<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CRow>
          <Loader />
          <CCol xs="12" lg="12">
            <form @submit.prevent="saveCustomPlugin()">
              <CRow>
                <CCol class="pt-2">
                  <CInput
                    label="Plugin Serial Number"
                    v-model="form.serial_number"
                    :class="{ error: $v.form.serial_number.$error }"
                    @input="$v.form.serial_number.$touch()"
                  />
                  <div v-if="$v.form.serial_number.$error">
                    <p v-if="!$v.form.serial_number.required" class="errorMsg">
                      Serial Number is Required
                    </p>
                  </div>
                </CCol>
              </CRow>

              <p v-if="$v.$anyError" class="errorMsg">
                {{ $t("general.validationError") }}
              </p>
            </form>
          </CCol>
        </CRow>
      </CCol>
    </CRow>
  </div>
</template>
<script>
// import CustomPluginService from "@/services/catalogs/CustomPlugins/CustomPluginService";
import { required } from "vuelidate/lib/validators";
import Loader from "@/components/layouts/Loader.vue";

export default {
  name: "CustomPluginForm",
  components: {
    Loader,
  },
  props: {
    submit: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    isEditing: false,
    form: {
      id: "",
      serial_number: "",
    },
  }),
  validations() {
    return {
      form: {
        serial_number: { required },
      },
    };
  },
  watch: {
    submitForm() {
      this.$v.$touch();
      if (this.submit && !this.$v.$invalid) {
        this.saveCustomPlugin();
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
    saveCustomPlugin() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        return;
        // this.$v.$reset();
        // alert("Custom Plugin Saved");
        // this.resetForm();
        // this.$store.commit("set_loader");
        // let data = this.form;
        // CustomPluginService.create(data)
        //   .then((res) => {
        //     if (res.status === 201 || res.status === 200) {
        //       this.$swal.fire({
        //         icon: "success",
        //         title: this.$t("general.swal.success"),
        //         text: "Custom Plugin Created Successfully",
        //         timer: 3600,
        //         timerProgressBar: true,
        //         confirmButtonText: this.$t("general.swal.ok"),
        //       });
        //       this.$v.$reset();
        //       this.resetForm();
        //       this.$store.commit("close_loader");
        //     }
        //   })
        //   .catch((error) => {
        //   console.log(error);
        //   this.$store.commit("close_loader");
        //   this.$swal.fire({
        //     icon: "error",
        //     timerProgressBar: true,
        //     title: this.$t("general.swal.error"),
        //     text: this.$t("general.swal.errorMsg"),
        //     timer: 3600,
        //   });
        // });
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
