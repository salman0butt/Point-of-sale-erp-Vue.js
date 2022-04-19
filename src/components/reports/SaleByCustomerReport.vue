<template>
  <div>
    <CCard>
      <CCardHeader>
        Customer Report
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
                    :class="{ error: $v.form.date_range.$error }"
                    @input="$v.form.date_range.$touch()"
                  />
                  <div v-if="$v.form.date_range.$error">
                    <p v-if="!$v.form.date_range.required" class="errorMsg">
                      Date Range is required
                    </p>
                  </div>
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
                    :class="{ error: $v.form.from_date.$error }"
                    @input="$v.form.from_date.$touch()"
                  />
                  <div v-if="$v.form.from_date.$error">
                    <p v-if="!$v.form.from_date.required" class="errorMsg">
                      From Date is required
                    </p>
                  </div>
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
                    :class="{ error: $v.form.to_date.$error }"
                    @input="$v.form.to_date.$touch()"
                  />
                  <div v-if="$v.form.to_date.$error">
                    <p v-if="!$v.form.to_date.required" class="errorMsg">
                      TO Date is required
                    </p>
                  </div>
                </CCol>

                <!-- <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Customer"
                    :options="options.customers"
                    :value.sync="form.customer"
                  />
                </CCol> -->
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
                    <template slot="selection" slot-scope="{ values, search, isOpen }">
                      <span
                        class="multiselect__single"
                        v-if="values.value &amp;&amp; !isOpen"
                        >{{ values.length }} options selected</span
                      ></template
                    >
                  </multiselect>
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
                    @click="[getServerData(), (toggleOptions = false)]"
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
            <template #full_name="{ item }">
              <td>
                {{ item.full_name.en ? item.full_name.en : item.full_name }}
              </td>
            </template>
            <template #sales_total="{ item }">
              <td>
                {{ item.sales_total ? item.sales_total : "" }}
              </td>
            </template>
            <template #sales_total_with_tax="{ item }">
              <td>
                {{ item.sales_total_with_tax ? item.sales_total_with_tax : "" }}
              </td>
            </template>
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
import Multiselect from "vue-multiselect";
import SaleReportService from "@/services/reports/SaleReportService";
import Loader from "@/components/layouts/Loader";
import { required } from "vuelidate/lib/validators";

const fields = [
  { key: "full_name", label: "Customer" },
  { key: "approved_invoices_count", label: "Invoice Count" },
  { key: "sales_total", label: "Sales" },
  { key: "sales_total_with_tax", label: "Sales With Tax" },
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
      // sale_types: [
      //   { value: "", label: "Choose Sale Type", disabled: true, selected: "" },
      //   { value: "sales", label: "Sales" },
      //   { value: "returns", label: "Returns" },
      //   { value: "all", label: "All" },
      // ],
      branches: [],
      // sold_by: [
      //   { value: "", label: "Choose Sold By", disabled: true, selected: "" },
      //   { value: "user1", label: "User 1" },
      //   { value: "user2", label: "User 2" },
      //   { value: "user3", label: "User 3" },
      //   { value: "user4", label: "User 4" },
      //   { value: "user5", label: "User 5" },
      //   { value: "user6", label: "User 6" },
      //   { value: "user7", label: "User 7" },
      //   { value: "user8", label: "User 8" },
      //   { value: "user9", label: "User 9" },
      //   { value: "user10", label: "User 10" },
      // ],
      // customers: [
      //   { value: "", label: "Choose Customer", disabled: true, selected: "" },
      //   { value: "customer1", label: "Customer 1" },
      //   { value: "customer2", label: "Customer 2" },
      //   { value: "customer3", label: "Customer 3" },
      //   { value: "customer4", label: "Customer 4" },
      //   { value: "customer5", label: "Customer 5" },
      //   { value: "customer6", label: "Customer 6" },
      //   { value: "customer7", label: "Customer 7" },
      //   { value: "customer8", label: "Customer 8" },
      //   { value: "customer9", label: "Customer 9" },
      //   { value: "customer10", label: "Customer 10" },
      // ],
      // payment_types: [
      //   {
      //     value: "",
      //     label: "Choose Payment Type",
      //     disabled: true,
      //     selected: "",
      //   },
      //   { value: "cash", label: "Cash" },
      //   { value: "credit_card", label: "Credit Card" },
      // ],
    },
  }),
  created() {
    this.getServerData();
    this.getBranches();
  },
  validations() {
    if (this.form.date_range === "custom_date_range") {
      return {
        form: {
          date_range: { required },
          from_date: { required },
          to_date: { required },
        },
      };
    } else {
      return {
        form: {
          date_range: { required },
        },
      };
    }
  },
  computed: {
    items() {
      return this.data;
    },
  },
  methods: {
    getBranches() {
      this.$store.commit("set_loader");
      this.$http
        .get("/branches", {
          headers: {
            "selected-branches": localStorage.getItem("selected_branches"),
          },
        })
        .then(({ data }) => {
          data.map((item, id) => {
            this.options.branches.push({
              value: item.uuid,
              label: item.name,
            });
          });
          this.$store.commit("close_loader");
        })
        .catch((err) => {
          this.$store.commit("close_loader");
          console.log(err);
        });
    },
    getServerData() {
      this.$store.commit("set_loader");
      let that = this;
      this.data = [];
      let serverData = this.data;
      let branches = [];
      branches = this.form.branches.map((item) => {
        return item.value;
      });
      SaleReportService.getSalesByCustomer(
        this.form.date_range,
        this.form.from_date,
        this.form.to_date,
        JSON.stringify(branches)
      )
        .then(function ({ data }) {
          data.map(function (value) {
            serverData.push(value);
          });
          that.$store.commit("close_loader");
        })
        .catch((error) => {
          that.$store.commit("close_loader");

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
