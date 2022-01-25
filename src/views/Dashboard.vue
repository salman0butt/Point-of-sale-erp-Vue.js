<template>
  <div>
    <CRow>
      <CCol sm="12" md="12">
        <CCardGroup class="mb-4 remove-progress">
          <CWidgetProgressIcon header="87.500" text="Visitors" color="gradient-info">
            <CIcon name="cil-people" height="36" />
          </CWidgetProgressIcon>
          <CWidgetProgressIcon header="385" text="New Clients" color="gradient-success">
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
          </CWidgetProgressIcon>
        </CCardGroup>
      </CCol>
    </CRow>
    <CRow>
      <CCol sm="2" md="2">
        <CButton color="primary" class="btn-block">
          <CIcon class="headerFont" name="cil-bell" /> Primary</CButton
        >
      </CCol>
      <CCol sm="2" md="2">
        <CButton color="secondary" class="btn-block">
          <CIcon class="headerFont" name="cil-bell" /> Success</CButton
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
    </CRow>
    <br />
    <CCard>
      <CCardHeader>
        BarChart
        <CCol sm="2" md="2" class="pt-2" style="float: right">
          <CSelect placeholder="By Month" :options="options.chart" :value.sync="chart1" />
        </CCol>
      </CCardHeader>
      <CCardBody>
        <BarChart />
      </CCardBody>
    </CCard>
    <CRow>
      <CCol sm="6" md="6">
        <CCard>
          <CCardHeader> Best Payment Method </CCardHeader>
          <CCardBody>
            <PieChart />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol sm="6" md="6">
        <CCard>
          <CCardHeader> Recent Transections</CCardHeader>
          <CCardBody>
            <CDataTable :items="dataItems" :fields="transFields" hover />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <CRow>
      <CCol sm="6" md="4">
        <CCard>
          <CCardHeader> Top 5 Products </CCardHeader>
          <CCardBody>
            <CDataTable :items="productData" :fields="productFields" hover />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol sm="6" md="4">
        <CCard>
          <CCardHeader> Product Alert </CCardHeader>
          <CCardBody>
            <CDataTable :items="productAlertData" :fields="productAlertFields" hover>
              <template slot="alert" slot-scope="{ item }">
                <td>
                  <CBadge color="danger" shape="rounded-pill">{{ item.alert }}</CBadge>
                </td>
              </template>
            </CDataTable>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol sm="6" md="4">
        <CCard>
          <CCardHeader> Last 5 Deliverd Order </CCardHeader>
          <CCardBody>
            <CDataTable :items="orderData" :fields="orderFields" hover>
              <!-- <template slot="alert" slot-scope="{ item }">
                <td>
                  <CBadge color="danger" shape="rounded-pill">{{ item.alert }}</CBadge>
                </td>
              </template> -->
            </CDataTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import BarChart from "@/components/dashboard/BarChart";
import PieChart from "@/components/dashboard/PieChart";

const transFields = [
  { key: "name", label: "Name", _style: "min-width:40%" },
  { key: "amount", label: "Amount", _style: "min-width:15%;" },
  { key: "date", label: "Date", _style: "min-width:15%;" },
];
const productFields = [
  { key: "name", label: "Name", _style: "min-width:40%" },
  { key: "qty", label: "Quantity", _style: "min-width:15%;" },
  { key: "serial_number", label: "Serial Number", _style: "min-width:15%;" },
];

const productAlertFields = [
  { key: "name", label: "Name", _style: "min-width:40%" },
  { key: "alert", label: "Alert", _style: "min-width:15%;" },
  { key: "Date", label: "Date", _style: "min-width:15%;" },
];

const orderFields = [
  { key: "customer_name", label: "Customer Name", _style: "min-width:40%" },
  { key: "product", label: "Product", _style: "min-width:15%;" },
  { key: "qty", label: "Quantity", _style: "min-width:15%;" },
  { key: "Total", label: "Total", _style: "min-width:15%;" },
];
export default {
  name: "Dashboard",
  components: { BarChart, PieChart },
  data() {
    return {
      transFieldsitems: [
        {
          name: "Jane Doe",
          amount: "15,000",
          date: "11/11/2019",
        },
        {
          name: "Joe Doe",
          amount: "18,000",
          date: "11/11/2019",
        },
        {
          name: "John Doe",
          amount: "12,000",
          date: "11/11/2019",
        },
        {
          name: "Jane Doe",
          amount: "15,000",
          date: "11/11/2019",
        },
        {
          name: "Joe Doe",
          amount: "18,000",
          date: "11/11/2019",
        },
      ],
      productData: [
        {
          name: "Product 1",
          qty: "10",
          serial_number: "12345",
        },
        {
          name: "Product 2",
          qty: "20",
          serial_number: "12345",
        },
        {
          name: "Product 3",
          qty: "30",
          serial_number: "12345",
        },
        {
          name: "Product 4",
          qty: "40",
          serial_number: "12345",
        },
        {
          name: "Product 5",
          qty: "50",
          serial_number: "12345",
        },
      ],
      productAlertData: [
        {
          name: "Product 1",
          alert: "Low",
          Date: "11/11/2019",
        },
        {
          name: "Product 2",
          alert: "Low",
          Date: "11/11/2019",
        },
        {
          name: "Product 3",
          alert: "Low",
          Date: "11/11/2019",
        },
        {
          name: "Product 4",
          alert: "Low",
          Date: "11/11/2019",
        },
        {
          name: "Product 5",
          alert: "Low",
          Date: "11/11/2019",
        },
      ],
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
      productFields,
      transFields,
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
    };
  },
  computed: {
    dataItems() {
      return this.transFieldsitems;
    },
  },
  methods: {},
};
</script>
<style>
.remove-progress .progress-xs.my-3.mb-0.progress {
  display: none !important;
}
canvas#__safe_id__188 {
  max-height: 400px !important;
}
</style>
