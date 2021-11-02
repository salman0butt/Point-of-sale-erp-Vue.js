<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Attendance View </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol xs="12" lg="12">
                <CCardHeader> <strong>Employee</strong> Information </CCardHeader>
                <CCardBody>
                  <CForm>
                    <CInput
                      label="Employee Name : "
                      horizontal
                      autocomplete="name"
                      disabled
                      v-model="employee.name"
                    />
                    <CInput
                      label="Employee Serial : "
                      horizontal
                      disabled
                      v-model="employee.serial"
                    />
                    <CInput
                      label="Employee Designation : "
                      horizontal
                      disabled
                      v-model="employee.designation"
                    />
                  </CForm>
                </CCardBody>
                <CCardHeader> <strong>Attendance</strong> Information </CCardHeader>
                <CCardBody>
                  <CForm>
                    <CInput
                      label="Date : "
                      horizontal
                      disabled
                      v-model="attendance.date"
                    />
                    <CInput
                      type="time"
                      label="Check In : "
                      horizontal
                      v-model="attendance.check_in"
                    />
                    <CInput
                      label="Check Out : "
                      type="time"
                      horizontal
                      v-model="attendance.check_out"
                    />

                    <CButton
                      block
                      color="success"
                      @click.prevent="updateData"
                      style="float: right; width: 100px"
                      >Update</CButton
                    >
                  </CForm>
                </CCardBody>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
// import { cibHtmlacademy } from "@coreui/icons";
import { mapActions } from "vuex";

export default {
  name: "EditAttendance",
  data() {
    return {
      employee: {
        name: "",
        serial: "",
        designation: "",
      },
      attendance: {
        date: "",
        check_in: "",
        check_out: "",
      },
    };
  },

  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$http.get("attendances/" + window.atob(this.$route.params.id)).then((res) => {
        this.employee.name = res.data.employee.full_name.en;
        this.employee.serial = res.data.employee.emp_serial;
        this.employee.designation = res.data.employee.designation.name;
        if (res.data.check_in != null) {
          this.attendance.date = res.data.check_in.date;
          this.attendance.check_in = res.data.check_in.time;
          this.attendance.check_out = res.data.check_out.time;
        } else {
          this.attendance.date = res.data.check_out.date;
          this.attendance.check_out = res.data.check_out.time;
        }
      });
    },
    updateData() {
      let array = window.atob(this.$route.params.id);
      this.$http.put("attendances/" + array, this.attendance).then((res) => {
        if (res.status == 200) {
          this.$swal.fire({
            icon: "success",
            title: "Success",
            text: "Data Updated Successfully",
            timer: 3600,
          });
          this.$router.push({ name: "IndexAttendance" });
        } else {
          this.$swal.fire({
            icon: "error",
            title: "Error",
            text: "Something went Wrong",
            timer: 3600,
          });
        }
      });
    },
  },
};
</script>
<style>
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: #fff;
  background-color: #10163a !important;
}
.success {
  color: green;
}
.error {
  color: red;
}
</style>
