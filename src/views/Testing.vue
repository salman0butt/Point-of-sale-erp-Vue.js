<template>
  <div id="app">
    <CCard>
      <CCardHeader>Table </CCardHeader>
      <CCardBody>
        <vue-ads-table-tree
          :columns="columns"
          :rows="rows"
          :filter="filterValue"
          :page="page"
          @filter-change="filterChanged"
          @page-change="pageChanged"
        >
          <!-- <template slot="firstName" slot-scope="props">
            <a
              :href="`https://www.google.com/search?q=${props.row.firstName}+${props.row.lastName}`"
              target="_blank"
            >
              {{ props.row.firstName }}
            </a>
          </template> -->
        </vue-ads-table-tree>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
// import { VueAdsTable } from "vue-ads-table-tree";
import "@/../node_modules/@fortawesome/fontawesome-free/css/all.css";

import VueAdsTableTree from "vue-ads-table-tree";
export default {
  name: "app",

  components: {
    VueAdsTableTree,
  },

  data() {
    return {
      page: 0,
      filter: "",
      columns: [
        {
          property: "firstName",
          title: "First Name",
          direction: null,
          filterable: true,
          collapseIcon: true,
        },
        {
          property: "lastName",
          title: "Last Name",
          direction: null,
          filterable: true,
          // collapseIcon: true,
        },
      ],
      rows: [
        {
          firstName: "Josephine",
          lastName: "Astrid",
        },
        {
          firstName: "Boudewijn",
          lastName: "Van Brabandt",
        },
        {
          firstName: "Albert II",
          lastName: "Van Belgie",
          _children: [
            {
              firstName: "Filip",
              lastName: "Van Belgie",
              _children: [
                {
                  firstName: "Elisabeth",
                  lastName: "Van Brabant",
                },
                {
                  firstName: "Gabriel",
                  lastName: "Boudwijn",
                },
                {
                  firstName: "Emmanuel",
                  lastName: "Van Belgie",
                },
                {
                  firstName: "Eleonore",
                  lastName: "Boudwijn",
                  _hasChildren: true,
                },
              ],
            },
            {
              firstName: "Astrid",
              lastName: "Van Belgie",
            },
            {
              firstName: "Laurent",
              lastName: "Van Belgie",
            },
          ],
        },
        {
          firstName: "Alexander",
          lastName: "Van Belgie",
        },
        {
          firstName: "Marie-Christine",
          lastName: "Leopoldine",
        },
        {
          firstName: "Marie-Esmeralda",
          lastName: "Leopoldine",
        },
        {
          firstName: "Alexander",
          lastName: "Van Belgie",
        },
        {
          firstName: "Marie-Christine",
          lastName: "Leopoldine",
        },
        {
          firstName: "Marie-Esmeralda",
          lastName: "Leopoldine",
        },
        {
          firstName: "Alexander",
          lastName: "Van Belgie",
        },
        {
          firstName: "Marie-Christine",
          lastName: "Leopoldine",
        },
        {
          firstName: "Marie-Esmeralda",
          lastName: "Leopoldine",
        },
      ],
    };
  },
  methods: {
    filterChanged(filter) {
      this.filter = filter;
    },

    pageChanged(page) {
      this.page = page;
    },
  },
};
</script>

<style src="vue-ads-table-tree/dist/vue-ads-table-tree.css"></style>
<style>
.leftAlign {
  text-align: left;
}
</style>
