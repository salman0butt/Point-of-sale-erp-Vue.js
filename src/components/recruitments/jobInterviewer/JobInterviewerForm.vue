<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form @submit.prevent="isEditing ? updateJobInterviewer() : saveJobInterviewer()">
          <CRow>
            <CCol sm="12" md="12" class="pt-2">
              <CSelect
                label="Employee"
                :options="options.employees"
                :value.sync="form.employee_id"
                @change="employeeSelected()"
              />
              <p class="text-center">OR</p>
              <hr />
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Name"
                v-model="form.name"
                :class="{ error: $v.form.name.$error }"
                @input="$v.form.name.$touch()"
              />
              <div v-if="$v.form.name.$error">
                <p v-if="!$v.form.name.required" class="errorMsg">Name is required</p>
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
import JobInterviewerService from "@/services/recruitments/jobInterviewer/JobInterviewerService";
import { required } from "vuelidate/lib/validators";
import EmployeeService from "@/services/employees/EmployeeService";

export default {
  name: "JobInterviewerForm",
  data: () => ({
    isEditing: false,
    saveAndExit: false,
    form: {
      id: null,
      name: "",
      email: "",
      phone: "",
      address: "",
      description: "",
      status: "active",
    },
    options: {
      status: [
        { value: "", label: "Choose Status", disabled: true, selected: "" },
        { value: "active", label: "Active" },
        { value: "inactive", label: "InActive" },
      ],
      employees: [{ value: "", label: "Choose Employee", disabled: true, selected: "" }],
    },
  }),
  validations() {
    return {
      form: {
        name: { required },
        email: { required },
        phone: { required },
        address: { required },
        description: { required },
      },
    };
  },
  created() {
    this.form.id = this.$route.params.id;
    this.getAllEmployees();
    if (this.form.id !== "" && this.form.id !== undefined) {
      this.isEditing = true;
      this.getJobInterviewer();
    }
  },
  methods: {
    saveJobInterviewer() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        JobInterviewerService.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Job Interviewer Added Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.resetForm();

              if (this.saveAndExit) {
                this.$router.push({ path: "/recruitment/jobInterviewers/index" });
              } else {
                this.$router.push({
                  path: "/recruitment/jobInterviewers/edit/" + res.data.uuid,
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
    updateJobInterviewer() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        JobInterviewerService.update(this.form.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Job Interviewer Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              if (this.saveAndExit) {
                this.$router.push({ path: "/recruitment/jobInterviewers/index" });
              } else {
                this.$router.push({
                  path: "/recruitment/jobInterviewers/edit/" + res.data.uuid,
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
    getJobInterviewer() {
      JobInterviewerService.get(this.form.id)
        .then(({ data }) => {
          console.log(data);
          if (data != null && data != "") {
            this.isEditing = true;
            this.form.id = data.uuid;
            this.form.name = data.name;
            this.form.email = data.email;
            this.form.phone = data.phone;
            this.form.address = data.address;
            this.form.description = data.description;
            this.form.status = data.status;
          }
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
        });
    },
    getAllEmployees() {
      this.$http
        .get("/employees-create", {
      headers: {
        "selected-branches": localStorage.getItem("selected_branches"),
      }
    })
        .then(({ data }) => {
          if (data != undefined && data != "") {
            const employees = this.options.employees;

            data.employees.map(function (val) {
              employees.push({ value: val.uuid, label: val.full_name.en });
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    employeeSelected() {
      EmployeeService.get(this.form.employee_id)
        .then(({ data }) => {
          if (data != undefined && data != "") {
            this.form.name = data.full_name;
            this.form.email = data.email;
            this.form.phone = data.phone_number;
          }
        })
        .catch((error) => {
          console.log(error);
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
