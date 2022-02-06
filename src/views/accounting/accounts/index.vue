<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Accounts </CCardHeader>
          <CCardBody>
            <router-link
              class="btn btn-success"
              to="/accounting/accounts/create"
              style="float: right"
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
              <template slot="actions" slot-scope="props">
                <td>
                  <CButtonGroup>
                    <CButton
                      @click="viewRow(props.row.uuid)"
                      class="btn-sm"
                      color="success"
                      >View</CButton
                    >
                    <CButton
                      @click="editRow(props.row.uuid)"
                      class="btn-sm text-white"
                      color="warning"
                    >
                      <CIcon :content="$options.cilPencil"
                    /></CButton>
                    <!-- <CButton
                      @click="deleteRow(item.uuid)"
                      class="btn-sm"
                      color="danger"
                    >
                      <CIcon :content="$options.cilTrash" />
                    </CButton> -->
                  </CButtonGroup>
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

import VueAdsTableTree from "vue-ads-table-tree";

export default {
  name: "IndexAccounts",
  cilPencil,
  cilTrash,
  cilEye,
  components: {
    VueAdsTableTree,
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
        // {
        //   property: "type",
        //   title: "Type",
        //   direction: null,
        //   filterable: true,
        //   // collapseIcon: true,
        // },
        // {
        //   property: "status",
        //   title: "Status",
        //   direction: null,
        //   filterable: true,
        //   // collapseIcon: true,
        // },
        {
          property: "actions",
          title: "Action",
          direction: null,
          filterable: false,
          // collapseIcon: true,
        },
      ],
      rows: [],
      // rows: [
      //   {
      //     firstName: "Josephine",
      //     lastName: "Astrid",
      //   },
      //   {
      //     firstName: "Boudewijn",
      //     lastName: "Van Brabandt",
      //   },
      //   {
      //     firstName: "Albert II",
      //     lastName: "Van Belgie",
      //     _children: [
      //       {
      //         firstName: "Filip",
      //         lastName: "Van Belgie",
      //         _children: [
      //           {
      //             firstName: "Elisabeth",
      //             lastName: "Van Brabant",
      //           },
      //           {
      //             firstName: "Gabriel",
      //             lastName: "Boudwijn",
      //           },
      //           {
      //             firstName: "Emmanuel",
      //             lastName: "Van Belgie",
      //           },
      //           {
      //             firstName: "Eleonore",
      //             lastName: "Boudwijn",
      //             _hasChildren: true,
      //           },
      //         ],
      //       },
      //       {
      //         firstName: "Astrid",
      //         lastName: "Van Belgie",
      //       },
      //       {
      //         firstName: "Laurent",
      //         lastName: "Van Belgie",
      //       },
      //     ],
      //   },
      // ],
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
      AccountServices.getAllAccountTypes()
        .then(({ data }) => {
          if (data !== "" && data !== undefined) {
            this.rows = [];
            data.map((item, id) => {
              if (item.children.length > 0) {
                let children = [];
                item.children.map((accountsubtype, id2) => {
                  if (accountsubtype.accounts.length > 0) {
                    let children2 = [];
                    accountsubtype.accounts.map((account, id3) => {
                      children2.push({
                        uuid: account.uuid,
                        parent: account.name,
                      });
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

                item = {
                  uuid: item.uuid,
                  parent: item.name,
                  _children: children,
                };
              } else {
                item = {
                  uuid: item.uuid,
                  parent: item.name,
                };
              }

              this.rows.push({ ...item, _id: id });
            });
          }
          // if (data.meta) {
          //   this.setPagination(data.meta);
          // }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    viewRow(uuid) {
      alert(uuid);
    },
    editRow(uuid) {
      this.$router.push({ path: "/accounting/accounts/" + uuid });
    },
  },
};
</script>

<style src="vue-ads-table-tree/dist/vue-ads-table-tree.css"></style>
<style scoped>
.leftAlign {
  text-align: left;
}
</style>
