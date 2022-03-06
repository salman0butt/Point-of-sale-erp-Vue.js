<template>
  <div>
    <CRow style="display: flex; justify-content: flex-end; margin-bottom: 20px">
      <CCol sm="2" md="2">
        <CButton color="success" class="btn-block"> Download PDF</CButton>
      </CCol>
      <CCol sm="2" md="2">
        <CButton color="primary" class="btn-block"> Print Report</CButton>
      </CCol>
    </CRow>
    <CCard>
      <CCardHeader> Result </CCardHeader>
      <CCardBody>
        <div>
          <Loader />

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
            @row-clicked="rowClicked"
            ref="externalAgent"
          >
            <template #name="{ item }">
              <td>
                {{ item.name.en ? item.name.en : item.name }}
              </td>
            </template>
          </CDataTable>
          <CPagination
            v-show="pages > 1"
            :pages="pages"
            :active-page.sync="activePage"
          />
        </div>
      </CCardBody>
    </CCard>
  </div>
</template>
<script>
import { cibAddthis, cisMinusSquare } from "@coreui/icons-pro";
// import BrandService from "@/services/catalogs/brands/BrandService";
import { tableMixin } from "@/mixins/tableMixin";
import Multiselect from "vue-multiselect";
import SaleReportService from "@/services/reports/SaleReportService";
import Loader from "@/components/layouts/Loader";

const fields = [
  { key: "item_name", label: "Item Name" },
  { key: "quantity_sold", label: "Quantity Sold" },
  { key: "amount", label: "Amount" },
  { key: "average_price", label: "Average Price" },
];

export default {
  name: "SaleByCustomerReport",
  components: { Multiselect, Loader },
  mixins: [tableMixin],
  cibAddthis,
  cisMinusSquare,
  data: () => ({
    perPage: 25,
    data: [],
    fields,
    toggleOptions: true,
    form: {
      date_range: "",
      from_date: "",
      to_date: "",
      sale_type: "",
      branches: [],
      sold_by: "",
      customer: "",
      payment_type: "",
    },
    options: {
      date_ranges: [
        { value: "", label: "Choose Date Range", disabled: true, selected: "" },
        { value: "today", label: "Today" },
        { value: "yesterday", label: "Yesterday" },
        { value: "last_7_days", label: "Last 7 Days" },
        { value: "last_30_days", label: "Last 30 Days" },
        { value: "this_week", label: "This Week" },
        { value: "last_week", label: "Last Week" },
        { value: "this_month", label: "This Month" },
        { value: "last_month", label: "Last Month" },
        { value: "this_quarter", label: "This Quarter" },
        { value: "last_quarter", label: "Last Quarter" },
        { value: "this_year", label: "This Year" },
        { value: "last_year", label: "Last Year" },
        { value: "all_times", label: "All Times" },
        { value: "custom_date_range", label: "Custom Date Range" },
      ],
      sale_types: [
        { value: "", label: "Choose Sale Type", disabled: true, selected: "" },
        { value: "sales", label: "Sales" },
        { value: "returns", label: "Returns" },
        { value: "all", label: "All" },
      ],
      branches: [
        { value: "branch1", label: "Branch 1" },
        { value: "branch2", label: "Branch 2" },
        { value: "branch3", label: "Branch 3" },
        { value: "branch4", label: "Branch 4" },
        { value: "branch5", label: "Branch 5" },
        { value: "branch6", label: "Branch 6" },
        { value: "branch7", label: "Branch 7" },
        { value: "branch8", label: "Branch 8" },
        { value: "branch9", label: "Branch 9" },
        { value: "branch10", label: "Branch 10" },
      ],
      sold_by: [
        { value: "", label: "Choose Sold By", disabled: true, selected: "" },
        { value: "user1", label: "User 1" },
        { value: "user2", label: "User 2" },
        { value: "user3", label: "User 3" },
        { value: "user4", label: "User 4" },
        { value: "user5", label: "User 5" },
        { value: "user6", label: "User 6" },
        { value: "user7", label: "User 7" },
        { value: "user8", label: "User 8" },
        { value: "user9", label: "User 9" },
        { value: "user10", label: "User 10" },
      ],
      customers: [
        { value: "", label: "Choose Customer", disabled: true, selected: "" },
        { value: "customer1", label: "Customer 1" },
        { value: "customer2", label: "Customer 2" },
        { value: "customer3", label: "Customer 3" },
        { value: "customer4", label: "Customer 4" },
        { value: "customer5", label: "Customer 5" },
        { value: "customer6", label: "Customer 6" },
        { value: "customer7", label: "Customer 7" },
        { value: "customer8", label: "Customer 8" },
        { value: "customer9", label: "Customer 9" },
        { value: "customer10", label: "Customer 10" },
      ],
      payment_types: [
        {
          value: "",
          label: "Choose Payment Type",
          disabled: true,
          selected: "",
        },
        { value: "cash", label: "Cash" },
        { value: "credit_card", label: "Credit Card" },
      ],
    },
  }),
  created() {
    this.getServerData();
  },
  computed: {
    items() {
      return this.data;
    },
  },
  methods: {
    getServerData() {
      this.$store.commit("set_loader");
      let serverData = this.data;
      SaleReportService.getSalesByItem()
        .then(function ({ data }) {
          data.map(function (value) {
            serverData.push(value);
          });
          this.$store.commit("close_loader");
        })
        .catch((error) => {
          this.$store.commit("close_loader");

          console.log(error);
        });
    },
    toggleSection() {
      this.toggleOptions = !this.toggleOptions;
    },
    genrateReport() {
      this.toggleSection();
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
