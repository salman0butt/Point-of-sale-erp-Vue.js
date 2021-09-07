<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form @submit.prevent="isEditing ? updateEmployeeDetail() : saveEmployeeDetail()">
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Join Date"
                type="date"
                v-model="form.join_date"
                :class="{ error: $v.form.join_date.$error }"
                @input="$v.form.join_date.$touch()"
              />
              <div v-if="$v.form.join_date.$error">
                <p v-if="!$v.form.join_date.required" class="errorMsg">
                  Join Date is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="End Date"
                type="date"
                v-model="form.end_date"
                :class="{ error: $v.form.end_date.$error }"
                @input="$v.form.end_date.$touch()"
              />
              <div v-if="$v.form.end_date.$error">
                <p v-if="!$v.form.end_date.required" class="errorMsg">
                  End Date is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Leave Days"
                type="number"
                v-model="form.leave_days"
                :class="{ error: $v.form.leave_days.$error }"
                @input="$v.form.leave_days.$touch()"
              />
              <div v-if="$v.form.leave_days.$error">
                <p v-if="!$v.form.leave_days.required" class="errorMsg">
                  Leave Days is required
                </p>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Sick Leave days"
                type="number"
                v-model="form.sick_leave_days"
                :class="{ error: $v.form.sick_leave_days.$error }"
                @input="$v.form.sick_leave_days.$touch()"
              />
              <div v-if="$v.form.sick_leave_days.$error">
                <p v-if="!$v.form.sick_leave_days.required" class="errorMsg">
                  Sick Leave days is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Total Days Off"
                type="number"
                v-model="form.tot_days_off"
                :class="{ error: $v.form.tot_days_off.$error }"
                @input="$v.form.tot_days_off.$touch()"
              />
              <div v-if="$v.form.tot_days_off.$error">
                <p v-if="!$v.form.tot_days_off.required" class="errorMsg">
                  Total Days Off is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Working Hours"
                type="number"
                v-model="form.working_hours"
                :class="{ error: $v.form.working_hours.$error }"
                @input="$v.form.working_hours.$touch()"
              />
              <div v-if="$v.form.working_hours.$error">
                <p v-if="!$v.form.working_hours.required" class="errorMsg">
                  Working Hours is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput label="Employee Refernce" v-model="form.employee_ref" />
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
              :disabled="$v.$invalid"
              >Save</CButton
            >
          </CRow>
        </form>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import EmployeeDetailService from "@/services/employees/EmployeeDetailService";
import { required, numeric } from "vuelidate/lib/validators";

export default {
  name: "EmployeeDetailForm",
  data: () => ({
    isEditing: false,
    form: {
      id: null,
      employee_id: "",
      join_date: "",
      end_date: "",
      leave_days: 0,
      sick_leave_days: 0,
      tot_days_off: 0,
      working_hours: 0,
      employee_ref: "",
    },
    empId: null,
  }),
  validations() {
    return {
      form: {
        join_date: { required },
        end_date: { required },
        leave_days: { required, numeric },
        sick_leave_days: { required, numeric },
        tot_days_off: { required, numeric },
        working_hours: { required, numeric },
      },
    };
  },
  created() {
    this.empId = this.empId = this.$route.params.id;
    this.getEmployeeDetail();
  },
  methods: {
    saveEmployeeDetail() {
      this.form.employee_id = this.$route.params.id;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        EmployeeDetailService.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Detail Added Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.getEmployeeDetail();
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
    updateEmployeeDetail() {
      this.form.employee_id = this.$route.params.id;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        EmployeeDetailService.update(this.form.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Detail Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();
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
    getEmployeeDetail() {
      EmployeeDetailService.get(this.empId)
        .then(({ data }) => {
          this.isEditing = true;
          this.form.id = data.uuid;
          this.form.employee_id = data.employee_id;
          this.form.join_date = data.join_date;
          this.form.end_date = data.end_date;
          this.form.leave_days = data.leave_days;
          this.form.sick_leave_days = data.sick_leave_days;
          this.form.tot_days_off = data.tot_days_off;
          this.form.working_hours = data.working_hours;
          this.form.employee_ref = data.employee_ref;
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
        });
    },
  },
};
</script>

<style>
.errorMsg {
  color: red;
}
</style>
