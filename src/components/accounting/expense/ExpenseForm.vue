<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form @submit.prevent="isEditing ? updateExpense() : saveExpense()">
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
                label="Payment Method"
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
              />
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
import ExpenseService from "@/services/accounting/expense/ExpenseService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "ExpenseForm",
  data: () => ({
    isEditing: false,
    saveAndExit: false,
    form: {
      id: "",
      category_id: "",
      from_payment_method_id: "",
      ref_id: "",
      debit: "",
      date: "",
      status: "",
      description: "",
    },
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
        debit: { required },
        date: { required },
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
    saveExpense() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        ExpenseService.create(data)
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
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: "Something Went Wrong.",
              timer: 3600,
            });
          });
      }
    },
    updateExpense() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        ExpenseService.update(this.form.id, data)
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
                this.$router.push({
                  path: "/accounting/expense/edit/" + res.data.uuid,
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
    getExpense() {
      ExpenseService.get(this.form.id)
        .then(({ data }) => {
          console.log(data);
          if (data != null && data != "") {
            this.isEditing = true;
            this.form.id = data.uuid;
            this.form.category_id = data.category.uuid;
            this.form.from_payment_method_id = data.from_payment_method.uuid;
            this.form.ref_id = data.ref_id;
            this.form.debit = data.debit;
            this.form.date = data.date;
            this.form.description = data.description;
            this.form.status = data.status;
          }
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
        });
    },
    getExpenseOptions() {
      ExpenseService.getExpenseOptions()
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
    resetForm() {
      for (let index in this.form) {
        this.form[index] = "";
      }
      this.isEditing = false;
    },
  },
};
</script>
