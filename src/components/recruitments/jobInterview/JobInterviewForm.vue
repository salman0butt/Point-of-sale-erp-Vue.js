<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form @submit.prevent="isEditing ? updateJobInterview() : saveJobInterview()">
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Job Post"
                :options="options.job_posts"
                :value.sync="form.job_post_id"
                :class="{ error: $v.form.job_post_id.$error }"
                @input="$v.form.job_post_id.$touch()"
              />
              <div v-if="$v.form.job_post_id.$error">
                <p v-if="!$v.form.job_post_id.required" class="errorMsg">
                  Job Post is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Job Candidates"
                :options="options.job_candidates"
                :value.sync="form.job_candidate_id"
                :class="{ error: $v.form.job_candidate_id.$error }"
                @input="$v.form.job_candidate_id.$touch()"
              />
              <div v-if="$v.form.job_candidate_id.$error">
                <p v-if="!$v.form.job_candidate_id.required" class="errorMsg">
                  Job Candidates is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Job Interviewer"
                :options="options.job_interviewers"
                :value.sync="form.interviewer_id"
                :class="{ error: $v.form.interviewer_id.$error }"
                @input="$v.form.interviewer_id.$touch()"
              />
              <div v-if="$v.form.interviewer_id.$error">
                <p v-if="!$v.form.interviewer_id.required" class="errorMsg">
                  Job Interviewer is required
                </p>
              </div>
            </CCol>

            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Interview Place"
                v-model="form.interview_place"
                :class="{ error: $v.form.interview_place.$error }"
                @input="$v.form.interview_place.$touch()"
              />
              <div v-if="$v.form.interview_place.$error">
                <p v-if="!$v.form.interview_place.required" class="errorMsg">
                  Interview Place is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Interview Date"
                type="date"
                v-model="form.interview_date"
                :class="{ error: $v.form.interview_date.$error }"
                @input="$v.form.interview_date.$touch()"
              />
              <div v-if="$v.form.interview_date.$error">
                <p v-if="!$v.form.interview_date.required" class="errorMsg">
                  Interview Date is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Interview Time"
                type="time"
                v-model="form.interview_time"
                :class="{ error: $v.form.interview_time.$error }"
                @input="$v.form.interview_time.$touch()"
              />
              <div v-if="$v.form.interview_time.$error">
                <p v-if="!$v.form.interview_time.required" class="errorMsg">
                  Interview Time is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4">
              <CTextarea
                label="Description"
                placeholder="Content..."
                v-model="form.description"
                :class="{ error: $v.form.description.$error }"
                @input="$v.form.description.$touch()"
              />
              <div v-if="$v.form.description.$error">
                <p v-if="!$v.form.description.required" class="errorMsg">
                  Description is required
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
import JobInterviewService from "@/services/recruitments/jobInterview/JobInterviewService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "JobInterviewForm",
  data: () => ({
    isEditing: false,
    saveAndExit: false,
    form: {
      id: "",
      job_post_id: "",
      job_candidate_id: "",
      interviewer_id: "",
      interview_place: "",
      interview_date: "",
      interview_time: "",
      description: "",
      status: "active",
    },
    options: {
      status: [
        { value: "", label: "Choose Status", disabled: true, selected: "" },
        { value: "active", label: "Active" },
        { value: "inactive", label: "InActive" },
      ],
      job_posts: [{ value: "", label: "Choose Job Post", disabled: true, selected: "" }],
      job_candidates: [
        { value: "", label: "Choose Job Candidate", disabled: true, selected: "" },
      ],
      job_interviewers: [
        { value: "", label: "Choose Interviewer", disabled: true, selected: "" },
      ],
    },
  }),
  validations() {
    return {
      form: {
        job_post_id: { required },
        job_candidate_id: { required },
        interviewer_id: { required },
        interview_place: { required },
        interview_date: { required },
        interview_time: { required },
        description: { required },
      },
    };
  },
  created() {
    this.form.id = this.$route.params.id;
    this.getInterviewOptions();
    if (this.form.id !== "" && this.form.id !== undefined) {
      this.isEditing = true;
      this.getJobInterview();
    }
  },
  methods: {
    saveJobInterview() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        JobInterviewService.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Job Interview Added Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.resetForm();

              if (this.saveAndExit) {
                this.$router.push({ path: "/recruitment/jobInterviews/index" });
              } else {
                this.$router.push({
                  path: "/recruitment/jobInterviews/edit/" + res.data.uuid,
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
    updateJobInterview() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        JobInterviewService.update(this.form.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Job Interview Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              if (this.saveAndExit) {
                this.$router.push({ path: "/recruitment/jobInterviews/index" });
              } else {
                this.$router.push({
                  path: "/recruitment/jobInterviews/edit/" + res.data.uuid,
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
    getJobInterview() {
      JobInterviewService.get(this.form.id)
        .then(({ data }) => {
          console.log(data);
          if (data != undefined && data != "") {
            this.isEditing = true;
            this.form.id = data.uuid;
            this.form.job_post_id = data.job_post.uuid;
            this.form.job_candidate_id = data.job_candidate.uuid;
            this.form.interviewer_id = data.interviewer.uuid;
            this.form.interview_place = data.interview_place;
            this.form.interview_date = data.interview_date;
            this.form.interview_time = data.interview_time;
            this.form.description = data.description;
            this.form.status = data.status;
          }
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
        });
    },
    getInterviewOptions() {
      JobInterviewService.getInterviewOptions()
        .then(({ data }) => {
          console.log(data);
          if (data != undefined && data != "") {
            const job_posts = this.options.job_posts;
            const job_candidates = this.options.job_candidates;
            const job_interviewers = this.options.job_interviewers;
            if (data.posts) {
              data.posts.map(function (val) {
                job_posts.push({ value: val.uuid, label: val.title });
              });
            }
            if (data.candidates) {
              data.candidates.map(function (val) {
                job_candidates.push({ value: val.uuid, label: val.full_name });
              });
            }
            if (data.employees) {
              data.employees.map(function (val) {
                job_interviewers.push({ value: val.uuid, label: val.full_name });
              });
            }
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
