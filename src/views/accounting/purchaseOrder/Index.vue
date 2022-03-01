<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Purchase Orders </CCardHeader>
          <CCardBody>
            <router-link
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
                    <!-- <CButton @click="viewRow(item.uuid)" class="btn-sm" color="success"
                      >View</CButton
                    > -->
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
  name: "IndexPurchaseOrder",
  mixins: [tableMixin],
  components: { Loader },
  cilPencil,
  cilTrash,
  cilEye,
  data() {
    return {
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
    getData(page = "", per_page = "") {
      this.getServerData(PurchaseService, page, per_page);
    },
    viewRow(uuid) {
      alert("page not ready");
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
