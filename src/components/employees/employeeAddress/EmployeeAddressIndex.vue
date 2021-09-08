<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardBody>
            <CDataTable
              :items="employeeAddresses"
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
import EmployeeAddressService from "@/services/employees/EmployeeAddressService";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";
//TODO error in employee address
const fields = [
  {
    key: "select",
    label: "",
    _style: "min-width:1%",
    sorter: false,
    filter: false,
  },
  { key: "address", label: "ADDRESS", _style: "min-width:40%" },
  { key: "address2", label: "SECOND ADDRESS", _style: "min-width:15%;" },
  { key: "city", label: "CITY", _style: "min-width:15%;" },
  { key: "postal_code", label: "POSTAL CODE", _style: "min-width:15%;" },
  { key: "set_default", label: "DEFAULT", _style: "min-width:15%;" },
  { key: "actions", label: "ACTION", _style: "min-width:15%;" },
];

export default {
  name: "EmployeeAddressIndex",
  cilPencil,
  cilTrash,
  cilEye,
  data() {
    return {
      employeeAddressesData: [],
      fields,
      loading: false,
      deleteRows: [],
      empId: null,
    };
  },
  created() {
    this.loading = true;
    this.getEmployeeAddressData();
  },
  computed: {
    employeeAddresses() {
      return this.employeeAddressesData;
    },
  },
  methods: {
    getEmployeeAddressData() {
      this.empId = this.$route.params.id;

      EmployeeAddressService.getAll(this.empId)
        .then(({ data }) => {
          this.employeeAddressesData = [];
          data.data.map((item, id) => {
            this.employeeAddressesData.push({ ...item, id });
          });
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    rowClicked(item, index, column, e) {
      if (!["INPUT", "LABEL"].includes(e.target.tagName)) {
        this.check(item);
      }
    },
    check(item) {
      const val = Boolean(this.employeeAddressesData[item.id]._selected);
      this.$set(this.employeeAddressesData[item.id], "_selected", !val);
    },
    viewRow(uuid) {
      alert("page not ready");
    },
    editRow(uuid) {
      this.$emit("employeeAddressEdit", uuid);
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
            EmployeeAddressService.delete(this.deleteRows)
              .then((res) => {
                if (res.status == 200) {
                  this.$swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Address Deleted Successfully",
                    timer: 3600,
                  });
                  this.employeeAddressesData = this.employeeAddressesData.filter(
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
