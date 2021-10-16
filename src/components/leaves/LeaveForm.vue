<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form @submit.prevent="isEditing ? updateLeave() : saveLeave()">
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Employee"
                :options="options.employees"
                :value.sync="form.employee_id"
              />
              <div v-if="$v.form.employee_id.$error">
                <p v-if="!$v.form.employee_id.required" class="errorMsg">
                  Employee is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Leave Type"
                :options="options.leave_type"
                :value.sync="form.type"
              />
              <div v-if="$v.form.type.$error">
                <p v-if="!$v.form.type.required" class="errorMsg">
                  Leave Type is required
                </p>
              </div>
            </CCol>

            <CCol sm="6" md="4" class="pt-2">
              <CInput label="From Date" type="date" :value.sync="form.from_date" />
              <div v-if="$v.form.from_date.$error">
                <p v-if="!$v.form.from_date.required" class="errorMsg">
                  From Date is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput label="To Date" type="date" :value.sync="form.to_date" />
              <div v-if="$v.form.to_date.$error">
                <p v-if="!$v.form.to_date.required" class="errorMsg">
                  To Date is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput label="Return Date" type="date" :value.sync="form.return_date" />
              <div v-if="$v.form.return_date.$error">
                <p v-if="!$v.form.return_date.required" class="errorMsg">
                  Return Date is required
                </p>
              </div>
            </CCol>

            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Total Days"
                v-model="form.total_days"
                :class="{ error: $v.form.total_days.$error }"
                @input="$v.form.total_days.$touch()"
              />
              <div v-if="$v.form.total_days.$error">
                <p v-if="!$v.form.total_days.required" class="errorMsg">
                  Total Days is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4">
              <CTextarea label="Note" placeholder="Content..." v-model="form.note" />
            </CCol>
            <!-- <CCol v-if="isEditing" sm="6" md="4" class="pt-2">
              <CSelect
                label="Status"
                :options="options.status"
                :value.sync="form.status"
              />
            </CCol> -->
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
import LeaveService from "@/services/employees/EmployeeLeaveService";
import HrSettingService from "@/services/settings/HrSettingService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "LeaveForm",
  data: () => ({
    isEditing: false,
    saveAndExit: false,
    form: {
      id: null,
      employee_id: "",
      type: "",
      from_date: "",
      to_date: "",
      return_date: "",
      total_days: "",
      note: "",
      leave_doc: "",
      status: "pending",
    },
    options: {
      status: [
        { value: "", label: "Choose Status", disabled: true, selected: "" },
        { value: "pending", label: "Pending" },
        { value: "approved_by_hr", label: "Approved By Hr" },
        { value: "approved_by_manager", label: "Approved By Manager" },
        { value: "cancel", label: "Cancel" },
      ],
      leave_type: [{ value: "", label: "Choose Type", disabled: true, selected: "" }],
      employees: [{ value: "", label: "Choose Employee", disabled: true, selected: "" }],
    },
  }),
  validations() {
    return {
      form: {
        employee_id: { required },
        type: { required },
        from_date: { required },
        to_date: { required },
        return_date: { required },
        total_days: { required },
      },
    };
  },
  created() {
    this.form.id = this.$route.params.id;
    this.getOptions();
    if (this.form.id !== "" && this.form.id !== undefined) {
      this.isEditing = true;
      this.getLeave();
    }
  },
  watch: {
    "form.to_date"(val) {
      let day_start = new Date(Date.parse(this.form.from_date));
      let day_end = new Date(Date.parse(val));
      let differnce = day_end - day_start;
      // To calculate the no. of days between two dates
      if (differnce) {
        this.form.total_days = Math.round(differnce / (1000 * 60 * 60 * 24));
      }
    },
    deep: true,
  },
  methods: {
    saveLeave() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        LeaveService.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Leave Added Successfully",
                timer: 3600,
              });
              // this.$emit("employee-leave-update");
              this.$v.$reset();
              this.resetForm();
              if (this.saveAndExit) {
                this.$router.push({ path: "/leaves/index" });
              } else {
                this.$router.push({ path: "/leaves/edit/" + res.data.uuid });
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
    updateLeave() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        LeaveService.update(this.form.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Leave Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              // this.$emit("employee-leave-update");

              if (this.saveAndExit) {
                this.$router.push({ path: "/leaves/index" });
              } else {
                this.$router.push({ path: "/leaves/edit/" + res.data.uuid });
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
    getLeave() {
      LeaveService.get(this.form.id)
        .then(({ data }) => {
          if (data != undefined && data != "") {
            this.isEditing = true;
            this.form.id = data.uuid;
            this.form.employee_id = data.employee.uuid;
            this.form.type = data.type;
            this.form.from_date = data.from_date;
            this.form.to_date = data.to_date;
            this.form.return_date = data.return_date;
            this.form.total_days = data.total_days;
            this.form.note = data.note;
            this.form.status = data.status;
            this.form.leave_doc = data.leave_doc;
          }
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
        });
    },
    getOptions() {
      let ids = JSON.stringify(["leave_type"]);
      HrSettingService.getSettings(ids)
        .then(({ data }) => {
          if (data != undefined && data != "") {
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

      this.$http
        .get("/employees-create")
        .then(({ data }) => {
          if (data != undefined && data != "") {
            const employees = this.options.employees;

            data.employees.map(function (val) {
              employees.push({ value: val.uuid, label: val.full_name.en });
            });
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
