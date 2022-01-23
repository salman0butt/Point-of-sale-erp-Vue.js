<template>
  <div>
    <CCard>
      <CCardHeader> Accounting </CCardHeader>
      <CCardBody>
        <CRow>
          <Loader />
          <CCol xs="12" lg="12">
            <form @submit.prevent="updateAccountingSetting()">
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <div class="form-group">
                    <label for="account_type">Account Types</label>
                    <vue-tags-input
                      id="account_type"
                      v-model="form.account_types.tag"
                      placeholder="Values"
                      :tags="form.account_types.values"
                      @tags-changed="(newTags) => (form.account_types.values = newTags)"
                      :class="{ error: $v.form.account_types.values.$error }"
                      @input="$v.form.account_types.values.$touch()"
                    />
                  </div>
                  <div v-if="$v.form.account_types.values.$error">
                    <p v-if="!$v.form.account_types.values.required" class="errorMsg">
                      Account Types are required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <div class="form-group">
                    <label for="account_type">Payment Method Types</label>
                    <vue-tags-input
                      id="account_type"
                      v-model="form.payment_methods_types.tag"
                      placeholder="Values"
                      :tags="form.payment_methods_types.values"
                      @tags-changed="
                        (newTags) => (form.payment_methods_types.values = newTags)
                      "
                      :class="{ error: $v.form.payment_methods_types.values.$error }"
                      @input="$v.form.payment_methods_types.values.$touch()"
                    />
                  </div>
                  <div v-if="$v.form.payment_methods_types.values.$error">
                    <p
                      v-if="!$v.form.payment_methods_types.values.required"
                      class="errorMsg"
                    >
                      Payment Types are required
                    </p>
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="12" md="12" class="pt-2">
                  <div class="form-group">
                    <label for="account_type">Banks</label>
                    <vue-tags-input
                      id="account_type"
                      v-model="form.banks_types.tag"
                      placeholder="Values"
                      :tags="form.banks_types.values"
                      @tags-changed="(newTags) => (form.banks_types.values = newTags)"
                      :class="{ error: $v.form.banks_types.values.$error }"
                      @input="$v.form.banks_types.values.$touch()"
                    />
                  </div>

                  <div v-if="$v.form.banks_types.values.$error">
                    <p v-if="!$v.form.banks_types.values.required" class="errorMsg">
                      Banks are required
                    </p>
                  </div>
                </CCol>
              </CRow>

              <CRow class="mt-4 d-block">
                <CButton
                  progress
                  timeout="2000"
                  block
                  color="success"
                  style="float: right; width: 150px; margin-right: 20px"
                  type="submit"
                  >Save</CButton
                >
              </CRow>
            </form>
          </CCol>
        </CRow>
        <TaxForm />
      </CCardBody>
    </CCard>
  </div>
</template>
<script>
import AccoutingSettingService from "@/services/settings/AccoutingSettingService";
import { required } from "vuelidate/lib/validators";
import { VueTagsInput } from "@johmun/vue-tags-input";
import Loader from "@/components/layouts/Loader";
import TaxForm from "@/components/taxes/TaxForm";

export default {
  name: "HrSettingForm",
  components: { VueTagsInput, Loader, TaxForm },
  data: () => ({
    settingData: [],
    form: {
      account_types: {
        tag: "",
        values: [],
      },
      banks_types: {
        tag: "",
        values: [],
      },
      payment_methods_types: {
        tag: "",
        values: [],
      },
    },
  }),
  validations() {
    return {
      form: {
        account_types: { values: { required } },
        banks_types: { values: { required } },
        payment_methods_types: { values: { required } },
      },
    };
  },
  created() {
    this.getAccountingSetting();
  },
  methods: {
    getAccountingSetting() {
      let type = "accounting";
      this.$store.commit("set_loader");
      AccoutingSettingService.getAll(type)
        .then(({ data }) => {
          if (data != null && data != "") {
            let arr = this.form;
            data.forEach(function (item) {
              if (arr[item.key] !== undefined) {
                const regx = /type/gm;
                if (regx.test(item.key)) {
                  let data = JSON.parse(item.value).map((value) => {
                    return { text: value, tiClasses: ["ti-valid"] };
                  });
                  arr[item.key].values = data;
                } else {
                  arr[item.key] = item.value;
                }
              }
            });
          }
          this.$store.commit("close_loader");
        })
        .catch((error) => {
          this.$store.commit("close_loader");
          console.log(error);
        });
    },
    updateAccountingSetting() {
      this.settingData = [];
      for (var key in this.form) {
        const regx = /type/gm;
        if (regx.test(key)) {
          let data = JSON.stringify(
            this.form[key].values.map(function (item) {
              return item.text;
            })
          );
          this.settingData.push({ key: key, value: data, type: "accounting" });
        } else {
          this.settingData.push({ key: key, value: this.form[key], type: "accounting" });
        }
      }

      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        this.$store.commit("set_loader");
        let data = this.settingData;
        AccoutingSettingService.update(data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Settings Updated Successfully",
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
  },
};
</script>
