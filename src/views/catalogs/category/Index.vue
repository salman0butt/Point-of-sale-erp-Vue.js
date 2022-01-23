<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Categories </CCardHeader>
          <CCardBody>
            <div>
              <router-link
                class="btn btn-success"
                to="/catalogs/category/create"
                style="float: right"
                >Create Category</router-link
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
  </div>
</template>

<script>
import ProductCategoryService from "@/services//catalogs/category/ProductCategoryService";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";

const fields = [
  { key: "name", label: "NAME", _style: "width:40%" },
  { key: "parent", label: "PARENT", _style: "width:25%;" },
  { key: "status", label: "STATUS", _style: "width:20%;" },
  { key: "actions", label: "ACTION", _style: "min-width:15%;" },
];

export default {
  name: "IndexProductCategory",
  cilPencil,
  cilTrash,
  cilEye,
  data() {
    return {
      productCategoryData: [],
      fields,
      loading: false,
      deleteRows: [],
      activePage: 1,
      pages: 0,
      perPage: 10,
    };
  },
  created() {
    this.loading = true;
    this.getProductCategoryData();
    console.log();
  },
  watch: {
    reloadParams() {
      this.onTableChange();
    },
    activePage() {
      this.getProductCategoryData(this.activePage, this.perPage);
    },
  },
  computed: {
    productCategory() {
      return this.productCategoryData;
    },
  },
  methods: {
    getProductCategoryData(page = "", per_page = "") {
      ProductCategoryService.getAll(page, per_page)
        .then(({ data }) => {
          if (data !== "" && data !== undefined) {
            this.productCategoryData = [];
            this.loading = true;
            if (data.data) {
              data.data.map((item, id) => {
                this.productCategoryData.push({ ...item, id });
              });
            }
            if (data.meta) {
              this.setPagination(data.meta);
            }

            this.loading = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    rowClicked(item, index, column, e) {
      if (!["INPUT", "LABEL"].includes(e.target.tagName)) {
        this.check(item);
      }
    },
    check(item) {
      const val = Boolean(this.productCategoryData[item.id]._selected);
      this.$set(this.productCategoryData[item.id], "_selected", !val);
    },
    viewRow(uuid) {
      alert("page not ready");
    },
    editRow(uuid) {
      this.$router.push({ path: "/catalogs/category/edit/" + uuid });
    },

    deleteRow(uuid) {
      this.deleteRows = JSON.stringify([uuid]);
      this.$swal
        .fire({
          title: "Do you want to delete this record",
          text: "This will be record from Database",
          showCancelButton: true,
          confirmButtonColor: "#e55353",
          confirmButtonText: "Yes, remove it it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            ProductCategoryService.delete(this.deleteRows)
              .then((res) => {
                if (res.status == 200) {
                  this.$swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Product Category Deleted Successfully",
                    timer: 3600,
                  });
                  this.productCategoryData = this.productCategoryData.filter(
                    (department) => department.uuid != uuid
                  );
                  this.deleteRows = [];
                }
              })
              .catch((error) => {
                this.$swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Something went Wrong",
                  timer: 3600,
                });
              });
          }
        });
    },
    setPagination(meta) {
      this.activePage = parseInt(meta.current_page);
      this.pages = parseInt(meta.last_page);
      this.perPage = parseInt(meta.per_page);
    },
    onTableChange() {
      setTimeout(() => {
        this.loading = false;
        const agent = this.$refs.externalAgent;
        this.productCategoryData = agent.currentItems;
        this.pages = Math.ceil(agent.sortedItems.length / 5);
      }, 1000);
    },
    changePagination(value) {
      this.perPage = parseInt(value);
      this.getProductCategoryData("", this.perPage);
    },
  },
};
</script>
