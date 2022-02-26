<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Customers </CCardHeader>
          <CCardBody>
            <router-link
              v-if="$can('create groups')"
              class="btn btn-success"
              to="/groups/create/customer"
              style="float: right; margin-right: 10px"
              >Create Groups</router-link
            >
            <!-- <router-link
              class="btn btn-success"
              to="/customers/quick-add"
              style="float: right; margin-right: 10px"
              >Quick Add</router-link
            > -->
            <CButton
              v-if="$can('create customers')"
              color="success"
              class="btn"
              style="float: right; margin-right: 10px"
              @click="quickAddCustomer()"
            >
              Quick Add</CButton
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
            >
              <template #select="{ item }">
                <td>
                  <CInputCheckbox
                    :checked="item._selected"
                    @update:checked="() => check(item)"
                    custom
                  />
                </td>
              </template>
              <template #group="{ item }">
                <td>
                  {{ item.group && item.group.name ? item.group.name.en : "" }}
                </td>
              </template>
              <template #actions="{ item }">
                <td>
                  <CButtonGroup>
                    <CButton
                      v-if="$can('view customers')"
                      @click="viewRow(item.uuid)"
                      class="btn-sm"
                      color="success"
                      >View</CButton
                    >
                    <CButton
                      v-if="$can('edit customers')"
                      @click="editRow(item.uuid)"
                      class="btn-sm text-white"
                      color="warning"
                    >
                      <CIcon :content="$options.cilPencil"
                    /></CButton>
                    <CButton
                      v-if="$can('delete customers')"
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
    <CustomerModel @update-table="updateTable" />
  </div>
</template>

<script>
import CustomerServices from "@/services/contacts/customers/CustomerServices";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";
import CustomerModel from "@/components/contacts/customers/CustomerModel";
import { tableMixin } from "@/mixins/tableMixin";

const fields = [
  { key: "serial_no", label: "Serial No", _style: "min-width:15%;" },
  { key: "full_name", label: "NAME", _style: "min-width:40%" },
  { key: "type", label: "TYPE", _style: "min-width:15%;" },
  { key: "group", label: "GROUP", _style: "min-width:15%;" },
  { key: "status", label: "STATUS", _style: "min-width:15%;" },
  { key: "actions", label: "ACTIONS", _style: "min-width:15%;" },
];

export default {
  name: "IndexAccounts",
  mixins: [tableMixin],
  components: {
    CustomerModel,
  },
  cilPencil,
  cilTrash,
  cilEye,
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
    items() {
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
      this.getServerData(CustomerServices, page, per_page);
    },
    viewRow(uuid) {
      this.$router.push({ path: "/customers/show/" + uuid });
    },
    editRow(uuid) {
      this.$router.push({ path: "/customers/edit/" + uuid });
    },
    quickAddCustomer() {
      this.$store.commit("set_customer_model", true);
    },
    deleteRow(uuid) {
      this.deleteData(CustomerServices, uuid);
    },
  },
};
</script>
