<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> {{ $t("categories.index.title") }} </CCardHeader>
          <CCardBody>
            <div>
              <!-- <router-link
                class="btn btn-success"
                to="/catalogs/category/create"
                style="float: right"
                >Create Category</router-link
              > -->
              <CButton
                v-if="$can('create product-categories')"
                color="success"
                class="btn"
                style="float: right; margin-right: 10px"
                @click="addCategory()"
              >
                {{ $t("categories.index.add") }}</CButton
              >
            </div>
            <div style="clear: both; margin-bottom: 20px"></div>
            <Loader />
            <CDataTable
              :items="productCategory"
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
              <template #parent="{ item }">
                <td v-if="item.parent && item.parent.name">
                  {{ item.parent.name }}
                </td>

                <td v-else>-</td>
              </template>
              <template #color="{ item }">
                <td>
                  {{ item.color ? item.color : "" }}
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
                      v-if="$can('edit product-categories')"
                      @click="editRow(item.uuid)"
                      class="btn-sm text-white"
                      color="warning"
                    >
                      <CIcon :content="$options.cilPencil"
                    /></CButton>
                    <CButton
                      v-if="$can('delete product-categories')"
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
    <CategoryModel @update-table="updateTable" />
  </div>
</template>

<script>
import ProductCategoryService from "@/services/catalogs/category/ProductCategoryService";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";
import CategoryModel from "@/components/catalogs/category/CategoryModel";
import { tableMixin } from "@/mixins/tableMixin";
import Loader from "@/components/layouts/Loader";
export default {
  name: "IndexProductCategory",
  mixins: [tableMixin],
  cilPencil,
  cilTrash,
  cilEye,
  components: {
    CategoryModel,
    Loader,
  },
  data() {
    return {
      data: [],
      fields: [
        {
          key: "image",
          label: this.$t("categories.index.table.photo"),
          _style: "width:15%",
        },
        {
          key: "name",
          label: this.$t("categories.index.table.name"),
          _style: "width:20%",
        },
        {
          key: "parent",
          label: this.$t("categories.index.table.parent"),
          _style: "width:25%;",
        },
        {
          key: "color",
          label: this.$t("categories.index.table.color"),
          _style: "width:25%;",
        },
        {
          key: "status",
          label: this.$t("categories.index.table.status"),
          _style: "width:20%;",
        },
        {
          key: "actions",
          label: this.$t("categories.index.table.actions"),
          _style: "min-width:15%;",
        },
      ],
    };
  },
  created() {
    this.getData();
  },
  computed: {
    productCategory() {
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
      this.getServerData(ProductCategoryService, page, per_page);
    },
    addCategory() {
      this.$store.commit("set_category_model", true);
    },
    viewRow(uuid) {
      alert("page not ready");
    },
    editRow(uuid) {
      this.$router.push({ path: "/catalogs/category/edit/" + uuid });
    },

    deleteRow(uuid) {
      this.deleteData(ProductCategoryService, uuid);
    },
  },
};
</script>
