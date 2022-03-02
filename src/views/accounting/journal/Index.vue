<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Journal </CCardHeader>
          <CCardBody>
            <div>
              <router-link
                v-if="$can('create transfer')"
                class="btn btn-success"
                to="/accounting/journals/create"
                style="float: right; margin-right: 10px"
                >Create Journal</router-link
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
            >
              <template #status="{ item }">
                <td>{{ item.status ? item.status : "" }}</td>
              </template>
              <template #journal_no="{ item }">
                <td>{{ item.journal_prefix + "-" + item.journal_no }}</td>
              </template>

              <template #actions="{ item }">
                <td>
                  <CButtonGroup>
                    <!-- <CButton @click="viewRow(item.uuid)" class="btn-sm" color="success"
                      >View</CButton
                    > -->
                    <CButton
                      v-if="$can('edit brands')"
                      @click="editRow(item.uuid)"
                      class="btn-sm text-white"
                      color="warning"
                      >Edit <CIcon :content="$options.cilPencil"
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
  </div>
</template>

<script>
import JournalServices from "@/services/accounting/journal/JournalServices";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";
import { tableMixin } from "@/mixins/tableMixin";
import Loader from "@/components/layouts/Loader";
const fields = [
  { key: "journal_no", label: "Journal #" },
  { key: "ref_id", label: "Reference #" },
  { key: "date", label: "Dated" },
  { key: "status", label: "Status" },
  { key: "actions", label: "ACTION" },
];

export default {
  name: "IndexBrand",
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
      this.getServerData(JournalServices, page, per_page);
    },
    addBrand() {
      this.$store.commit("set_brand_model", true);
    },
    viewRow(uuid) {
      alert("page not ready");
    },
    editRow(uuid) {
      this.$router.push({ path: "/accounting/journals/edit/" + uuid });
    },
    deleteRow(uuid) {
      this.deleteData(JournalServices, uuid);
    },
  },
};
</script>
