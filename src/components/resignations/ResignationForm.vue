<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form @submit.prevent="isEditing ? updateResignation() : saveResignation()">
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
                label=" Resignation Date"
                type="date"
                v-model="form.resignation_date"
                :class="{ error: $v.form.resignation_date.$error }"
                @input="$v.form.resignation_date.$touch()"
              />
              <div v-if="$v.form.resignation_date.$error">
                <p v-if="!$v.form.resignation_date.required" class="errorMsg">
                  Resignation Date is required
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
          </CRow>
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label=" Notice Date"
                type="date"
                v-model="form.notice_date"
                :class="{ error: $v.form.notice_date.$error }"
                @input="$v.form.notice_date.$touch()"
              />
              <div v-if="$v.form.notice_date.$error">
                <p v-if="!$v.form.notice_date.required" class="errorMsg">
                  Notice Date is required
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
import ResignationService from "@/services/resignations/ResignationService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "ResignationForm",
  data: () => ({
    isEditing: false,
    saveAndExit: false,
    form: {
      id: null,
      employee_id: "",
      resignation_date: "",
      description: "",
      notice_date: "",
      status: "pending",
    },
    options: {
      employees: [{ value: "", label: "Choose Employee", disabled: true, selected: "" }],
      status: [
        { value: "", label: "Choose Status", disabled: true, selected: "" },
        { value: "pending", label: "Pending" },
        { value: "approved_by_hr", label: "Approved By HR" },
      ],
    },
  }),
  validations() {
    return {
      form: {
        employee_id: { required },
        resignation_date: { required },
        description: { required },
        notice_date: { required },
      },
    };
  },
  created() {
    this.form.id = this.$route.params.id;
    this.getAllEmployees();
    if (this.form.id !== "" && this.form.id !== undefined) {
      this.isEditing = true;
      this.getResignation();
    }
  },
  methods: {
    saveResignation() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        ResignationService.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Resignation Added Successfully",
                timer: 3600,
              });
              // this.$emit("employee-termination-update");
              this.$v.$reset();
              this.resetForm();

              if (this.saveAndExit) {
                this.$router.push({ path: "/resignations/index" });
              } else {
                this.$router.push({ path: "/resignations/edit/" + res.data.uuid });
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
    updateResignation() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        ResignationService.update(this.form.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Resignation Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              // this.$emit("employee-termination-update");
              if (this.saveAndExit) {
                this.$router.push({ path: "/resignations/index" });
              } else {
                this.$router.push({ path: "/resignations/edit/" + res.data.uuid });
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
    getResignation() {
      ResignationService.get(this.form.id)
        .then(({ data }) => {
          console.log(data);
          if (data != null && data != "") {
            this.isEditing = true;
            this.form.id = data.uuid;
            this.form.employee_id = data.employee.id;
            this.form.resignation_date = data.resignation_date;
            this.form.description = data.description;
            this.form.notice_date = data.notice_date;
            this.form.status = data.status;
          }
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
        });
    },
    getAllEmployees() {
      ResignationService.getAllEmployees()
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
