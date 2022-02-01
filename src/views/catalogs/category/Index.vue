<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Categories </CCardHeader>
          <CCardBody>
            <div>
              <!-- <router-link
                class="btn btn-success"
                to="/catalogs/category/create"
                style="float: right"
                >Create Category</router-link
              > -->
              <CButton
                color="success"
                class="btn"
                style="float: right; margin-right: 10px"
                @click="addCategory()"
              >
                Quick Add</CButton
              >
            </div>
            <div style="clear: both; margin-bottom: 20px"></div>
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
              :loading="loading"
              @row-clicked="rowClicked"
              ref="externalAgent"
            >
              <template #parent="{ item }">
                <td v-if="item.parent && item.parent.name">
                  {{ item.parent.name }}
                </td>

                <td v-else>-</td>
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
                      @click="editRow(item.uuid)"
                      class="btn-sm text-white"
                      color="warning"
                      >Edit <CIcon :content="$options.cilPencil"
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
    <CategoryModel @update-table="updateTable" />
  </div>
</template>

<script>
import ProductCategoryService from "@/services/catalogs/category/ProductCategoryService";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";
import CategoryModel from "@/components/catalogs/category/CategoryModel";
import { tableMixin } from "@/mixins/tableMixin";

const fields = [
  { key: "name", label: "NAME", _style: "width:40%" },
  { key: "parent", label: "PARENT", _style: "width:25%;" },
  { key: "status", label: "STATUS", _style: "width:20%;" },
  { key: "actions", label: "ACTION", _style: "min-width:15%;" },
];

export default {
  name: "IndexProductCategory",
  mixins: [tableMixin],
  cilPencil,
  cilTrash,
  cilEye,
  components: {
    CategoryModel,
  },
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
