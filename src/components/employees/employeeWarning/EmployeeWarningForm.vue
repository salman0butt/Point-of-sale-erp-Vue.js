<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form
          @submit.prevent="isEditing ? updateEmployeeWarning() : saveEmployeeWarning()"
        >
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
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
            </CCol>
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
              <CInput label="Type" type="date" :value.sync="form.date" />
              <div v-if="$v.form.date.$error">
                <p v-if="!$v.form.date.required" class="errorMsg">Type is required</p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Status"
                :options="options.status"
                :value.sync="form.status"
              />
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
import EmployeeWarningService from "@/services/employees/EmployeeWarningService";
import HrSettingService from "@/services/settings/HrSettingService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "EmployeeWarningForm",
  data: () => ({
    isEditing: false,
    form: {
      id: null,
      from_employee_id: "",
      to_employee_id: "",
      title: "",
      description: "",
      date: "",
      status: "",
    },
    empId: null,
    options: {
      status: [
        { value: "", label: "Choose Status", disabled: true, selected: "" },
        { value: "active", label: "Active" },
        { value: "inactive", label: "inActive" },
      ],
      employees: [{ value: "", label: "Choose Employee", disabled: true, selected: "" }],
    },
  }),
  validations() {
    return {
      form: {
        from_employee_id: { required },
        to_employee_id: { required },
        title: { required },
        date: { required },
      },
    };
  },
  created() {
    this.empId = this.$route.params.id;
    this.getOptions();
  },
  methods: {
    saveEmployeeWarning() {
      this.form.employee_id = this.$route.params.id;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        EmployeeWarningService.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Warning Added Successfully",
                timer: 3600,
              });
              this.$emit("employee-warning-update");
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
    updateEmployeeWarning() {
      this.form.employee_id = this.$route.params.id;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        EmployeeWarningService.update(this.form.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Warning Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.$emit("employee-warning-update");
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
    getEmployeeWarning() {
      EmployeeWarningService.get(this.empId)
        .then(({ data }) => {
          if (data != null && data != "") {
            console.log(data);
            this.isEditing = true;
            this.form.id = data.uuid;
            this.form.from_employee_id = data.from_employee.id;
            this.form.to_employee_id = data.to_employee.id;
            this.form.title = data.title;
            this.form.description = data.description;
            this.form.date = data.date;
            this.form.status = data.status;
            console.log(this.form);
          }
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
        });
    },
    getOptions() {
      let ids = JSON.stringify(["periodic_type"]);
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

      this.$http
        .get("/employees-create")
        .then(({ data }) => {
          if (data != null && data != "") {
            const employees = this.options.employees;

            data.employees.map(function (val) {
              employees.push({ value: val.id, label: val.full_name.en });
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getEditData(uuid) {
      this.isEditing = true;
      this.empId = uuid;
      this.getEmployeeWarning();
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
