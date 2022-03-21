<template>
  <div>
    <CCard>
      <CCardHeader>
        Opening Report
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
                <!-- <CCol sm="6" md="4" class="pt-2">
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
                </CCol> -->
              </CRow>

              <CRow>
                <CCol sm="6" md="3" class="pt-2">
                  <CButton
                    progress
                    timeout="2000"
                    block
                    color="success"
                    style="margin-top: 30px"
                    @click="getServerData()"
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
            :loading="false"
            @row-clicked="rowClicked"
            ref="externalAgent"
          >
            <template #terminal="{ item }">
              <td>
                {{ item.terminal ? item.terminal.name : "" }}
              </td>
            </template>
            <template #actions="{ item }">
              <td>
                <CButtonGroup>
                  <CButton @click="viewRow(item.uuid)" class="btn-sm" color="success"
                    >View</CButton
                  >
                </CButtonGroup>
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
// import Multiselect from "vue-multiselect";
import Loader from "@/components/layouts/Loader";
import OpeningReportService from "@/services/reports/OpeningReportService";

const fields = [
  { key: "terminal", label: "Terminal", _style: "width:25%" },
  { key: "type", label: "Type", _style: "width:25%" },
  { key: "total", label: "Total", _style: "width:25%" },
  { key: "created_at", label: "Created At", _style: "width:25%" },
  {
    key: "actions",
    label: "Actions",
    _style: "width:25%;",
  },
];

export default {
  name: "CustomerReport",
  components: { Loader },
  mixins: [tableMixin],
  cibAddthis,
  cisMinusSquare,
  data: () => ({
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
      branches: [{ value: "branch1", label: "Branch 1" }],
    },
  }),
  // created() {
  //   this.genrateReport();
  // },
  computed: {
    items() {
      return this.data;
    },
  },
  methods: {
    toggleSection() {
      this.toggleOptions = !this.toggleOptions;
    },
    viewRow(uuid) {
      this.$router.push({ path: "/reports/opening/" + uuid });
    },
    getServerData(page, per_page) {
      this.toggleSection();
      this.$store.commit("set_loader");

      let params = {
        date_range: this.form.date_range,
        from_date: this.form.from_date,
        to_date: this.form.to_date,
        branches: this.form.branches,
      };
      if (page) {
        params.page = page;
      }
      if (per_page) {
        params.per_page = per_page;
      }
      OpeningReportService.genrateReport(params)
        .then(({ data }) => {
          if (data) {
            this.data = data.terminals;
            if (data.meta) {
              this.setPagination(data.meta);
            }
          }
          // console.log(response.data);
          this.$store.commit("close_loader");
        })
        .catch((e) => {
          this.$store.commit("close_loader");
          console.log(e);
        });
    },
    getData(page = "", per_page = "") {
      this.getServerData(page, per_page);
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
