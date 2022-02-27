<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> {{ $t("brands.index.title") }} </CCardHeader>
          <CCardBody>
            <div>
              <!-- <router-link
                class="btn btn-success"
                to="/catalogs/brands/create"
                style="float: right"
                >Create Brand</router-link
              > -->
              <CButton
                v-if="$can('create brands')"
                color="success"
                class="btn"
                style="float: right; margin-right: 10px"
                @click="addBrand()"
              >
                {{ $t("brands.index.add") }}</CButton
              >
            </div>
            <div style="clear: both; margin-bottom: 20px"></div>
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
              :loading="loading"
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
              <template #status="{ item }">
                <td>
                  <CBadge
                    v-if="item.status"
                    :color="item.status.toLowerCase() === 'active' ? 'success' : 'danger'"
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
import BrandService from "@/services/catalogs/brands/BrandService";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";
import BrandModel from "@/components/catalogs/brands/BrandModel";
import { tableMixin } from "@/mixins/tableMixin";

export default {
  name: "IndexBrand",
  mixins: [tableMixin],
  components: {
    BrandModel,
  },
  cilPencil,
  cilTrash,
  cilEye,
  data() {
    return {
      data: [],
      fields: [
        { key: "name", label: this.$t("brands.index.table.name"), _style: "width:50%" },
        {
          key: "status",
          label: this.$t("brands.index.table.status"),
          _style: "width:30%;",
        },
        {
          key: "actions",
          label: this.$t("brands.index.table.actions"),
          _style: "width:25%;",
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
      this.getServerData(BrandService, page, per_page);
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
      this.deleteData(BrandService, uuid);
    },
  },
};
</script>
