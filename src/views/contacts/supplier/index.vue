<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCardHeader> Suppliers </CCardHeader>
        <CCard>
          <CCardBody>
            <!-- <router-link
              class="btn btn-success"
              to="/supplier/create"
              style="float: right"
              >Create Supplier</router-link
            > -->
            <router-link
              v-if="$can('create groups')"
              class="btn btn-success"
              to="/groups/create/suplier"
              style="float: right; margin-right: 10px"
              >Create Groups</router-link
            >
            <CButton
              v-if="$can('create suppliers')"
              color="success"
              class="btn"
              style="float: right; margin-right: 10px"
              @click="quickAddSupplier()"
            >
              Add Supplier</CButton
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
                      v-if="$can('view suppliers')"
                      @click="viewRow(item.uuid)"
                      class="btn-sm"
                      color="success"
                      >View</CButton
                    >
                    <CButton
                      v-if="$can('edit suppliers')"
                      @click="editRow(item.uuid)"
                      class="btn-sm text-white"
                      color="warning"
                    >
                      <CIcon :content="$options.cilPencil"
                    /></CButton>
                    <CButton
                      v-if="$can('delete suppliers')"
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
    <SupplierModel @update-table="updateTable" />
  </div>
</template>

<script>
import SupplierServices from "@/services/contacts/supplier/SupplierServices";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";
import SupplierModel from "@/components/contacts/supplier/SupplierModel";
import { tableMixin } from "@/mixins/tableMixin";

const fields = [
  { key: "serial_no", label: "Serial No", _style: "min-width:15%;" },
  { key: "name", label: "NAME", _style: "min-width:40%" },
  {
    key: "reference",
    label: "Company Reference/Cr No",
    _style: "min-width:15%;",
  },
  { key: "group", label: "GROUP", _style: "min-width:15%;" },
  { key: "status", label: "STATUS", _style: "min-width:15%;" },
  { key: "actions", label: "ACTIONS", _style: "min-width:15%;" },
];

export default {
  name: "IndexSupplier",
  mixins: [tableMixin],
  components: {
    SupplierModel,
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
      this.getServerData(SupplierServices, page, per_page);
    },
    quickAddSupplier() {
      this.$store.commit("set_supplier_model", true);
    },
    viewRow(uuid) {
      this.$router.push({ path: "/supplier/show/" + uuid });
    },
    editRow(uuid) {
      this.$router.push({ path: "/supplier/edit/" + uuid });
    },
    deleteRow(uuid) {
      this.deleteData(SupplierServices, uuid);
    },
  },
};
</script>
