<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Payment Methods </CCardHeader>
          <CCardBody>
            <router-link
              v-if="$can('create paymentMethod')"
              class="btn btn-success"
              to="/accounting/paymentMethods/create"
              style="float: right"
              >Create Payment Method</router-link
            >
            <div style="clear: both; margin-bottom: 20px"></div>
            <Loader />
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
              <template #account="{ item }">
                <td>{{ item.account ? item.account.name : "" }}</td>
              </template>
              <template #actions="{ item }">
                <td>
                  <CButtonGroup>
                    <!--<CButton
                      v-if="$can('show paymentMethod')"
                      @click="viewRow(item.uuid)"
                      class="btn-sm"
                      color="success"
                      >View</CButton
                    >
                    -->
                    <CButton
                      v-if="$can('edit paymentMethod')"
                      @click="editRow(item.uuid)"
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
import PaymentMethodsServices from "@/services/accounting/paymentMethods/PaymentMethodsServices";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";
import Loader from "@/components/layouts/Loader";
const fields = [
  { key: "name", label: "NAME", _style: "min-width:40%" },
  { key: "account", label: "PARENT ACCOUNT", _style: "min-width:15%;" },
  { key: "percent", label: "PERCENT", _style: "min-width:15%;" },
  { key: "amount", label: "AMOUNT", _style: "min-width:15%;" },
  { key: "tax", label: "TYPE", _style: "min-width:15%;" },
  { key: "status", label: "STATUS", _style: "min-width:15%;" },
  { key: "actions", label: "ACTIONS", _style: "min-width:15%;" },
];

export default {
  name: "IndexPaymentMethods",
  cilPencil,
  cilTrash,
  cilEye,
  components: {
    Loader,
  },
  data() {
    return {
      serverData: [],
      fields,
      activePage: 1,
      pages: 0,
      perPage: 10,
    };
  },
  created() {
    this.getServerData();
  },
  watch: {
    activePage() {
      this.getServerData(this.activePage, this.perPage);
    },
  },
  computed: {
    items() {
      return this.serverData;
    },
  },
  methods: {
    getServerData() {
      this.$store.commit("set_loader");
      PaymentMethodsServices.getAll(this.activePage, this.perPage)
        .then(({ data }) => {
          if (data !== "" && data !== undefined) {
            this.serverData = [];
            data.data.map((item, id) => {
              this.serverData.push({ ...item, id });
            });
          }
          if (data.meta) {
            this.setPagination(data.meta);
          }
          this.$store.commit("close_loader");
        })
        .catch((err) => {
          console.log(err);
          this.$store.commit("close_loader");
        });
    },

    rowClicked(item, index, column, e) {
      if (!["INPUT", "LABEL"].includes(e.target.tagName)) {
        this.check(item);
      }
    },
    check(item) {
      const val = Boolean(this.usersData[item.id]._selected);
      this.$set(this.usersData[item.id], "_selected", !val);
    },
    viewRow(uuid) {
      alert("page not ready");
    },
    editRow(uuid) {
      this.$router.push({ path: "/accounting/paymentMethods/" + uuid });
    },

    setPagination(meta) {
      this.activePage = parseInt(meta.current_page);
      this.pages = parseInt(meta.last_page);
      this.perPage = parseInt(meta.per_page);
    },

    changePagination(value) {
      this.perPage = parseInt(value);
      this.getServerData(this.activePage, this.perPage);
    },
  },
};
</script>
<style scoped>
.bolder {
  font-weight: 600;
}
</style>
