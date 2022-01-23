<template>
  <div>
    <CCard>
      <CCardHeader> Customer </CCardHeader>
      <CCardBody>
        <CRow>
          <Loader />
          <CCol xs="12" lg="12">
            <form @submit.prevent="updateCustomerSetting()">
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <div class="form-group">
                    <label for="customer_types">Customer Types</label>
                    <vue-tags-input
                      id="customer_types"
                      v-model="form.customer_types.tag"
                      placeholder="Values"
                      :tags="form.customer_types.values"
                      @tags-changed="(newTags) => (form.customer_types.values = newTags)"
                      :class="{ error: $v.form.customer_types.values.$error }"
                      @input="$v.form.customer_types.values.$touch()"
                    />
                  </div>
                  <div v-if="$v.form.customer_types.values.$error">
                    <p v-if="!$v.form.customer_types.values.required" class="errorMsg">
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
import { VueTagsInput } from "@johmun/vue-tags-input";
import Loader from "@/components/layouts/Loader";

export default {
  name: "HrSettingForm",
  components: { VueTagsInput, Loader },
  data: () => ({
    settingData: [],
    form: {
      customer_types: {
        tag: "",
        values: [],
      },
    },
  }),
  validations() {
    return {
      form: {
        customer_types: { values: { required } },
      },
    };
  },
  created() {
    this.CustomerSettingService();
  },
  methods: {
    CustomerSettingService() {
      let type = "customer";
      this.$store.commit("set_loader");
      CustomerSettingService.getAll(type)
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
    updateCustomerSetting() {
      this.settingData = [];
      for (var key in this.form) {
        const regx = /type/gm;
        if (regx.test(key)) {
          let data = JSON.stringify(
            this.form[key].values.map(function (item) {
              return item.text;
            })
          );
          this.settingData.push({ key: key, value: data });
        } else {
          this.settingData.push({ key: key, value: this.form[key] });
        }
      }

      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.commit("set_loader");
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
