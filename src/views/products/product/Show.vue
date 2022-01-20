<template>
  <div>
    <CCard>
      <CCardBody>
        <CRow>
          <CCol sm="6" md="3">
            <img src="/img/images/iphone.jpg" class="product-img" alt="product image" />
          </CCol>
          <CCol sm="6" md="4">
            <h2>iPhone 13 pro max</h2>
            <h6><strong>Brand:</strong> Apple</h6>
            <h6><strong>Category:</strong> Mobiles</h6>
            <h6><strong>Branch:</strong> Manama</h6>
            <h6><strong>Description:</strong> This is an iphone apple mobile.</h6>
          </CCol>
          <CCol
            sm="6"
            md="2"
            style="border-right: 1px solid #8080804a; text-align: right"
          >
            <h6 class="mt-2"><strong>Selling Price:</strong> BD 0.00</h6>
            <h6><strong>Cost Price:</strong> BD 0.00</h6>
            <h6><strong>Profit:</strong> BD 0.00</h6>
          </CCol>
          <CCol sm="6" md="3">
            <h6>Short Name</h6>
            <img src="/img/images/barcode.png" alt="barcode" style="width: 60%" />
            <h6 class="mt-2"><strong>Alert Qty:</strong> 0</h6>
            <h6><strong>Weight Unit:</strong> Kg</h6>
            <h6><strong>Expiry:</strong> Yes</h6>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
    <CRow>
      <CCol sm="12" md="6">
        <CCard>
          <CCardBody>
            <h6>Inventory</h6>
            <CDataTable
              :items="inventory"
              :fields="inventoryFields"
              hover
              :striped="true"
              :border="true"
              :small="true"
            >
            </CDataTable>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol sm="12" md="6">
        <CCard>
          <CCardBody>
            <h6>Units</h6>
            <CDataTable
              :items="units"
              :fields="unitFields"
              hover
              :striped="true"
              :border="true"
              :small="true"
            >
            </CDataTable>
          </CCardBody>
        </CCard>
        <CCard>
          <CCardBody>
            <h6>Variations</h6>
            <CDataTable
              :items="variations"
              :fields="variationFields"
              hover
              :striped="true"
              :border="true"
              :small="true"
            >
            </CDataTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import { cilUser, cisCircle } from "@coreui/icons-pro";

const inventoryFields = [
  { key: "date", label: "Date", _style: "min-width:40%" },
  { key: "user", label: "User", _style: "min-width:15%;" },
  { key: "stock", label: "In/Out", _style: "min-width:15%;" },
  { key: "balance", label: "Balance", _style: "min-width:15%;" },
];
const unitFields = [
  { key: "name", label: "Name", _style: "min-width:40%" },
  { key: "cost_price", label: "Cost Price", _style: "min-width:15%;" },
  { key: "selling_price", label: "Selling Price", _style: "min-width:15%;" },
  { key: "barcode", label: "Barcode", _style: "min-width:15%;" },
];
const variationFields = [
  { key: "name", label: "Name", _style: "min-width:40%" },
  { key: "attributes", label: "Attribute", _style: "min-width:15%;" },
  { key: "barcode", label: "Barcode", _style: "min-width:15%;" },
];

export default {
  name: "ShowProduct",
  cilUser,
  cisCircle,
  data: () => ({
    inventoryFields,
    unitFields,
    variationFields,
    InventoryItems: [
      { date: "2020-01-01", user: "John Doe", stock: "3", balance: "3" },
      { date: "2020-01-01", user: "John Doe", stock: "4", balance: "4" },
      { date: "2020-01-01", user: "John Doe", stock: "5", balance: "5" },
      { date: "2020-01-01", user: "John Doe", stock: "4", balance: "6" },
      { date: "2020-01-01", user: "John Doe", stock: "5", balance: "7" },
      { date: "2020-01-01", user: "John Doe", stock: "6", balance: "4" },
      { date: "2020-01-01", user: "John Doe", stock: "3", balance: "5" },
      { date: "2020-01-01", user: "John Doe", stock: "8", balance: "6" },
      { date: "2020-01-01", user: "John Doe", stock: "8", balance: "6" },
    ],
    unitItems: [
      {
        name: "Pack of 2",
        cost_price: "300",
        selling_price: "320",
        barcode: "1234535345345",
      },
      {
        name: "Pack of 6",
        cost_price: "600",
        selling_price: "720",
        barcode: "3453443534534",
      },
      {
        name: "Pack of 12",
        cost_price: "1000",
        selling_price: "1200",
        barcode: "7654326777890",
      },
    ],
    variationItems: [
      {
        name: "Iphone Lite",
        attributes: "color:white, size:64gb",
        barcode: "123435345345",
      },
      {
        name: "Iphone pro",
        attributes: "color:black, size:128gb",
        barcode: "123435345345",
      },
      {
        name: "Iphone Gold",
        attributes: "color:gold, size:256gb",
        barcode: "123435345345",
      },
    ],
  }),
  computed: {
    inventory() {
      return this.InventoryItems;
    },
    units() {
      return this.unitItems;
    },
    variations() {
      return this.variationItems;
    },
  },
  methods: {},
};
</script>

<style>
.product-img {
  max-height: 200px;
  width: auto !important;
  display: block;
  margin: 0 auto;
}
</style>
