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
                <p v-if="!$v.form.name.required" class="errorMsg">
                  Name is required
                </p>
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
                :class="{ error: $v.form.description.$error }"
                @input="$v.form.description.$touch()"
              />
              <div v-if="$v.form.description.$error">
                <p v-if="!$v.form.description.required" class="errorMsg">
                  Description is required
                </p>
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
                <p v-if="!$v.form.amount.required" class="errorMsg">
                  Amount is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Repeat Every Month"
                :options="options.repeat"
                :value.sync="form.repeat"
              />
              <div v-if="$v.form.repeat.$error">
                <p v-if="!$v.form.repeat.required" class="errorMsg">
                  Type is required
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
import EmployeeDeductionService from "@/services/employees/EmployeeDeductionService";
import HrSettingService from "@/services/settings/HrSettingService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "EmployeeDeductionForm",
  data: () => ({
    isEditing: false,
    form: {
      id: null,
      employee_id: "",
      name: "",
      type: "",
      description: "",
      amount: "",
      repeat: "",
    },
    empId: null,
    options: {
      deduction_type: [
        { value: "", label: "Choose Type", disabled: true, selected: "" },
      ],
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
        description: { required },
        amount: { required },
        repeat: { required },
      },
    };
  },
  created() {
    this.empId = this.$route.params.id;
    this.getOptions();
  },
  methods: {
    saveEmployeeDeduction() {
      this.form.employee_id = this.$route.params.id;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        EmployeeDeductionService.create(data)
          .then((res) => {
            if (res.status == 201) {
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
        let data = this.form;
        EmployeeDeductionService.update(this.form.id, data)
          .then((res) => {
            if (res.status == 200) {
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
    getEditData(uuid) {
      this.isEditing = true;
      this.empId = uuid;
      this.getEmployeeDeduction();
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
