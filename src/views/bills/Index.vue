<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Bills </CCardHeader>
          <CCardBody>
            <div>
              <router-link
                v-if="$can('create receivings')"
                class="btn btn-success"
                to="/bills/create"
                style="float: right"
                >Create Bill</router-link
              >
            </div>
            <div style="clear: both; margin-bottom: 20px"></div>
            <CDataTable
              :items="Bill"
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
              <template #actions="{ item }">
                <td>
                  <CButtonGroup>
                    <!-- <CButton @click="viewRow(item.uuid)" class="btn-sm" color="success"
                      >View</CButton
                    > -->
                    <CButton
                      v-if="$can('edit receivings')"
                      @click="editRow(item.uuid)"
                      class="btn-sm text-white"
                      color="warning"
                      >Edit <CIcon :content="$options.cilPencil"
                    /></CButton>
                    <CButton
                      v-if="$can('delete receivings')"
                      @click="deleteRow(item.uuid)"
                      class="btn-sm"
                      color="danger"
                    >
                      <CIcon :content="$options.cilTrash" />
                    </CButton>
                  </CButtonGroup>
                </td>
              </template>
              <template #supplier="{ item }">
                <td>
                  {{ item.supplier.name }}
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
import BillService from "@/services/bills/BillService";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";

const fields = [
  { key: "supplier", label: "SUPPLIER", _style: "min-width:40%" },
  { key: "date", label: "DATE", _style: "min-width:15%;" },
  { key: "total_cost", label: "TOTAL COST", _style: "min-width:15%;" },
  // { key: "receiving_status", label: "RECEIVING STATUS", _style: "min-width:15%;" },
  { key: "actions", label: "ACTION", _style: "min-width:15%;" },
];

export default {
  name: "IndexBill",
  cilPencil,
  cilTrash,
  cilEye,
  data() {
    return {
      BillData: [],
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
    this.getBillData();
    console.log();
  },
  watch: {
    reloadParams() {
      this.onTableChange();
    },
    activePage() {
      this.getBillData(this.activePage, this.perPage);
    },
  },
  computed: {
    Bill() {
      return this.BillData;
    },
  },
  methods: {
    getBillData(page = "", per_page = "") {
      BillService.getAll(page, per_page)
        .then(({ data }) => {
          if (data !== "" && data !== undefined) {
            this.BillData = [];
            this.loading = true;
            if (data.data) {
              data.data.map((item, id) => {
                this.BillData.push({ ...item, id });
              });
            }
            if (data.meta) {
              this.setPagination(data.meta);
            }

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
      const val = Boolean(this.BillData[item.id]._selected);
      this.$set(this.BillData[item.id], "_selected", !val);
    },
    viewRow(uuid) {
      alert("page not ready");
    },
    editRow(uuid) {
      this.$router.push({ path: "/bills/edit/" + uuid });
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
            BillService.delete(this.deleteRows)
              .then((res) => {
                if (res.status == 200) {
                  this.$swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Bill Deleted Successfully",
                    timer: 3600,
                  });
                  this.BillData = this.BillData.filter(
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
        this.BillData = agent.currentItems;
        this.pages = Math.ceil(agent.sortedItems.length / 5);
      }, 1000);
    },
    changePagination(value) {
      this.perPage = parseInt(value);
      this.getBillData("", this.perPage);
    },
  },
};
</script>
