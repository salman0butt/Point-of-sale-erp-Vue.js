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
                  <CInput label="From Date" type="date" :value.sync="form.from_date" />
                </CCol>
                <CCol
                  v-if="form.date_range === 'custom_date_range'"
                  sm="6"
                  md="4"
                  class="pt-2"
                >
                  <CInput label="To Date" type="date" :value.sync="form.to_date" />
                </CCol>

                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Supplier"
                    :options="options.suppliers"
                    :value.sync="form.supplier"
                  />
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Brand"
                    :options="options.brands"
                    :value.sync="form.brand"
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Category"
                    :options="options.categories"
                    :value.sync="form.category"
                  />
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Expiry Date"
                    type="date"
                    :value.sync="form.expiry_date"
                  />
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Select Product"
                    :options="options.products"
                    :value.sync="form.product"
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Weight Unit"
                    :options="options.weight_units"
                    :value.sync="form.weight_unit"
                  />
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Is Favorite"
                    :options="options.favorite"
                    :value.sync="form.favorite"
                  />
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput label="Tag" :value.sync="form.tag" />
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
          <CPagination v-show="pages > 1" :pages="pages" :active-page.sync="activePage" />
        </div>
      </CCardBody>
    </CCard>
  </div>
</template>
<script>
import { cibAddthis, cisMinusSquare } from "@coreui/icons-pro";
// import BrandService from "@/services/catalogs/brands/BrandService";
import { tableMixin } from "@/mixins/tableMixin";

const fields = [
  { key: "product_name", label: "PRODUCT NAME", _style: "width:50%" },
  { key: "product_code", label: "PRODUCT CODE", _style: "width:50%" },
  { key: "supplier", label: "SUPPLIER", _style: "width:50%" },
  { key: "barcode", label: "BARCODE", _style: "width:50%" },
  { key: "type", label: "TYPE", _style: "width:50%" },
  { key: "category", label: "CATEGORY", _style: "width:50%" },
  { key: "current_cost_price", label: "CURRENT COST PRICE", _style: "width:50%" },
  { key: "current_selling_price", label: "CURRENT SELLING PRICE", _style: "width:50%" },
  { key: "current_profit_price", label: "CURRENT PROFIT PRICE", _style: "width:50%" },
  { key: "tax_type", label: "TAX TYPE", _style: "width:50%" },
  { key: "quantity", label: "QUANTITY", _style: "width:50%" },
  { key: "quantity_purchased", label: "QUANTITY PURCHASED", _style: "width:50%" },
  { key: "quantity_balance", label: "QUANTITY BALANCE", _style: "width:50%" },
  { key: "quantity_damage", label: "QUANTITY DAMAGE", _style: "width:50%" },
  { key: "quantity_return", label: "QUANTITY RETURN", _style: "width:50%" },
  { key: "expire_date", label: "EXPIRE DATE", _style: "width:50%" },
  { key: "weight_unit", label: "WEIGHT UNIT", _style: "width:50%" },
];

export default {
  name: "CustomerReport",
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
      supplier: "",
      brand: "",
      category: "",
      expiry_date: "",
      select_product: "",
      weight_unit: "",
      is_favorite: "",
      tags: "",
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
      suppliers: [
        { value: "", label: "Choose Supplier", disabled: true, selected: "" },
        { value: "1", label: "Supplier 1" },
        { value: "2", label: "Supplier 2" },
        { value: "3", label: "Supplier 3" },
        { value: "4", label: "Supplier 4" },
        { value: "5", label: "Supplier 5" },
      ],
      brands: [
        { value: "", label: "Choose Brand", disabled: true, selected: "" },
        { value: "1", label: "Brand 1" },
        { value: "2", label: "Brand 2" },
        { value: "3", label: "Brand 3" },
        { value: "4", label: "Brand 4" },
        { value: "5", label: "Brand 5" },
      ],
      categories: [
        { value: "", label: "Choose Category", disabled: true, selected: "" },
        { value: "1", label: "Category 1" },
        { value: "2", label: "Category 2" },
        { value: "3", label: "Category 3" },
        { value: "4", label: "Category 4" },
        { value: "5", label: "Category 5" },
      ],
      products: [
        { value: "", label: "Choose Select Product", disabled: true, selected: "" },
        { value: "1", label: "Select Product 1" },
        { value: "2", label: "Select Product 2" },
        { value: "3", label: "Select Product 3" },
        { value: "4", label: "Select Product 4" },
        { value: "5", label: "Select Product 5" },
      ],
      favorite: [
        { value: "", label: "Choose Favorite", disabled: true, selected: "" },
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
      weight_units: [
        { value: "", label: "Choose Weight Unit", disabled: true, selected: "" },
        { value: "kg", label: "Kilogram" },
        { value: "g", label: "Gram" },
        { value: "mg", label: "Milligram" },
        { value: "lb", label: "Pound" },
        { value: "oz", label: "Ounce" },
        { value: "gram", label: "Gram" },
        { value: "ton", label: "Ton" },
        { value: "tonne", label: "Tonne" },
        { value: "carat", label: "Carat" },
        { value: "pound", label: "Pound" },
        { value: "ounce", label: "Ounce" },
        { value: "milligram", label: "Milligram" },
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
      // this.getData();
    },
  },
};
</script>
