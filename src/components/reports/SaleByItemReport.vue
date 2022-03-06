<template>
  <div>
    <!-- <CCard>
      <CCardHeader>
        Sales Report
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
                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Sale Type"
                    :options="options.sale_types"
                    :value.sync="form.sale_type"
                  />
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <label class="typo__label">Branches</label>
                  <multiselect
                    v-model="form.branches"
                    :options="options.branches"
                    :multiple="true"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    placeholder="Select Branches"
                    label="label"
                    track-by="label"
                    :preselect-first="true"
                  >
                    <template
                      slot="selection"
                      slot-scope="{ values, search, isOpen }"
                    >
                      <span
                        class="multiselect__single"
                        v-if="values.value &amp;&amp; !isOpen"
                        >{{ values.length }} options selected</span
                      ></template
                    >
                  </multiselect>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Sold By"
                    :options="options.sold_by"
                    :value.sync="form.sold_by"
                  />
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Customer"
                    :options="options.customers"
                    :value.sync="form.customer"
                  />
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Payment Types"
                    :options="options.payment_types"
                    :value.sync="form.payment_type"
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
    </CCard> -->
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
            @pagination-change="changePagination"
            :items-per-page="perPage"
            sorter
            clickable-rows
            hover
            :loading="loading"
            @row-clicked="rowClicked"
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
// import BrandService from "@/services/catalogs/brands/BrandService";
import { tableMixin } from "@/mixins/tableMixin";
import Multiselect from "vue-multiselect";

const fields = [
  { key: "sale_id", label: "Sales ID", _style: "width:50%" },
  { key: "date_time", label: "Date + Time", _style: "width:50%" },
  {
    key: "products_purchased",
    label: "Products Purchased",
    _style: "width:50%",
  },
  { key: "sold_by", label: "Sold By", _style: "width:50%" },
  { key: "sold_to", label: "Sold To", _style: "width:50%" },
  { key: "phone_number", label: "Phone Number", _style: "width:50%" },
  { key: "subtotal", label: "Subtotal", _style: "width:50%" },
  { key: "discount", label: "Discount", _style: "width:50%" },
  { key: "total", label: "Total", _style: "width:50%" },
  { key: "tax", label: "Tax", _style: "width:50%" },
  { key: "profit", label: "Profit", _style: "width:50%" },
  {
    key: "cost_of_goods_sold",
    label: "Cost Of Goods Sold",
    _style: "width:50%",
  },
  { key: "payment_type", label: "Payment Type", _style: "width:50%" },
  { key: "note", label: "Note", _style: "width:50%" },
];

export default {
  name: "SaleByItemReport",
  components: { Multiselect },
  mixins: [tableMixin],
  cibAddthis,
  cisMinusSquare,
  data: () => ({
    perPage: 25,
    data: [
      {
        sale_id: "1",
        date_time: "2019-01-01",
        products_purchased: "1",
        sold_by: "user1",
        sold_to: "user2",
        phone_number: "123456789",
        subtotal: "100",
        discount: "10%",
        total: "90",
        tax: "0",
        profit: "5",
        cost_of_goods_sold: "10",
        payment_type: "Cash",
        note: "Some Notes",
      },
      {
        sale_id: "2",
        date_time: "2019-01-01",
        products_purchased: "1",
        sold_by: "user1",
        sold_to: "user2",
        phone_number: "123456789",
        subtotal: "100",
        discount: "10%",
        total: "90",
        tax: "0",
        profit: "5",
        cost_of_goods_sold: "10",
        payment_type: "Cash",
        note: "Some Notes",
      },
      {
        sale_id: "3",
        date_time: "2019-01-01",
        products_purchased: "1",
        sold_by: "user1",
        sold_to: "user2",
        phone_number: "123456789",
        subtotal: "100",
        discount: "10%",
        total: "90",
        tax: "0",
        profit: "5",
        cost_of_goods_sold: "10",
        payment_type: "Cash",
        note: "Some Notes",
      },
      {
        sale_id: "4",
        date_time: "2019-01-01",
        products_purchased: "1",
        sold_by: "user1",
        sold_to: "user2",
        phone_number: "123456789",
        subtotal: "100",
        discount: "10%",
        total: "90",
        tax: "0",
        profit: "5",
        cost_of_goods_sold: "10",
        payment_type: "Cash",
        note: "Some Notes",
      },
    ],
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
    // this.getData();
  },
  computed: {
    items() {
      return this.data;
    },
  },
  methods: {
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
