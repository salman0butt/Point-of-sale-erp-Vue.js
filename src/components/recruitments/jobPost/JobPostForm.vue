<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form @submit.prevent="isEditing ? updateJobPost() : saveJobPost()">
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Title"
                v-model="form.title"
                :class="{ error: $v.form.title.$error }"
                @input="$v.form.title.$touch()"
              />
              <div v-if="$v.form.title.$error">
                <p v-if="!$v.form.title.required" class="errorMsg">Title is required</p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Job Type"
                :options="options.job_types"
                :value.sync="form.job_type"
                :class="{ error: $v.form.job_type.$error }"
                @input="$v.form.job_type.$touch()"
              />
              <div v-if="$v.form.job_type.$error">
                <p v-if="!$v.form.job_type.required" class="errorMsg">
                  Job Type is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="No of Vacancy"
                type="number"
                v-model="form.no_of_vacancy"
                :class="{ error: $v.form.no_of_vacancy.$error }"
                @input="$v.form.no_of_vacancy.$touch()"
              />
              <div v-if="$v.form.no_of_vacancy.$error">
                <p v-if="!$v.form.no_of_vacancy.required" class="errorMsg">
                  No of Vacancy is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Gender"
                :options="options.genders"
                :value.sync="form.gender"
                :class="{ error: $v.form.gender.$error }"
                @input="$v.form.gender.$touch()"
              />
              <div v-if="$v.form.gender.$error">
                <p v-if="!$v.form.gender.required" class="errorMsg">Gender is required</p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Date of Closing"
                type="date"
                v-model="form.date_of_closing"
                :class="{ error: $v.form.date_of_closing.$error }"
                @input="$v.form.date_of_closing.$touch()"
              />
              <div v-if="$v.form.date_of_closing.$error">
                <p v-if="!$v.form.date_of_closing.required" class="errorMsg">
                  Date of Closing is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Job Category"
                :options="options.job_categories"
                :value.sync="form.job_category_id"
                :class="{ error: $v.form.job_category_id.$error }"
                @input="$v.form.job_category_id.$touch()"
              />
              <div v-if="$v.form.job_category_id.$error">
                <p v-if="!$v.form.job_category_id.required" class="errorMsg">
                  Job Category is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Experiance"
                :options="options.experiance"
                :value.sync="form.experiance"
                :class="{ error: $v.form.experiance.$error }"
                @input="$v.form.experiance.$touch()"
              />
              <div v-if="$v.form.experiance.$error">
                <p v-if="!$v.form.experiance.required" class="errorMsg">
                  Experiance is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Is Featured"
                :options="options.is_featured"
                :value.sync="form.is_featured"
              />
            </CCol>
            <CCol sm="6" md="4">
              <CTextarea
                label="Short Description"
                placeholder="Content..."
                v-model="form.short_description"
                :class="{ error: $v.form.short_description.$error }"
                @input="$v.form.short_description.$touch()"
              />
              <div v-if="$v.form.short_description.$error">
                <p v-if="!$v.form.short_description.required" class="errorMsg">
                  Short Description is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4">
              <CTextarea
                label="Long Description"
                placeholder="Content..."
                v-model="form.long_description"
                :class="{ error: $v.form.long_description.$error }"
                @input="$v.form.long_description.$touch()"
              />
              <div v-if="$v.form.long_description.$error">
                <p v-if="!$v.form.long_description.required" class="errorMsg">
                  Long Description is required
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
import JobPostService from "@/services/recruitments/jobPost/JobPostService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "JobPostForm",
  data: () => ({
    isEditing: false,
    saveAndExit: false,
    form: {
      id: null,
      title: "",
      job_type: "",
      no_of_vacancy: "",
      job_category_id: "",
      date_of_closing: "",
      gender: "",
      experiance: "",
      is_featured: "no",
      short_description: "",
      long_description: "",
      status: "active",
    },
    options: {
      status: [
        { value: "", label: "Choose Status", disabled: true, selected: "" },
        { value: "active", label: "Active" },
        { value: "inactive", label: "InActive" },
      ],
      is_featured: [
        { value: "", label: "Choose Featured", disabled: true, selected: "" },
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
      job_types: [
        { value: "", label: "Choose Job Type", disabled: true, selected: "" },
        { value: "full time", label: "Full Time" },
        { value: "part time", label: "Part time" },
        { value: "outsource", label: "Outsource" },
      ],
      genders: [
        { value: "", label: "Choose Gender", disabled: true, selected: "" },
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
      ],
      job_categories: [
        { value: "", label: "Choose Category", disabled: true, selected: "" },
      ],
      experiance: [
        { value: "", label: "Choose Experiance", disabled: true, selected: "" },
      ],
    },
  }),
  validations() {
    return {
      form: {
        title: { required },
        job_type: { required },
        no_of_vacancy: { required },
        job_category_id: { required },
        date_of_closing: { required },
        gender: { required },
        experiance: { required },
        short_description: { required },
        long_description: { required },
      },
    };
  },
  created() {
    this.form.id = this.$route.params.id;
    this.getOptions();
    this.generateArrayOfExperiance();
    if (this.form.id !== "" && this.form.id !== undefined) {
      this.isEditing = true;
      this.getJobPost();
    }
  },
  methods: {
    saveJobPost() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        JobPostService.create(data)
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
                this.$router.push({ path: "/recruitment/jobPosts/index" });
              } else {
                this.$router.push({
                  path: "/recruitment/jobPosts/edit/" + res.data.uuid,
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
    updateJobPost() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        JobPostService.update(this.form.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Job Category Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();

              if (this.saveAndExit) {
                this.$router.push({ path: "/recruitment/jobPosts/index" });
              } else {
                this.$router.push({
                  path: "/recruitment/jobPosts/edit/" + res.data.uuid,
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
    getJobPost() {
      JobPostService.get(this.form.id)
        .then(({ data }) => {
          console.log(data);
          if (data != null && data != "") {
            this.isEditing = true;
            this.form.id = data.uuid;
            this.form.title = data.title;
            this.form.job_type = data.job_type;
            this.form.no_of_vacancy = data.no_of_vacancy;
            this.form.job_category_id = data.job_category.uuid;
            this.form.date_of_closing = data.date_of_closing;
            this.form.gender = data.gender;
            this.form.experiance = data.experiance;
            this.form.is_featured = data.is_featured;
            this.form.short_description = data.short_description;
            this.form.long_description = data.long_description;
            this.form.status = data.status;
          }
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
        });
    },
    getOptions() {
      JobPostService.getAllJobCategories()
        .then(({ data }) => {
          if (data != undefined && data != "") {
            const job_categories = this.options.job_categories;

            if (data) {
              data.map(function (val) {
                job_categories.push({ value: val.uuid, label: val.name });
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    generateArrayOfExperiance() {
      for (let i = 0; i <= 10; i++) {
        this.options.experiance.push({ value: i + " Years", label: i + " Years" });
      }
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
