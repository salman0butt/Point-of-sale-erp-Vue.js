<template>
  <div>
    <CCard>
      <CCardBody>
        <CRow>
          <CCol xs="12" lg="12">
            <form @submit.prevent="updateCustomerSetting()">
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Customer Types"
                    v-model="form.customer_types"
                    :class="{ error: $v.form.customer_types.$error }"
                    @input="$v.form.customer_types.$touch()"
                  />
                  <div v-if="$v.form.customer_types.$error">
                    <p v-if="!$v.form.customer_types.required" class="errorMsg">
                      Customer Types are required
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
import CustomerSettingService from "@/services/settings/CustomerSettingService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "HrSettingForm",
  data: () => ({
    settingData: [],
    form: {
      customer_types: "",
    },
  }),
  validations() {
    return {
      form: {
        customer_types: { required },
      },
    };
  },
  created() {
    this.CustomerSettingService();
  },
  methods: {
    CustomerSettingService() {
      let type = "customer";
      CustomerSettingService.getAll(type)
        .then(({ data }) => {
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
    updateCustomerSetting() {
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
        CustomerSettingService.update(data)
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
