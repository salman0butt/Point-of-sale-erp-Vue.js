<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>New Designation </CCardHeader>
          <CCardBody>
            <form @submit.prevent="saveDesignation">
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Designation Name"
                    v-model="form.name"
                    :class="{ error: $v.form.name.$error }"
                    @input="$v.form.name.$touch()"
                  />
                  <div v-if="$v.form.name.$error">
                    <p v-if="!$v.form.name.required" class="errorMsg">
                      Designation is required
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
                <!-- <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Status"
                    :options="options.status"
                    :value.sync="form.status"
                  />
                </CCol> -->
              </CRow>

              <p v-if="$v.$anyError" class="errorMsg">
                Please Fill the required data
              </p>
              <CRow class="mt-4">
                <!-- <CButton
                  progress
                  timeout="2000"
                  block
                  color="success"
                  style="float: right; width: 200px; margin-left: 20px"
                  type="submit"
                  @click="saveAndExit = false"
                  >Save & Continue</CButton
                > -->
                <CButton
                  timeout="2000"
                  block
                  color="success"
                  style="
                    float: right;
                    width: 140px;
                    margin-left: 20px;
                    margin-top: 0;
                  "
                  @click="saveAndExit = true"
                  type="submit"
                  >Save</CButton
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
import DesignationService from "@/services/designations/DesignationService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "CreateDesignation",
  data: () => ({
    saveAndExit: false,
    form: {
      name: "",
      descriptions: "",
      status: "active",
    },
    options: {
      status: [
        { value: "", label: "Choose Status", disabled: true, selected: "" },
        { value: "active", label: "Active" },
        { value: "inactive", label: "InActive" },
      ],
    },
  }),
  validations() {
    return {
      form: {
        name: { required },
      },
    };
  },
  methods: {
    saveDesignation() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        DesignationService.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Designation Created Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              if (this.saveAndExit) {
                this.$router.push({ path: "/designations/index" });
              } else {
                this.$router.push({
                  path: "/designations/edit/" + res.data.uuid,
                });
              }
            }
          })
          .catch((error) => {
            console.log(error);
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: "Something Went Wrong",
              timer: 3600,
            });
          });
      }
    },
  },
};
</script>

<style scoped>
.errorMsg {
  color: red;
}
</style>
