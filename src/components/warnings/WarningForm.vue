<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form @submit.prevent="isEditing ? updateWarning() : saveWarning()">
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
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Select Template"
                :options="options.template_type"
                :value.sync="form.template_type"
                @change="changeMethodSelect(form.template_type)"
              />
              <div v-if="$v.form.template_type.$error">
                <p v-if="!$v.form.template_type.required" class="errorMsg">
                  Template Type is required
                </p>
              </div>
            </CCol>
            <CCol sm="12" md="12">
              <vue-editor
                v-model="form.description"
                :class="{ error: $v.form.description.$error }"
                @input="$v.form.description.$touch()"
              ></vue-editor>
              <div v-if="$v.form.template_type.$error">
                <p v-if="!$v.form.template_type.required" class="errorMsg">
                  Descripton is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput label="Type" type="date" :value.sync="form.date" />
              <div v-if="$v.form.date.$error">
                <p v-if="!$v.form.date.required" class="errorMsg">Type is required</p>
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
import WarningService from "@/services/employees/EmployeeWarningService";
import LetterTemplateService from "@/services/letterTemplates/LetterTemplateService";
import HrSettingService from "@/services/settings/HrSettingService";
import { required } from "vuelidate/lib/validators";
import { VueEditor } from "vue2-editor";

export default {
  name: "WarningForm",
  components: {
    VueEditor,
  },
  data: () => ({
    isEditing: false,
    form: {
      id: "",
      // from_employee_id: "",
      to_employee_id: "",
      title: "",
      description: "",
      date: "",
      status: "",
      template_type: "",
    },
    empId: null,
    options: {
      status: [
        { value: "", label: "Choose Status", disabled: true, selected: "" },
        { value: "active", label: "Active" },
        { value: "inactive", label: "inActive" },
      ],
      template_type: [{ value: "", label: "Choose Template" }],
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
        description: { required },
        template_type: { required },
      },
    };
  },
  created() {
    this.form.id = this.$route.params.id;
    this.getOptions();
    this.getTemplateData();
    if (this.form.id !== "" && this.form.id !== undefined) {
      this.isEditing = true;
      this.getWarning();
    }
  },
  methods: {
    saveWarning() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.form.status = "active";
        let data = this.form;
        WarningService.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Warning Added Successfully",
                timer: 3600,
              });

              this.$v.$reset();
              this.resetForm();

              if (this.saveAndExit) {
                this.$router.push({ path: "/warnings/index" });
              } else {
                this.$router.push({ path: "/warnings/edit/" + res.data.uuid });
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
    updateWarning() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        WarningService.update(this.form.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Warning Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              // this.resetForm();

              if (this.saveAndExit) {
                this.$router.push({ path: "/warnings/index" });
              } else {
                this.$router.push({ path: "/warnings/edit/" + res.data.uuid });
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
    getTemplateData() {
      LetterTemplateService.getAll(0, 40)
        .then(({ data }) => {
          if (data != undefined && data != "") {
            let template = this.options.template_type;
            data.data.forEach((element) => {
              template.push({
                value: element.uuid,
                label: element.name,
              });
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeMethodSelect(uuid) {
      LetterTemplateService.get(uuid)
        .then(({ data }) => {
          if (data != undefined && data != "") {
            this.form.description = data.template;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getWarning() {
      WarningService.get(this.form.id)
        .then(({ data }) => {
          if (data != null && data != "") {
            this.isEditing = true;
            this.form.id = data.uuid;
            // this.form.from_employee_id = data.from_employee.uuid;
            this.form.to_employee_id = data.to_employee.uuid;
            this.form.title = data.title;
            this.form.description = data.description;
            this.form.date = data.date;
            this.form.status = data.status;
            this.form.template_type = "editing";
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
        .get("/employees-create", {
          headers: {
            "selected-branches": localStorage.getItem("selected_branches"),
          },
        })
        .then(({ data }) => {
          if (data != null && data != "") {
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
