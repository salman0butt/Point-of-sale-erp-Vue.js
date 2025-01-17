<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CDataTable
          :items="employeeTermination"
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
          <!-- <template #select="{ item }">
            <td>
              <CInputCheckbox
                :checked="item._selected"
                @update:checked="() => check(item)"
                custom
              />
            </td>
          </template> -->
          <template #termination_to="{ item }">
            <td>
              {{ item.termination_to.full_name }}
            </td>
          </template>
          <template #termination_from="{ item }">
            <td>
              {{ item.termination_from.full_name }}
            </td>
          </template>
          <template #status="{ item }">
            <td>
              {{ item.status ? item.status : "" }}
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
        <CPagination v-show="pages > 1" :pages="pages" :active-page.sync="activePage" />
      </CCol>
    </CRow>
  </div>
</template>

<script>
import TerminationService from "@/services/terminations/TerminationService";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";

const fields = [
  // {
  //   key: "select",
  //   label: "",
  //   _style: "min-width:1%",
  //   sorter: false,
  //   filter: false,
  // },
  { key: "termination_type", label: "TERMINATION TYPE", _style: "min-width:15%;" },
  { key: "termination_date", label: "TERMINATION DATE", _style: "min-width:15%;" },
  { key: "termination_from", label: "TERMINATION FROM", _style: "min-width:15%;" },
  { key: "termination_to", label: "TERMINATION TO", _style: "min-width:15%;" },
  // { key: "description", label: "DESCRIPTION", _style: "min-width:15%;" },
  { key: "notice_date", label: "NOTICE DATE", _style: "min-width:15%;" },
  { key: "status", label: "STATUS", _style: "min-width:15%;" },
  { key: "actions", label: "ACTION", _style: "min-width:15%;" },
];

export default {
  name: "TerminationIndex",
  cilPencil,
  cilTrash,
  cilEye,
  data() {
    return {
      employeeTerminationData: [],
      fields,
      loading: false,
      deleteRows: [],
      activePage: 1,
      pages: 0,
      perPage: 10,
    };
  },
  created() {
    this.loading = true;
    this.getTermination();
  },
  computed: {
    employeeTermination() {
      return this.employeeTerminationData;
    },
  },
  watch: {
    reloadParams() {
      this.onTableChange();
    },
    activePage() {
      this.getTermination(this.activePage, this.perPage);
    },
  },
  methods: {
    getTermination(page = "", per_page = "") {
      this.empId = this.$route.params.id;

      TerminationService.getAll(page, per_page)
        .then(({ data }) => {
          if (data !== "" && data !== undefined) {
            this.employeeTerminationData = [];
            this.loading = true;
            if (data.data) {
              data.data.map((item, id) => {
                this.employeeTerminationData.push({ ...item, id });
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
      const val = Boolean(this.employeeTerminationData[item.id]._selected);
      this.$set(this.employeeTerminationData[item.id], "_selected", !val);
    },
    viewRow(uuid) {
      alert("page not ready");
    },
    editRow(uuid) {
      // this.$emit("employee-grade-edit", uuid);
      this.$router.push({ path: "/terminations/edit/" + uuid });
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
            TerminationService.delete(this.deleteRows)
              .then((res) => {
                if (res.status == 200) {
                  this.$swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Termination Deleted Successfully",
                    timer: 3600,
                  });
                  this.employeeTerminationData = this.employeeTerminationData.filter(
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
        this.employeeTerminationData = agent.currentItems;
        this.pages = Math.ceil(agent.sortedItems.length / 5);
      }, 1000);
    },
    changePagination(value) {
      this.perPage = parseInt(value);
      this.getTermination("", this.perPage);
    },
  },
};
</script>
