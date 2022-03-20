<template>
  <div>
    <Loader />

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
        <CCardBody id="printMe">
          <CRow class="mb-4">
            <CCol col="12">
              <CImg
                v-bind:src="business.logo"
                block
                align="center"
                class="text-center"
                width="100%"
                style="width: 200px; height: 200px"
              />
              <h2 align="center">Profit And Loss</h2>
              <h4 align="center">From Date to Date</h4>
            </CCol>
          </CRow>
          <CRow class="mb-4">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th class="right">
                    {{ $t("profitandloss.account") }}
                  </th>
                  <th class="center">
                    {{ $t("profitandloss.accountcode") }}
                  </th>
                  <th class="right">
                    {{ $t("profitandloss.total") }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="income in allIncomes" :key="income.id">
                  <td class="left" v-if="income.account">
                    {{
                      income.account.name
                        ? income.account.name
                        : "Account Name Missing"
                    }}
                  </td>
                  <td class="center" v-if="income.account">
                    {{ income.account.code ? income.account.code : "-" }}
                  </td>
                  <td class="right">
                    {{ income.ledger[0] ? income.ledger[0].total_credit : "-" }}
                  </td>
                </tr>
                <tr>
                  <td colspan="2"><h5>TOTAL INCOME</h5></td>
                  <td>
                    <h5>{{ total_income }}</h5>
                  </td>
                </tr>

                <tr v-for="expense in allExpenses" :key="expense.id">
                  <td class="left" v-if="expense.account">
                    {{
                      expense.account.name
                        ? expense.account.name
                        : "Account Name Missing"
                    }}
                  </td>
                  <td class="center" v-if="expense.account">
                    {{ expense.account.code ? expense.account.code : "-" }}
                  </td>
                  <td class="right">
                    {{
                      expense.ledger[0] ? expense.ledger[0].total_debit : "-"
                    }}
                  </td>
                </tr>
                <tr>
                  <td colspan="2"><h5>TOTAL EXPENSE</h5></td>
                  <td>
                    <h5>{{ total_expense }}</h5>
                  </td>
                </tr>

                <tr>
                  <td colspan="2"><h4>Profit & Loss</h4></td>
                  <td>
                    <h5>{{ profit_and_loss }}</h5>
                  </td>
                </tr>
              </tbody>
            </table>
          </CRow>
        </CCardBody>
      </CCardBody>
    </CCard>
  </div>
</template>
<script>
import { cibAddthis, cisMinusSquare } from "@coreui/icons-pro";
import { tableMixin } from "@/mixins/tableMixin";
import ReportService from "@/services/reports/ReportService";
import Loader from "@/components/layouts/Loader.vue";

export default {
  name: "ProfitAndLossReport",
  mixins: [tableMixin],
  cibAddthis,
  cisMinusSquare,
  data: () => ({
    branch: Object,
    business: {
      logo: "",
    },
    payment: Object,
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
    total_income: 0,
    total_expense: 0,
    profit_and_loss: 0,
    incomes: [],
    expenses: [],
  }),
  created() {
    this.getServerData();
  },
  components: {
    Loader,
  },
  computed: {
    allIncomes() {
      return this.incomes;
    },
    allExpenses() {
      return this.expenses;
    },
  },
  methods: {
    // async print() {
    //   await this.$htmlToPaper("printMe");
    // },
    // savePdf() {
    //   this.$refs.html2Pdf.generatePdf();
    // },
    toggleSection() {
      this.toggleOptions = !this.toggleOptions;
    },
    genrateReport() {
      this.toggleSection();
    },
    getServerData() {
      let income_server = this.incomes;
      let expense_server = this.expenses;
      ReportService.profitAndLossReport()
        .then(function ({ data }) {
          if (data && data.income) {
            var total_income = 0;
            data.income.map(function (value) {
              income_server.push(value);
              if (value.ledger.length > 0) {
                total_income += parseFloat(value.ledger[0].total_credit);
              }
              total_income.toFixed(3);
            });
          }
          if (data && data.expense) {
            var total_expense = 0;
            data.expense.map(function (value) {
              expense_server.push(value);
              if (value.ledger.length > 0) {
                total_expense += parseFloat(value.ledger[0].total_debit);
              }
            });
            total_expense.toFixed(3);
          }
        })
        .catch(function (error) {
          console.log(error);
        });

      // Business logo
      this.$store.commit("set_loader");
      let business_id = localStorage.getItem("business_id");
      this.$http
        .get("/business/" + business_id)
        .then(({ data }) => {
          if (data.logo && data.logo.path) {
            this.business.logo = data.logo.path;
          }
          this.$store.commit("close_loader");
        })
        .catch((err) => {
          this.$store.commit("close_loader");
          console.log(err);
        });
    },
  },
};
</script>
