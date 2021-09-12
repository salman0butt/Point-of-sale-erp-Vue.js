<template>
  <div>
    <CCard>
      <CCardBody>
        <CRow>
          <CCol xs="12" lg="12">
            <form @submit.prevent="updateHrSetting()">
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Attendance By"
                    :options="options.attendance_by"
                    :value.sync="form.attendance_by"
                  />
                  <!-- <div v-if="$v.form.attendance_by.$error">
                    <p v-if="!$v.form.attendance_by.required" class="errorMsg">
                      Attendance By is required
                    </p>
                  </div> -->
                </CCol>
              </CRow>

              <!-- <p v-if="$v.$anyError" class="errorMsg">Please Fill the required data</p> -->
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
import HrSettingService from "@/services/settings/HrSettingService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "HrSettingForm",
  data() {
    return {
      settingData: [],
      form: {
        attendance_by: "",
      },
      options: {
        attendance_by: [
          { value: "", label: "Choose Type", disabled: true, selected: "" },
          { value: "login", label: "By Login" },
          { value: "import", label: "By Import" },
        ],
      },
    };
  },
  validations() {
    return {
      form: {
        attendance_by: { required },
      },
    };
  },
  created() {
    this.getHrSetting();
  },
  methods: {
    updateHrSetting() {
      this.settingData = [];
      for (var key in this.form) {
        this.settingData.push({ key: key, value: this.form[key] });
      }

      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.settingData;
        HrSettingService.update(data)
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
    getHrSetting() {
      HrSettingService.getAll()
        .then(({ data }) => {
          if (data != null && data != "") {
            let arr = this.form;
            data.forEach(function (item) {
              if (arr[item.key] !== undefined) {
                arr[item.key] = item.value;
              }
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
.errorMsg {
  color: red;
}
</style>
