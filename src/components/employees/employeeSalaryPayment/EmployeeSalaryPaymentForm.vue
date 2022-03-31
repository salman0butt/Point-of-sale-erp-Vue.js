<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form
          @submit.prevent="
            isEditing ? updateEmployeeSalaryPayment() : saveEmployeeSalaryPayment()
          "
        >
          <CRow>
            <CCol sm="6" md="6" class="pt-2">
              <CSelect
                label="Select Salary Month"
                :options="options.employee_salary_adjustments"
                :value.sync="form.employee_salary_adjustment_id"
              />
              <div v-if="$v.form.employee_salary_adjustment_id.$error">
                <p
                  v-if="!$v.form.employee_salary_adjustment_id.required"
                  class="errorMsg"
                >
                  Salary Adjustment is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="6" class="pt-2">
              <CSelect
                label="Select Bank Account"
                :options="options.bank_accounts"
                :value.sync="form.bank_account_id"
              />
              <div v-if="$v.form.bank_account_id.$error">
                <p v-if="!$v.form.bank_account_id.required" class="errorMsg">
                  Bank Account is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="6" class="pt-2">
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
            <CCol sm="6" md="6" class="pt-2">
              <CInput
                label="Amount Paid"
                type="number"
                placeholder="0.00"
                v-model="form.amount_paid"
                :class="{ error: $v.form.amount_paid.$error }"
                @input="$v.form.amount_paid.$touch()"
              />
              <div v-if="$v.form.amount_paid.$error">
                <p v-if="!$v.form.amount_paid.required" class="errorMsg">
                  Amount Paid is required
                </p>
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
              >{{ loading ? "loading..." : "Save" }}</CButton
            >
          </CRow>
        </form>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeSalaryPaymentService from "@/services/employees/EmployeeSalaryPaymentService";
import { required } from "vuelidate/lib/validators";
import { cibAddthis, cisMinusSquare, cilTrash, cisFile } from "@coreui/icons-pro";
import AppUpload from "@/components/uploads/Upload.vue";

export default {
  name: "EmployeeBasicForm",
  cibAddthis,
  cisMinusSquare,
  cilTrash,
  cisFile,
  components: {
    AppUpload,
  },
  data: () => ({
    isEditing: false,
    form: {
      id: null,
      employee_id: "",
      employee_salary_adjustment_id: "",
      bank_account_id: "",
      date: "",
      amount_paid: "",
      documents: [],
    },
    display_documents: [],
    empId: "",
    options: {
      employee_salary_adjustments: [
        { value: "", label: "Choose Salary Adjustment", disabled: true, selected: "" },
      ],
      bank_accounts: [
        { value: "", label: "Choose Bank Account", disabled: true, selected: "" },
      ],
    },
  }),
  validations() {
    return {
      form: {
        employee_id: { required },
        employee_salary_adjustment_id: { required },
        bank_account_id: { required },
        date: { required },
        amount_paid: { required },
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
    saveEmployeeSalaryPayment() {
      this.form.employee_id = this.$route.params.id;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let formData = new FormData();
        formData.append("employee_id", this.form.employee_id);
        formData.append(
          "employee_salary_adjustment_id",
          this.form.employee_salary_adjustment_id
        );
        formData.append("bank_account_id", this.form.bank_account_id);
        formData.append("date", this.form.date);
        formData.append("amount_paid", this.form.amount_paid);

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
        EmployeeSalaryPaymentService.create(formData, config)
          .then((res) => {
            if (res.status == 201) {
              this.$store.commit("close_loader");
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Salary Payment Added Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.$emit("employee-salary-payment-update");
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
    updateEmployeeSalaryPayment() {
      this.form.employee_id = this.$route.params.id;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let formData = new FormData();
        formData.append("employee_id", this.form.employee_id);
        formData.append(
          "employee_salary_adjustment_id",
          this.form.employee_salary_adjustment_id
        );
        formData.append("bank_account_id", this.form.bank_account_id);
        formData.append("date", this.form.date);
        formData.append("amount_paid", this.form.amount_paid);
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
        EmployeeSalaryPaymentService.update(this.form.id, formData, config)
          .then((res) => {
            if (res.status == 200) {
              this.$store.commit("close_loader");
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Salary Payment Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.$emit("employee-salary-payment-update");
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
    getOptions() {
      EmployeeSalaryPaymentService.getAllOptions()
        .then(({ data }) => {
          if (data != undefined && data != "") {
            const employee_salary_adjustments = this.options.employee_salary_adjustments;
            const bank_accounts = this.options.bank_accounts;
            if (data.employee_salary_adjustments) {
              data.employee_salary_adjustments.map(function (val) {
                employee_salary_adjustments.push({
                  value: val.uuid,
                  label: val.month + " " + val.year,
                });
              });
            }
            if (data.bank_accounts) {
              data.bank_accounts.map(function (val) {
                bank_accounts.push({ value: val.uuid, label: val.name });
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getEmployeeSalaryPayment() {
      EmployeeSalaryPaymentService.get(this.empId)
        .then(({ data }) => {
          if (data != null && data != "") {
            this.isEditing = true;
            this.form.id = data.uuid;
            this.form.employee_id = data.employee.uuid;
            this.form.employee_salary_adjustment_id =
              data.employee_salary_adjustment.uuid;
            this.form.bank_account_id = data.bank_account.uuid;
            this.form.date = data.date;
            this.form.amount_paid = data.amount_paid;

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
    getEditData(uuid) {
      this.isEditing = true;
      this.empId = uuid;
      this.getEmployeeSalaryPayment();
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
