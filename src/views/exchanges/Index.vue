<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Exchange </CCardHeader>
          <CCardBody>
            <div>
              <CButton
                color="success"
                class="btn"
                style="float: right; margin-right: 10px"
                @click="addReturn()"
              >
                Return/Exchange
              </CButton>
            </div>
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
              <template #image="{ item }">
                <td>
                  <img
                    :src="
                      item.image && item.image.path
                        ? item.image.path
                        : '/img/images/no-logo.png'
                    "
                    alt="photo"
                    style="width: 50px; height: auto"
                  />
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
import ProductExchangeService from "@/services/exchanges/ProductExchangeService.js";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";
import { tableMixin } from "@/mixins/tableMixin";
import Loader from "@/components/layouts/Loader";

export default {
  name: "IndexBrand",
  mixins: [tableMixin],
  components: {
    Loader,
  },
  cilPencil,
  cilTrash,
  cilEye,
  data() {
    return {
      data: [],
      fields: [
        { key: "date", label: "Date", _style: "width:20%" },
        { key: "total_price", label: "Total Price", _style: "width:20%" },
        { key: "exchange_price", label: "Exchange Cash", _style: "width:20%" },
        {
          key: "status",
          label: "Status",
          _style: "width:20%;",
        },
        {
          key: "actions",
          label: "Actions",
          _style: "width:25%;",
        },
      ],
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
    updateTable() {
      setTimeout(() => {
        this.getData();
      }, 1000);
    },
    getData(page = "", per_page = "") {
      this.getServerData(ProductExchangeService, page, per_page);
    },
    addReturn() {
      this.$router.push({ path: "/returns/create" });
    },
    viewRow(uuid) {
      alert("page not ready");
    },
    editRow(uuid) {
      this.$router.push({ path: "/exchange/edit/" + uuid });
    },
    deleteRow(uuid) {
      this.deleteData(ProductExchangeService, uuid);
    },
  },
};
</script>
