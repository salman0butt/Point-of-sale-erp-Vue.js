<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardBody>
            <CDataTable
              :items="employeeBankAccount"
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
import EmployeeBankAccountService from "@/services/employees/EmployeeBankAccountService";
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
  { key: "iban", label: "IBAN NUMBER", _style: "min-width:15%;" },
  { key: "account_number", label: "ACCOUNT NUMBER", _style: "min-width:15%;" },
  { key: "bank_name", label: "BANK NAME", _style: "min-width:15%;" },
  { key: "swift", label: "SWIFT", _style: "min-width:15%;" },
  { key: "actions", label: "ACTION", _style: "min-width:15%;" },
];

export default {
  name: "EmployeeBankAccountIndex",
  cilPencil,
  cilTrash,
  cilEye,
  data() {
    return {
      employeeBankAccountData: [],
      fields,
      loading: false,
      deleteRows: [],
      empId: null,
    };
  },
  created() {
    this.loading = true;
    this.getEmployeeBankAccount();
  },
  computed: {
    employeeBankAccount() {
      return this.employeeBankAccountData;
    },
  },
  methods: {
    getEmployeeBankAccount() {
      this.empId = this.$route.params.id;

      EmployeeBankAccountService.getAll(this.empId)
        .then(({ data }) => {
          this.employeeBankAccountData = [];
          data.data.map((item, id) => {
            this.employeeBankAccountData.push({ ...item, id });
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
      const val = Boolean(this.employeeBankAccountData[item.id]._selected);
      this.$set(this.employeeBankAccountData[item.id], "_selected", !val);
    },
    viewRow(uuid) {
      alert("page not ready");
    },
    editRow(uuid) {
      this.$emit("employeeBankAccountEdit", uuid);
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
            EmployeeBankAccountService.delete(this.deleteRows)
              .then((res) => {
                if (res.status == 200) {
                  this.$swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Address Deleted Successfully",
                    timer: 3600,
                  });
                  this.employeeBankAccountData = this.employeeBankAccountData.filter(
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
