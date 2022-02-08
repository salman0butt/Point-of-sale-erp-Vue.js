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
              <template #account="{ item }">
                <td>{{ item.account ? item.account.name : "" }}</td>
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
// import Purchase OrderServices from "@/services/accounting/Purchase Order/Purchase OrderServices";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";
//  Date - PO# - Ref# -  Supplier - Status - Billed Status - Amount - Expected Delivery Date - Action
const fields = [
  { key: "date", label: "Date", _style: "min-width:40%" },
  { key: "poNumber", label: "PO#", _style: "min-width:40%" },
  { key: "referenceNumber", label: "Ref#", _style: "min-width:40%" },
  { key: "supplier", label: "Supplier", _style: "min-width:40%" },
  { key: "status", label: "Status", _style: "min-width:40%" },
  { key: "billedStatus", label: "Billed Status", _style: "min-width:40%" },
  { key: "amount", label: "Amount", _style: "min-width:40%" },
  {
    key: "expectedDeliveryDate",
    label: "Expected Delivery Date",
    _style: "min-width:40%",
  },
  { key: "actions", label: "Action", _style: "min-width:40%" },
];

export default {
  name: "IndexPurchaseOrder",
  cilPencil,
  cilTrash,
  cilEye,
  data() {
    return {
      serverData: [
        {
          date: "01/01/2020",
          poNumber: "PO-001",
          referenceNumber: "REF-001",
          supplier: "Supplier 1",
          status: "Pending",
          billedStatus: "Not Billed",
          amount: "100.00",
          expectedDeliveryDate: "01/01/2020",
          actions: "",
        },
        {
          date: "01/01/2020",
          poNumber: "PO-002",
          referenceNumber: "REF-002",
          supplier: "Supplier 2",
          status: "Pending",
          billedStatus: "Not Billed",
          amount: "200.00",
          expectedDeliveryDate: "01/01/2020",
          actions: "",
        },
        {
          date: "01/01/2020",
          poNumber: "PO-003",
          referenceNumber: "REF-003",
          supplier: "Supplier 3",
          status: "Pending",
          billedStatus: "Not Billed",
          amount: "300.00",
          expectedDeliveryDate: "01/01/2020",
          actions: "",
        },
        {
          date: "01/01/2020",
          poNumber: "PO-004",
          referenceNumber: "REF-004",
          supplier: "Supplier 4",
          status: "Pending",
          billedStatus: "Not Billed",
          amount: "400.00",
          expectedDeliveryDate: "01/01/2020",
          actions: "",
        },
        {
          date: "01/01/2020",
          poNumber: "PO-005",
          referenceNumber: "REF-005",
          supplier: "Supplier 5",
          status: "Pending",
          billedStatus: "Not Billed",
          amount: "500.00",
          expectedDeliveryDate: "01/01/2020",
          actions: "",
        },
        {
          date: "01/01/2020",
          poNumber: "PO-006",
          referenceNumber: "REF-006",
          supplier: "Supplier 6",
          status: "Pending",
          billedStatus: "Not Billed",
          amount: "500.00",
          expectedDeliveryDate: "01/01/2020",
          actions: "",
        },
      ],
      fields,
      loading: false,
      activePage: 1,
      pages: 0,
      perPage: 10,
    };
  },
  created() {
    // this.loading = true;
    // this.getServerData();
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
    // getServerData() {
    //   Purchase OrderServices.getAll(this.activePage, this.perPage)
    //     .then(({ data }) => {
    //       this.loading = true;
    //       if (data !== "" && data !== undefined) {
    //         this.serverData = [];
    //         data.data.map((item, id) => {
    //           item.account = item.account.name;
    //           this.serverData.push({ ...item, id });
    //         });
    //         this.loading = false;
    //       }
    //       if (data.meta) {
    //         this.setPagination(data.meta);
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
      alert("page not ready");
    },
    editRow(uuid) {
      alert("not ready");
      // this.$router.push({ path: "/accounting/Purchase Order/" + uuid });
    },

    setPagination(meta) {
      this.activePage = parseInt(meta.current_page);
      this.pages = parseInt(meta.last_page);
      this.perPage = parseInt(meta.per_page);
    },

    changePagination(value) {
      thi;
      s.perPage = parseInt(value);
      this.getServerData(this.activePage, this.perPage);
    },
  },
};
</script>
