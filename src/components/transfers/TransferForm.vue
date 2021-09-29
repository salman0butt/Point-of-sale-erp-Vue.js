<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form @submit.prevent="isEditing ? updateTransfer() : saveTransfer()">
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Employee"
                :options="options.employees"
                :value.sync="form.employee_id"
                :class="{ error: $v.form.employee_id.$error }"
                @input="$v.form.employee_id.$touch()"
              />
              <div v-if="$v.form.employee_id.$error">
                <p v-if="!$v.form.employee_id.required" class="errorMsg">
                  Employee is required
                </p>
              </div>
            </CCol>

            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Branch From"
                :options="options.branches"
                :value.sync="form.from_branch_id"
                :class="{ error: $v.form.from_branch_id.$error }"
                @input="$v.form.from_branch_id.$touch()"
              />
              <div v-if="$v.form.from_branch_id.$error">
                <p v-if="!$v.form.from_branch_id.required" class="errorMsg">
                  Branch From is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Branch To"
                :options="options.branches"
                :value.sync="form.to_branch_id"
                :class="{ error: $v.form.to_branch_id.$error }"
                @input="$v.form.to_branch_id.$touch()"
              />
              <div v-if="$v.form.to_branch_id.$error">
                <p v-if="!$v.form.to_branch_id.required" class="errorMsg">
                  Branch To is required
                </p>
              </div>
            </CCol>
          </CRow>

          <CRow>
            <CCol sm="6" md="4">
              <CTextarea
                label="Notes"
                placeholder="Content..."
                v-model="form.notes"
                :class="{ error: $v.form.notes.$error }"
                @input="$v.form.notes.$touch()"
              />
              <div v-if="$v.form.notes.$error">
                <p v-if="!$v.form.notes.required" class="errorMsg">Notes is required</p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label=" Transfer Date"
                type="date"
                v-model="form.date_of_transfer"
                :class="{ error: $v.form.date_of_transfer.$error }"
                @input="$v.form.date_of_transfer.$touch()"
              />
              <div v-if="$v.form.date_of_transfer.$error">
                <p v-if="!$v.form.date_of_transfer.required" class="errorMsg">
                  Transfer Date is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label=" Joining Date"
                type="date"
                v-model="form.joining_date"
                :class="{ error: $v.form.joining_date.$error }"
                @input="$v.form.joining_date.$touch()"
              />
              <div v-if="$v.form.joining_date.$error">
                <p v-if="!$v.form.joining_date.required" class="errorMsg">
                  Joining Date is required
                </p>
              </div>
            </CCol>

            <CCol v-if="isEditing" sm="6" md="4" class="pt-2">
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
import TransferService from "@/services/transfers/TransferService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "TransferForm",
  data: () => ({
    isEditing: false,
    saveAndExit: false,
    form: {
      id: null,
      employee_id: "",
      from_branch_id: "",
      to_branch_id: "",
      notes: "",
      date_of_transfer: "",
      joining_date: "",
      status: "pending",
    },
    options: {
      employees: [{ value: "", label: "Choose Employee", disabled: true, selected: "" }],
      branches: [{ value: "", label: "Choose Branch", disabled: true, selected: "" }],
      status: [
        { value: "", label: "Choose Status", disabled: true, selected: "" },
        { value: "pending", label: "Pending" },
        { value: "approved_by_hr", label: "Approved by HR" },
        { value: "cancel", label: "Cancel" },
      ],
    },
  }),
  validations() {
    return {
      form: {
        employee_id: { required },
        from_branch_id: { required },
        to_branch_id: { required },
        date_of_transfer: { required },
        joining_date: { required },
        notes: { required },
      },
    };
  },
  created() {
    this.form.id = this.$route.params.id;
    this.getAllEmployees();
    this.getAllBranches();
    if (this.form.id !== "" && this.form.id !== undefined) {
      this.isEditing = true;
      this.getTransfer();
    }
  },
  methods: {
    saveTransfer() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        TransferService.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Transfer Added Successfully",
                timer: 3600,
              });
              // this.$emit("employee-transfer-update");
              this.$v.$reset();
              this.resetForm();

              if (this.saveAndExit) {
                this.$router.push({ path: "/transfers/index" });
              } else {
                this.$router.push({ path: "/transfers/edit/" + res.data.uuid });
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
    updateTransfer() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        TransferService.update(this.form.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Transfer Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              // this.$emit("employee-transfer-update");
              if (this.saveAndExit) {
                this.$router.push({ path: "/transfers/index" });
              } else {
                this.$router.push({ path: "/transfers/edit/" + res.data.uuid });
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
    getTransfer() {
      TransferService.get(this.form.id)
        .then(({ data }) => {
          console.log(data);
          if (data != null && data != "") {
            this.isEditing = true;
            this.form.id = data.uuid;
            this.form.employee_id = data.employee.uuid;
            this.form.from_branch_id = data.from_branch.uuid;
            this.form.to_branch_id = data.to_branch.uuid;
            this.form.notes = data.notes;
            this.form.date_of_transfer = data.date_of_transfer;
            this.form.joining_date = data.joining_date;
            this.form.status = data.status;
          }
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
        });
    },
    getAllEmployees() {
      TransferService.getAllEmployees()
        .then(({ data }) => {
          if (data != null && data != "") {
            let employees = this.options.employees;
            if (data.data) {
              data.data.map(function (val) {
                employees.push({ value: val.uuid, label: val.full_name });
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getAllBranches() {
      TransferService.getAllBranches()
        .then(({ data }) => {
          if (data != null && data != "") {
            let branches = this.options.branches;
            if (data.data) {
              data.data.map(function (val) {
                branches.push({ value: val.uuid, label: val.name });
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

<style>
.errorMsg {
  color: red;
}
</style>
