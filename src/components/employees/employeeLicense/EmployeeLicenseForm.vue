<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form
          @submit.prevent="isEditing ? updateEmployeeLicense() : saveEmployeeLicense()"
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
              <CSelect
                label="Type"
                :options="options.license_type"
                :value.sync="form.type"
              />
              <div v-if="$v.form.type.$error">
                <p v-if="!$v.form.type.required" class="errorMsg">Type is required</p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Issuance Date"
                type="date"
                v-model="form.issuance"
                :class="{ error: $v.form.issuance.$error }"
                @input="$v.form.issuance.$touch()"
              />
              <div v-if="$v.form.issuance.$error">
                <p v-if="!$v.form.issuance.required" class="errorMsg">
                  Issuance Date is required
                </p>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Expiry"
                type="date"
                v-model="form.expiry"
                :class="{ error: $v.form.expiry.$error }"
                @input="$v.form.expiry.$touch()"
              />
              <div v-if="$v.form.expiry.$error">
                <p v-if="!$v.form.expiry.required" class="errorMsg">Expiry is required</p>
              </div>
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
              >Save</CButton
            >
          </CRow>
        </form>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeLicenseService from "@/services/employees/EmployeeLicenseService";
import HrSettingService from "@/services/settings/HrSettingService";
import { required } from "vuelidate/lib/validators";
import AppUpload from "@/components/uploads/Upload.vue";
import { cilTrash, cisFile } from "@coreui/icons-pro";

export default {
  name: "EmployeeLicenseForm",
  components: {
    AppUpload,
  },
  cilTrash,
  cisFile,
  data: () => ({
    isEditing: false,
    form: {
      id: null,
      employee_id: "",
      name: "",
      type: "",
      issuance: "",
      expiry: "",
      documents: [],
    },
    display_documents: [],
    empId: null,
    options: {
      license_type: [{ value: "", label: "Choose Type", disabled: true, selected: "" }],
    },
  }),
  validations() {
    return {
      form: {
        name: { required },
        type: { required },
        issuance: { required },
        expiry: { required },
      },
    };
  },
  created() {
    this.empId = this.$route.params.id;
    this.getOptions();
  },
  methods: {
    saveEmployeeLicense() {
      this.form.employee_id = this.$route.params.id;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let formData = new FormData();
        formData.append("employee_id", this.form.employee_id);
        formData.append("name", this.form.name);
        formData.append("type", this.form.type);
        formData.append("issuance", this.form.issuance);
        formData.append("expiry", this.form.expiry);

        if (this.form.documents) {
          for (const i of Object.keys(this.form.documents)) {
            formData.append("documents[]", this.form.documents[i]);
          }
        }
        const config = {
          headers: { "Content-Type": "multipart/form-data" },
        };
        // let data = this.form;
        EmployeeLicenseService.create(formData, config)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "License Added Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.$emit("employeeLicenseCreated");
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
    updateEmployeeLicense() {
      this.form.employee_id = this.$route.params.id;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let formData = new FormData();
        formData.append("employee_id", this.form.employee_id);
        formData.append("name", this.form.name);
        formData.append("type", this.form.type);
        formData.append("issuance", this.form.issuance);
        formData.append("expiry", this.form.expiry);
        formData.append("_method", "PATCH");

        if (this.form.documents) {
          for (const i of Object.keys(this.form.documents)) {
            formData.append("documents[]", this.form.documents[i]);
          }
        }
        const config = {
          headers: { "Content-Type": "multipart/form-data" },
        };
        // let data = this.form;
        EmployeeLicenseService.update(this.form.id, formData, config)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "License Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.$emit("employeeLicenseCreated");
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
    getEmployeeLicense() {
      EmployeeLicenseService.get(this.empId)
        .then(({ data }) => {
          if (data != null && data != "") {
            this.isEditing = true;
            this.form.id = data.uuid;
            this.form.employee_id = data.employee_id;
            this.form.name = data.name;
            this.form.type = data.type;
            this.form.issuance = data.issuance;
            this.form.expiry = data.expiry;

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
    getOptions() {
      let ids = JSON.stringify(["license_type"]);
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
      this.getEmployeeLicense();
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
