<template>
  <div>
    <Loader />
    <CRow>
      <CCol sm="12" md="12" class="mb-2">
        <CButton
          color="success"
          style="float: right; width: 150px; margin-right: 20px"
          @click="showBarcode()"
        >
          Print
        </CButton>
      </CCol>
    </CRow>
    <CCard>
      <CCardBody>
        <CRow>
          <CCol sm="6" md="3">
            <img :src="product.image" class="product-img" alt="product image" />
          </CCol>
          <CCol sm="6" md="4">
            <h2>{{ product.name }}</h2>
            <h6><strong>Brand:</strong> {{ product.brand }}</h6>
            <h6><strong>Category:</strong> {{ product.category }}</h6>
            <h6><strong>Branch:</strong> {{ product.branch }}</h6>
            <h6>
              <strong>Description:</strong>
              {{ product.description.replace(/<\/?[^>]+>/gi, " ") }}
            </h6>
          </CCol>
          <CCol
            sm="6"
            md="2"
            style="border-right: 1px solid #8080804a; text-align: right"
          >
            <h6 class="mt-2">
              <strong>Selling Price:</strong> BD {{ product.selling_price }}
            </h6>
            <h6><strong>Cost Price:</strong> BD {{ product.cost_price }}</h6>
            <h6><strong>Profit:</strong> BD {{ product.profit }}</h6>
          </CCol>
          <CCol sm="6" md="3">
            <h6>{{ product.short_name }}</h6>
            <!-- <img src="/img/images/barcode.png" alt="barcode" style="width: 60%" /> -->
            <barcode v-bind:value="product.barcode">
              barcode unable to load
            </barcode>
            <h6 class="mt-2">
              <strong>Alert Qty:</strong> {{ product.alert_qty }}
            </h6>
            <h6><strong>Weight Unit:</strong> {{ product.weight_unit }}</h6>
            <h6>
              <strong>Expiry:</strong> {{ product.expiry }} |
              <strong>Favourite:</strong>
              {{ product.favorite }}
            </h6>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>

    <CRow>
      <CCol sm="12" md="12">
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
              <template #user="{ item }">
                <td>{{ item.user ? item.user : "" }}</td>
              </template>
              <template #detail="{ item }">
                <td v-if="item.detail"><span v-html="item.detail"></span></td>
              </template>
            </CDataTable>
          </CCardBody>
        </CCard>
      </CCol>
      <!-- <CCol sm="12" md="6">
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
      </CCol> -->
    </CRow>
  </div>
</template>

<script>
import { cilUser, cisCircle } from "@coreui/icons-pro";
import ProductService from "@/services/products/ProductService";
import VueBarcode from "vue-barcode";
import Loader from "@/components/layouts/Loader";
import ProductInventoryService from "@/services/products/ProductInventoryService";
const inventoryFields = [
  { key: "date", label: "DATE", _style: "min-width:40%" },
  { key: "user", label: "User", _style: "min-width:15%" },
  { key: "module", label: "Module", _style: "min-width:15%;" },
  { key: "qty", label: "In/Out Qty", _style: "min-width:15%;" },
  { key: "balance", label: "Balance", _style: "min-width:15%;" },
  { key: "expiry_date", label: "EXPIRY DATE", _style: "min-width:15%" },
  { key: "detail", label: "Detail", _style: "min-width:15%" },
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
  components: {
    barcode: VueBarcode,
    Loader,
  },
  cilUser,
  cisCircle,
  data: () => ({
    productId: null,
    product: {
      name: "",
      description: "",
      brand: "",
      category: "",
      branch: "",
      cost_price: "",
      selling_price: "",
      profit: "",
      alert_qty: "",
      weight_unit: "",
      expiry: "",
      favorite: "",
      short_name: "",
      barcode: "",
      image: "/img/images/no-logo.png",
    },
    inventoryFields,
    unitFields,
    variationFields,
    InventoryItems: [],
    unitItems: [],
    variationItems: [],
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
  created() {
    this.productId = this.$route.params.id;
    this.getProductData();
    this.getProductInventory();
  },
  methods: {
    getProductData() {
      this.$store.commit("set_loader");
      ProductService.get(this.productId)
        .then(({ data }) => {
          if (data !== "" && data !== undefined) {
            this.product.name = data.name ?? "N/A";
            this.product.description = data.short_description ?? "N/A";
            this.product.brand = data.brand.name ?? "N/A";
            this.product.category =
              data.categories?.map((category) => category.name).join(", ") ??
              "N/A";
            this.product.branch =
              data.branches?.map((branch) => branch.name).join(", ") ?? "N/A";
            this.product.cost_price =
              parseFloat(data.price?.cost_price).toFixed(2) ?? "N/A";
            this.product.selling_price =
              parseFloat(data.price?.selling_price_without_tax).toFixed(2) ??
              "N/A";
            this.product.profit =
              parseFloat(
                data.price?.selling_price_without_tax - data.price?.cost_price
              ).toFixed(2) ?? "N/A";
            this.product.alert_qty = data.alert_qty ?? "N/A";
            this.product.weight_unit = data.weight_unit ?? "N/A";
            this.product.expiry = data.is_expiry === "yes" ? "Yes" : "No";
            this.product.favorite = data.is_favorite === "yes" ? "Yes" : "No";
            this.product.short_name = data.short_name ?? "N/A";
            this.product.barcode = data.barcode;
            this.product.image =
              data.images[0]?.path ?? "/img/images/no-logo.png";

            // if (data.inventory && data.inventory.length) {
            //   data.inventory.map((item) => {
            //     this.inventory.push({
            //       date: item.date ?? "",
            //       user: item.created_by?.name,
            //       stock: item.qty ?? "",
            //       expiry: item.expiry_date ?? "",
            //     });
            //   });
            // }
            this.units = [];
            if (data.quantity_units && data.quantity_units.length) {
              data.quantity_units.map((unit) => {
                this.units.push({
                  name: unit.name ?? "",
                  cost_price: unit.price?.cost_price ?? "",
                  selling_price: unit.price?.selling_price_without_tax ?? "",
                  barcode: unit.barcode ?? "",
                });
              });
            }
            if (data.variations && data.variations.length) {
              data.variations?.map((variation) => {
                let name = JSON.parse(variation.name)?.en;
                this.variations.push({
                  name: name,
                  attributes: name,
                  barcode: variation.barcode,
                });
              });
            }
          }
          this.$store.commit("close_loader");
        })
        .catch((err) => {
          console.log(err);
          this.$store.commit("close_loader");
          this.errorHandler(err.status);
          // this.$router.push("/products/index");
        });
    },
    showBarcode() {
      this.$router.push({
        path: "/products/show-barcode/" + this.productId,
      });
    },
    getProductInventory() {
      this.$store.commit("set_loader");
      ProductInventoryService.get(this.productId)
        .then(({ data }) => {
          if (data !== "" && data !== undefined && data.length) {
            data.forEach((item) => {
              if (
                item.type === "receiving" ||
                item.type === "sales" ||
                item.type === "damage" ||
                item.type === "product"
              ) {
                let date = item.date;
                let qty = item.qty;
                let module = "";
                let detail = "";

                if (item.type == "receiving") {
                  module = "Receiving";
                  detail =
                    "<a href='/receivings/show/" +
                    item.type_uuid +
                    "'>Detail</a>";
                } else if (item.type == "sales") {
                  detail =
                    "<a href='/sales/invoices/show/" +
                    item.type_uuid +
                    "'>Detail</a>";
                  module = "Sales";
                } else if (item.type == "damage") {
                  module = "Damage";
                  detail =
                    "<a href='/catalogs/damages/show/" +
                    item.type_uuid +
                    "'>Detail</a>";
                } else if (item.type == "product") {
                  module = "Opening";
                }

                this.inventory.push({
                  user: item.created_by?.name,
                  module: module,
                  date: date,
                  qty: qty,
                  balance: item.balance ?? "",
                  expiry_date: item.expiry_date ?? "",
                  detail: detail,
                });
              }
            });
          }
          this.$store.commit("close_loader");
        })
        .catch((error) => {
          this.$store.commit("close_loader");
          console.log(error);
          this.$router.push("/products");
        });
    },
  },
};
</script>

<style>
.product-img {
  max-height: 200px;
  width: auto !important;
  display: block;
  margin: 0 auto;
}
.vue-barcode-element {
  max-width: 100%;
}
</style>
