<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form
          @submit.prevent="
            isEditing ? updateEmployeeContract() : saveEmployeeContract()
          "
        >
          <CRow>
            <CCol sm="6" md="6" class="pt-2">
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
          </CRow>
          <CRow>
            <CCol sm="6" md="12">
              <vue-editor v-model="form.template"></vue-editor>
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
import EmployeeContractService from "@/services/employees/EmployeeContractService";
import LetterTemplateService from "@/services/letterTemplates/LetterTemplateService";
import { VueEditor } from "vue2-editor";

import { required } from "vuelidate/lib/validators";

export default {
  name: "EmployeeContractForm",
  components: {
    VueEditor,
  },
  data: () => ({
    isEditing: false,
    form: {
      name: "",
      template_type: "",
      template: "",
    },
    options: {
      template_type: [
        { value: "", label: "Choose Template", disabled: true, selected: "" },
      ],
    },
    empId: null,
  }),
  validations() {
    return {
      form: {
        name: { required },
        template_type: { required },
        template: { required },
      },
    };
  },
  created() {
    this.empId = this.$route.params.id;
    this.getData();
  },
  methods: {
    getData() {
      LetterTemplateService.getAll(0, 40)
        .then(({ data }) => {
          let template = this.options.template_type;
          data.data.forEach((element) => {
            template.push({
              value: element.uuid,
              label: element.name,
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeMethodSelect(uuid) {
      LetterTemplateService.get(uuid)
        .then(({ data }) => {
          this.form.template = data.template;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    saveEmployeeContract() {
      this.form.employee_id = this.$route.params.id;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        EmployeeContractService.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Contract Added Successfully",
                timer: 3600,
              });
              this.$emit("employee-contract-update", {
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
    updateEmployeeContract() {
      this.form.employee_id = this.$route.params.id;
      let data = this.form;
      EmployeeContractService.update(this.form.id, data)
        .then((res) => {
          if (res.status == 200) {
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Contract Updated Successfully",
              timer: 3600,
            });
            this.$v.$reset();
            this.$emit("employee-contract-update", {
              type: "edit",
              data: res.data,
            });
          }
        })
        .catch((error) => {
          this.$swal.fire({
            icon: "error",
            title: "Error",
            text: "Something Went Wrong.",
            timer: 3600,
          });
        });
    },
    getEmployeeContract() {
      EmployeeContractService.get(this.empId)
        .then(({ data }) => {
          if (data != null && data != "") {
            this.isEditing = true;
            this.form.id = data.uuid;
            this.form.employee_id = data.employee_id;
            this.form.name = data.name;
            this.form.template = data.template;
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
      this.getEmployeeContract();
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
