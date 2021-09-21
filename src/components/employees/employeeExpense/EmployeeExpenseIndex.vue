<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardBody>
            <CDataTable
              :items="employeeExpense"
              :fields="fields"
              table-filter
              items-per-page-select
              @pagination-change="changePagination"
              :items-per-page="perPage"
              sorter
              pagination
              clickable-rows
              hover
              :loading="loading"
              @row-clicked="rowClicked"
              ref="externalAgent"
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
            <CPagination
              v-show="pages > 1"
              :pages="pages"
              :active-page.sync="activePage"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import EmployeeExpenseService from "@/services/employees/EmployeeExpenseService";
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
  { key: "amount", label: "AMOUNT", _style: "min-width:15%;" },
  { key: "detail", label: "DETAIL", _style: "min-width:15%;" },
  { key: "actions", label: "ACTION", _style: "min-width:15%;" },
];
export default {
  name: "EmployeeExpenseIndex",
  cilPencil,
  cilTrash,
  cilEye,
  data() {
    return {
      employeeExpenseData: [],
      fields,
      loading: false,
      deleteRows: [],
      empId: null,
      activePage: 1,
      pages: 0,
      perPage: 10,
    };
  },
  created() {
    this.loading = true;
    this.getEmployeeExpense();
  },
  watch: {
    reloadParams() {
      this.onTableChange();
    },
    activePage() {
      this.getDesignationData(this.activePage, this.perPage);
    },
  },
  computed: {
    employeeExpense() {
      return this.employeeExpenseData;
    },
  },
  methods: {
    getEmployeeExpense(page = "", per_page = "") {
      this.empId = this.$route.params.id;

      EmployeeExpenseService.getAll(this.empId, page, per_page)
        .then(({ data }) => {
          if (data !== "" && data !== undefined) {
            this.employeeExpenseData = [];
            this.loading = true;
            if (data.data) {
              data.data.map((item, id) => {
                this.employeeExpenseData.push({ ...item, id });
              });
            }
            if (data.meta) {
              this.setPagination(data.meta);
            }
          }
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateTableData(obj) {
      if (obj.type === "create") {
        let arr = Object.values(
          this.employeeExpenseData.map(function (item) {
            return item.id;
          })
        );
        let max = Math.max(...arr);
        obj.data.id = max + 1;
        this.employeeExpenseData.push(obj.data);
      } else {
        this.employeeExpenseData.map(function (item) {
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
      const val = Boolean(this.employeeExpenseData[item.id]._selected);
      this.$set(this.employeeExpenseData[item.id], "_selected", !val);
    },
    viewRow(uuid) {
      alert("page not ready");
    },
    editRow(uuid) {
      this.$emit("employee-expense-edit", uuid);
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
            EmployeeExpenseService.delete(this.deleteRows)
              .then((res) => {
                if (res.status == 200) {
                  this.$swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Expense Deleted Successfully",
                    timer: 3600,
                  });
                  this.employeeExpenseData = this.employeeExpenseData.filter(
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
    setPagination(meta) {
      this.activePage = parseInt(meta.current_page);
      this.pages = parseInt(meta.last_page);
      this.perPage = parseInt(meta.per_page);
    },
    onTableChange() {
      setTimeout(() => {
        this.loading = false;
        const agent = this.$refs.externalAgent;
        this.designationsData = agent.currentItems;
        this.pages = Math.ceil(agent.sortedItems.length / 5);
      }, 1000);
    },
    changePagination(value) {
      this.perPage = parseInt(value);
      this.getDesignationData("", this.perPage);
    },
  },
};
</script>
<style scoped>
.bolder {
  font-weight: 600;
}
</style>
