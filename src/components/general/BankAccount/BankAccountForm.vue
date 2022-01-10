<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form
          @submit.prevent="isEditing ? updateBankAccount() : saveBankAccount()"
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
                <p v-if="!$v.form.name.required" class="errorMsg">
                  Name is required
                </p>
              </div>
            </CCol>

            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="IBAN Number"
                v-model="form.iban"
                :class="{ error: $v.form.iban.$error }"
                @input="$v.form.iban.$touch()"
              />
              <div v-if="$v.form.iban.$error">
                <p v-if="!$v.form.iban.required" class="errorMsg">
                  IBAN Number is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Account Number"
                v-model="form.account_number"
                :class="{ error: $v.form.account_number.$error }"
                @input="$v.form.account_number.$touch()"
              />
              <div v-if="$v.form.account_number.$error">
                <p v-if="!$v.form.account_number.required" class="errorMsg">
                  Account Number is required
                </p>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Bank Name"
                v-model="form.bank_name"
                :class="{ error: $v.form.bank_name.$error }"
                @input="$v.form.bank_name.$touch()"
              />
              <div v-if="$v.form.bank_name.$error">
                <p v-if="!$v.form.bank_name.required" class="errorMsg">
                  Bank Name is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Swift"
                v-model="form.swift"
                :class="{ error: $v.form.swift.$error }"
                @input="$v.form.swift.$touch()"
              />
              <div v-if="$v.form.swift.$error">
                <p v-if="!$v.form.swift.required" class="errorMsg">
                  Swift is required
                </p>
              </div>
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
import EmployeeBankAccountService from "@/services/employees/EmployeeBankAccountService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "BankAccountForm",
  data: () => ({
    isEditing: false,
    form: {
      id: null,
      employee_id: "",
      name: "",
      iban: "",
      account_number: "",
      bank_name: "",
      swift: "",
    },
    empId: null,
  }),
  validations() {
    return {
      form: {
        name: { required },
        iban: { required },
        account_number: { required },
        bank_name: { required },
        swift: { required },
      },
    };
  },
  created() {
    this.empId = this.$route.params.id;
  },
  methods: {
    saveBankAccount() {
      this.form.employee_id = this.$route.params.id;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        EmployeeBankAccountService.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Bank Account Added Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.$emit("employeeBankAccountCreated");
              this.resetForm();
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
      }
    },
    updateBankAccount() {
      this.form.employee_id = this.$route.params.id;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        EmployeeBankAccountService.update(this.form.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Bank Account Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.$emit("employeeBankAccountCreated");
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
    getEmployeeBankAccount() {
      EmployeeBankAccountService.get(this.empId)
        .then(({ data }) => {
          if (data != null && data != "") {
            this.isEditing = true;
            this.form.id = data.uuid;
            this.form.employee_id = data.employee_id;
            this.form.name = data.name;
            this.form.iban = data.iban;
            this.form.account_number = data.account_number;
            this.form.bank_name = data.bank_name;
            this.form.swift = data.swift;
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
      this.getEmployeeBankAccount();
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
