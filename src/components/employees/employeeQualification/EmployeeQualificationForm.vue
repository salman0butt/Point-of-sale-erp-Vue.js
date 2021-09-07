<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form
          @submit.prevent="
            isEditing ? updateEmployeeQualification() : saveEmployeeQualification()
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
                <p v-if="!$v.form.name.required" class="errorMsg">Name is required</p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect label="Type" :options="options.type" :value.sync="form.type" />
              <div v-if="$v.form.type.$error">
                <p v-if="!$v.form.type.required" class="errorMsg">Type is required</p>
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
                label="Marks"
                type="number"
                v-model="form.marks"
                :class="{ error: $v.form.marks.$error }"
                @input="$v.form.marks.$touch()"
              />
              <div v-if="$v.form.marks.$error">
                <p v-if="!$v.form.marks.required" class="errorMsg">Marks is required</p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect label="Year" :options="options.year" :value.sync="form.year" />
              <div v-if="$v.form.year.$error">
                <p v-if="!$v.form.year.required" class="errorMsg">Year is required</p>
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
              :disabled="$v.$invalid"
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
      marks: "",
      year: "",
    },
    empId: null,
    options: {
      type: [
        { value: "", label: "Choose Type" },
        { value: "metric", label: "Metric" },
        { value: "inter", label: "Inter-mediate" },
        { value: "bachler", label: "Bachlors" },
        { value: "master", label: "Masters" },
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
        marks: { required },
        year: { required },
      },
    };
  },
  created() {
    this.empId = this.empId = this.$route.params.id;
    this.generateArrayOfYears();
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
          this.isEditing = true;
          this.form.id = data.uuid;
          this.form.employee_id = data.employee_id;
          this.form.name = data.name;
          this.form.type = data.type;
          this.form.organization = data.organization;
          this.form.marks = data.marks;
          this.form.year = data.year;
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
        });
    },
    generateArrayOfYears() {
      let max = new Date().getFullYear();
      let min = max - 15;
      for (let i = max; i >= min; i--) {
        this.options.year.push(i);
      }
    },
    getEditData(uuid) {
      this.isEditing = true;
      this.empId = uuid;
      this.getEmployeeQualification();
    },
    resetForm() {
      this.form.name = "";
      this.form.type = "";
      this.form.organization = "";
      this.form.marks = "";
      this.form.year = "";
    },
  },
};
</script>

<style>
.errorMsg {
  color: red;
}
</style>
