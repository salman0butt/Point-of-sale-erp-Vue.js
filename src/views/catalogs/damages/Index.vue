<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Damages </CCardHeader>
          <CCardBody>
            <div>
              <router-link
                class="btn btn-success"
                to="/catalogs/damages/create"
                style="float: right"
                >Create Damage</router-link
              >
            </div>
            <div style="clear: both; margin-bottom: 20px"></div>
            <Loader />
            <CDataTable
              :items="Damage"
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
              <template #actions="{ item }">
                <td>
                  <CButtonGroup>
                    <CButton
                      v-if="$can('show product-damages')"
                      @click="viewRow(item.uuid)"
                      class="btn-sm"
                      color="success"
                      >View</CButton
                    >
                    <CButton
                      v-if="$can('edit product-damages')"
                      @click="editRow(item.uuid)"
                      class="btn-sm text-white"
                      color="warning"
                    >
                      <CIcon :content="$options.cilPencil"
                    /></CButton>
                    <CButton
                      v-if="$can('delete product-damages')"
                      @click="deleteRow(item.uuid)"
                      class="btn-sm"
                      color="danger"
                    >
                      <CIcon :content="$options.cilTrash" />
                    </CButton>
                  </CButtonGroup>
                </td>
              </template>
              <template #supplier="{ item }">
                <td>
                  {{ item.supplier.name }}
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
import DamageService from "@/services/catalogs/damages/DamageService";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";
import { tableMixin } from "@/mixins/tableMixin";
import Loader from "@/components/layouts/Loader";
const fields = [
  // { key: "reason", label: "REASON", _style: "min-width:40%;" },
  { key: "date", label: "DATE", _style: "min-width:15%" },
  { key: "actions", label: "ACTION", _style: "min-width:15%;" },
];

export default {
  name: "IndexDamage",
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
    Damage() {
      return this.data;
    },
  },
  methods: {
    getData(page = "", per_page = "") {
      this.getServerData(DamageService, page, per_page);
    },
    viewRow(uuid) {
      this.$router.push({ path: "/catalogs/damages/show/" + uuid });
    },
    editRow(uuid) {
      this.$router.push({ path: "/catalogs/damages/edit/" + uuid });
    },
    deleteRow(uuid) {
      this.deleteData(DamageService, uuid);
    },
  },
};
</script>
