<template>
  <div v-if="$can('read dashboard')">
    <Loader />
    <CRow v-if="cardBoxA && cardBoxA.length > 0 && $can('Card A')">
      <CCol sm="12" md="12">
        <CCardGroup class="mb-4 remove-progress">
          <CWidgetProgressIcon
            v-for="(card, k) in cardBoxA"
            :header="card.value"
            :text="card.key"
            color="gradient-info"
            :key="k"
          >
            <CIcon name="cil-chartPie" height="36" />
          </CWidgetProgressIcon>
          <!-- <CWidgetProgressIcon header="385" text="New Clients" color="gradient-success">
            <CIcon name="cil-userFollow" height="36" />
          </CWidgetProgressIcon>
          <CWidgetProgressIcon
            header="1238"
            text="Products sold"
            color="gradient-warning"
          >
            <CIcon name="cil-basket" height="36" />
          </CWidgetProgressIcon>
          <CWidgetProgressIcon header="28%" text="Returning Visitors">
            <CIcon name="cil-chartPie" height="36" />
          </CWidgetProgressIcon> -->
        </CCardGroup>
      </CCol>
    </CRow>
    <CRow v-if="cardBoxB && cardBoxB.length > 0 && $can('Card B')">
      <CCol sm="12" md="12">
        <CCardGroup class="mb-4 remove-progress">
          <CWidgetProgressIcon
            v-for="(card, k) in cardBoxB"
            :header="card.value"
            :text="card.key"
            color="gradient-info"
            :key="k"
          >
            <CIcon name="cil-chartPie" height="36" />
          </CWidgetProgressIcon>
          <!-- <CWidgetProgressIcon header="385" text="New Clients" color="gradient-success">
            <CIcon name="cil-userFollow" height="36" />
          </CWidgetProgressIcon>
          <CWidgetProgressIcon
            header="1238"
            text="Products sold"
            color="gradient-warning"
          >
            <CIcon name="cil-basket" height="36" />
          </CWidgetProgressIcon>
          <CWidgetProgressIcon header="28%" text="Returning Visitors">
            <CIcon name="cil-chartPie" height="36" />
          </CWidgetProgressIcon> -->
        </CCardGroup>
      </CCol>
    </CRow>
    <!-- <CRow>
      <CCol sm="2" md="2">
        <CButton color="primary" class="btn-block" @click="opening()">
          <CIcon class="headerFont" name="cil-bell" />
          Opening</CButton
        >
      </CCol>
      <CCol sm="2" md="2">
        <CButton color="secondary" class="btn-block" @click="closing()">
          <CIcon class="headerFont" name="cil-bell" />
          Closing</CButton
        >
      </CCol>
      <CCol sm="2" md="2">
        <CButton color="success" class="btn-block">
          <CIcon class="headerFont" name="cil-bell" /> Success</CButton
        >
      </CCol>
      <CCol sm="2" md="2">
        <CButton color="danger" class="btn-block">
          <CIcon class="headerFont" name="cil-bell" /> Danger</CButton
        >
      </CCol>
      <CCol sm="2" md="2">
        <CButton color="warning" class="btn-block">
          <CIcon class="headerFont" name="cil-bell" /> Warning</CButton
        >
      </CCol>
      <CCol sm="2" md="2">
        <CButton color="info" class="btn-block">
          <CIcon class="headerFont" name="cil-bell" /> Warning</CButton
        >
      </CCol>
    </CRow> -->
    <br />
    <CCard>
      <CCardHeader class="py-0">
        <span style="position: relative; top: 15px">Sales Income</span>
        <CCol sm="2" md="2" class="pt-2" style="float: right; height: 3.2rem">
          <!-- <CSelect
            placeholder="By Month"
            :options="options.chart"
            :value.sync="chart1"
          /> -->
        </CCol>
      </CCardHeader>
      <CCardBody>
        <BarChart
          :dashboardMonths="barChart.months"
          :dashboardDefaultDataset="barChart.defaultDataset"
        />
      </CCardBody>
    </CCard>
    <CRow>
      <CCol sm="6" md="6">
        <CCard>
          <CCardHeader>Payment Method</CCardHeader>
          <CCardBody>
            <PieChart
              :dashboardLabels="pieChart.labels"
              :dashboardDefaultDataset="pieChart.defaultDataset"
            />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol sm="6" md="6">
        <CCard>
          <CCardHeader> Recent Transections</CCardHeader>
          <CCardBody style="padding-bottom: 15px">
            <CDataTable
              :items="recentTransactionsItems"
              :fields="recentTransactionFields"
              hover
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <CRow>
      <CCol sm="6" md="6">
        <CCard>
          <CCardHeader> Top 5 Products </CCardHeader>
          <CCardBody>
            <CDataTable :items="topProducts" :fields="topProductsField" hover />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol sm="6" md="6">
        <CCard>
          <CCardHeader> Product Alert </CCardHeader>
          <CCardBody>
            <CDataTable
              :items="productAlertData"
              :fields="productAlertFields"
              hover
            >
              <template slot="alert" slot-scope="{ item }">
                <td>
                  <CBadge color="danger" shape="pill">{{ item.alert }}</CBadge>
                </td>
              </template>
            </CDataTable>
          </CCardBody>
        </CCard>
      </CCol>
      <!-- <CCol sm="6" md="4">
        <CCard>
          <CCardHeader> Last 5 Deliverd Order </CCardHeader>
          <CCardBody>
            <CDataTable :items="orderData" :fields="orderFields" hover>
              <template slot="alert" slot-scope="{ item }">
                <td>
                  <CBadge color="danger" shape="rounded-pill">{{ item.alert }}</CBadge>
                </td>
              </template>
            </CDataTable>
          </CCardBody>
        </CCard>
      </CCol> -->
    </CRow>
    <!-- <OpeningModel /> -->
    <ClosingModel />
  </div>
</template>

<script>
import BarChart from "@/components/dashboard/BarChart";
import PieChart from "@/components/dashboard/PieChart";
import OpeningModel from "@/components/dashboard/OpeningModel";
import ClosingModel from "@/components/dashboard/ClosingModel";
import DashboardService from "@/services/dashboard/DashboardService";
import Loader from "@/components/layouts/Loader";
const recentTransactionFields = [
  { key: "customer", label: "Name", _style: "min-width:40%" },
  { key: "amount", label: "Amount", _style: "min-width:15%;" },
  { key: "dated", label: "Dated", _style: "min-width:15%;" },
];
const topProductsField = [
  { key: "name", label: "Name", _style: "min-width:40%" },
  { key: "total", label: "Quantity", _style: "min-width:15%;" },
  { key: "serial_number", label: "Serial Number", _style: "min-width:15%;" },
];

const productAlertFields = [
  { key: "name", label: "Name", _style: "min-width:40%" },
  { key: "alert", label: "Alert", _style: "min-width:15%;" },
  { key: "total_qty", label: "Qty", _style: "min-width:15%;" },
];

const orderFields = [
  { key: "customer_name", label: "Customer Name", _style: "min-width:40%" },
  { key: "product", label: "Product", _style: "min-width:15%;" },
  { key: "qty", label: "Quantity", _style: "min-width:15%;" },
  { key: "Total", label: "Total", _style: "min-width:15%;" },
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export default {
  name: "Dashboard",
  components: { BarChart, PieChart, OpeningModel, ClosingModel, Loader },
  data() {
    return {
      recentTransactions: [],
      recentTransactionFields,
      cardBoxA: [],
      cardBoxB: [],

      topProducts: [],
      topProductsField,

      productAlertData: [],
      orderData: [
        {
          customer_name: "Customer 1",
          product: "Product 1",
          qty: "10",
          Total: "10,000",
        },
        {
          customer_name: "Customer 2",
          product: "Product 2",
          qty: "20",
          Total: "20,000",
        },
        {
          customer_name: "Customer 3",
          product: "Product 3",
          qty: "30",
          Total: "30,000",
        },
        {
          customer_name: "Customer 4",
          product: "Product 4",
          qty: "40",
          Total: "40,000",
        },
        {
          customer_name: "Customer 5",
          product: "Product 5",
          qty: "50",
          Total: "50,000",
        },
      ],
      productAlertFields,
      orderFields,
      chart1: "",
      options: {
        chart: [
          // { value: "", label: "Choose Filter" },
          { value: "month", label: "By Month", selected: "" },
          { value: "week", label: "By Week" },
          { value: "year", label: "By Year" },
        ],
      },

      barChart: {
        months: [],
        defaultDataset: [
          {
            label: "Income",
            backgroundColor: "#f87979",
            data: [],
          },
        ],
      },
      pieChart: {
        labels: [],
        defaultDataset: [
          {
            backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
            data: [],
          },
        ],
      },
    };
  },

  computed: {
    recentTransactionsItems() {
      return this.recentTransactions;
    },
  },
  created() {
    this.getServerData();
  },
  methods: {
    getServerData() {
      this.$store.commit("set_loader");
      DashboardService.index()
        .then(({ data }) => {
          if (data) {
            if (data.barChart && data.barChart.length > 0) {
              let labels = this.barChart.months;
              let defaultDataset = this.barChart.defaultDataset;
              data.barChart.map(function (val) {
                let label = monthNames[val.month - 1] + "-" + val.year;
                labels.push(label);
                if (defaultDataset[0].data) {
                  defaultDataset[0].data.push(val.total_sale);
                }
              });
            }
            if (data.pieChart && data.pieChart.length > 0) {
              let labelsPieChart = this.pieChart.labels;
              let defaultDatasetPieChart = this.pieChart.defaultDataset;

              data.pieChart.map(function (val) {
                labelsPieChart.push(val.name);
                let total = parseFloat(
                  val.invoice_payments_sum_invoice_paymentsamount
                );
                if (defaultDatasetPieChart[0].data) {
                  defaultDatasetPieChart[0].data.push(total);
                }
              });
            }
            if (data.recentTransactions && data.recentTransactions.length > 0) {
              let recentTransactions = this.recentTransactions;
              data.recentTransactions.map(function (val) {
                val.customer = val.customer.full_name.en
                  ? val.customer.full_name.en
                  : val.customer.full_name;
                recentTransactions.push(val);
              });
            }
            if (data.topProducts && data.topProducts.length > 0) {
              let topProducts = this.topProducts;
              data.topProducts.map(function (val) {
                let name = JSON.parse(val.name);
                val.name = name.en ? name.en : name;
                topProducts.push(val);
              });
            }

            if (data.alertQty && data.alertQty.length > 0) {
              let productAlertData = this.productAlertData;
              data.alertQty.map(function (val) {
                let name = JSON.parse(val.name);
                val.name = name.en ? name.en : name;
                productAlertData.push({
                  ...val,
                  alert: "low",
                });
              });
            }

            if (data.cardBoxA && data.cardBoxA.length > 0) {
              let cardBoxA = this.cardBoxA;
              data.cardBoxA.map(function (val) {
                cardBoxA.push({ key: val.key, value: val.value.toString() });
              });
            }

            if (data.cardBoxB && data.cardBoxB.length > 0) {
              let cardBoxB = this.cardBoxB;
              data.cardBoxB.map(function (val) {
                cardBoxB.push({ key: val.key, value: val.value.toString() });
              });
            }
          }
          this.$store.commit("close_loader");
        })
        .catch((error) => {
          this.$store.commit("close_loader");
          console.log(error);
        });
    },
    opening() {
      alert("check inside invoices");
      // this.$store.commit("set_opening_model", true);
    },
    closing() {
      this.$store.commit("set_closing_model", true);
    },
  },
};
</script>
<style>
.remove-progress .progress-xs.my-3.mb-0.progress {
  display: none !important;
}
</style>
