<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form
          @submit.prevent="
            isEditing ? updateEmployeeDeduction() : saveEmployeeDeduction()
          "
        >
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Name"
                :value.sync="form.name"
                :class="{ error: $v.form.name.$error }"
                @input="$v.form.name.$touch()"
              />
              <div v-if="$v.form.name.$error">
                <p v-if="!$v.form.name.required" class="errorMsg">Name is required</p>
              </div>
            </CCol>

            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Deduction Type"
                :options="options.deduction_type"
                :value.sync="form.type"
                :class="{ error: $v.form.type.$error }"
                @input="$v.form.type.$touch()"
              />
              <div v-if="$v.form.type.$error">
                <p v-if="!$v.form.type.required" class="errorMsg">
                  Deduction Type is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4">
              <CTextarea
                label="Description"
                placeholder="Content..."
                v-model="form.description"
              />
            </CCol>

            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Amount"
                type="number"
                v-model="form.amount"
                :class="{ error: $v.form.amount.$error }"
                @input="$v.form.amount.$touch()"
              />
              <div v-if="$v.form.amount.$error">
                <p v-if="!$v.form.amount.required" class="errorMsg">Amount is required</p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Repeat Every Month"
                :options="options.repeat"
                :value.sync="form.repeat"
              />
              <div v-if="$v.form.repeat.$error">
                <p v-if="!$v.form.repeat.required" class="errorMsg">Type is required</p>
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
import EmployeeDeductionService from "@/services/employees/EmployeeDeductionService";
import HrSettingService from "@/services/settings/HrSettingService";
import { required } from "vuelidate/lib/validators";
import AppUpload from "@/components/uploads/Upload.vue";
import { cilTrash, cisFile } from "@coreui/icons-pro";

export default {
  name: "EmployeeDeductionForm",
  components: {
    AppUpload,
  },
  cilTrash,
  cisFile,
  data: () => ({
    isEditing: false,
    form: {
      id: "",
      employee_id: "",
      name: "",
      type: "",
      description: "",
      amount: "",
      repeat: "",
      documents: [],
    },
    display_documents: [],
    empId: null,
    options: {
      deduction_type: [{ value: "", label: "Choose Type", disabled: true, selected: "" }],
      repeat: [
        { value: "", label: "Choose repeat", disabled: true, selected: "" },
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    },
  }),
  validations() {
    return {
      form: {
        name: { required },
        type: { required },
        amount: { required },
        repeat: { required },
      },
    };
  },
  created() {
    this.empId = this.$route.params.id;
    this.getOptions();
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
  },
  methods: {
    saveEmployeeDeduction() {
      this.form.employee_id = this.$route.params.id;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let formData = new FormData();
        formData.append("employee_id", this.form.employee_id);
        formData.append("name", this.form.name);
        formData.append("type", this.form.type);
        formData.append("description", this.form.description);
        formData.append("amount", this.form.amount);
        formData.append("repeat", this.form.repeat);

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
        EmployeeDeductionService.create(formData, config)
          .then((res) => {
            if (res.status == 201) {
              this.$store.commit("close_loader");
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Deduction Added Successfully",
                timer: 3600,
              });
              this.$emit("employee-deduction-update");
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
    updateEmployeeDeduction() {
      this.form.employee_id = this.$route.params.id;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let formData = new FormData();
        formData.append("employee_id", this.form.employee_id);
        formData.append("name", this.form.name);
        formData.append("type", this.form.type);
        formData.append("description", this.form.description);
        formData.append("amount", this.form.amount);
        formData.append("repeat", this.form.repeat);
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
        EmployeeDeductionService.update(this.form.id, formData, config)
          .then((res) => {
            if (res.status == 200) {
              this.$store.commit("close_loader");
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Deduction Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.$emit("employee-deduction-update");
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
    getEmployeeDeduction() {
      EmployeeDeductionService.get(this.empId)
        .then(({ data }) => {
          if (data != null && data != "") {
            this.isEditing = true;
            this.form.id = data.uuid;
            this.form.employee_id = data.employee_id;
            this.form.name = data.name;
            this.form.type = data.type;
            this.form.description = data.description;
            this.form.amount = data.amount;
            this.form.repeat = data.repeat;

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
      let ids = JSON.stringify(["deduction_type"]);
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
      this.getEmployeeDeduction();
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
