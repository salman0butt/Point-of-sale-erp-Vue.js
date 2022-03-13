<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CRow>
          <Loader />
          <CCol xs="12" lg="12">
            <form @submit.prevent="updateCredit()">
              <CRow>
                <CCol :sm="12" :md="12" class="pt-2">
                  <CInput
                    label="Credit"
                    type="number"
                    placeholder="0.000"
                    v-model="form.credit"
                    :class="{ error: $v.form.credit.$error }"
                    @input="$v.form.credit.$touch()"
                    @change="totalCredit()"
                  />
                  <div v-if="$v.form.credit.$error">
                    <p v-if="!$v.form.credit.required" class="errorMsg">
                      Credit is required
                    </p>
                  </div>
                </CCol>
                <CCol :sm="12" :md="12" class="pt-2">
                  <CInput label="Total" v-model="form.total" readonly />
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
import SettingService from "@/services/settings/SettingService";
import { required } from "vuelidate/lib/validators";
import { cilTrash } from "@coreui/icons-pro";
import Loader from "@/components/layouts/Loader.vue";

export default {
  name: "BuyCreditForm",
  components: {
    Loader,
  },
  props: {
    submit: {
      type: Boolean,
      default: false,
    },
  },
  cilTrash,
  data: () => ({
    form: {
      credit: "",
      total_credits: 0,
      total: 0,
    },
  }),
  validations() {
    return {
      form: {
        credit: { required },
      },
    };
  },
  created() {
    // this.form.id = this.$route.params.id;
    setTimeout(() => {
      this.form.total = this.credits;
    }, 1000);
  },
  watch: {
    submitForm() {
      this.$v.$touch();
      if (this.submit && !this.$v.$invalid) {
        this.updateCredit();
        this.$emit("reset-model");
      } else {
        this.$emit("reset-submit");
      }
    },
    credits(val) {
      this.form.total_credits = val;
      // this.form.total = val;
    },
  },
  computed: {
    submitForm() {
      return this.submit;
    },
    credits() {
      return this.$store.getters.getSmsCredits;
    },
  },
  methods: {
    totalCredit() {
      this.form.total =
        parseFloat(this.$store.getters.getSmsCredits) + parseFloat(this.form.credit);
    },
    updateCredit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.commit("set_loader");
        this.settingData = [];
        let data = parseFloat(this.form.credit) + parseFloat(this.form.total_credits);
        this.settingData.push({
          key: "sms_credits",
          value: data.toString(),
          type: "sms",
        });
        SettingService.update(this.settingData)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Credits added Successfully",
                timer: 3600,
              });
              // this.form.total = data;
              this.$store.commit("set_sms_credits", data);
              this.$v.$reset();
              this.resetForm();
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
      this.form.credit = "";
    },
  },
};
</script>
