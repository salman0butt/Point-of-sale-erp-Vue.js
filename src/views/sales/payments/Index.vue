<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> {{ $t("payments.index.payments") }} </CCardHeader>
          <CCardBody>
            <div>
              <!-- <router-link
                class="btn btn-success"
                to="/catalogs/brands/create"
                style="float: right"
                >Create Brand</router-link
              > -->
              <CButton
                color="success"
                class="btn"
                style="float: right; margin-right: 10px"
                @click="addBrand()"
              >
                {{ $t("payments.index.add") }}</CButton
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
                  {{ item.paymentMethod.name ? item.paymentMethod.name : "-" }}
                </td>
              </template>
              <template #invoice="{ item }">
                <td>
                  {{
                    item.invoice.invoice_ref_no
                      ? item.invoice.invoice_ref_no
                      : "-"
                  }}
                </td>
              </template>
              <template #customer="{ item }">
                <td>
                  {{
                    item.customer.full_name.en
                      ? item.customer.full_name.en
                      : item.customer.full_name
                  }}
                </td>
              </template>
              <template #created_by="{ item }">
                <td>
                  {{ item.created_by.name ? item.created_by.name : "-" }}
                </td>
              </template>

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
                    <CButton
                      @click="viewRow(item.uuid)"
                      class="btn-sm"
                      color="success"
                      >View</CButton
                    >
                    <CButton
                      v-if="$can('edit brands')"
                      @click="editRow(item.uuid)"
                      class="btn-sm text-white"
                      color="warning"
                    >
                      <CIcon :content="$options.cilPencil"
                    /></CButton>
                    <CButton
                      v-if="$can('delete brands')"
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
    <BrandModel @update-table="updateTable" />
  </div>
</template>

<script>
import PaymentInvoiceService from "@/services/sale/PaymentInvoiceService";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";
import BrandModel from "@/components/catalogs/brands/BrandModel";
import { tableMixin } from "@/mixins/tableMixin";
import Loader from "@/components/layouts/Loader";
export default {
  name: "IndexBrand",
  mixins: [tableMixin],
  components: {
    BrandModel,
    Loader,
  },
  cilPencil,
  cilTrash,
  cilEye,
  data() {
    return {
      data: [],
      fields: [
        {
          key: "payment_no",
          label: this.$t("payments.index.table.paymentNo"),
        },
        {
          key: "payment_method_id",
          label: this.$t("payments.index.table.paymentMethod"),
        },
        {
          key: "invoice",
          label: this.$t("payments.index.table.invoiceNo"),
        },
        {
          key: "customer",
          label: this.$t("payments.index.table.customer"),
        },
        {
          key: "amount",
          label: this.$t("payments.index.table.amount"),
        },
        {
          key: "dated",
          label: this.$t("payments.index.table.dated"),
        },
        {
          key: "created_by",
          label: this.$t("payments.index.table.user"),
        },
        {
          key: "actions",
          label: this.$t("payments.index.table.actions"),
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
      this.getServerData(PaymentInvoiceService, page, per_page);
    },
    addBrand() {
      this.$store.commit("set_brand_model", true);
    },
    viewRow(uuid) {
      alert("page not ready");
    },
    editRow(uuid) {
      this.$router.push({ path: "/catalogs/brands/edit/" + uuid });
    },
    deleteRow(uuid) {
      this.deleteData(PaymentInvoiceService, uuid);
    },
  },
};
</script>
