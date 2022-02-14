<template>
  <CRow>
    <CCol xs="12" lg="12">
      <CRow>
        <CCol sm="12" md="12" class="pt-2">
          <CButton
            color="success"
            class="btn"
            style="float: right; margin-right: 10px"
            @click="addPaymentTerm()"
          >
            Add Payment Terms</CButton
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
            clickable-rows
            hover
            :loading="loading"
            ref="externalAgent"
          >
            <template #description="{ item }">
              <td v-html="item.description"></td>
            </template>
            <template #actions="{ item }">
              <td>
                <CButtonGroup>
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
          <CPagination v-show="pages > 1" :pages="pages" :active-page.sync="activePage" />
        </CCol>
      </CRow>
    </CCol>
    <PaymentTermModel @update-table="updateTable" />
  </CRow>
</template>
<script>
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";
import PaymetTermService from "@/services/paymentTerms/PaymentTermService";
import { tableMixin } from "@/mixins/tableMixin";
import PaymentTermModel from "@/components/paymentTerms/PaymentTermModel";
const fields = [
  { key: "name", label: "Name", _style: "min-width:40%" },
  { key: "description", label: "DESCRIPTION", _style: "min-width:15%;" },
  { key: "actions", label: "ACTION", _style: "width:25%;" },
];

export default {
  name: "PaymentTermIndex",
  mixins: [tableMixin],
  components: {
    PaymentTermModel,
  },
  cilPencil,
  cilTrash,
  cilEye,
  data: () => ({
    fields,
    data: [],
  }),
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
      this.getServerData(PaymetTermService, page, per_page);
    },
    addPaymentTerm() {
      this.$store.commit("set_payment_term_model", true);
    },
    editRow(uuid) {
      this.$store.commit("set_payment_term_id", uuid);
      this.$store.commit("set_payment_term_model", true);
    },
    deleteRow(uuid) {
      this.deleteData(PaymetTermService, uuid);
    },
  },
};
</script>
