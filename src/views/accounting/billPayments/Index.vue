<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Bill Payments </CCardHeader>
          <CCardBody>
            <div>
              <CButton
                color="success"
                class="btn"
                style="float: right; margin-right: 10px"
                @click="addPayment()"
              >
                Add Payment</CButton
              >
            </div>
            <div style="clear: both; margin-bottom: 20px"></div>
            <Loader />
            <CDataTable
              :items="Brand"
              :fields="fields"
              table-filter
              items-per-page-select
              @pagination-change="changePagination"
              :items-per-page="perPage"
              sorter
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
              <template #payment_no="{ item }">
                <td>
                  {{ item.payment_no ? item.payment_no : "-" }}
                </td>
              </template>
              <template #payment_method_id="{ item }">
                <td>
                  {{ item.payment_method ? item.payment_method.name : "-" }}
                </td>
              </template>
              <!-- <template #bill="{ item }">
                <td>
                  {{ item.bill_no ? item.bill_no : "-" }}
                </td>
              </template> -->
              <template #supplier="{ item }">
                <td>
                  {{ item.supplier ? item.supplier.name : "" }}
                </td>
              </template>
              <!-- <template #created_by="{ item }">
                <td>
                  {{ item.created_by.name ? item.created_by.name : "-" }}
                </td>
              </template> -->

              <template #status="{ item }">
                <td>
                  <CBadge
                    v-if="item.status"
                    :color="
                      ['active', 'مفعل'].includes(item.status.toLowerCase())
                        ? 'success'
                        : 'danger'
                    "
                    >{{ item.status ? item.status : "" }}</CBadge
                  >
                </td>
              </template>

              <template #actions="{ item }">
                <td>
                  <CButtonGroup>
                    <CButton @click="viewRow(item.uuid)" class="btn-sm" color="success"
                      >View</CButton
                    >
                    <CButton
                      @click="editRow(item)"
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
    <BillPaymentModel @update-table="updateTable" :editData="editData" />
  </div>
</template>

<script>
import BillPaymentService from "@/services/accounting/bill/BillPaymentService";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";
import BillPaymentModel from "@/components/accounting/bill/BillPaymentModel";
import { tableMixin } from "@/mixins/tableMixin";
import Loader from "@/components/layouts/Loader";

export default {
  name: "IndexBillPayment",
  mixins: [tableMixin],
  components: {
    BillPaymentModel,
    Loader,
  },
  cilPencil,
  cilTrash,
  cilEye,
  data() {
    return {
      data: [],
      editData: {},
      fields: [
        {
          key: "payment_no",
          label: "Payment No",
        },
        {
          key: "payment_method_id",
          label: "Payment Method",
        },
        // {
        //   key: "bill",
        //   label: "BIll",
        // },
        {
          key: "supplier",
          label: "Supplier",
        },
        {
          key: "amount",
          label: "Amount",
        },
        {
          key: "dated",
          label: "Dated",
        },
        {
          key: "actions",
          label: "Actions",
        },
      ],
    };
  },
  created() {
    this.getData();
  },
  computed: {
    Brand() {
      return this.data;
    },
  },
  methods: {
    updateTable() {
      setTimeout(() => {
        this.getData();
      }, 1000);
    },
    getData(page = "", per_page = "") {
      this.getServerData(BillPaymentService, page, per_page);
    },
    addPayment() {
      this.editData = {};
      this.$store.commit("set_bill_payment_model", true);
    },
    viewRow(uuid) {
      this.$router.push({ path: "/accounting/bill/payments/show/" + uuid });
    },
    editRow(item) {
      this.editData = item;
      this.$store.commit("set_bill_payment_model", true);
    },
    deleteRow(uuid) {
      this.deleteData(BillPaymentService, uuid);
    },
  },
};
</script>
