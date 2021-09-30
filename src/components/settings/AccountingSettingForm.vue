<template>
  <div>
    <CCard>
      <CCardBody>
        <CRow>
          <CCol xs="12" lg="12">
            <form @submit.prevent="updateAccountingSetting()">
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Account Types"
                    v-model="form.account_types"
                    :class="{ error: $v.form.account_types.$error }"
                    @input="$v.form.account_types.$touch()"
                  />
                  <div v-if="$v.form.account_types.$error">
                    <p v-if="!$v.form.account_types.required" class="errorMsg">
                      Account Types are required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Payment Method Types"
                    v-model="form.payment_methods_types"
                    :class="{ error: $v.form.payment_methods_types.$error }"
                    @input="$v.form.payment_methods_types.$touch()"
                  />
                  <div v-if="$v.form.payment_methods_types.$error">
                    <p
                      v-if="!$v.form.payment_methods_types.required"
                      class="errorMsg"
                    >
                      Account Types are required
                    </p>
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="12" md="12" class="pt-2">
                  <CInput
                    label="Banks"
                    v-model="form.banks_types"
                    :class="{ error: $v.form.banks_types.$error }"
                    @input="$v.form.banks_types.$touch()"
                  />
                  <div v-if="$v.form.banks_types.$error">
                    <p v-if="!$v.form.banks_types.required" class="errorMsg">
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
      </CCardBody>
    </CCard>
  </div>
</template>
<script>
import AccoutingSettingService from "@/services/settings/AccoutingSettingService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "HrSettingForm",
  data: () => ({
    settingData: [],
    form: {
      account_types: "",
      banks_types: "",
      payment_methods_types: "",
    },
  }),
  validations() {
    return {
      form: {
        account_types: { required },
        banks_types: { required },
        payment_methods_types: { required },
      },
    };
  },
  created() {
    this.getAccountingSetting();
  },
  methods: {
    getAccountingSetting() {
      let type = "accounting";
      AccoutingSettingService.getAll(type)
        .then(({ data }) => {
          console.log(data);
          if (data != null && data != "") {
            let arr = this.form;
            data.forEach(function (item) {
              if (arr[item.key] !== undefined) {
                const regx = /type/gm;
                if (regx.test(item.key)) {
                  let data = JSON.parse(item.value).toString();
                  arr[item.key] = data;
                } else {
                  arr[item.key] = item.value;
                }
              }
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateAccountingSetting() {
      this.settingData = [];
      for (var key in this.form) {
        const regx = /type/gm;
        if (regx.test(key)) {
          let data = JSON.stringify(this.form[key].split(","));
          this.settingData.push({ key: key, value: data });
        } else {
          this.settingData.push({ key: key, value: this.form[key] });
        }
      }

      this.$v.$touch();
      if (!this.$v.$invalid) {
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
            }
          })
          .catch((error) => {
            console.log(error);
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

<style>
.errorMsg {
  color: red;
}
</style>
