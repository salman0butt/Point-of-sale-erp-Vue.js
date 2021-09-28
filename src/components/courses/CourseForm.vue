<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form @submit.prevent="isEditing ? updateCourse() : saveCourse()">
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Employee"
                :options="options.employees"
                :value.sync="form.employee_id"
                :class="{ error: $v.form.employee_id.$error }"
                @input="$v.form.employee_id.$touch()"
              />
              <div v-if="$v.form.employee_id.$error">
                <p v-if="!$v.form.employee_id.required" class="errorMsg">
                  Employee is required
                </p>
              </div>
            </CCol>

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
              <CSelect
                label="Type"
                :options="options.course_types"
                :value.sync="form.type"
                :class="{ error: $v.form.type.$error }"
                @input="$v.form.type.$touch()"
              />
              <div v-if="$v.form.type.$error">
                <p v-if="!$v.form.type.required" class="errorMsg">Type is required</p>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Institution"
                v-model="form.institution"
                :class="{ error: $v.form.institution.$error }"
                @input="$v.form.institution.$touch()"
              />
              <div v-if="$v.form.institution.$error">
                <p v-if="!$v.form.institution.required" class="errorMsg">
                  Institution is required
                </p>
              </div>
            </CCol>

            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label=" Start Date"
                type="date"
                v-model="form.start_date"
                :class="{ error: $v.form.start_date.$error }"
                @input="$v.form.start_date.$touch()"
              />
              <div v-if="$v.form.start_date.$error">
                <p v-if="!$v.form.start_date.required" class="errorMsg">
                  Start Date is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="End Date"
                type="date"
                v-model="form.end_date"
                :class="{ error: $v.form.end_date.$error }"
                @input="$v.form.end_date.$touch()"
              />
              <div v-if="$v.form.end_date.$error">
                <p v-if="!$v.form.end_date.required" class="errorMsg">
                  End Date is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Total Amount"
                type="number"
                v-model="form.total_amount"
                :class="{ error: $v.form.total_amount.$error }"
                @input="$v.form.total_amount.$touch()"
              />
              <div v-if="$v.form.total_amount.$error">
                <p v-if="!$v.form.total_amount.required" class="errorMsg">
                  Total Amount is required
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
import CourseService from "@/services/courses/CourseService";
import HrSettingService from "@/services/settings/HrSettingService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "CourseForm",
  data: () => ({
    isEditing: false,
    saveAndExit: false,
    form: {
      id: null,
      employee_id: "",
      name: "",
      type: "",
      institution: "",
      start_date: "",
      end_date: "",
      total_amount: "",
      status: "",
    },
    options: {
      employees: [{ value: "", label: "Choose Employee", disabled: true, selected: "" }],
      course_types: [
        { value: "", label: "Choose Course Type", disabled: true, selected: "" },
      ],
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
        employee_id: { required },
        name: { required },
        type: { required },
        institution: { required },
        start_date: { required },
        end_date: { required },
        total_amount: { required },
      },
    };
  },
  created() {
    this.form.id = this.$route.params.id;
    this.getOptions();
    this.getAllEmployees();
    if (this.form.id !== "" && this.form.id !== undefined) {
      this.isEditing = true;
      this.getCourse();
    }
  },
  methods: {
    saveCourse() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        CourseService.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Course Added Successfully",
                timer: 3600,
              });
              // this.$emit("employee-course-update");
              this.$v.$reset();
              this.resetForm();

              if (this.saveAndExit) {
                this.$router.push({ path: "/courses/index" });
              } else {
                this.$router.push({ path: "/courses/edit/" + res.data.uuid });
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
    updateCourse() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        CourseService.update(this.form.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Course Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              // this.$emit("employee-course-update");
              if (this.saveAndExit) {
                this.$router.push({ path: "/courses/index" });
              } else {
                this.$router.push({ path: "/courses/edit/" + res.data.uuid });
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
    getCourse() {
      CourseService.get(this.form.id)
        .then(({ data }) => {
          if (data != null && data != "") {
            this.isEditing = true;
            this.form.id = data.uuid;
            this.form.employee_id = data.employee.uuid;
            this.form.name = data.name;
            this.form.type = data.type;
            this.form.institution = data.institution;
            this.form.start_date = data.start_date;
            this.form.end_date = data.end_date;
            this.form.total_amount = data.total_amount;
            this.form.status = data.status;
          }
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
        });
    },
    getOptions() {
      let ids = JSON.stringify(["course_types"]);
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
    getAllEmployees() {
      CourseService.getAllEmployees()
        .then(({ data }) => {
          if (data != null && data != "") {
            let employees = this.options.employees;
            if (data.data) {
              data.data.map(function (val) {
                employees.push({ value: val.uuid, label: val.full_name });
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
