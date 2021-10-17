<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardBody>
            <CDataTable
              :items="employeeSalary"
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
              <template #payment="{ item }">
                <td>
                  <CBadge color="danger" v-if="item.payment === 0"> Unpaid</CBadge>
                  <CBadge
                    color="primary"
                    v-if="item.payment > 0 && item.payment < item.payable_salary"
                  >
                    Pending</CBadge
                  >
                  <CBadge color="success" v-if="item.payment >= item.payable_salary">
                    Paid</CBadge
                  >
                </td>
              </template>
              <template #actions="{ item }">
                <td>
                  <CButtonGroup>
                    <!-- <CButton
                      @click="viewRow(item.uuid)"
                      class="btn-sm"
                      color="success"
                      title="View"
                      >View</CButton
                    > -->
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
import EmployeeSalaryAdjustmentService from "@/services/employees/EmployeeSalaryAdjustmentService";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";

const fields = [
  // {
  //   key: "select",
  //   label: "",
  //   _style: "min-width:1%",
  //   sorter: false,
  //   filter: false,
  // },
  { key: "month", label: "MONTH", _style: "min-width:40%" },
  // { key: "total_working_days", label: "TOTAL WORKING DAYS", _style: "min-width:15%;" },
  // { key: "total_days", label: "TOTAL DAYS", _style: "min-width:15%;" },
  // { key: "total_leaves", label: "TOTAL LEAVES", _style: "min-width:15%;" },
  // { key: "total_absents", label: "TOTAL ABSENT", _style: "min-width:15%;" },
  { key: "basic_salary", label: "BASIC SALARY", _style: "min-width:15%;" },
  { key: "total_earnings", label: "TOTAL EARNINGS", _style: "min-width:15%;" },
  { key: "total_deductions", label: "TOTAL DEDUCTIONS", _style: "min-width:15%;" },
  { key: "net_salary", label: "NET SALARY", _style: "min-width:15%;" },
  { key: "payable_salary", label: "PAYABLE SALARY", _style: "min-width:15%;" },
  { key: "payment", label: "PAYMENT", _style: "min-width:15%;" },
  { key: "actions", label: "ACTION", _style: "min-width:15%;" },
];

export default {
  name: "EmployeeSalaryIndex",
  cilPencil,
  cilTrash,
  cilEye,
  data() {
    return {
      employeeSalaryData: [],
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
    this.getEmployeeSalary();
  },
  computed: {
    employeeSalary() {
      return this.employeeSalaryData;
    },
  },
  watch: {
    reloadParams() {
      this.onTableChange();
    },
    activePage() {
      this.getEmployeeSalary(this.activePage, this.perPage);
    },
  },
  methods: {
    getEmployeeSalary(page = "", per_page = "") {
      this.empId = this.$route.params.id;

      EmployeeSalaryAdjustmentService.getAll(this.empId, page, per_page)
        .then(({ data }) => {
          console.log(data);
          if (data !== "" && data !== undefined) {
            this.loading = true;
            this.employeeSalaryData = [];
            if (data.data) {
              data.data.map((item, id) => {
                this.employeeSalaryData.push({ ...item, id });
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
    rowClicked(item, index, column, e) {
      if (!["INPUT", "LABEL"].includes(e.target.tagName)) {
        this.check(item);
      }
    },
    check(item) {
      const val = Boolean(this.employeeSalaryData[item.id]._selected);
      this.$set(this.employeeSalaryData[item.id], "_selected", !val);
    },
    viewRow(uuid) {
      alert("page not ready");
    },
    editRow(uuid) {
      this.$emit("employee-salary-edit", uuid);
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
            EmployeeSalaryAdjustmentService.delete(this.deleteRows)
              .then((res) => {
                if (res.status == 200) {
                  this.$swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Salary Deleted Successfully",
                    timer: 3600,
                  });
                  this.employeeSalaryData = this.employeeSalaryData.filter(
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
        this.employeeSalaryData = agent.currentItems;
        this.pages = Math.ceil(agent.sortedItems.length / 5);
      }, 1000);
    },
    changePagination(value) {
      this.perPage = parseInt(value);
      this.getEmployeeSalary("", this.perPage);
    },
  },
};
</script>
<style scoped>
.bolder {
  font-weight: 600;
}
</style>
