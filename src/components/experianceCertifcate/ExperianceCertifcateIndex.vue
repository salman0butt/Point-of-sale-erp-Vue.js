<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardBody>
            <CDataTable
              :items="employeeExperianceCertifcate"
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
              <template #employee="{ item }">
                <td>
                  {{ item.employee.full_name }}
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
import ExperianceCertifcateService from "@/services/experianceCertifcate/ExperianceCertifcateService";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";

const fields = [
  // {
  //   key: "select",
  //   label: "",
  //   _style: "min-width:1%",
  //   sorter: false,
  //   filter: false,
  // },
  { key: "employee", label: "EMPLOYEE", _style: "min-width:15%;" },
  { key: "name", label: "NAME", _style: "min-width:15%;" },
  { key: "type", label: "TYPE", _style: "min-width:15%;" },
  { key: "from_date", label: "FROM DATE", _style: "min-width:15%;" },
  { key: "to_date", label: "TO DATE", _style: "min-width:15%;" },
  { key: "status", label: "STATUS", _style: "min-width:15%;" },
  { key: "actions", label: "ACTION", _style: "min-width:15%;" },
];

export default {
  name: "ExperianceCertifcateIndex",
  cilPencil,
  cilTrash,
  cilEye,
  data() {
    return {
      employeeExperianceCertifcateData: [],
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
    this.getExperianceCertifcate();
  },
  computed: {
    employeeExperianceCertifcate() {
      return this.employeeExperianceCertifcateData;
    },
  },
  watch: {
    reloadParams() {
      this.onTableChange();
    },
    activePage() {
      this.getExperianceCertifcate(this.activePage, this.perPage);
    },
  },
  methods: {
    getExperianceCertifcate(page = "", per_page = "") {
      this.empId = this.$route.params.id;

      ExperianceCertifcateService.getAll(this.empId, page, per_page)
        .then(({ data }) => {
          console.log(data);
          if (data !== "" && data !== undefined) {
            this.employeeExperianceCertifcateData = [];
            this.loading = true;
            if (data.data) {
              data.data.map((item, id) => {
                this.employeeExperianceCertifcateData.push({ ...item, id });
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
      const val = Boolean(this.employeeExperianceCertifcateData[item.id]._selected);
      this.$set(this.employeeExperianceCertifcateData[item.id], "_selected", !val);
    },
    viewRow(uuid) {
      alert("page not ready");
    },
    editRow(uuid) {
      this.$emit("employee-experiance-certifcate-edit", uuid);
    },

    deleteRow(uuid) {
      this.deleteRows = JSON.stringify([uuid]);
      this.$swal
        .fire({
          title: "Are you sure you want to delete this record?",
          text: "This will be record from Database",
          showCancelButton: true,
          confirmButtonColor: "#e55353",
          confirmButtonText: "Yes, remove it it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            ExperianceCertifcateService.delete(this.deleteRows)
              .then((res) => {
                if (res.status == 200) {
                  this.$swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Experiance Certifcate Deleted Successfully",
                    timer: 3600,
                  });
                  this.employeeExperianceCertifcateData = this.employeeExperianceCertifcateData.filter(
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
        this.employeeExperianceCertifcateData = agent.currentItems;
        this.pages = Math.ceil(agent.sortedItems.length / 5);
      }, 1000);
    },
    changePagination(value) {
      this.perPage = parseInt(value);
      this.getExperianceCertifcate("", this.perPage);
    },
  },
};
</script>
