<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
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
              <CButtonGroup>
                <CButton @click="viewRow(item.uuid)" class="btn-sm" color="success"
                  >View</CButton
                >
                <CButton
                  @click="editRow(item.uuid)"
                  class="btn-sm text-white"
                  color="warning"
                >
                  <CIcon :content="$options.cilPencil"
                /></CButton>
                <CButton @click="deleteRow(item.uuid)" class="btn-sm" color="danger">
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
import InvoiceService from "@/services/sale/InvoiceService";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";
import Loader from "@/components/layouts/Loader";

const fields = [
  { key: "invoice_ref_no", label: "Ref No", _style: "min-width:15%;" },
  { key: "customer", label: "Customer", _style: "min-width:40%" },
  { key: "dated", label: "Dated", _style: "min-width:40%" },
  { key: "due_date", label: "Due Date", _style: "min-width:15%;" },
  { key: "grand_total", label: "Grand Total", _style: "min-width:15%;" },
  { key: "actions", label: "ACTIONS", _style: "min-width:15%;" },
];

export default {
  name: "IndexQuotations",
  props: {
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Loader,
  },
  cilPencil,
  cilTrash,
  cilEye,
  data() {
    return {
      serverData: [],
      fields,
      deleteRows: [],
      activePage: 1,
      pages: 0,
      perPage: 10,
      customer_id: null,
    };
  },
  created() {
    this.customer_id = this.$route.params.id;
    if (this.readOnly) {
      this.fields = this.fields.filter((field) => field.key !== "actions");
    }
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
      this.$store.commit("set_loader");
      InvoiceService.getAll(this.activePage, this.perPage, this.customer_id)
        .then(({ data }) => {
          if (data !== "" && data !== undefined) {
            this.serverData = [];
            data.data.map((item, id) => {
              item.customer = item.customer.full_name;
              this.serverData.push({ ...item, id });
            });

            if (data.meta) {
              this.setPagination(data.meta);
            }
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
