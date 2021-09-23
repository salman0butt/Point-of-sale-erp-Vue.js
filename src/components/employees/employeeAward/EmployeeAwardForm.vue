<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form @submit.prevent="isEditing ? updateEmployeeAward() : saveEmployeeAward()">
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Award"
                :options="options.awards"
                :value.sync="form.award_id"
                :class="{ error: $v.form.award_id.$error }"
                @input="$v.form.award_id.$touch()"
              />
              <div v-if="$v.form.award_id.$error">
                <p v-if="!$v.form.award_id.required" class="errorMsg">
                  Award is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Date"
                type="date"
                v-model="form.date"
                :class="{ error: $v.form.date.$error }"
                @input="$v.form.date.$touch()"
              />
              <div v-if="$v.form.date.$error">
                <p v-if="!$v.form.date.required" class="errorMsg">Date is required</p>
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
  </div>
</template>
<script>
import EmployeeAwardService from "@/services/employees/EmployeeAwardService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "EmployeeAwardForm",
  data: () => ({
    isEditing: false,
    form: {
      id: null,
      employee_id: "",
      award_id: "",
      date: "",
    },
    empId: null,
    options: {
      awards: [{ value: "", label: "Choose Award", disabled: true, selected: "" }],
    },
  }),
  validations() {
    return {
      form: {
        employee_id: { required },
        award_id: { required },
        date: { required },
      },
    };
  },
  created() {
    this.empId = this.$route.params.id;
    this.getAllAwards();
  },
  methods: {
    saveEmployeeAward() {
      this.form.employee_id = this.$route.params.id;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        EmployeeAwardService.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Award Added Successfully",
                timer: 3600,
              });
              this.$emit("employee-award-update");
              this.$v.$reset();
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
    updateEmployeeAward() {
      this.form.employee_id = this.$route.params.id;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        EmployeeAwardService.update(this.form.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Award Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.$emit("employee-award-update");
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
    getEmployeeAward() {
      EmployeeAwardService.get(this.empId)
        .then(({ data }) => {
          if (data != null && data != "") {
            this.isEditing = true;
            this.form.id = data.uuid;
            this.form.award_id = data.award.uuid;
            this.form.date = data.date;
          }
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
        });
    },
    getAllAwards() {
      EmployeeAwardService.getAllAwards()
        .then(({ data }) => {
          if (data != null && data != "") {
            let awards = this.options.awards;
            if (data.data) {
              data.data.map(function (val) {
                awards.push({ value: val.uuid, label: val.name });
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
        });
    },
    getEditData(uuid) {
      this.isEditing = true;
      this.empId = uuid;
      this.getEmployeeAward();
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
