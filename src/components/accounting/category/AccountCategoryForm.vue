<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form
          @submit.prevent="isEditing ? updateAccountCategory() : saveAccountCategory()"
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

            <CCol v-if="!isEditing" sm="6" md="4" class="pt-2">
              <!-- <CSelect label="Type" :options="options.types" :value.sync="form.type" /> -->
              <CRow>
                <CCol sm="4" md="4" class="pt-4">
                  <CInputCheckbox
                    custom
                    @change="toggleIncome"
                    :checked="income"
                    label="Income"
                  />
                </CCol>
                <CCol sm="4" md="4" class="pt-4">
                  <CInputCheckbox
                    custom
                    @change="toggleExpense"
                    :checked="expense"
                    label="Expense"
                  />
                </CCol>
                <CCol sm="4" md="4" class="pt-4">
                  <CInputCheckbox
                    custom
                    @change="toggleTransfer"
                    :checked="transfer"
                    label="Transfer"
                  />
                </CCol>
              </CRow>
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
import AccountCategoryService from "@/services/accounting/category/AccountCategoryService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "AccountCategoryForm",
  data: () => ({
    isEditing: false,
    saveAndExit: false,
    form: {
      id: null,
      name: "",
      type: [],
    },
    income: false,
    expense: false,
    transfer: false,
    // options: {
    //   types: [
    //     { value: "", label: "Choose Type", disabled: true, selected: "" },
    //     { value: "income", label: "Income" },
    //     { value: "expense", label: "Expense" },
    //     { value: "transaction", label: "Transaction" },
    //   ],
    // },
  }),
  validations() {
    return {
      form: {
        name: { required },
        // type: { required },
      },
    };
  },
  created() {
    this.form.id = this.$route.params.id;
    if (this.form.id !== "" && this.form.id !== undefined) {
      this.isEditing = true;
      this.getAccountCategory();
    }
  },
  methods: {
    saveAccountCategory() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = {
          name: this.form.name,
          type: this.form.type,
        };
        AccountCategoryService.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Account Category Added Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.resetForm();

              if (this.saveAndExit) {
                this.$router.push({ path: "/accounting/category/index" });
              } else {
                this.$router.push({
                  path: "/accounting/category/edit/" + res.data.uuid,
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
    updateAccountCategory() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = {
          name: this.form.name,
        };
        AccountCategoryService.update(this.form.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Account Category Updated Successfully",
                timer: 3600,
              });
              // this.$v.$reset();

              if (this.saveAndExit) {
                this.$router.push({ path: "/accounting/category/index" });
              }
              // else {
              //   this.$router.push({
              //     path: "/accounting/category/edit/" + res.data.uuid,
              //   });
              // }
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
    toggleTransfer() {
      this.transfer = !this.transfer;
      if (this.transfer) {
        this.form.type.push("transfer");
      } else {
        this.form.type = this.form.type.filter((item) => item !== "transfer");
      }
    },
    toggleExpense() {
      this.expense = !this.expense;
      if (this.expense) {
        this.form.type.push("expense");
      } else {
        this.form.type = this.form.type.filter((item) => item !== "expense");
      }
    },
    toggleIncome() {
      this.income = !this.income;
      if (this.income) {
        this.form.type.push("income");
      } else {
        this.form.type = this.form.type.filter((item) => item !== "income");
      }
    },
    getAccountCategory() {
      AccountCategoryService.get(this.form.id)
        .then(({ data }) => {
          if (data != null && data != "") {
            this.isEditing = true;
            this.form.id = data.uuid;
            this.form.name = data.name;

            // let types = JSON.parse(data.type);

            // for (let i = 0; i < types.length; i++) {
            //   if (types[i] == "income") {
            //     this.toggleIncome();
            //   }

            //   if (types[i] == "expense") {
            //     this.expense = true;
            //     this.toggleExpense();
            //   }

            //   if (types[i] == "transfer") {
            //     this.toggleTransfer();
            //   }
            // }
          }
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
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
