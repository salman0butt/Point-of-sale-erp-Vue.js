<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardBody>
            <CDataTable
              :items="employeeTarget"
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
import EmployeeTargetService from "@/services/employees/EmployeeTargetService";
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
  { key: "type", label: "TYPE", _style: "min-width:15%;" },
  { key: "periodic", label: "PERIODIC", _style: "min-width:15%;" },
  { key: "detail", label: "DETAIL", _style: "min-width:15%;" },
  { key: "actions", label: "ACTION", _style: "min-width:15%;" },
];
export default {
  name: "EmployeeTargetIndex",
  cilPencil,
  cilTrash,
  cilEye,
  data() {
    return {
      employeeTargetData: [],
      fields,
      loading: false,
      deleteRows: [],
      empId: null,
    };
  },
  created() {
    this.loading = true;
    this.getEmployeeTarget();
  },
  computed: {
    employeeTarget() {
      return this.employeeTargetData;
    },
  },
  methods: {
    getEmployeeTarget() {
      this.empId = this.$route.params.id;

      EmployeeTargetService.getAll(this.empId)
        .then(({ data }) => {
          this.loading = false;
          if (data != null && data != "") {
            this.employeeTargetData = [];
            data.data.map((item, id) => {
              this.employeeTargetData.push({ ...item, id });
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
          this.employeeTargetData.map(function (item) {
            return item.id;
          })
        );
        let max = Math.max(...arr);
        obj.data.id = max + 1;
        this.employeeTargetData.push(obj.data);
      } else {
        this.employeeTargetData.map(function (item) {
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
      const val = Boolean(this.employeeTargetData[item.id]._selected);
      this.$set(this.employeeTargetData[item.id], "_selected", !val);
    },
    viewRow(uuid) {
      alert("page not ready");
    },
    editRow(uuid) {
      this.$emit("employee-target-edit", uuid);
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
            EmployeeTargetService.delete(this.deleteRows)
              .then((res) => {
                if (res.status == 200) {
                  this.$swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Target Deleted Successfully",
                    timer: 3600,
                  });
                  this.employeeTargetData = this.employeeTargetData.filter(
                    (item) => item.uuid != uuid
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
