<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form @submit.prevent="isEditing ? updateComplain() : saveComplain()">
          <CRow>
            <!-- <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Employee From"
                :options="options.employees"
                :value.sync="form.from_employee_id"
              />
              <div v-if="$v.form.from_employee_id.$error">
                <p v-if="!$v.form.from_employee_id.required" class="errorMsg">
                  Employee From is required
                </p>
              </div>
            </CCol> -->
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Employee To"
                :options="options.employees"
                :value.sync="form.to_employee_id"
              />
              <div v-if="$v.form.to_employee_id.$error">
                <p v-if="!$v.form.to_employee_id.required" class="errorMsg">
                  Employee To is required
                </p>
              </div>
            </CCol>
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
            <CCol sm="6" md="4">
              <CTextarea
                label="Note"
                placeholder="Content..."
                v-model="form.description"
              />
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput label="Date" type="date" :value.sync="form.date" />
              <div v-if="$v.form.date.$error">
                <p v-if="!$v.form.date.required" class="errorMsg">Date is required</p>
              </div>
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
import ComplainService from "@/services/employees/EmployeeComplainService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "ComplainForm",
  data: () => ({
    isEditing: false,
    form: {
      id: null,
      branch_id: "",
      // from_employee_id: "",
      to_employee_id: "",
      title: "",
      description: "",
      date: "",
    },
    empId: null,
    options: {
      branches: [{ value: "", label: "Choose Branch", disabled: true, selected: "" }],
      employees: [{ value: "", label: "Choose Employee", disabled: true, selected: "" }],
    },
  }),
  validations() {
    return {
      form: {
        // from_employee_id: { required },
        to_employee_id: { required },
        title: { required },
        date: { required },
      },
    };
  },
  created() {
    this.form.id = this.$route.params.id;
    this.getOptions();
    if (this.form.id !== "" && this.form.id !== undefined) {
      this.isEditing = true;
      this.getComplain();
    }
  },
  methods: {
    saveComplain() {
      this.form.branch_id = this.options.branches[1].value;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        ComplainService.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Complain Added Successfully",
                timer: 3600,
              });
              // this.$emit("employee-complain-update");
              this.$v.$reset();
              this.resetForm();

              if (this.saveAndExit) {
                this.$router.push({ path: "/complains/index" });
              } else {
                this.$router.push({ path: "/complains/edit/" + res.data.uuid });
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
    updateComplain() {
      this.form.branch_id = this.options.branches[1].value;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        ComplainService.update(this.form.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Complain Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              // this.$emit("employee-complain-update");
              // this.resetForm();

              if (this.saveAndExit) {
                this.$router.push({ path: "/complains/index" });
              } else {
                this.$router.push({ path: "/complains/edit/" + res.data.uuid });
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
    getComplain() {
      ComplainService.get(this.form.id)
        .then(({ data }) => {
          if (data != undefined && data != "") {
            this.isEditing = true;
            this.form.id = data.uuid;
            this.form.branch_id = data.branch.uuid;
            // this.form.from_employee_id = data.from_employee.uuid;
            this.form.to_employee_id = data.to_employee.uuid;
            this.form.title = data.title;
            this.form.description = data.description;
            this.form.date = data.date;
          }
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
        });
    },
    getOptions() {
      this.$http
        .get("/employees-create", {
          headers: {
            "selected-branches": localStorage.getItem("selected_branches"),
          },
        })
        .then(({ data }) => {
          if (data != undefined && data != "") {
            const branches = this.options.branches;
            const employees = this.options.employees;

            data.branches.map(function (val) {
              branches.push({ value: val.uuid, label: val.name.en });
            });
            if (data.employees) {
              data.employees.map(function (val) {
                employees.push({ value: val.uuid, label: val.full_name.en });
              });
            }
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

<style>
.errorMsg {
  color: red;
}
</style>
