<template>
  <div>
    <CCard>
      <CCardHeader>
        Product Report
        <CButton
          @click="toggleSection()"
          style="float: right; border: none; box-shadow: none"
          >{{ toggleOptions ? "-" : "+" }}</CButton
        ></CCardHeader
      >
      <CCardBody v-if="toggleOptions">
        <CRow>
          <CCol xs="12" lg="12">
            <form @submit.prevent="">
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Date Range"
                    :options="options.date_ranges"
                    :value.sync="form.date_range"
                  />
                </CCol>

                <CCol
                  v-if="form.date_range === 'custom_date_range'"
                  sm="6"
                  md="4"
                  class="pt-2"
                >
                  <CInput
                    label="From Date"
                    type="date"
                    :value.sync="form.from_date"
                  />
                </CCol>
                <CCol
                  v-if="form.date_range === 'custom_date_range'"
                  sm="6"
                  md="4"
                  class="pt-2"
                >
                  <CInput
                    label="To Date"
                    type="date"
                    :value.sync="form.to_date"
                  />
                </CCol>
              </CRow>

              <CRow>
                <CCol sm="6" md="3" class="pt-2">
                  <CButton
                    progress
                    timeout="2000"
                    block
                    color="success"
                    style="margin-top: 30px"
                    @click="genrateReport()"
                    >Genrate Report</CButton
                  >
                </CCol>
              </CRow>
            </form>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
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
          <CDataTable
            :items="items"
            :fields="fields"
            table-filter
            items-per-page-select
            sorter
            clickable-rows
            hover
            ref="externalAgent"
          >
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
import { tableMixin } from "@/mixins/tableMixin";
import ReportService from "@/services/reports/ReportService";

const fields = [
  { key: "product_name", label: "PRODUCT NAME", _style: "width:50%" },
  { key: "product_code", label: "PRODUCT CODE", _style: "width:50%" },
  { key: "supplier", label: "SUPPLIER", _style: "width:50%" },
  { key: "barcode", label: "BARCODE", _style: "width:50%" },
  { key: "type", label: "TYPE", _style: "width:50%" },
  { key: "category", label: "CATEGORY", _style: "width:50%" },
  {
    key: "current_cost_price",
    label: "CURRENT COST PRICE",
    _style: "width:50%",
  },
  {
    key: "current_selling_price",
    label: "CURRENT SELLING PRICE",
    _style: "width:50%",
  },
  {
    key: "current_profit_price",
    label: "CURRENT PROFIT PRICE",
    _style: "width:50%",
  },
  { key: "tax_type", label: "TAX TYPE", _style: "width:50%" },
  { key: "quantity", label: "QUANTITY", _style: "width:50%" },
  {
    key: "quantity_purchased",
    label: "QUANTITY PURCHASED",
    _style: "width:50%",
  },
  { key: "quantity_balance", label: "QUANTITY BALANCE", _style: "width:50%" },
  { key: "quantity_damage", label: "QUANTITY DAMAGE", _style: "width:50%" },
  { key: "quantity_return", label: "QUANTITY RETURN", _style: "width:50%" },
  { key: "expire_date", label: "EXPIRE DATE", _style: "width:50%" },
  { key: "weight_unit", label: "WEIGHT UNIT", _style: "width:50%" },
];

export default {
  name: "ProfitAndLossReport",
  mixins: [tableMixin],
  cibAddthis,
  cisMinusSquare,
  data: () => ({
    perPage: 25,
    data: [
      {
        product_name: "Product 1",
        product_code: "P001",
        supplier: "Supplier 1",
        barcode: "B001",
        type: "Type 1",
        category: "Category 1",
        current_cost_price: "100",
        current_selling_price: "200",
        current_profit_price: "100",
        tax_type: "Tax Type 1",
        quantity: "100",
        quantity_purchased: "100",
        quantity_balance: "100",
        quantity_damage: "100",
        quantity_return: "100",
        expire_date: "2020-01-01",
        weight_unit: "Weight Unit 1",
      },
      {
        product_name: "Product 2",
        product_code: "P002",
        supplier: "Supplier 2",
        barcode: "B002",
        type: "Type 2",
        category: "Category 2",
        current_cost_price: "100",
        current_selling_price: "200",
        current_profit_price: "100",
        tax_type: "Tax Type 2",
        quantity: "100",
        quantity_purchased: "100",
        quantity_balance: "100",
        quantity_damage: "100",
        quantity_return: "100",
        expire_date: "2020-01-01",
        weight_unit: "Weight Unit 2",
      },
    ],
    fields,
    toggleOptions: true,
    form: {
      date_range: "",
      from_date: "",
      to_date: "",
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
      // console.log("test");
      ReportService.profitAndLossReport()
        .then(function (data) {
          console.log(data);
        })
        .catch(function (error) {
          console.log("error");
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
