<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardBody>
            <CDataTable
              :items="employeeComplain"
              :fields="fields"
              table-filter
              items-per-page-select
              @pagination-change="changePagination"
              :items-per-page="perPage"
              sorter
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
              <template #branch="{ item }">
                <td>
                  {{ item.branch.name.en }}
                </td>
              </template>
              <template #from_employee="{ item }">
                <td>
                  {{ item.from_employee.full_name.en }}
                </td>
              </template>
              <template #to_employee="{ item }">
                <td>
                  {{ item.to_employee.full_name.en }}
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
import EmployeeComplainService from "@/services/employees/EmployeeComplainService";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";

const fields = [
  {
    key: "select",
    label: "",
    _style: "min-width:1%",
    sorter: false,
    filter: false,
  },
  { key: "branch", label: "Branch", _style: "min-width:40%" },
  { key: "from_employee", label: "FROM EMPLOYEE", _style: "min-width:15%;" },
  { key: "to_employee", label: "TO EMPLOYEE", _style: "min-width:15%;" },
  { key: "title", label: "TITLE", _style: "min-width:15%;" },
  { key: "description", label: "DESCRIPTION", _style: "min-width:15%;" },
  { key: "date", label: "DATE", _style: "min-width:15%;" },
  { key: "actions", label: "ACTION", _style: "min-width:15%;" },
];
export default {
  name: "EmployeeComplainIndex",
  cilPencil,
  cilTrash,
  cilEye,
  data() {
    return {
      employeeComplainData: [],
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
    this.getEmployeeComplain();
  },
  computed: {
    employeeComplain() {
      return this.employeeComplainData;
    },
  },
  watch: {
    reloadParams() {
      this.onTableChange();
    },
    activePage() {
      this.getEmployeeComplain(this.activePage, this.perPage);
    },
  },
  methods: {
    getEmployeeComplain(page = "", per_page = "") {
      this.empId = this.$route.params.id;

      EmployeeComplainService.getAll(this.empId, page, per_page)
        .then(({ data }) => {
          if (data !== "" && data !== undefined) {
            this.employeeComplainData = [];
            this.loading = true;
            if (data.data) {
              data.data.map((item, id) => {
                this.employeeComplainData.push({ ...item, id });
              });
            }
            if (data.meta) {
              this.setPagination(data.meta);
            }
            // console.log(this.employeeComplainData);
            this.loading = false;
          }
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
      const val = Boolean(this.employeeComplainData[item.id]._selected);
      this.$set(this.employeeComplainData[item.id], "_selected", !val);
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
            EmployeeComplainService.delete(this.deleteRows)
              .then((res) => {
                if (res.status == 200) {
                  this.$swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Complain Deleted Successfully",
                    timer: 3600,
                  });
                  this.employeeComplainData = this.employeeComplainData.filter(
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
    setPagination(meta) {
      this.activePage = parseInt(meta.current_page);
      this.pages = parseInt(meta.last_page);
      this.perPage = parseInt(meta.per_page);
    },
    onTableChange() {
      setTimeout(() => {
        this.loading = false;
        const agent = this.$refs.externalAgent;
        this.employeeComplainData = agent.currentItems;
        this.pages = Math.ceil(agent.sortedItems.length / 5);
      }, 1000);
    },
    changePagination(value) {
      this.perPage = parseInt(value);
      this.getEmployeeComplain("", this.perPage);
    },
  },
};
</script>
