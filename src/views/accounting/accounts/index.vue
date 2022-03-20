<template>
  <div>
    <CRow id="account-page">
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Accounts </CCardHeader>
          <CCardBody>
            <Loader />
            <router-link
              v-if="$can('create accounts')"
              class="btn btn-success"
              to="/accounting/accounts/create"
              style="float: right; color: #fff"
              >Create Account</router-link
            >
            <div style="clear: both; margin-bottom: 20px"></div>
            <vue-ads-table-tree
              :columns="columns"
              :rows="rows"
              :filter="filterValue"
              :page="page"
              @filter-change="filterChanged"
              @page-change="pageChanged"
            >
              <template slot="parent" slot-scope="props">
                <td>
                  {{ props.row.parent }}
                  <span v-if="props.row.editable"
                    >(<a
                      class="drecord"
                      @click.prevent="editRow(props.row.uuid)"
                      >Edit</a
                    >
                    -
                    <a
                      class="drecord"
                      @click.prevent="deleteRow(props.row.uuid)"
                      >Delete</a
                    >)</span
                  >
                  <!-- <CButtonGroup>
                    <CButton
                      @click="editRow(props.row.uuid)"
                      class="btn-sm text-white"
                      color="warning"
                    >
                      <CIcon :content="$options.cilPencil"
                    /></CButton>
                    <CButton
                      @click="deleteRow(props.row.uuid)"
                      class="btn-sm"
                      color="danger"
                    >
                      <CIcon :content="$options.cilTrash" />
                    </CButton>
                  </CButtonGroup> -->
                </td>
              </template>
            </vue-ads-table-tree>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import AccountServices from "@/services/accounting/accounts/AccountServices";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";
import "@/../node_modules/@fortawesome/fontawesome-free/css/all.css";
import Loader from "@/components/layouts/Loader";
import VueAdsTableTree from "vue-ads-table-tree";

export default {
  name: "IndexAccounts",
  cilPencil,
  cilTrash,
  cilEye,
  components: {
    VueAdsTableTree,
    Loader,
  },
  data() {
    return {
      page: 0,
      filterValue: "",
      columns: [
        {
          property: "parent",
          title: "Parent",
          direction: null,
          filterable: true,
          collapseIcon: true,
        },
      ],
      rows: [],
    };
  },
  created() {
    this.getServerData();
  },
  // watch: {
  //   activePage() {
  //     this.getServerData(this.activePage, this.perPage);
  //   },
  // },
  computed: {
    items() {
      return this.serverData;
    },
  },
  methods: {
    filterChanged(filter) {
      this.filter = filter;
    },

    pageChanged(page) {
      this.page = page;
    },
    getServerData() {
      this.$store.commit("set_loader");
      AccountServices.getAllAccountTypes()
        .then(({ data }) => {
          if (data !== "" && data !== undefined) {
            this.rows = [];
            data.map((item, id) => {
              let children = [];
              let children2 = [];
              let children3 = [];
              if (item.children.length > 0) {
                item.children.map((accountsubtype) => {
                  children2 = [];
                  if (accountsubtype.accounts.length > 0) {
                    accountsubtype.accounts.map((account1) => {
                      if (account1.children.length > 0) {
                        children3 = [];
                        account1.children.map((account2) => {
                          children3.push({
                            uuid: account2.uuid,
                            parent: account2.name,
                            editable: account2.editable,
                          });
                        });
                        children2.push({
                          uuid: account1.uuid,
                          parent: account1.name,
                          _children: children3,
                        });
                      } else if (account1.parent_id != null) {
                        // console.log("their parenet exit");
                      } else {
                        children2.push({
                          uuid: account1.uuid,
                          parent: account1.name,
                        });
                      }
                    });

                    children.push({
                      uuid: accountsubtype.uuid,
                      parent: accountsubtype.name,
                      _children: children2,
                    });
                  } else {
                    children.push({
                      uuid: accountsubtype.uuid,
                      parent: accountsubtype.name,
                    });
                  }
                });
              }
              item = {
                uuid: item.uuid,
                parent: item.name,
                _children: children,
              };

              this.rows.push({ ...item, _id: id });
            });
          }
          this.$store.commit("close_loader");
        })
        .catch((err) => {
          this.$store.commit("close_loader");
          console.log(err);
        });
    },
    viewRow(uuid) {
      alert(uuid);
    },
    editRow(uuid) {
      this.$router.push({ path: "/accounting/accounts/" + uuid });
    },
    deleteRow(uuid) {
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
            AccountServices.delete(uuid)
              .then((res) => {
                if (res.status == 200) {
                  this.$swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Account  Deleted Successfully",
                    timer: 3600,
                  });
                  window.location.reload();
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
  },
};
</script>

<style lang="scss">
#account-page {
  .leftAlign {
    text-align: left;
  }
  .drecord {
    cursor: pointer;
  }
  legend {
    box-sizing: border-box;
    color: inherit;
    display: table;
    max-width: 100%;
    padding: 0;
    white-space: normal;
  }
  [type="number"]::-webkit-inner-spin-button,
  [type="number"]::-webkit-outer-spin-button {
    height: auto;
  }
  [type="search"] {
    -webkit-appearance: textfield;
    outline-offset: -2px;
  }
  [type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  ::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
  }
  details {
    display: block;
  }
  [hidden],
  template {
    display: none;
  }
  *,
  :after,
  :before {
    box-sizing: inherit;
  }
  p {
    margin: 0;
  }

  button:focus {
    outline: 1px dotted;
    outline: 5px auto -webkit-focus-ring-color;
  }
  *,
  :after,
  :before {
    border-width: 0;
    border-style: solid;
    border-color: #e2e8f0;
  }
  textarea {
    resize: vertical;
  }
  input::placeholder,
  textarea::placeholder {
    color: #a0aec0;
  }
  [role="button"],
  button {
    cursor: pointer;
  }
  table {
    border-collapse: collapse;
  }
  a {
    color: inherit;
    text-decoration: inherit;
  }
  button,
  input,
  optgroup,
  select,
  textarea {
    padding: 0;
    line-height: inherit;
    color: inherit;
  }
  code {
    font-family: Menlo, Monaco, Consolas, Liberation Mono, Courier New,
      monospace;
  }
  canvas,
  iframe,
  object {
    display: block;
    vertical-align: middle;
  }
  .vue-ads-bg-white {
    background-color: #fff;
  }
  .vue-ads-bg-gray-100 {
    background-color: #f7fafc;
  }
  .vue-ads-bg-gray-200 {
    background-color: #edf2f7;
  }
  .vue-ads-bg-teal-100 {
    background-color: #e6fffa;
  }
  .vue-ads-bg-teal-500 {
    background-color: #38b2ac;
  }
  .vue-ads-rounded-sm {
    border-radius: 0.125rem;
  }
  .vue-ads-border {
    border-width: 1px;
  }
  .vue-ads-border-t {
    border-top-width: 1px;
  }
  .vue-ads-border-r {
    border-right-width: 1px;
  }
  .vue-ads-border-b {
    border-bottom-width: 1px;
  }
  .vue-ads-cursor-default {
    cursor: default;
  }
  .vue-ads-cursor-pointer {
    cursor: pointer;
  }
  .vue-ads-flex {
    display: flex;
  }
  .vue-ads-table {
    display: table;
  }
  .vue-ads-flex-row {
    flex-direction: row;
  }
  .vue-ads-flex-col {
    flex-direction: column;
  }
  .vue-ads-flex-wrap {
    flex-wrap: wrap;
  }
  .vue-ads-justify-end {
    justify-content: flex-end;
  }
  .vue-ads-justify-center {
    justify-content: center;
  }
  .vue-ads-flex-grow {
    flex-grow: 1;
  }
  .vue-ads-font-sans {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
      Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji,
      Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  }
  .vue-ads-font-normal {
    font-weight: 400;
  }
  .vue-ads-font-bold {
    font-weight: 700;
  }
  .vue-ads-leading-normal {
    line-height: 1.5;
  }
  .vue-ads-leading-loose {
    line-height: 2;
  }
  .vue-ads-m-2 {
    margin: 0.5rem;
  }
  .vue-ads-m-auto {
    margin: auto;
  }
  .vue-ads-mt-1 {
    margin-top: 0.25rem;
  }
  .vue-ads-mr-1 {
    margin-right: 0.25rem;
  }
  .vue-ads-ml-1 {
    margin-left: 0.25rem;
  }
  .vue-ads-mr-2 {
    margin-right: 0.5rem;
  }
  .vue-ads-ml-2 {
    margin-left: 0.5rem;
  }
  .vue-ads-outline-none {
    outline: 0;
  }
  .vue-ads-overflow-hidden {
    overflow: hidden;
  }
  .vue-ads-p-1 {
    padding: 0.25rem;
  }
  .vue-ads-p-2 {
    padding: 0.5rem;
  }
  .vue-ads-px-0 {
    padding-left: 0;
    padding-right: 0;
  }
  .vue-ads-px-1 {
    padding-left: 0.25rem;
    padding-right: 0.25rem;
  }
  .vue-ads-py-2 {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
  .vue-ads-py-3 {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }
  .vue-ads-px-3 {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
  .vue-ads-px-4 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .vue-ads-py-6 {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }
  .vue-ads-pb-1 {
    padding-bottom: 0.25rem;
  }
  .vue-ads-pr-2 {
    padding-right: 0.5rem;
  }
  .vue-ads-pl-6 {
    padding-left: 1.5rem;
  }
  .vue-ads-absolute {
    position: absolute;
  }
  .vue-ads-relative {
    position: relative;
  }
  .vue-ads-text-left {
    text-align: left;
  }
  .vue-ads-text-center {
    text-align: center;
  }
  .vue-ads-text-white {
    color: #fff;
  }
  .vue-ads-text-xs {
    font-size: 0.75rem;
  }
  .vue-ads-text-sm {
    font-size: 0.875rem;
  }
  .vue-ads-italic {
    font-style: italic;
  }
  .vue-ads-select-none {
    user-select: none;
  }
  .vue-ads-w-1 {
    width: 0.25rem;
  }
  .vue-ads-w-3 {
    width: 0.75rem;
  }
  .vue-ads-w-6 {
    width: 1.5rem;
  }
  .vue-ads-w-1\/4 {
    width: 25%;
  }
  .vue-ads-w-2\/4 {
    width: 50%;
  }
  .vue-ads-w-3\/4 {
    width: 75%;
  }
  .vue-ads-w-full {
    width: 100%;
  }
  .vue-ads-z-50 {
    z-index: 50;
  }
}
</style>
