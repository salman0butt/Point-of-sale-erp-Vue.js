<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form @submit.prevent="isEditing ? updateJobCandidate() : saveJobCandidate()">
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Full Name"
                v-model="form.full_name"
                :class="{ error: $v.form.full_name.$error }"
                @input="$v.form.full_name.$touch()"
              />
              <div v-if="$v.form.full_name.$error">
                <p v-if="!$v.form.full_name.required" class="errorMsg">
                  Full Name is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Email"
                v-model="form.email"
                :class="{ error: $v.form.email.$error }"
                @input="$v.form.email.$touch()"
              />
              <div v-if="$v.form.email.$error">
                <p v-if="!$v.form.email.required" class="errorMsg">Email is required</p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Phone"
                v-model="form.phone"
                :class="{ error: $v.form.phone.$error }"
                @input="$v.form.phone.$touch()"
              />
              <div v-if="$v.form.phone.$error">
                <p v-if="!$v.form.phone.required" class="errorMsg">Phone is required</p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Address"
                v-model="form.address"
                :class="{ error: $v.form.address.$error }"
                @input="$v.form.address.$touch()"
              />
              <div v-if="$v.form.address.$error">
                <p v-if="!$v.form.address.required" class="errorMsg">
                  Address is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4">
              <CTextarea
                label="Cover Letter"
                placeholder="Content..."
                v-model="form.cover_letter"
                :class="{ error: $v.form.cover_letter.$error }"
                @input="$v.form.cover_letter.$touch()"
              />
              <div v-if="$v.form.cover_letter.$error">
                <p v-if="!$v.form.cover_letter.required" class="errorMsg">
                  Cover Letter is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Linkdin Profile"
                v-model="form.linkdin_profile"
                :class="{ error: $v.form.linkdin_profile.$error }"
                @input="$v.form.linkdin_profile.$touch()"
              />
              <div v-if="$v.form.linkdin_profile.$error">
                <p v-if="!$v.form.linkdin_profile.required" class="errorMsg">
                  Linkdin Profile is required
                </p>
              </div>
            </CCol>

            <CCol v-if="isEditing" sm="6" md="4" class="pt-2">
              <CSelect
                label="Status"
                :options="options.status"
                :value.sync="form.status"
              />
            </CCol>
          </CRow>
          <p v-if="$v.$anyError" class="errorMsg">Please Fill the required data</p>
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
              style="float: right; width: 140px; margin-left: 20px; margin-top: 0"
              @click="saveAndExit = true"
              type="submit"
              >Save & Exit</CButton
            >
          </CRow>
        </form>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import JobCandidateService from "@/services/recruitments/jobCandidates/JobCandidateService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "JobCandidateForm",
  data: () => ({
    isEditing: false,
    saveAndExit: false,
    form: {
      id: null,
      full_name: "",
      email: "",
      phone: "",
      address: "",
      cover_letter: "",
      linkdin_profile: "",
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
        full_name: { required },
        email: { required },
        phone: { required },
        address: { required },
        cover_letter: { required },
        linkdin_profile: { required },
      },
    };
  },
  created() {
    this.form.id = this.$route.params.id;
    if (this.form.id !== "" && this.form.id !== undefined) {
      this.isEditing = true;
      this.getJobCandidate();
    }
  },
  methods: {
    saveJobCandidate() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        JobCandidateService.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Job Category Added Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.resetForm();

              if (this.saveAndExit) {
                this.$router.push({ path: "/recruitment/jobCandidates/index" });
              } else {
                this.$router.push({
                  path: "/recruitment/jobCandidates/edit/" + res.data.uuid,
                });
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
    updateJobCandidate() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        JobCandidateService.update(this.form.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Job Category Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              // this.$emit("employee-transfer-update");
              if (this.saveAndExit) {
                this.$router.push({ path: "/recruitment/jobCandidates/index" });
              } else {
                this.$router.push({
                  path: "/recruitment/jobCandidates/edit/" + res.data.uuid,
                });
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
    getJobCandidate() {
      JobCandidateService.get(this.form.id)
        .then(({ data }) => {
          console.log(data);
          if (data != null && data != "") {
            this.isEditing = true;
            this.form.id = data.uuid;
            this.form.full_name = data.full_name;
            this.form.email = data.email;
            this.form.phone = data.phone;
            this.form.address = data.address;
            this.form.cover_letter = data.cover_letter;
            this.form.linkdin_profile = data.linkdin_profile;
            this.form.status = data.status;
          }
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
        });
    },
    resetForm() {
      for (let index in this.form) {
        this.form[index] = "";
      }
      this.isEditing = false;
    },
  },
};
</script>

<style>
.errorMsg {
  color: red;
}
</style>
