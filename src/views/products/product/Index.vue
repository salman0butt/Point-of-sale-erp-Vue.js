<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> {{ $t("products.index.title") }} </CCardHeader>
          <CCardBody>
            <router-link
              v-if="$can('importProduct products')"
              class="btn btn-success"
              style="float: right"
              to="/products/import"
              >{{ $t("products.index.import") }}</router-link
            >
            <router-link
              v-if="$can('create products')"
              class="btn btn-success"
              to="/products/create"
              style="float: right; margin-right: 10px"
              >{{ $t("products.index.add") }}</router-link
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
              <!-- <template #select="{ item }">
                <td>
                  <CInputCheckbox
                    :checked="item._selected"
                    @update:checked="() => check(item)"
                    custom
                  />
                </td>
              </template> -->
              <template #branches="{ item }">
                <td>
                  {{
                    item.branches
                      .map(function (item) {
                        return item.name;
                      })
                      .join(",")
                  }}
                </td>
              </template>
              <template #categories="{ item }">
                <td>
                  {{
                    item.categories
                      .map(function (item) {
                        return item.name;
                      })
                      .join(",")
                  }}
                </td>
              </template>
              <!-- <template #supplier="{ item }">
                <td>
                  {{ item.supplier.name }}
                </td>
              </template> -->
              <template #brand="{ item }">
                <td>
                  {{ item.brand && item.brand.name ? item.brand.name : "" }}
                </td>
              </template>
              <template #actions="{ item }">
                <td>
                  <CButtonGroup>
                    <CButton
                      v-if="$can('view products')"
                      @click="viewRow(item.uuid)"
                      class="btn-sm"
                      color="success"
                      ><CIcon :content="$options.cilEye"
                    /></CButton>
                    <CButton
                      v-if="$can('edit products')"
                      @click="editRow(item.uuid)"
                      class="btn-sm text-white"
                      color="warning"
                    >
                      <CIcon :content="$options.cilPencil"
                    /></CButton>
                    <CButton
                      v-if="$can('delete products')"
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
import ProductService from "@/services/products/ProductService";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";
import { tableMixin } from "@/mixins/tableMixin";

export default {
  name: "IndexProduct",
  mixins: [tableMixin],
  cilPencil,
  cilTrash,
  cilEye,
  data() {
    return {
      data: [],
      fields: [
        {
          key: "name",
          label: this.$t("products.index.table.name"),
          _style: "min-width:40%",
        },
        {
          key: "type",
          label: this.$t("products.index.table.type"),
          _style: "min-width:15%;",
        },
        // { key: "supplier", label: "SUPPLER", _style: "min-width:15%;" },
        {
          key: "brand",
          label: this.$t("products.index.table.brand"),
          _style: "min-width:15%;",
        },
        {
          key: "serial_number",
          label: this.$t("products.index.table.serial_number"),
          _style: "min-width:15%;",
        },
        {
          key: "categories",
          label: this.$t("products.index.table.category"),
          _style: "min-width:15%;",
        },
        {
          key: "branches",
          label: this.$t("products.index.table.branch"),
          _style: "min-width:15%;",
        },
        {
          key: "status",
          label: this.$t("products.index.table.status"),
          _style: "min-width:15%;",
        },
        {
          key: "actions",
          label: this.$t("products.index.table.actions"),
          _style: "min-width:15%;",
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
    getData(page = "", per_page = "") {
      this.getServerData(ProductService, page, per_page);
    },
    viewRow(uuid) {
      this.$router.push({ path: "/products/show/" + uuid });
    },
    editRow(uuid) {
      this.$router.push({ path: "/products/edit/" + uuid });
    },
    deleteRow(uuid) {
      this.deleteData(ProductService, uuid);
    },
  },
};
</script>
