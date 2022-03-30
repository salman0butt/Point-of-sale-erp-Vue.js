<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Purchase Orders </CCardHeader>
          <CCardBody>
            <router-link
              v-if="!readOnly"
              class="btn btn-success"
              to="/purchases/create"
              style="float: right"
              >Create PO</router-link
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
              <template #supplier="{ item }">
                <td>
                  {{ item.supplier.name }}
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
                    <CButton
                      v-if="!item.is_converted_to_bill"
                      @click="convertBill(item.uuid)"
                      class="btn-sm mr-2"
                      color="success"
                      >Convert To Bill</CButton
                    >
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
import PurchaseService from "@/services/accounting/purchaseOrder/PurchaseOrderServices";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";
import { tableMixin } from "@/mixins/tableMixin";
import Loader from "@/components/layouts/Loader";
const fields = [
  { key: "date", label: "Date", _style: "min-width:40%" },
  { key: "purchase_order_id", label: "PO#", _style: "min-width:40%" },
  { key: "reference", label: "Ref#", _style: "min-width:40%" },
  { key: "supplier", label: "Supplier", _style: "min-width:40%" },
  { key: "status", label: "Status", _style: "min-width:40%" },
  // { key: "billedStatus", label: "Billed Status", _style: "min-width:40%" },
  { key: "total", label: "Amount", _style: "min-width:40%" },
  {
    key: "expected_delivery_date",
    label: "Expected Delivery Date",
    _style: "min-width:40%",
  },
  { key: "actions", label: "Action", _style: "min-width:40%" },
];

export default {
  name: "PurchaseOrder",
  mixins: [tableMixin],
  components: { Loader },
  props: {
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
  cilPencil,
  cilTrash,
  cilEye,
  data() {
    return {
      uuid: "",
      data: [],
      fields,
    };
  },
  created() {
    this.getData();
  },
  computed: {
    items() {
      return this.data;
    },
  },
  methods: {
    getServerData(page, per_page) {
      this.$store.commit("set_loader");
      this.uuid = this.$route.params.id;
      PurchaseService.getPurchaseOrderBySupplier(this.uuid, page, per_page)
        .then(({ data }) => {
          if (data) {
            this.data = [];
            if (data.data) {
              data.data.map((item, id) => {
                this.data.push({ ...item, id });
              });
            }
            if (data.meta) {
              this.setPagination(data.meta);
            }
          }
          this.$store.commit("close_loader");
        })
        .catch((error) => {
          this.$store.commit("close_loader");
          console.log(error);
        });
    },
    getData(page = "", per_page = "") {
      this.getServerData(page, per_page);
    },
    viewRow(uuid) {
      this.$router.push({ path: "/purchases/show/" + uuid });
    },
    convertBill(uuid) {
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
            PurchaseService.billConvert(uuid)
              .then((res) => {
                if (res.status == 200) {
                  this.$swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Converted to Bill Successfully",
                    timer: 3600,
                  });
                  this.data.find((item) => item.uuid == uuid).is_converted_to_bill = true;
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
    editRow(uuid) {
      this.$router.push({ path: "/purchases/edit/" + uuid });
    },
    deleteRow(uuid) {
      this.deleteData(PurchaseService, uuid);
    },
  },
};
</script>
