<template>
  <div>
    <CCard>
      <CCardBody>
        <CRow>
          <Loader />
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
                  <CSelect
                    label="HR As"
                    :options="options.hr_branches"
                    :value.sync="form.hr_branch_setting"
                  />
                  <div v-if="$v.form.hr_branch_setting.$error">
                    <p v-if="!$v.form.hr_branch_setting.required" class="errorMsg">
                      HR As is required
                    </p>
                  </div>
                </CCol>

                <CCol sm="6" md="4" class="pt-2">
                  <div class="form-group">
                    <label for="target_type">Target Types</label>
                    <vue-tags-input
                      id="target_type"
                      v-model="form.target_types.tag"
                      placeholder="Values"
                      :tags="form.target_types.values"
                      @tags-changed="(newTags) => (form.target_types.values = newTags)"
                      :class="{ error: $v.form.target_types.values.$error }"
                      @input="$v.form.target_types.values.$touch()"
                    />
                  </div>
                  <div v-if="$v.form.target_types.values.$error">
                    <p v-if="!$v.form.target_types.values.required" class="errorMsg">
                      Target Types is required
                    </p>
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <div class="form-group">
                    <label for="expense_type">Expense Types</label>
                    <vue-tags-input
                      id="expense_type"
                      v-model="form.expense_types.tag"
                      placeholder="Values"
                      :tags="form.expense_types.values"
                      @tags-changed="(newTags) => (form.expense_types.values = newTags)"
                      :class="{ error: $v.form.expense_types.values.$error }"
                      @input="$v.form.expense_types.values.$touch()"
                    />
                  </div>

                  <div v-if="$v.form.expense_types.values.$error">
                    <p v-if="!$v.form.expense_types.values.required" class="errorMsg">
                      Expense Types is required
                    </p>
                  </div>
                </CCol>

                <CCol sm="6" md="4" class="pt-2">
                  <div class="form-group">
                    <label for="license_type">License Types</label>
                    <vue-tags-input
                      id="license_type"
                      v-model="form.license_type.tag"
                      placeholder="Values"
                      :tags="form.license_type.values"
                      @tags-changed="(newTags) => (form.license_type.values = newTags)"
                      :class="{ error: $v.form.license_type.values.$error }"
                      @input="$v.form.license_type.values.$touch()"
                    />
                  </div>
                  <div v-if="$v.form.license_type.values.$error">
                    <p v-if="!$v.form.license_type.values.required" class="errorMsg">
                      License Types is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <div class="form-group">
                    <label for="qualification_type">Qualification Types</label>
                    <vue-tags-input
                      id="qualification_type"
                      v-model="form.qualification_type.tag"
                      placeholder="Values"
                      :tags="form.qualification_type.values"
                      @tags-changed="
                        (newTags) => (form.qualification_type.values = newTags)
                      "
                      :class="{ error: $v.form.qualification_type.values.$error }"
                      @input="$v.form.qualification_type.values.$touch()"
                    />
                  </div>
                  <div v-if="$v.form.qualification_type.values.$error">
                    <p
                      v-if="!$v.form.qualification_type.values.required"
                      class="errorMsg"
                    >
                      Qualification Types is required
                    </p>
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <div class="form-group">
                    <label for="periodic_type">Periodic Types</label>
                    <vue-tags-input
                      id="periodic_type"
                      v-model="form.periodic_type.tag"
                      placeholder="Values"
                      :tags="form.periodic_type.values"
                      @tags-changed="(newTags) => (form.periodic_type.values = newTags)"
                      :class="{ error: $v.form.periodic_type.values.$error }"
                      @input="$v.form.periodic_type.values.$touch()"
                    />
                  </div>

                  <div v-if="$v.form.periodic_type.values.$error">
                    <p v-if="!$v.form.periodic_type.values.required" class="errorMsg">
                      Periodic Types is required
                    </p>
                  </div>
                </CCol>

                <CCol sm="6" md="4" class="pt-2">
                  <div class="form-group">
                    <label for="allowance_type">Allowances Types</label>
                    <vue-tags-input
                      id="allowance_type"
                      v-model="form.allowances_type.tag"
                      placeholder="Values"
                      :tags="form.allowances_type.values"
                      @tags-changed="(newTags) => (form.allowances_type.values = newTags)"
                      :class="{ error: $v.form.allowances_type.values.$error }"
                      @input="$v.form.allowances_type.values.$touch()"
                    />
                  </div>
                  <div v-if="$v.form.allowances_type.values.$error">
                    <p v-if="!$v.form.allowances_type.values.required" class="errorMsg">
                      Allowances Types is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <div class="form-group">
                    <label for="leave_type">Leave Types</label>
                    <vue-tags-input
                      id="leave_type"
                      v-model="form.leave_type.tag"
                      placeholder="Values"
                      :tags="form.leave_type.values"
                      @tags-changed="(newTags) => (form.leave_type.values = newTags)"
                      :class="{ error: $v.form.leave_type.values.$error }"
                      @input="$v.form.leave_type.values.$touch()"
                    />
                  </div>
                  <div v-if="$v.form.leave_type.values.$error">
                    <p v-if="!$v.form.leave_type.values.required" class="errorMsg">
                      Leave Types is required
                    </p>
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <div class="form-group">
                    <label for="loan_type">Loan Types</label>
                    <vue-tags-input
                      id="loan_type"
                      v-model="form.loan_type.tag"
                      placeholder="Values"
                      :tags="form.loan_type.values"
                      @tags-changed="(newTags) => (form.loan_type.values = newTags)"
                      :class="{ error: $v.form.loan_type.values.$error }"
                      @input="$v.form.loan_type.values.$touch()"
                    />
                  </div>
                  <div v-if="$v.form.loan_type.values.$error">
                    <p v-if="!$v.form.loan_type.values.required" class="errorMsg">
                      Loan Types is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <div class="form-group">
                    <label for="deduction_type">Deduction Types</label>
                    <vue-tags-input
                      id="deduction_type"
                      v-model="form.deduction_type.tag"
                      placeholder="Values"
                      :tags="form.deduction_type.values"
                      @tags-changed="(newTags) => (form.deduction_type.values = newTags)"
                      :class="{ error: $v.form.deduction_type.values.$error }"
                      @input="$v.form.deduction_type.values.$touch()"
                    />
                  </div>
                  <div v-if="$v.form.deduction_type.values.$error">
                    <p v-if="!$v.form.deduction_type.values.required" class="errorMsg">
                      Deduction Types is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <div class="form-group">
                    <label for="asset_type">Asset Types</label>
                    <vue-tags-input
                      id="asset_type"
                      v-model="form.asset_type.tag"
                      placeholder="Values"
                      :tags="form.asset_type.values"
                      @tags-changed="(newTags) => (form.asset_type.values = newTags)"
                      :class="{ error: $v.form.asset_type.values.$error }"
                      @input="$v.form.asset_type.values.$touch()"
                    />
                  </div>
                  <div v-if="$v.form.asset_type.values.$error">
                    <p v-if="!$v.form.asset_type.values.required" class="errorMsg">
                      Asset Types is required
                    </p>
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <div class="form-group">
                    <label for="award_type">Award Types</label>
                    <vue-tags-input
                      id="award_type"
                      v-model="form.award_type.tag"
                      placeholder="Values"
                      :tags="form.award_type.values"
                      @tags-changed="(newTags) => (form.award_type.values = newTags)"
                      :class="{ error: $v.form.award_type.values.$error }"
                      @input="$v.form.award_type.values.$touch()"
                    />
                  </div>
                  <div v-if="$v.form.award_type.values.$error">
                    <p v-if="!$v.form.award_type.values.required" class="errorMsg">
                      Award Types is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <div class="form-group">
                    <label for="termination_type">Termination Types</label>
                    <vue-tags-input
                      id="termination_type"
                      v-model="form.termination_type.tag"
                      placeholder="Values"
                      :tags="form.termination_type.values"
                      @tags-changed="
                        (newTags) => (form.termination_type.values = newTags)
                      "
                      :class="{ error: $v.form.termination_type.values.$error }"
                      @input="$v.form.termination_type.values.$touch()"
                    />
                  </div>
                  <div v-if="$v.form.termination_type.values.$error">
                    <p v-if="!$v.form.termination_type.values.required" class="errorMsg">
                      Termination Types is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <div class="form-group">
                    <label for="course_types">Course Types</label>
                    <vue-tags-input
                      id="course_types"
                      v-model="form.course_types.tag"
                      placeholder="Values"
                      :tags="form.course_types.values"
                      @tags-changed="(newTags) => (form.course_types.values = newTags)"
                      :class="{ error: $v.form.course_types.values.$error }"
                      @input="$v.form.course_types.values.$touch()"
                    />
                  </div>
                  <div v-if="$v.form.course_types.values.$error">
                    <p v-if="!$v.form.course_types.values.required" class="errorMsg">
                      Course Types is required
                    </p>
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <div class="form-group">
                    <label for="experiance_certifcate_types"
                      >Experiance Certifcate Types</label
                    >
                    <vue-tags-input
                      id="experiance_certifcate_types"
                      v-model="form.experiance_certifcate_types.tag"
                      placeholder="Values"
                      :tags="form.experiance_certifcate_types.values"
                      @tags-changed="
                        (newTags) => (form.experiance_certifcate_types.values = newTags)
                      "
                      :class="{
                        error: $v.form.experiance_certifcate_types.values.$error,
                      }"
                      @input="$v.form.experiance_certifcate_types.values.$touch()"
                    />
                  </div>

                  <div v-if="$v.form.experiance_certifcate_types.values.$error">
                    <p
                      v-if="!$v.form.experiance_certifcate_types.values.required"
                      class="errorMsg"
                    >
                      Experiance Certifcate Types is required
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
import { VueTagsInput } from "@johmun/vue-tags-input";
import Loader from "@/components/layouts/Loader";

export default {
  name: "HrSettingForm",
  components: { VueTagsInput, Loader },
  data: () => ({
    settingData: [],
    tag: "",
    form: {
      attendance_by: "",
      target_types: {
        tag: "",
        values: [],
      },
      expense_types: {
        tag: "",
        values: [],
      },
      license_type: {
        tag: "",
        values: [],
      },
      qualification_type: {
        tag: "",
        values: [],
      },
      periodic_type: {
        tag: "",
        values: [],
      },
      allowances_type: {
        tag: "",
        values: [],
      },
      leave_type: {
        tag: "",
        values: [],
      },
      loan_type: {
        tag: "",
        values: [],
      },
      deduction_type: {
        tag: "",
        values: [],
      },
      asset_type: {
        tag: "",
        values: [],
      },
      award_type: {
        tag: "",
        values: [],
      },
      termination_type: {
        tag: "",
        values: [],
      },
      course_types: {
        tag: "",
        values: [],
      },
      experiance_certifcate_types: {
        tag: "",
        values: [],
      },
      hr_branch_setting: "",
    },
    options: {
      attendance_by: [
        { value: "", label: "Choose Type", disabled: true, selected: "" },
        { value: "login", label: "By Login" },
        { value: "import", label: "By Import" },
      ],
      hr_branches: [
        { value: "", label: "Choose Type", disabled: true, selected: "" },
        { value: "head", label: "Head Branch" },
        { value: "individual", label: "Individual Branch" },
      ],
    },
  }),
  validations() {
    return {
      form: {
        attendance_by: { required },
        hr_branch_setting: { required },
        target_types: { values: { required } },
        expense_types: { values: { required } },
        license_type: { values: { required } },
        qualification_type: { values: { required } },
        periodic_type: { values: { required } },
        allowances_type: { values: { required } },
        leave_type: { values: { required } },
        loan_type: { values: { required } },
        deduction_type: { values: { required } },
        asset_type: { values: { required } },
        award_type: { values: { required } },
        termination_type: { values: { required } },
        course_types: { values: { required } },
        experiance_certifcate_types: { values: { required } },
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
          let data = JSON.stringify(
            this.form[key].values.map(function (item) {
              return item.text;
            })
          );
          this.settingData.push({ key: key, value: data, type: "hr" });
        } else {
          this.settingData.push({ key: key, value: this.form[key], type: "hr" });
        }
      }

      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.commit("set_loader");
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
            this.$store.commit("close_loader");
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
    getHrSetting() {
      this.$store.commit("set_loader");
      HrSettingService.getAll()
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
  },
};
</script>
