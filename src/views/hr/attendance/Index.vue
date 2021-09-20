<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Attendance Report </CCardHeader>
          <CCardBody>
            <form @submit.prevent="getAttendance()">
              <!-- <CRow>
                <CCol>
                  <CMultiSelect
                    :search="true"
                    :selected="[]"
                    :selection="true"
                    optionsEmptyPlaceholder="No options placeholder"
                    searchPlaceholder="Search"
                    selectionType="tags"
                  >
                  </CMultiSelect>
                </CCol>
              </CRow> -->
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput label="From" type="date" v-model="from_date" />
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput label="To" type="date" v-model="to_date" />
                </CCol>
              </CRow>
              <CCol sm="6" md="4" class="pt-2">
                <CButton block color="success" type="submit">Submit </CButton>
              </CCol>
            </form>
          </CCardBody>
        </CCard>
        <CCard>
          <CCardBody>
            <!-- <router-link
              class="btn btn-success"
              to="/attendance/create-attendance-by-machine"
              >Create Attendance</router-link
            > -->
            <CDataTable
              :items="attendance"
              :fields="fields"
              items-per-page-select
              :items-per-page="5"
              sorter
              pagination
              clickable-rows
              hover
              :loading="loading"
              @row-clicked="rowClicked"
            >
              <template #actions="{ item }">
                <td>
                  <CButtonGroup>
                    <!-- <CButton
                      @click="viewRow(item.uuid)"
                      class="btn-sm"
                      color="success"
                      >View</CButton
                    > -->
                    <CButton
                      @click="editRow(item.check_in_id, item.check_out_id)"
                      class="btn-sm text-white"
                      color="warning"
                    >
                      <CIcon :content="$options.cilPencil"
                    /></CButton>
                    <CButton
                      @click="deleteRow(item.check_in_id, item.check_out_id)"
                      class="btn-sm"
                      color="danger"
                    >
                      <CIcon :content="$options.cilTrash" />
                    </CButton>
                  </CButtonGroup>
                </td>
              </template>
            </CDataTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import DesignationService from "@/services/designations/DesignationService";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";
import moment from "moment";

const fields = [
  {
    key: "emp_serial",
    label: "Employee Serial",
    _style: "min-width:40%",
  },
  { key: "name", label: "Employee Name", _style: "min-width:15%;" },
  { key: "date", label: "Date", _style: "min-width:15%;" },
  { key: "check_in", label: "In Time", _style: "min-width:15%;" },
  { key: "check_out", label: "Out Time", _style: "min-width:15%;" },
  { key: "working_hours", label: "Work Time", _style: "min-width:15%;" },
  { key: "actions", label: "Actions", _style: "min-width:15%;" },
];

export default {
  name: "IndexAttendance",
  cilPencil,
  cilTrash,
  cilEye,
  data() {
    return {
      attendance: [],
      loading: true,
      fields,
      deleteRows: [],
      from_date: "",
      to_date: "",
    };
  },
  created() {
    this.currentDateTime();
    this.getAttendance();
  },
  computed: {},
  methods: {
    currentDateTime() {
      this.from_date = moment().subtract(1, "months").format("YYYY-MM-DD");
      this.to_date = moment().format("YYYY-MM-DD");
    },
    getAttendance() {
      this.loading = true;

      this.$http
        .get("attendances", {
          params: {
            from_date: this.from_date,
            to_date: this.to_date,
          },
          headers: {
            branches: "[1]",
          },
        })
        .then((res) => {
          this.attendance = [];
          res.data.map((item, id) => {
            item.working_hours = moment
              .utc(
                moment(item.check_out, "HH:mm:ss").diff(
                  moment(item.check_in, "HH:mm:ss")
                )
              )
              .format("HH:mm:ss");
            this.attendance.push({ ...item, id });
          });
          this.loading = false;
        })
        .catch((error) => {
          // console.log(error);
        });
    },
    rowClicked(item, index, column, e) {
      if (!["INPUT", "LABEL"].includes(e.target.tagName)) {
        this.check(item);
      }
    },
    check(item) {
      const val = Boolean(this.designationsData[item.id]._selected);
      this.$set(this.designationsData[item.id], "_selected", !val);
    },
    viewRow(uuid) {
      alert("page not ready");
    },
    editRow(check_in, check_out) {
      let ids = window.btoa(JSON.stringify([check_in, check_out]));
      this.$router.push({ path: "edit/" + ids });
    },
    deleteRow(check_in_uuid, check_out_uuid) {
      let ids = JSON.stringify([check_in_uuid, check_out_uuid]);

      this.$swal
        .fire({
          title: "Do you want to delete this record",
          text: "This will be record from Database",
          showCancelButton: true,
          confirmButtonColor: "#e55353",
          confirmButtonText: "Yes, remove it it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$http
              .delete("/attendances/" + ids)
              .then((res) => {
                if (res.status == 200) {
                  this.$swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Attendance Deleted Successfully",
                    timer: 3600,
                  });
                }
                this.$router.go({ name: "IndexAttendance" });
              })
              .catch((error) => {
                this.$swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Something went Wrong",
                  timer: 3600,
                });
              });
          }
        });
    },
  },
};
</script>
<style scoped>
.bolder {
  font-weight: 600;
}
</style>
