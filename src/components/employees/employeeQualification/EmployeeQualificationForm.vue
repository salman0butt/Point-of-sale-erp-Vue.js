<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form
          @submit.prevent="
            isEditing
              ? updateEmployeeQualification()
              : saveEmployeeQualification()
          "
        >
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Name"
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
                label="Education Type"
                :options="options.qualification_type"
                :value.sync="form.type"
              />
              <div v-if="$v.form.type.$error">
                <p v-if="!$v.form.type.required" class="errorMsg">
                  Type is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Organization"
                v-model="form.organization"
                :class="{ error: $v.form.organization.$error }"
                @input="$v.form.organization.$touch()"
              />
              <div v-if="$v.form.organization.$error">
                <p v-if="!$v.form.organization.required" class="errorMsg">
                  Organization is required
                </p>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Marks/CGPA Obtained"
                type="number"
                step="any"
                v-model="form.marks_obtained"
                :class="{ error: $v.form.marks_obtained.$error }"
                @input="$v.form.marks_obtained.$touch()"
              />
              <div v-if="$v.form.marks_obtained.$error">
                <p v-if="!$v.form.marks_obtained.required" class="errorMsg">
                  Marks Obtanined is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Total Marks/CGPA"
                type="number"
                step="any"
                v-model="form.total_marks"
                :class="{ error: $v.form.total_marks.$error }"
                @input="$v.form.total_marks.$touch()"
              />
              <div v-if="$v.form.total_marks.$error">
                <p v-if="!$v.form.total_marks.required" class="errorMsg">
                  Total Marks are required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Percentage Obtained"
                type="number"
                step="any"
                v-model="form.percentage"
                :class="{ error: $v.form.percentage.$error }"
                @input="$v.form.percentage.$touch()"
              />
              <div v-if="$v.form.percentage.$error">
                <p v-if="!$v.form.percentage.required" class="errorMsg">
                  percentage is required
                </p>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Graduation Year"
                :options="options.year"
                :value.sync="form.year"
              />
              <div v-if="$v.form.year.$error">
                <p v-if="!$v.form.year.required" class="errorMsg">
                  Year is required
                </p>
              </div>
            </CCol>
          </CRow>

          <p v-if="$v.$anyError" class="errorMsg">
            Please Fill the required data
          </p>
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
  </div>
</template>
<script>
import EmployeeQualificationService from "@/services/employees/EmployeeQualificationService";
import HrSettingService from "@/services/settings/HrSettingService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "EmployeeQualificationForm",
  data: () => ({
    isEditing: false,
    form: {
      id: null,
      employee_id: "",
      name: "",
      type: "",
      organization: "",
      percentage: "",
      marks_obtained: "",
      total_marks: "",
      year: "",
    },
    empId: null,
    options: {
      qualification_type: [
        { value: "", label: "Choose Type", disabled: true, selected: "" },
      ],
      year: [{ value: "", label: "Choose Year" }],
    },
  }),
  validations() {
    return {
      form: {
        name: { required },
        type: { required },
        organization: { required },
        percentage: { required },
        marks_obtained: { required },
        total_marks: { required },
        year: { required },
      },
    };
  },
  created() {
    this.empId = this.$route.params.id;
    this.generateArrayOfYears();
    this.getOptions();
  },
  methods: {
    saveEmployeeQualification() {
      this.form.employee_id = this.$route.params.id;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        EmployeeQualificationService.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Qualification Added Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.$emit("employeeQualificationCreated");
              this.resetForm();
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
    updateEmployeeQualification() {
      this.form.employee_id = this.$route.params.id;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        EmployeeQualificationService.update(this.form.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Qualification Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.$emit("employeeQualificationCreated");
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
    getEmployeeQualification() {
      EmployeeQualificationService.get(this.empId)
        .then(({ data }) => {
          if (data != null && data != "") {
            this.isEditing = true;
            this.form.id = data.uuid;
            this.form.employee_id = data.employee_id;
            this.form.name = data.name;
            this.form.type = data.type;
            this.form.organization = data.organization;
            this.form.percentage = data.percentage;
            this.form.total_marks = data.total_marks;
            this.form.marks_obtained = data.marks_obtained;
            this.form.year = parseInt(data.year);
          }
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
        });
    },
    generateArrayOfYears() {
      let max = new Date().getFullYear();
      let min = max - 30;
      for (let i = max; i >= min; i--) {
        this.options.year.push(i);
      }
    },
    getOptions() {
      let ids = JSON.stringify(["qualification_type"]);
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
    getEditData(uuid) {
      this.isEditing = true;
      this.empId = uuid;
      this.getEmployeeQualification();
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
