<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form @submit.prevent="isEditing ? updateTransfer() : saveTransfer()">
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
              <CSelect
                label="From Payment Method"
                :options="options.payment_methods"
                :value.sync="form.from_payment_method_id"
                :class="{ error: $v.form.from_payment_method_id.$error }"
                @input="$v.form.from_payment_method_id.$touch()"
              />
              <div v-if="$v.form.from_payment_method_id.$error">
                <p v-if="!$v.form.from_payment_method_id.required" class="errorMsg">
                  Payment Method is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="To Payment Method"
                :options="options.payment_methods"
                :value.sync="form.to_payment_method_id"
                :class="{ error: $v.form.to_payment_method_id.$error }"
                @input="$v.form.to_payment_method_id.$touch()"
              />
              <div v-if="$v.form.to_payment_method_id.$error">
                <p v-if="!$v.form.to_payment_method_id.required" class="errorMsg">
                  Payment Method is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Debit"
                type="number"
                placeholder="0.00"
                v-model="form.debit"
                :class="{ error: $v.form.debit.$error }"
                @input="$v.form.debit.$touch()"
              />
              <div v-if="$v.form.debit.$error">
                <p v-if="!$v.form.debit.required" class="errorMsg">Debit is required</p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Credit"
                type="number"
                placeholder="0.00"
                v-model="form.credit"
                :class="{ error: $v.form.credit.$error }"
                @input="$v.form.credit.$touch()"
              />
              <div v-if="$v.form.credit.$error">
                <p v-if="!$v.form.credit.required" class="errorMsg">Credit is required</p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Date"
                type="date"
                v-model="form.date"
                :class="{ error: $v.form.date.$error }"
                @input="$v.form.date.$touch()"
              />
              <div v-if="$v.form.date.$error">
                <p v-if="!$v.form.date.required" class="errorMsg">Date is required</p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput label="Refernce No" v-model="form.ref_id" />
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CTextarea
                label="Description"
                placeholder="Content..."
                v-model="form.description"
              />
            </CCol>

            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Status"
                :options="options.status"
                :value.sync="form.status"
                :class="{ error: $v.form.status.$error }"
                @input="$v.form.status.$touch()"
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
import TransferService from "@/services/accounting/transfer/TransferService";
import { required } from "vuelidate/lib/validators";
import AppUpload from "@/components/uploads/Upload.vue";
import { cilTrash, cisFile } from "@coreui/icons-pro";

export default {
  name: "TransferForm",
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
      to_payment_method_id: "",
      from_payment_method_id: "",
      ref_id: "",
      debit: "",
      credit: "",
      date: "",
      status: "",
      description: "",
      documents: [],
    },
    display_documents: [],
    options: {
      status: [
        { value: "", label: "Choose Status", disabled: true, selected: "" },
        { value: "pending", label: "Pending" },
        { value: "paid", label: "Paid" },
      ],
      payment_methods: [
        { value: "", label: "Choose Method", disabled: true, selected: "" },
      ],
      categories: [{ value: "", label: "Choose Category", disabled: true, selected: "" }],
    },
  }),
  validations() {
    return {
      form: {
        category_id: { required },
        from_payment_method_id: { required },
        to_payment_method_id: { required },
        debit: { required },
        credit: { required },
        date: { required },
        status: { required },
      },
    };
  },
  created() {
    this.form.id = this.$route.params.id;
    this.getTransferOptions();
    if (this.form.id !== "" && this.form.id !== undefined) {
      this.isEditing = true;
      this.getTransfer();
    }
  },
  methods: {
    saveTransfer() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        // let data = this.form;
        let formData = this.formData();
        const config = {
          headers: { "Content-Type": "multipart/form-data" },
        };
        TransferService.create(formData, config)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Transfer Added Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.resetForm();

              if (this.saveAndExit) {
                this.$router.push({ path: "/accounting/transfer/index" });
              } else {
                this.$router.push({
                  path: "/accounting/transfer/edit/" + res.data.uuid,
                });
              }
            }
          })
          .catch((error) => {
            console.log(error);
            if (error.response && error.response.status === 422) {
              let errors = error.response.data.errors;
              for (const err in errors) {
                this.$toast.error(errors[err][0]);
              }
            } else {
              this.$toast.error("Something went wrong.");
            }
          });
      }
    },
    updateTransfer() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        // let data = this.form;
        let formData = this.formData();
        const config = {
          headers: { "Content-Type": "multipart/form-data" },
        };
        TransferService.update(this.form.id, formData, config)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Transfer Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();

              if (this.saveAndExit) {
                this.$router.push({ path: "/accounting/transfer/index" });
              } else {
                this.$refs.fileUpload.reset();
                this.getTransfer();
                // this.$router.push({
                //   path: "/accounting/transfer/edit/" + res.data.uuid,
                // });
              }
            }
          })
          .catch((error) => {
            console.log(error);
            if (error.response && error.response.status === 422) {
              let errors = error.response.data.errors;
              for (const err in errors) {
                this.$toast.error(errors[err][0]);
              }
            } else {
              this.$toast.error("Something went wrong.");
            }
          });
      }
    },
    getTransfer() {
      TransferService.get(this.form.id)
        .then(({ data }) => {
          console.log(data);
          if (data != null && data != "") {
            this.isEditing = true;
            this.form.id = data.uuid;
            this.form.category_id = data.category.uuid;
            this.form.from_payment_method_id = data.from_payment_method.uuid;
            this.form.to_payment_method_id = data.to_payment_method.uuid;
            this.form.ref_id = data.ref_id;
            this.form.debit = data.debit;
            this.form.credit = data.credit;
            this.form.date = data.date;
            this.form.description = data.description;
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
    getTransferOptions() {
      TransferService.getTransferOptions()
        .then(({ data }) => {
          if (data != undefined && data != "") {
            const payment_methods = this.options.payment_methods;
            const categories = this.options.categories;

            if (data.payment_methods) {
              data.payment_methods.map(function (val) {
                payment_methods.push({ value: val.uuid, label: val.name });
              });
            }
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
