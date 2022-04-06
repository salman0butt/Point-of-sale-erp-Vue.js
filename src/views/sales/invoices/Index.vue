<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Invoices </CCardHeader>
          <CCardBody>
            <!-- <router-link
              v-if="$can('create invoices')"
              class="btn btn-success"
              to="/sales/invoices/create"
              style="float: right"
              >Create Invoice</router-link
            > -->

            <CButton
              v-if="showClosingButton"
              color="warning"
              style="float: right; margin-left: 5px; color: #fff"
              @click="closing()"
            >
              Closing</CButton
            >

            <CButton
              v-if="$can('create invoices')"
              color="success"
              style="float: right"
              @click="opening()"
            >
              Create Invoice</CButton
            >

            <div style="clear: both; margin-bottom: 20px"></div>
            <Loader />
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
              @row-clicked="rowClicked"
              ref="externalAgent"
              :noItemsView="{
                noResults: this.$t('table.noResults'),
                noItems: this.$t('table.noItems'),
              }"
              :itemsPerPageSelect="{
                label: this.$t('table.itemsPerPageSelect.label'),
              }"
              :tableFilter="{
                label: this.$t('table.tableFilter.label'),
                placeholder: this.$t('table.tableFilter.placeholder'),
              }"
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
              <template #balance="{ item }">
                <td>
                  {{ item.balance ? item.balance : "" }}
                </td>
              </template>
              <template #actions="{ item }">
                <td>
                  <CButtonGroup>
                    <CButton
                      v-if="$can('show invoices')"
                      @click="viewRow(item.uuid)"
                      class="btn-sm"
                      color="success"
                      >View</CButton
                    >
                    <CButton
                      @click="editRow(item.uuid)"
                      class="btn-sm text-white"
                      color="warning"
                      v-if="$can('edit invoices')"
                    >
                      <CIcon :content="$options.cilPencil"
                    /></CButton>
                    <CButton
                      v-if="$can('delete invoices')"
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
    <OpeningModel />
    <ClosingModel v-if="showClosingButton" @hide-button="hideButton($event)" />
  </div>
</template>

<script>
import InvoiceService from "@/services/sale/InvoiceService";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";
import OpeningModel from "@/components/dashboard/OpeningModel";
import Loader from "@/components/layouts/Loader";
import ClosingModel from "@/components/dashboard/ClosingModel";
import SettingService from "@/services/settings/SettingService";

const fields = [
  { key: "invoice_ref_no", label: "Ref No", _style: "min-width:15%;" },
  { key: "customer", label: "Customer", _style: "min-width:40%" },
  { key: "dated", label: "Dated", _style: "min-width:40%" },
  { key: "due_date", label: "Due Date", _style: "min-width:15%;" },
  { key: "grand_total", label: "Grand Total", _style: "min-width:15%;" },
  { key: "balance", label: "Balance", _style: "min-width:15%;" },
  { key: "actions", label: "ACTIONS", _style: "min-width:15%;" },
];

export default {
  name: "IndexQuotations",
  components: { OpeningModel, Loader, ClosingModel },
  cilPencil,
  cilTrash,
  cilEye,
  data() {
    return {
      serverData: [],
      componentKey: 0,
      fields,
      // cards: {
      //   employees_count: 0,
      //   female_count: 0,
      //   male_count: 0,
      //   departments_count: 0,
      //   manager_count: 0,
      // },
      // deleteRows: [],
      activePage: 1,
      pages: 0,
      perPage: 10,
    };
  },
  created() {
    this.getServerData();
    this.checkOpeningSettings();
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
    terminalId() {
      return localStorage.getItem("terminal_id");
    },
    showClosingButton() {
      return this.$store.getters.getShowClosingButton;
    },
    showOpeningForm() {
      return this.$store.getters.getShowOpeningForm;
    },
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },
    getServerData() {
      this.$store.commit("set_loader");
      InvoiceService.getAll(this.activePage, this.perPage)
        .then(({ data }) => {
          if (data !== "" && data !== undefined) {
            this.serverData = [];
            data.data.map((item, id) => {
              item.customer = item.customer.full_name;
              this.serverData.push({ ...item, id });
            });
          }
          if (data.meta) {
            this.setPagination(data.meta);
          }
          this.$store.commit("close_loader");
        })
        .catch((err) => {
          this.$store.commit("close_loader");
          console.log(err);
        });
    },
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
      this.$router.push({ path: "/sales/invoices/show/" + uuid });
    },
    editRow(uuid) {
      this.$router.push({ path: "/sales/invoices/edit/" + uuid });
    },
    hideButton() {
      this.$store.commit("set_show_closing_button", false);
    },
    deleteRow(uuid) {
      this.deleteRows = JSON.stringify([uuid]);
      this.$swal
        .fire({
          title: "Are you sure you want to delete this record?",
          text: "This will be deleted from Database",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#e55353",
          confirmButtonText: "Yes, remove it it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            InvoiceService.delete(this.deleteRows)
              .then((res) => {
                if (res.status == 200) {
                  this.$swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Quotation Deleted Successfully",
                    timer: 3600,
                  });
                  this.serverData = this.serverData.filter((item) => item.uuid != uuid);
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
    opening() {
      // check terminal id exist in localstorage
      if (localStorage.getItem("terminal_id") && !this.showOpeningForm) {
        this.$router.push({ path: "/sales/invoices/create" });
      } else {
        this.$store.commit("set_opening_model", true);
      }
    },
    checkOpeningSettings() {
      let type = "general";
      this.$store.commit("set_loader");
      SettingService.getAll(type)
        .then(({ data }) => {
          if (data) {
            data.map((item) => {
              if (item.key === "open_and_close" && item.value === "on") {
                this.$store.commit("set_show_closing_button", true);
              } else {
                this.$store.commit("set_show_closing_button", false);
              }
            });
          }
          this.$store.commit("close_loader");
        })
        .catch((error) => {
          this.$store.commit("close_loader");
          console.log(error);
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
    closing() {
      this.$store.commit("set_closing_model", true);
    },
  },
};
</script>
<style scoped>
.bolder {
  font-weight: 600;
}
</style>
