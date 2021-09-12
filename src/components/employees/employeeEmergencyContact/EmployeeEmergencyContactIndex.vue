<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardBody>
            <CDataTable
              :items="employeeEmergencyContact"
              :fields="fields"
              table-filter
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
                      title="View"
                      >View</CButton
                    >
                    <CButton
                      @click="editRow(item.uuid)"
                      class="btn-sm text-white"
                      color="warning"
                      title="Edit"
                    >
                      <CIcon :content="$options.cilPencil"
                    /></CButton>
                    <CButton
                      @click="deleteRow(item.uuid)"
                      class="btn-sm"
                      color="danger"
                      title="Delete"
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
import EmployeeEmergencyContactService from "@/services/employees/EmployeeEmergencyContactService";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";

const fields = [
  {
    key: "select",
    label: "",
    _style: "min-width:1%",
    sorter: false,
    filter: false,
  },
  { key: "name", label: "NAME", _style: "min-width:40%" },
  { key: "relationship", label: "RELATION", _style: "min-width:15%;" },
  { key: "phone_number", label: "PHONE NUMBER", _style: "min-width:15%;" },
  { key: "address", label: "ADDRESS", _style: "min-width:15%;" },
  { key: "actions", label: "ACTION", _style: "min-width:15%;" },
];
export default {
  name: "EmployeeEmergencyContactIndex",
  cilPencil,
  cilTrash,
  cilEye,
  data() {
    return {
      employeeEmergencyContactData: [],
      fields,
      loading: false,
      deleteRows: [],
      empId: null,
    };
  },
  created() {
    this.loading = true;
    this.getEmployeeEmergencyContact();
  },
  computed: {
    employeeEmergencyContact() {
      return this.employeeEmergencyContactData;
    },
  },
  methods: {
    getEmployeeEmergencyContact() {
      this.empId = this.$route.params.id;

      EmployeeEmergencyContactService.getAll(this.empId)
        .then(({ data }) => {
          this.loading = false;
          if (data != null && data != "") {
            this.employeeEmergencyContactData = [];
            data.data.map((item, id) => {
              this.employeeEmergencyContactData.push({ ...item, id });
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateTableData(obj) {
      if (obj.type === "create") {
        let arr = Object.values(
          this.employeeEmergencyContactData.map(function (item) {
            return item.id;
          })
        );
        let max = Math.max(...arr);
        obj.data.id = max + 1;
        this.employeeEmergencyContactData.push(obj.data);
      } else {
        this.employeeEmergencyContactData.map(function (item) {
          if (item.uuid === obj.data.uuid) {
            obj.data.id = item.id;
            return Object.assign(item, obj.data);
          }
        });
      }
    },
    rowClicked(item, index, column, e) {
      if (!["INPUT", "LABEL"].includes(e.target.tagName)) {
        this.check(item);
      }
    },
    check(item) {
      const val = Boolean(this.employeeEmergencyContactData[item.id]._selected);
      this.$set(this.employeeEmergencyContactData[item.id], "_selected", !val);
    },
    viewRow(uuid) {
      alert("page not ready");
    },
    editRow(uuid) {
      this.$emit("employee-emergency-contact-edit", uuid);
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
            EmployeeEmergencyContactService.delete(this.deleteRows)
              .then((res) => {
                if (res.status == 200) {
                  this.$swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Emergency Contact Deleted Successfully",
                    timer: 3600,
                  });
                  this.employeeEmergencyContactData = this.employeeEmergencyContactData.filter(
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
