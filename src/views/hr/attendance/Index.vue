<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Attendance Report </CCardHeader>
          <CCardBody>
            <CRow>
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
            </CRow>
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
              <template #select="{ item }">
                <td>
                  <CInputCheckbox
                    :checked="item._selected"
                    @update:checked="() => check(item)"
                    custom
                  />
                </td>
              </template>
              <template #business="{ item }">
                <td>
                  {{ item.name }}
                </td>
              </template>
              <template #parent="{ item }">
                <td>
                  {{ item.name }}
                </td>
              </template>
              <template #actions="{ item }">
                <td>
                  <CButtonGroup>
                    <CButton
                      @click="viewRow(item.uuid)"
                      class="btn-sm"
                      color="success"
                      >View</CButton
                    >
                    <CButton
                      @click="editRow(item.uuid)"
                      class="btn-sm text-white"
                      color="warning"
                    >
                      <CIcon :content="$options.cilPencil"
                    /></CButton>
                    <CButton
                      @click="deleteRow(item.uuid)"
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
  { key: "", label: "Status", _style: "min-width:15%;" },
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
    };
  },
  created() {
    this.getAttendance();
  },
  computed: {},
  methods: {
    getAttendance() {
      this.$http
        .get("attendances", {
          params: {
            from_date: "2021-09-12",
            to_date: "2021-09-18",
          },
          headers: {
            branches: "[1]",
          },
        })
        .then((res) => {
          res.data.map((item, id) => {
            // item.working_hours = moment();

            this.attendance.push({ ...item, id });

            // console.log(item.check_in);
            // console.log(item.check_out);
          });
          this.loading = false;
          // console.log(res.data);

          // this.$swal.fire({
          //   icon: "success",
          //   title: "Success",
          //   text: "Branch Updated Successfully",
          //   timer: 3600,
          // });
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
    editRow(uuid) {
      this.$router.push({ path: "/designations/edit/" + uuid });
    },

    deleteRow(uuid) {
      this.deleteRows = JSON.stringify([uuid]);
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
            DesignationService.delete(this.deleteRows)
              .then((res) => {
                if (res.status == 200) {
                  this.$swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Department Deleted Successfully",
                    timer: 3600,
                  });
                  this.designationsData = this.designationsData.filter(
                    (department) => department.uuid != uuid
                  );
                  this.deleteRows = [];
                }
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
