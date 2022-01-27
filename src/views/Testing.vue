<template>
  <div id="app">
    <vue-ads-table
      :columns="columns"
      :rows="rows"
      :classes="classes"
      :filter="filter"
      :start="start"
      :end="end"
      @filter-change="filterChanged"
      :call-rows="callRows"
      :call-children="callChildren"
      :call-temp-rows="callTempRows"
    >
      <!-- Will be applied on the name column for the rows with an _id of tiger -->
      <template slot="name_tiger" slot-scope="props"
        >test cell - {{ props.row.name }}</template
      >
      <!-- Will be applied on the city column -->
      <template slot="city" slot-scope="props"
        >test column - {{ props.row.city }}</template
      >
      <!-- Will be applied on the row with _id tiger -->
      <template slot="_tiger" slot-scope="props"
        >test row - {{ props.row[props.column.property] }}</template
      >
      <template slot="no-rows">Geen resultaten</template>
      <template slot="sort-icon" slot-scope="props">
        ({{
          props.direction === null ? "null" : props.direction ? "up" : "down"
        }})
      </template>
      <template slot="toggle-children-icon" slot-scope="props">
        [{{ props.expanded ? "-" : "+" }}]
      </template>
    </vue-ads-table>
  </div>
</template>

<script>
import { VueAdsTable } from "vue-ads-table-tree";

export default {
  name: "BasicTableApp",

  components: {
    VueAdsTable,
  },

  data() {
    let rows = [
      {
        _id: "tiger",
        name: "Tiger Nixon",
        function: "System Architect",
        city: "Edinburgh",
        id: "5421",
        since: "2011/04/25",
        budget: "$320,800",
        _hasChildren: true,
      },
      {
        name: "Lael Greer",
        function: "Systems Administrator",
        city: "London",
        id: "6733",
        since: "2009/02/27",
        budget: "$103,500",
        _showChildren: true,
        _children: [
          {
            name: "Garrett Winters",
            function: "Accountant",
            city: "Tokyo",
            id: "8422",
            since: "2011/07/25",
            budget: "$170,750",
          },
        ],
      },
    ];

    rows.length = 4;

    let columns = [
      {
        property: "id",
        title: "ID#",
        direction: null,
        filterable: true,
      },
      {
        property: "name",
        title: "Name",
        direction: null,
        filterable: true,
      },
      {
        property: "function",
        title: "Function",
        direction: null,
        filterable: true,
        groupable: true,
      },
      {
        property: "city",
        title: "City",
        direction: null,
        filterable: true,
      },
      {
        property: "since",
        title: "Since",
        direction: null,
        filterable: true,
      },
      {
        property: "budget",
        title: "Budget",
        direction: null,
        filterable: true,
      },
    ];

    let classes = {
      group: {
        "vue-ads-font-bold": true,
        "vue-ads-border-b": true,
        "vue-ads-italic": true,
      },
      "0/all": {
        "vue-ads-py-3": true,
        "vue-ads-px-2": true,
      },
      "even/": {
        "vue-ads-bg-blue-lighter": true,
      },
      "odd/": {
        "vue-ads-bg-blue-lightest": true,
      },
      "0/": {
        "vue-ads-bg-blue-lighter": false,
        "vue-ads-bg-blue-dark": true,
        "vue-ads-text-white": true,
        "vue-ads-font-bold": true,
      },
      "1_/": {
        "hover:vue-ads-bg-red-lighter": true,
      },
      "1_/0": {
        leftAlign: true,
      },
    };

    return {
      rows,
      columns,
      classes,
      filter: "",
      start: 0,
      end: 2,
    };
  },

  methods: {
    filterChanged(filter) {
      this.filter = filter;
    },

    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },

    async callRows(indexesToLoad) {
      await this.sleep(1000);
      return indexesToLoad.map((index) => {
        return {
          name: "Call Rows",
          function: "Developer",
          city: "San Francisco",
          id: "8196",
          since: "2010/07/14",
          budget: "$86,500",
        };
      });
    },

    async callChildren(parent) {
      await this.sleep(1000);
      return [
        {
          name: "Call child",
          function: "Developer",
          city: "San Francisco",
          id: "8196",
          since: "2010/07/14",
          budget: "$86,500",
        },
      ];
    },

    async callTempRows(filter, columns, start, end) {
      await this.sleep(1000);
      return {
        rows: [
          {
            name: "Temp call",
            function: "Developer",
            city: "San Francisco",
            id: "8196",
            since: "2010/07/14",
            budget: "$86,500",
          },
          {
            name: "Temp call",
            function: "Developer",
            city: "San Francisco",
            id: "8196",
            since: "2010/07/14",
            budget: "$86,500",
          },
        ],
        total: 4,
      };
    },
  },
};
</script>

<style>
.leftAlign {
  text-align: left;
}
</style>