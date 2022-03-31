<template>
  <div>
    <Loader />
    <CRow>
      <CCol xs="12" lg="12">
        <form @submit.prevent="isEditing ? updateExpense() : saveExpense()">
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Date"
                type="date"
                v-model="form.date"
                :class="{ error: $v.form.date.$error }"
                @input="$v.form.date.$touch()"
              />
              <div v-if="$v.form.date.$error">
                <p v-if="!$v.form.date.required" class="errorMsg">
                  Date is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput label="Refernce No" v-model="form.ref_id" />
            </CCol>
            <CCol xs="6" md="4" class="pt-2">
              <SupplierSearch
                @supplier-change="supplierChange($event)"
                :previousValue="previousValue"
              />
            </CCol>

            <CCol sm="6" md="4" class="pt-2">
              <AccountDropdown
                :previousValue="form.account_id"
                @getAccountDropdown="getAccountDropdown"
                :class="{ error: $v.form.account_id.$error }"
                @change="$v.form.account_id.$touch()"
              />
              <div v-if="$v.form.account_id.$error">
                <p v-if="!$v.form.account_id.required" class="errorMsg">
                  Account is required
                </p>
              </div>
            </CCol>

            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Amount Without Tax"
                type="number"
                placeholder="0.00"
                v-model="form.amount_without_tax"
                :class="{ error: $v.form.amount_without_tax.$error }"
                @input="[$v.form.amount_without_tax.$touch(), calculation()]"
              />
              <div v-if="$v.form.amount_without_tax.$error">
                <p v-if="!$v.form.amount_without_tax.required" class="errorMsg">
                  Amount Without Tax is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Tax"
                :options="options.taxes"
                :value.sync="form.tax_id"
                @change="calculation()"
              />
            </CCol>

            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Amount With Tax"
                disabled
                type="number"
                placeholder="0.00"
                v-model="form.amount_with_tax"
                :class="{ error: $v.form.amount_with_tax.$error }"
                @input="[$v.form.amount_with_tax.$touch(), calculation(1)]"
              />
              <div v-if="$v.form.amount_with_tax.$error">
                <p v-if="!$v.form.amount_with_tax.required" class="errorMsg">
                  Amount Without Tax is required
                </p>
              </div>
            </CCol>

            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Status"
                :options="options.status"
                :value.sync="form.status"
                :class="{ error: $v.form.status.$error }"
                @input="$v.form.status.$touch()"
              />
              <div v-if="$v.form.status.$error">
                <p v-if="!$v.form.status.required" class="errorMsg">
                  Status is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <Label> Payment Method</Label>
              <CSelect
                :options="options.payment_methods"
                :value.sync="form.payment_method"
                :class="{ error: $v.form.payment_method.$error }"
                @input="$v.form.payment_method.$touch()"
              />
              <div v-if="$v.form.payment_method.$error">
                <p v-if="!$v.form.payment_method.required" class="errorMsg">
                  Payment Method is required
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
import SupplierSearch from "@/components/general/search/SupplierSearch";
import ExpenseService from "@/services/accounting/expense/ExpenseService";
import { required, requiredIf } from "vuelidate/lib/validators";
import AppUpload from "@/components/uploads/Upload.vue";
import { cilTrash, cisFile } from "@coreui/icons-pro";
import AccountServices from "@/services/accounting/accounts/AccountServices";
import Loader from "@/components/layouts/Loader";
import AccountDropdown from "@/components/general/AccountDropdown";

export default {
  name: "ExpenseForm",
  components: {
    AppUpload,
    Loader,
    AccountDropdown,
    SupplierSearch,
  },
  cilTrash,
  cisFile,
  data: () => ({
    isEditing: false,
    saveAndExit: false,
    previousValue: null,
    form: {
      id: "",
      account_id: "",
      ref_id: "",
      payment_method: "",
      tax: "",
      tax_id: null,
      amount_without_tax: "",
      amount_with_tax: "",
      date: "",
      status: "draft",
      description: "",
      supplier_id: "",
      documents: [],
    },
    last_percentage: 0,
    display_documents: [],
    options: {
      status: [
        {
          value: "draft",
          label: "Draft",
          selected: "",
        },
        { value: "approved", label: "Submitted" },
      ],
      payment_methods: [
        { value: "", label: "Choose Payment Method", selected: "" },
      ],
      taxes: [{ value: "", label: "Choose Tax", selected: "" }],

      accounts: [
        { value: "", label: "Choose Account", disabled: true, selected: "" },
      ],
    },
  }),
  validations() {
    return {
      form: {
        account_id: { required },
        amount_without_tax: { required },
        amount_with_tax: { required },
        date: { required },
        status: { required },
        payment_method: {
          required: requiredIf(() => {
            return this.form.status == "approved";
          }),
        },
      },
    };
  },
  created() {
    this.form.id = this.$route.params.id;
    this.getExpenseOptions();
    if (this.form.id !== "" && this.form.id !== undefined) {
      this.isEditing = true;
      this.getExpense();
    }
  },
  methods: {
    calculation(check = 0) {
      if (event.target.options) {
        var options = event.target.options;
        if (options.selectedIndex > -1) {
          var percentage =
            options[options.selectedIndex].getAttribute("data-percentage");
          if (percentage == null) {
            percentage = 0;
          }
          this.last_percentage = percentage;
          var percentage2 =
            this.form.amount_without_tax * (parseFloat(percentage) / 100);
          this.form.amount_with_tax = (
            parseFloat(percentage2) + parseFloat(this.form.amount_without_tax)
          ).toFixed(3);
        }
      } else {
        var percentage2 =
          this.form.amount_without_tax *
          (parseFloat(this.last_percentage) / 100);
        this.form.amount_with_tax = (
          parseFloat(percentage2) + parseFloat(this.form.amount_without_tax)
        ).toFixed(3);
      }
    },
    getExpenseOptions() {
      ExpenseService.getExpenseOptions()
        .then(({ data }) => {
          if (data != undefined && data != "") {
            const payment_methods = this.options.payment_methods;
            const taxes = this.options.taxes;

            if (data.payment_methods) {
              data.payment_methods.map(function (val) {
                payment_methods.push({ value: val.uuid, label: val.name });
              });
            }
            if (data.taxes) {
              data.taxes.map(function (val) {
                taxes.push({
                  value: val.uuid,
                  label: val.name,
                  attrs: { "data-percentage": val.percentage },
                });
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });

      AccountServices.getAllExpenseAccount()
        .then(({ data }) => {
          let account_options = this.options.accounts;
          data.map((value, index) => {
            account_options.push({ value: value.uuid, label: value.name });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getAccountDropdown(value) {
      this.form.account_id = value.value;
    },
    supplierChange(val) {
      if (val) {
        this.form.supplier_id = val.value;
      } else {
        this.form.supplier_id = null;
      }
    },
    saveExpense() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        // let data = this.form;
        let formData = this.formData();
        const config = {
          headers: { "Content-Type": "multipart/form-data" },
        };
        ExpenseService.create(formData, config)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Expense Added Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.resetForm();

              if (this.saveAndExit) {
                this.$router.push({ path: "/accounting/expense/index" });
              } else {
                this.$router.push({
                  path: "/accounting/expense/edit/" + res.data.uuid,
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
    updateExpense() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        // let data = this.form;
        let formData = this.formData();
        const config = {
          headers: { "Content-Type": "multipart/form-data" },
        };
        ExpenseService.update(this.form.id, formData, config)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Expense Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();

              if (this.saveAndExit) {
                this.$router.push({ path: "/accounting/expense/index" });
              } else {
                this.$refs.fileUpload.reset();
                this.getExpense();
                // this.$router.push({
                //   path: "/accounting/expense/edit/" + res.data.uuid,
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
    getExpense() {
      this.$store.commit("set_loader");
      ExpenseService.get(this.form.id)
        .then(({ data }) => {
          if (data != null && data != "") {
            this.isEditing = true;
            this.form.id = data.uuid;
            this.form.ref_id = data.ref_id;
            this.form.amount_without_tax = data.amount_without_tax;
            this.form.amount_with_tax = data.amount_with_tax;
            this.form.date = data.date;
            this.form.description = data.description;
            this.form.status = data.status;

            if (data.tax) {
              this.form.tax = {
                uuid: data.tax.uuid,
                percentage: data.tax.percentage,
              };
            }
            if (data.payment_method) {
              this.form.payment_method = data.payment_method.uuid;
              this.form.account_id = {
                label: data.account.name,
                value: data.account.uuid,
              };
            }

            if (data.documents) {
              this.display_documents = [];
              let display_docs = this.display_documents;
              data.documents.map(function (item) {
                display_docs.push(item);
              });
            }

            if (data.supplier) {
              this.previousValue = {
                value: data.supplier.uuid,
                label:
                  data.supplier?.name +
                  " (serial: " +
                  data.supplier?.serial_no +
                  ")",
              };
            }
          }
          this.$store.commit("close_loader");
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("close_loader");
          this.isEditing = false;
        });
    },
    formData() {
      let formData = new FormData();
      if (this.isEditing) {
        formData.append("_method", "PATCH");
      }
      for (const index in this.form) {
        if (index === "documents") {
          for (const doc of this.form.documents) {
            formData.append("documents[]", doc);
          }
        } else {
          formData.append(index, this.form[index]);
        }
      }
      return formData;
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
