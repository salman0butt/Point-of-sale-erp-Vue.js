<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Bills </CCardHeader>
          <CCardBody>
            <div>
              <router-link
                class="btn btn-success"
                to="/accounting/bill/create"
                style="float: right"
                >Create Bill</router-link
              >
            </div>
            <div style="clear: both; margin-bottom: 20px"></div>
            <Loader />
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
              @row-clicked="rowClicked"
              ref="externalAgent"
            >
              <template #status="{ item }">
                <td>{{ item.status ? item.status : "" }}</td>
              </template>

              <template #actions="{ item }">
                <td>
                  <CButtonGroup>
                    <CButton @click="viewRow(item.uuid)" class="btn-sm" color="success"
                      >View</CButton
                    >
                    <CButton
                      v-if="$can('edit bills')"
                      @click="editRow(item.uuid)"
                      class="btn-sm text-white"
                      color="warning"
                    >
                      <CIcon :content="$options.cilPencil"
                    /></CButton>
                    <CButton
                      v-if="$can('delete bills')"
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
import BillService from "@/services/accounting/bill/BillService";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";
import { tableMixin } from "@/mixins/tableMixin";
import Loader from "@/components/layouts/Loader";
const fields = [
  { key: "bill_no", label: "Bill No", _style: "width:30%" },
  { key: "date", label: "Date", _style: "width:15%;" },
  { key: "sub_total", label: "Sub Total", _style: "width:15%;" },
  { key: "grand_total", label: "Grand Total", _style: "width:15%;" },
  { key: "status", label: "STATUS", _style: "width:15%;" },
  { key: "actions", label: "ACTION", _style: "width:25%;" },
];

export default {
  name: "IndexBill",
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
      fields,
    };
  },
  created() {
    this.getData();
  },
  computed: {
    Bill() {
      return this.data;
    },
  },
  methods: {
    getData(page = "", per_page = "") {
      this.getServerData(BillService, page, per_page);
    },
    viewRow(uuid) {
      this.$router.push({ path: "/accounting/bill/show/" + uuid });
    },
    editRow(uuid) {
      this.$router.push({ path: "/accounting/bill/edit/" + uuid });
    },
    deleteRow(uuid) {
      this.deleteData(BillService, uuid);
    },
  },
};
</script>
