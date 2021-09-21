<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form @submit.prevent="isEditing ? updateEmployeeTarget() : saveEmployeeTarget()">
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
              <CSelect
                label="Type"
                :options="options.target_types"
                :value.sync="form.type"
              />
              <div v-if="$v.form.type.$error">
                <p v-if="!$v.form.type.required" class="errorMsg">Type is required</p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Repeat"
                :options="options.periodic_type"
                :value.sync="form.periodic"
              />
              <div v-if="$v.form.periodic.$error">
                <p v-if="!$v.form.periodic.required" class="errorMsg">
                  Periodic is required
                </p>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="6" md="6">
              <CTextarea label="Note" placeholder="Content..." v-model="form.detail" />
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
import EmployeeTargetService from "@/services/employees/EmployeeTargetService";
import HrSettingService from "@/services/settings/HrSettingService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "EmployeeTargetForm",
  data: () => ({
    isEditing: false,
    form: {
      id: null,
      employee_id: "",
      name: "",
      type: "",
      periodic: "",
      detail: "",
    },
    empId: null,
    options: {
      target_types: [{ value: "", label: "Choose Type", disabled: true, selected: "" }],
      periodic_type: [
        { value: "", label: "Choose repeat", disabled: true, selected: "" },
      ],
    },
  }),
  validations() {
    return {
      form: {
        name: { required },
        type: { required },
        periodic: { required },
      },
    };
  },
  created() {
    this.empId = this.$route.params.id;
    this.getOptions();
  },
  methods: {
    saveEmployeeTarget() {
      this.form.employee_id = this.$route.params.id;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        EmployeeTargetService.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Target Added Successfully",
                timer: 3600,
              });
              this.$emit("employee-target-update", {
                type: "create",
                data: res.data,
              });
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
    updateEmployeeTarget() {
      this.form.employee_id = this.$route.params.id;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        EmployeeTargetService.update(this.form.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Target Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.$emit("employee-target-update", {
                type: "edit",
                data: res.data,
              });
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
    getEmployeeTarget() {
      EmployeeTargetService.get(this.empId)
        .then(({ data }) => {
          if (data != null && data != "") {
            this.isEditing = true;
            this.form.id = data.uuid;
            this.form.employee_id = data.employee_id;
            this.form.name = data.name;
            this.form.type = data.type;
            this.form.periodic = data.periodic;
            this.form.detail = data.detail;
          }
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
        });
    },
    getOptions() {
      let ids = JSON.stringify(["target_types", "periodic_type"]);
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
      this.getEmployeeTarget();
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
