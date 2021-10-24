<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>New Award </CCardHeader>
          <CCardBody>
            <form @submit.prevent="saveAwards">
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Award Name"
                    v-model="form.name"
                    :class="{ error: $v.form.name.$error }"
                    @input="$v.form.name.$touch()"
                  />
                  <div v-if="$v.form.name.$error">
                    <p v-if="!$v.form.name.required" class="errorMsg">
                      Name is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Type"
                    :options="options.award_type"
                    :value.sync="form.type"
                  />
                  <div v-if="$v.form.type.$error">
                    <p v-if="!$v.form.type.required" class="errorMsg">
                      Type is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CTextarea
                    label="Description"
                    placeholder="Content..."
                    :value.sync="form.description"
                  />
                </CCol>
              </CRow>

              <p v-if="$v.$anyError" class="errorMsg">
                Please Fill the required data
              </p>
              <CRow class="mt-4">
                <CButton
                  progress
                  timeout="2000"
                  block
                  color="success"
                  style="float: right; width: 200px; margin-left: 20px"
                  type="submit"
                  @click="saveAndExit = false"
                  >Save & Continue</CButton
                >

                <CButton
                  timeout="2000"
                  block
                  color="danger"
                  style="
                    float: right;
                    width: 140px;
                    margin-left: 20px;
                    margin-top: 0;
                  "
                  @click="saveAndExit = true"
                  type="submit"
                  >Save & Exit</CButton
                >
              </CRow>
            </form>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import AwardService from "@/services/awards/AwardService";
import HrSettingService from "@/services/settings/HrSettingService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "CreateAwards",
  data: () => ({
    saveAndExit: false,
    form: {
      name: "",
      type: "",
      description: "",
    },
    options: {
      award_type: [
        { value: "", label: "Choose Awards", disabled: true, selected: "" },
      ],
    },
  }),
  validations() {
    return {
      form: {
        name: { required },
        type: { required },
        description: { required },
      },
    };
  },
  created() {
    this.getOptions();
  },
  methods: {
    saveAwards() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        AwardService.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Awards Created Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              if (this.saveAndExit) {
                this.$router.push({ path: "/awards/index" });
              } else {
                this.$router.push({ path: "/awards/edit/" + res.data.uuid });
              }
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
    getOptions() {
      let ids = JSON.stringify(["award_type"]);
      HrSettingService.getSettings(ids)
        .then(({ data }) => {
          if (data != null && data != "") {
            const types = this.options;
            for (let index in data) {
              let arr = JSON.parse(data[index]);
              for (let i in arr) {
                if (types[index]) {
                  types[index].push({ value: arr[i], label: arr[i] });
                }
              }
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.errorMsg {
  color: red;
}
</style>
