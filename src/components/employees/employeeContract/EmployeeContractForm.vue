<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form
          @submit.prevent="isEditing ? updateEmployeeContract() : saveEmployeeContract()"
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
                <p v-if="!$v.form.name.required" class="errorMsg">Name is required</p>
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

          <CRow>
            <CCol sm="12" md="12" class="pt-2">
              <app-upload ref="fileUpload" @file:changed="handleFile" />

              <div class="attachment-display">
                <ul v-if="isEditing && display_documents">
                  <li
                    v-for="(doc, index) in display_documents"
                    v-bind:key="index"
                    class="display-attachment-row"
                  >
                    <CIcon :content="$options.cisFile" />
                    <a v-bind:href="doc.path" target="_blank" class="name-attachment">
                      {{ doc.name }}</a
                    >
                    <a
                      @click.prevent="deleteAttachment(doc.uuid)"
                      class="delete-attachment"
                    >
                      <CIcon :content="$options.cilTrash" />
                    </a>
                  </li>
                </ul>
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
              :disabled="loading"
              >{{ loading ? "loading..." : "Save" }}</CButton
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
import AppUpload from "@/components/uploads/Upload.vue";
import { cilTrash, cisFile } from "@coreui/icons-pro";

import { required } from "vuelidate/lib/validators";

export default {
  name: "EmployeeContractForm",
  cilTrash,
  cisFile,
  components: {
    VueEditor,
    AppUpload,
  },
  data: () => ({
    isEditing: false,
    form: {
      employee_id: "",
      name: "",
      template_type: "",
      template: "",
      documents: [],
    },
    display_documents: [],
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
  computed: {
    loading() {
      return this.$store.state.loading;
    },
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
        let formData = new FormData();
        formData.append("employee_id", this.form.employee_id);
        formData.append("name", this.form.name);
        formData.append("template_type", this.form.template_type);
        formData.append("template", this.form.template);

        if (this.form.documents) {
          for (const i of Object.keys(this.form.documents)) {
            formData.append("documents[]", this.form.documents[i]);
          }
        }

        const config = {
          headers: { "Content-Type": "multipart/form-data" },
        };
        this.$store.commit("set_loader");
        // let data = this.form;
        EmployeeContractService.create(formData, config)
          .then((res) => {
            if (res.status == 201) {
              this.$store.commit("close_loader");
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
            this.$store.commit("close_loader");
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
      let formData = new FormData();
      formData.append("employee_id", this.form.employee_id);
      formData.append("name", this.form.name);
      formData.append("template_type", this.form.template_type);
      formData.append("template", this.form.template);
      formData.append("_method", "PATCH");

      if (this.form.documents) {
        for (const i of Object.keys(this.form.documents)) {
          formData.append("documents[]", this.form.documents[i]);
        }
      }

      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      this.$store.commit("set_loader");
      // let data = this.form;
      EmployeeContractService.update(this.form.id, formData, config)
        .then((res) => {
          if (res.status == 200) {
            this.$store.commit("close_loader");
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
          this.$store.commit("close_loader");
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

            if (data.documents) {
              this.display_documents = [];
              let display_docs = this.display_documents;
              data.documents.map(function (item) {
                display_docs.push(item);
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
        });
    },
    handleFile(files) {
      this.form.documents = Object.values(files);
    },
    deleteAttachment(uuid) {
      this.$swal
        .fire({
          title: "Do you want to delete this Attachment",
          text: "This will be Deleted from Database",
          showCancelButton: true,
          confirmButtonColor: "#e55353",
          confirmButtonText: "Yes, remove it it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$store
              .dispatch("deleteAttachment", uuid)
              .then((res) => {
                if (res.status == 200) {
                  this.$swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Attachment Deleted Successfully",
                    timer: 3600,
                  });
                  this.display_documents = this.display_documents.filter(
                    (item) => item.uuid != uuid
                  );
                }
              })
              .catch((err) => {
                this.$swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Something went Wrong",
                  timer: 3600,
                });
                console.log(err);
              });
          }
        });
    },
    getEditData(uuid) {
      this.isEditing = true;
      this.empId = uuid;
      this.getEmployeeContract();
    },
    resetForm() {
      for (let index in this.form) {
        if (index === "documents") {
          this.form[index] = [];
        } else {
          this.form[index] = "";
        }
      }
      this.display_documents = [];
      this.isEditing = false;
      this.$refs.fileUpload.reset();
    },
  },
};
</script>

<style>
.errorMsg {
  color: red;
}
</style>
