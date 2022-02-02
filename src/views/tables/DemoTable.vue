<template>
  <CCardBody>
    <CDataTable
      :items="usersData"
      :fields="fields"
      column-filter
      items-per-page-select
      :items-per-page="5"
      hover
      sorter
      pagination
      table-filter
      cleaner
      tree
      :tree-props="{
        children: 'children',
        hasChildren: 'hasChildren',
      }"
    >
      <template #status="{ item }">
        <td>
          <CBadge :color="getBadge(item.status)">
            {{ item.status }}
          </CBadge>
        </td>
      </template>
      <template #show_details="{ item, index }">
        <td class="py-2">
          <CButton
            color="primary"
            variant="outline"
            square
            size="sm"
            @click="toggleDetails(item, index)"
          >
            {{ Boolean(item._toggled) ? "Hide" : "Show" }}
          </CButton>
        </td>
      </template>
      <template #details="{ item }">
        <div v-if="item._toggled">
          <div class="row">
            <div class="col-sm-6">
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group">
                    <label>First Name</label>
                    <input type="text" class="form-control" v-model="item.first_name" />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <label>Last Name</label>
                    <input type="text" class="form-control" v-model="item.last_name" />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group">
                    <label>First Name</label>
                    <input type="text" class="form-control" v-model="item.first_name" />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <label>Last Name</label>
                    <input type="text" class="form-control" v-model="item.last_name" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <!--
      <template #details="{ item }">
        <CCollapse :show="Boolean(item._toggled)" :duration="collapseDuration">
          <CCardBody>
            <CMedia :aside-image-props="{ height: 102 }">
              <h4>
                {{ item.username }}
              </h4>
              <p class="text-muted">User since: {{ item.registered }}</p>
              <CButton size="sm" color="info" class=""> User Settings </CButton>
              <CButton size="sm" color="danger" class="ml-1"> Delete </CButton>
            </CMedia>
          </CCardBody>
        </CCollapse>
      </template> -->
    </CDataTable>
  </CCardBody>
</template>

<script>
import usersData from "../users/UsersData";

const fields = [
  { key: "username", _style: "min-width:40%" },
  "registered",
  { key: "role", _style: "min-width:20%;" },
  { key: "status", _style: "min-width:20%;" },
  {
    key: "show_details",
    label: "",
    _style: "min-width:1%",
  },
];

export default {
  name: "AdvancedTables",
  data() {
    return {
      usersData: usersData.map((item, id) => {
        return { ...item, id };
      }),
      fields,
      details: [],
      collapseDuration: 0,
    };
  },
  methods: {
    getBadge(status) {
      switch (status) {
        case "Active":
          return "success";
        case "Inactive":
          return "secondary";
        case "Pending":
          return "warning";
        case "Banned":
          return "danger";
        default:
          "primary";
      }
    },
    toggleDetails(item) {
      this.$set(this.usersData[item.id], "_toggled", !item._toggled);
      this.collapseDuration = 300;
      this.$nextTick(() => {
        this.collapseDuration = 0;
      });
    },
  },
};
</script>
