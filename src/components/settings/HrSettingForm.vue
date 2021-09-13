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
                    label="Attendance"
                    :options="options.attendance_by"
                    :value.sync="form.attendance_by"
                  />
                  <div v-if="$v.form.attendance_by.$error">
                    <p v-if="!$v.form.attendance_by.required" class="errorMsg">
                      Attendance is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Target Types"
                    v-model="form.target_types"
                    :class="{ error: $v.form.target_types.$error }"
                    @input="$v.form.target_types.$touch()"
                  />
                  <div v-if="$v.form.target_types.$error">
                    <p v-if="!$v.form.target_types.required" class="errorMsg">
                      Target Types is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Expense Types"
                    v-model="form.expense_types"
                    :class="{ error: $v.form.expense_types.$error }"
                    @input="$v.form.expense_types.$touch()"
                  />
                  <div v-if="$v.form.expense_types.$error">
                    <p v-if="!$v.form.expense_types.required" class="errorMsg">
                      Expense Types is required
                    </p>
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="License Types"
                    v-model="form.license_type"
                    :class="{ error: $v.form.license_type.$error }"
                    @input="$v.form.license_type.$touch()"
                  />
                  <div v-if="$v.form.license_type.$error">
                    <p v-if="!$v.form.license_type.required" class="errorMsg">
                      License Types is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Qualification Types"
                    v-model="form.qualification_type"
                    :class="{ error: $v.form.qualification_type.$error }"
                    @input="$v.form.qualification_type.$touch()"
                  />
                  <div v-if="$v.form.qualification_type.$error">
                    <p v-if="!$v.form.qualification_type.required" class="errorMsg">
                      Qualification Types is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Periodic Types"
                    v-model="form.periodic_type"
                    :class="{ error: $v.form.periodic_type.$error }"
                    @input="$v.form.periodic_type.$touch()"
                  />
                  <div v-if="$v.form.periodic_type.$error">
                    <p v-if="!$v.form.periodic_type.required" class="errorMsg">
                      Periodic Types is required
                    </p>
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Allowances Types"
                    v-model="form.allowances_type"
                    :class="{ error: $v.form.allowances_type.$error }"
                    @input="$v.form.allowances_type.$touch()"
                  />
                  <div v-if="$v.form.allowances_type.$error">
                    <p v-if="!$v.form.allowances_type.required" class="errorMsg">
                      Allowances Types is required
                    </p>
                  </div>
                </CCol>
              </CRow>

              <p v-if="$v.$anyError" class="errorMsg">Please Fill the required data</p>
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
  data: () => ({
    settingData: [],
    form: {
      attendance_by: "",
      target_types: "",
      expense_types: "",
      license_type: "",
      qualification_type: "",
      periodic_type: "",
      allowances_type: "",
    },
    options: {
      attendance_by: [
        { value: "", label: "Choose Type", disabled: true, selected: "" },
        { value: "login", label: "By Login" },
        { value: "import", label: "By Import" },
      ],
    },
  }),
  validations() {
    return {
      form: {
        attendance_by: { required },
        target_types: { required },
        expense_types: { required },
        license_type: { required },
        qualification_type: { required },
        periodic_type: { required },
        allowances_type: { required },
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
  },
};
</script>

<style>
.errorMsg {
  color: red;
}
</style>
