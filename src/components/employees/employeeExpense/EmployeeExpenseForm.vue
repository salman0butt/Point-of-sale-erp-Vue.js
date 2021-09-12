<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form
          @submit.prevent="isEditing ? updateEmployeeExpense() : saveEmployeeExpense()"
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
              <CSelect label="Type" :options="options.type" :value.sync="form.type" />
              <div v-if="$v.form.type.$error">
                <p v-if="!$v.form.type.required" class="errorMsg">Type is required</p>
              </div>
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
          </CRow>
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Repeat"
                :options="options.periodic"
                :value.sync="form.periodic"
              />
              <div v-if="$v.form.periodic.$error">
                <p v-if="!$v.form.periodic.required" class="errorMsg">
                  Periodic is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="6">
              <CTextarea label="Note" placeholder="Content..." v-model="form.detail" />
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
import EmployeeExpenseService from "@/services/employees/EmployeeExpenseService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "EmployeeExpenseForm",
  data: () => ({
    isEditing: false,
    form: {
      id: null,
      employee_id: "",
      name: "",
      type: "",
      periodic: "",
      amount: "",
      detail: "",
    },
    empId: null,
    options: {
      type: [
        { value: "", label: "Choose Type", disabled: true, selected: "" },
        { value: "type1", label: "Type1" },
        { value: "type2", label: "Type2" },
      ],
      periodic: [
        { value: "", label: "Choose repeat", disabled: true, selected: "" },
        { value: "daily", label: "Daily" },
        { value: "weekly", label: "Weekly" },
        { value: "monthly", label: "Monthly" },
        { value: "yearly", label: "Yearly" },
      ],
    },
  }),
  validations() {
    return {
      form: {
        name: { required },
        type: { required },
        periodic: { required },
        amount: { required },
      },
    };
  },
  created() {
    this.empId = this.empId = this.$route.params.id;
  },
  methods: {
    saveEmployeeExpense() {
      this.form.employee_id = this.$route.params.id;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        EmployeeExpenseService.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Expense Added Successfully",
                timer: 3600,
              });
              this.$emit("employee-expense-update", {
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
    updateEmployeeExpense() {
      this.form.employee_id = this.$route.params.id;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        EmployeeExpenseService.update(this.form.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Expense Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.$emit("employee-expense-update", {
                type: "edit",
                data: res.data,
              });
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
    getEmployeeExpense() {
      EmployeeExpenseService.get(this.empId)
        .then(({ data }) => {
          if (data != null && data != "") {
            this.isEditing = true;
            this.form.id = data.uuid;
            this.form.employee_id = data.employee_id;
            this.form.name = data.name;
            this.form.type = data.type;
            this.form.periodic = data.periodic;
            this.form.amount = data.amount;
            this.form.detail = data.detail;
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
      this.getEmployeeExpense();
    },
    resetForm() {
      this.form.name = "";
      this.form.type = "";
      this.form.periodic = "";
      this.form.amount = "";
      this.form.detail = "";
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
