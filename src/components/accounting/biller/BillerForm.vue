<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form @submit.prevent="isEditing ? updateBiller() : saveBiller()">
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Category"
                :options="options.categories"
                :value.sync="form.category_id"
                :class="{ error: $v.form.category_id.$error }"
                @input="$v.form.category_id.$touch()"
              />
              <div v-if="$v.form.category_id.$error">
                <p v-if="!$v.form.category_id.required" class="errorMsg">
                  Category is required
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
                <p v-if="!$v.form.title.required" class="errorMsg">
                  Title is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Amount"
                type="number"
                placeholder="0.00"
                v-model="form.amount"
                :class="{ error: $v.form.amount.$error }"
                @input="$v.form.amount.$touch()"
              />
              <div v-if="$v.form.amount.$error">
                <p v-if="!$v.form.amount.required" class="errorMsg">
                  Amount is required
                </p>
              </div>
            </CCol>

            <CCol v-if="!isEditing" sm="6" md="4" class="pt-2">
              <CSelect
                label="Repeat"
                :options="options.repeat"
                :value.sync="form.repeat"
              />
            </CCol>
            <CCol v-if="!isEditing" sm="6" md="4" class="pt-2">
              <CInput
                label="Number of Times"
                type="number"
                v-model="form.number_of_times"
              />
            </CCol>

            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Bill Date"
                type="date"
                v-model="form.bill_date"
                :class="{ error: $v.form.bill_date.$error }"
                @input="$v.form.bill_date.$touch()"
              />
              <div v-if="$v.form.bill_date.$error">
                <p v-if="!$v.form.bill_date.required" class="errorMsg">
                  Bill Date is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Remind Date"
                type="date"
                v-model="form.remind_date"
                :class="{ error: $v.form.remind_date.$error }"
                @input="$v.form.remind_date.$touch()"
              />
              <div v-if="$v.form.remind_date.$error">
                <p v-if="!$v.form.remind_date.required" class="errorMsg">
                  Remind Date is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Due Date"
                type="date"
                v-model="form.due_date"
                :class="{ error: $v.form.due_date.$error }"
                @input="$v.form.due_date.$touch()"
              />
              <div v-if="$v.form.due_date.$error">
                <p v-if="!$v.form.due_date.required" class="errorMsg">
                  Due Date is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CTextarea
                label="Description"
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
                    <a
                      v-bind:href="doc.path"
                      target="_blank"
                      class="name-attachment"
                    >
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
          <p v-if="$v.$anyError" class="errorMsg">
            Please Fill the required data
          </p>
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
              style="
                float: right;
                width: 140px;
                margin-left: 20px;
                margin-top: 0;
              "
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
import RecurringBillService from "@/services/accounting/recurringbill/RecurringBillService";
import { required } from "vuelidate/lib/validators";
import AppUpload from "@/components/uploads/Upload.vue";
import { cilTrash, cisFile } from "@coreui/icons-pro";

export default {
  name: "BillerForm",
  components: {
    AppUpload,
  },
  cilTrash,
  cisFile,
  data: () => ({
    isEditing: false,
    saveAndExit: false,
    form: {
      id: "",
      category_id: "",
      title: "",
      amount: "",
      bill_date: "",
      remind_date: "",
      due_date: "",
      number_of_times: "",
      repeat: "",
      description: "",
      documents: [],
    },
    display_documents: [],
    options: {
      repeat: [
        { value: "", label: "Choose Repeat", disabled: true, selected: "" },
        { value: "weekly", label: "Weekly" },
        { value: "monthly", label: "Monthly" },
        { value: "quarterly", label: "Quarterly" },
        { value: "yearly", label: "Yearly" },
      ],
      categories: [
        { value: "", label: "Choose Category", disabled: true, selected: "" },
      ],
    },
  }),
  validations() {
    return {
      form: {
        category_id: { required },
        title: { required },
        amount: { required },
        bill_date: { required },
        remind_date: { required },
        due_date: { required },
      },
    };
  },
  created() {
    this.form.id = this.$route.params.id;
    this.getBillerOptions();
    if (this.form.id !== "" && this.form.id !== undefined) {
      this.isEditing = true;
      this.getBiller();
    }
  },
  methods: {
    saveBiller() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        // let data = this.form;
        let formData = this.formData();
        const config = {
          headers: { "Content-Type": "multipart/form-data" },
        };
        RecurringBillService.create(formData, config)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Biller Added Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.resetForm();

              if (this.saveAndExit) {
                this.$router.push({
                  path: "/accounting/biller/recurring/index",
                });
              } else {
                this.$router.push({
                  path: "/accounting/biller/recurring/edit/" + res.data.uuid,
                });
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
    updateBiller() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        // let data = this.form;
        let formData = this.formData();
        const config = {
          headers: { "Content-Type": "multipart/form-data" },
        };
        RecurringBillService.update(this.form.id, formData, config)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Biller Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();

              if (this.saveAndExit) {
                this.$router.push({
                  path: "/accounting/biller/recurring/index",
                });
              } else {
                this.$refs.fileUpload.reset();
                this.getBiller();
                // this.$router.push({
                //   path: "/accounting/biller/recurring/edit/" + res.data.uuid,
                // });
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
    getBiller() {
      RecurringBillService.get(this.form.id)
        .then(({ data }) => {
          if (data != null && data != "") {
            this.isEditing = true;
            this.form.id = data.uuid;
            this.form.category_id = data.category.uuid;
            this.form.title = data.title;
            this.form.amount = data.amount;
            this.form.bill_date = data.bill_date;
            this.form.remind_date = data.remind_date;
            this.form.due_date = data.due_date;
            this.form.description = data.description;

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
    formData() {
      let formData = new FormData();
      for (const index in this.form) {
        if (index === "documents") {
          for (const doc of this.form.documents) {
            formData.append("documents[]", doc);
          }
        } else {
          formData.append(index, this.form[index]);
        }
      }
      if (this.isEditing) {
        formData.append("_method", "PATCH");
      }
      return formData;
    },
    getBillerOptions() {
      RecurringBillService.getBillerOptions()
        .then(({ data }) => {
          if (data != undefined && data != "") {
            const categories = this.options.categories;

            if (data.categories) {
              data.categories.map(function (val) {
                categories.push({ value: val.uuid, label: val.name });
              });
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
          title: "Are You Sure You Want to Deleted This Attachment?",
icon: "warning",
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
