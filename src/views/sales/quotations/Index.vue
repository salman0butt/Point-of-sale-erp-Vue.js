<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Quotations </CCardHeader>
          <CCardBody>
            <router-link
              class="btn btn-success"
              to="/sales/quotations/create"
              style="float: right"
              >Create Quotation</router-link
            >

            <div style="clear: both; margin-bottom: 20px"></div>
            <CDataTable
              :items="items"
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
              <template #actions="{ item }">
                <td>
                  <CButton
                    v-if="item.status == 'pending'"
                    @click="approveQuotation(item.uuid)"
                    class="btn-sm mr-3"
                    color="success"
                    >Approve</CButton
                  >
                  <CButtonGroup>
                    <CButton
                      @click="viewRow(item.uuid)"
                      class="btn-sm"
                      color="success"
                      >View</CButton
                    >
                    <CButton
                      @click="editRow(item.uuid)"
                      class="btn-sm text-white"
                      color="warning"
                    >
                      <CIcon :content="$options.cilPencil"
                    /></CButton>
                    <CButton
                      @click="deleteRow(item.uuid)"
                      class="btn-sm"
                      color="danger"
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
import QuotationService from "@/services/sale/QuotationService";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";

const fields = [
  { key: "quotation_ref_no", label: "Ref No", _style: "min-width:15%;" },
  { key: "customer", label: "Customer", _style: "min-width:40%" },
  { key: "dated", label: "Dated", _style: "min-width:40%" },
  { key: "due_date", label: "Due Date", _style: "min-width:15%;" },
  { key: "status", label: "Status", _style: "min-width:15%;" },
  { key: "grand_total", label: "Grand Total", _style: "min-width:15%;" },
  { key: "actions", label: "ACTIONS", _style: "min-width:15%;" },
];

export default {
  name: "IndexQuotations",
  cilPencil,
  cilTrash,
  cilEye,
  data() {
    return {
      serverData: [],
      fields,
      loading: false,

      activePage: 1,
      pages: 0,
      perPage: 10,
    };
  },
  created() {
    this.loading = true;
    this.getServerData();
  },
  watch: {
    activePage() {
      this.getServerData(this.activePage, this.perPage);
    },
  },
  computed: {
    items() {
      return this.serverData;
    },
  },
  methods: {
    getServerData() {
      QuotationService.getAll(this.activePage, this.perPage)
        .then(({ data }) => {
          this.loading = true;
          if (data !== "" && data !== undefined) {
            this.serverData = [];
            data.data.map((item, id) => {
              item.customer = item.customer.full_name.en;
              this.serverData.push({ ...item, id });
            });
            this.loading = false;
          }
          if (data.meta) {
            this.setPagination(data.meta);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // getTotalCardData() {
    //   EmployeeService.getTotalCount()
    //     .then(({ data }) => {
    //       if (data != null && data != "") {
    //         this.cards.employees_count = data.employees_count;
    //         this.cards.female_count = data.female_count;
    //         this.cards.male_count = data.male_count;
    //         this.cards.departments_count = data.departments_count;
    //         this.cards.manager_count = data.manager_count;
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    rowClicked(item, index, column, e) {
      if (!["INPUT", "LABEL"].includes(e.target.tagName)) {
        this.check(item);
      }
    },
    check(item) {
      const val = Boolean(this.usersData[item.id]._selected);
      this.$set(this.usersData[item.id], "_selected", !val);
    },
    viewRow(uuid) {
      this.$router.push({ path: "/sales/quotations/show/" + uuid });
    },
    editRow(uuid) {
      this.$router.push({ path: "/sales/quotations/edit/" + uuid });
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
            QuotationService.delete(this.deleteRows)
              .then((res) => {
                if (res.status == 200) {
                  this.$swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Quotation Deleted Successfully",
                    timer: 3600,
                  });
                  this.serverData = this.serverData.filter(
                    (item) => item.uuid != uuid
                  );
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
            this.deleteRows = [];
          }
        });
    },

    approveQuotation(uuid) {
      this.$swal
        .fire({
          title: "Do you want to Approve this Quotation?",
          text: "This will be generate invoice",
          showCancelButton: true,
          confirmButtonColor: "#e55353",
          confirmButtonText: "Yes, Approved it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            QuotationService.updateStatus(uuid)
              .then((res) => {
                if (res.status == 200) {
                  this.$swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Quotation Updated Successfully",
                    timer: 3600,
                  });
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
            this.deleteRows = [];
          }
        });
    },
    setPagination(meta) {
      this.activePage = parseInt(meta.current_page);
      this.pages = parseInt(meta.last_page);
      this.perPage = parseInt(meta.per_page);
    },

    changePagination(value) {
      this.perPage = parseInt(value);
      this.getServerData(this.activePage, this.perPage);
    },
  },
};
</script>
<style scoped>
.bolder {
  font-weight: 600;
}
</style>
