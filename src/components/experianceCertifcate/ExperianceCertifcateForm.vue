<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form
          @submit.prevent="
            isEditing ? updateExperianceCertifcate() : saveExperianceCertifcate()
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
              <CSelect
                label="Type"
                :options="options.experiance_certifcate_types"
                :value.sync="form.type"
                :class="{ error: $v.form.type.$error }"
                @input="$v.form.type.$touch()"
              />
              <div v-if="$v.form.type.$error">
                <p v-if="!$v.form.type.required" class="errorMsg">Type is required</p>
              </div>
            </CCol>

            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="From Date"
                type="date"
                v-model="form.from_date"
                :class="{ error: $v.form.from_date.$error }"
                @input="$v.form.from_date.$touch()"
              />
              <div v-if="$v.form.from_date.$error">
                <p v-if="!$v.form.from_date.required" class="errorMsg">
                  From Date is required
                </p>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="To Date"
                type="date"
                v-model="form.to_date"
                :class="{ error: $v.form.to_date.$error }"
                @input="$v.form.to_date.$touch()"
              />
              <div v-if="$v.form.to_date.$error">
                <p v-if="!$v.form.to_date.required" class="errorMsg">
                  To Date is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Status"
                :options="options.status"
                :value.sync="form.status"
              />
            </CCol>

            <CCol sm="6" md="4">
              <CTextarea
                label="Note"
                placeholder="Content..."
                v-model="form.description"
              />
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
import ExperianceCertifcateService from "@/services/experianceCertifcate/ExperianceCertifcateService";
import HrSettingService from "@/services/settings/HrSettingService";
import { required } from "vuelidate/lib/validators";
import AppUpload from "@/components/uploads/Upload.vue";
import { cilTrash, cisFile } from "@coreui/icons-pro";

export default {
  name: "ExperianceCertifcateForm",
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
      from_date: "",
      to_date: "",
      status: "",
      description: "",
      documents: [],
    },
    display_documents: [],
    empId: null,
    options: {
      experiance_certifcate_types: [
        { value: "", label: "Choose Type", disabled: true, selected: "" },
      ],
      status: [
        { value: "", label: "Choose Status", disabled: true, selected: "" },
        { value: "complete", label: "Complete" },
        { value: "in-process", label: "In Process" },
      ],
    },
  }),
  validations() {
    return {
      form: {
        employee_id: { required },
        name: { required },
        type: { required },
        from_date: { required },
        to_date: { required },
      },
    };
  },
  created() {
    this.empId = this.$route.params.id;
    this.getOptions();
  },
  methods: {
    saveExperianceCertifcate() {
      this.form.employee_id = this.$route.params.id;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let formData = new FormData();
        formData.append("employee_id", this.form.employee_id);
        formData.append("name", this.form.name);
        formData.append("type", this.form.type);
        formData.append("from_date", this.form.from_date);
        formData.append("to_date", this.form.to_date);
        formData.append("status", this.form.status);
        formData.append("description", this.form.description);

        if (this.form.documents) {
          for (const i of Object.keys(this.form.documents)) {
            formData.append("documents[]", this.form.documents[i]);
          }
        }

        const config = {
          headers: { "Content-Type": "multipart/form-data" },
        };
        // let data = this.form;
        ExperianceCertifcateService.create(formData, config)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Experiance Certifcate Added Successfully",
                timer: 3600,
              });
              this.$emit("employee-experiance-certifcate-update");
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
    updateExperianceCertifcate() {
      this.form.employee_id = this.$route.params.id;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let formData = new FormData();
        formData.append("employee_id", this.form.employee_id);
        formData.append("name", this.form.name);
        formData.append("type", this.form.type);
        formData.append("from_date", this.form.from_date);
        formData.append("to_date", this.form.to_date);
        formData.append("status", this.form.status);
        formData.append("description", this.form.description);
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
        ExperianceCertifcateService.update(this.form.id, formData, config)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Experiance Certifcate Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.$emit("employee-experiance-certifcate-update");
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
    getExperianceCertifcate() {
      ExperianceCertifcateService.get(this.empId)
        .then(({ data }) => {
          if (data != null && data != "") {
            this.isEditing = true;
            this.form.id = data.uuid;
            this.form.employee_id = data.employee.uuid;
            this.form.name = data.name;
            this.form.type = data.type;
            this.form.description = data.description;
            this.form.from_date = data.from_date;
            this.form.to_date = data.to_date;
            this.form.status = data.status;
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
      let ids = JSON.stringify(["experiance_certifcate_types"]);
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
      this.getExperianceCertifcate();
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
