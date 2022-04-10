<template>
  <CCard>
    <Loader />
    <CCardHeader>
      Barcode
      <div class="float-right">
        <a
          class="btn btn-sm btn-info ml-1"
          @click.prevent="print"
          style="color: #fff"
        >
          <CIcon name="cil-print" class="mr-1" /> Print Me
        </a>
        <a href="#" class="btn btn-sm btn-info ml-1" @click.prevent="savePdf()">
          <CIcon name="cil-save" /> Download
        </a>
      </div>
    </CCardHeader>

    <CCardBody id="printMe">
      <vue-html2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="false"
        :paginate-elements-by-height="1400"
        filename="barcode"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="landscape"
        pdf-content-width="100%"
        ref="html2Pdf"
      >
        <section slot="pdf-content" md="12" style="padding: 0 20px">
          <div class="table-responsive-sm">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th v-if="form.short_name_or_full_name === 'full'">Name</th>
                  <th v-if="form.short_name_or_full_name === 'short'">
                    Short Name
                  </th>
                  <th>Barcode</th>
                  <th v-if="form.product_barcode_with_barcode_number === 'on'">
                    Barcode Number
                  </th>
                  <th class="center" v-if="form.product_serial_number === 'on'">
                    Serial Number
                  </th>
                  <th class="right" v-if="form.selling_price === 'on'">
                    Selling Price
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    class="left"
                    v-if="form.short_name_or_full_name === 'full'"
                  >
                    {{ product.name }}
                  </td>
                  <td
                    class="left"
                    v-if="form.short_name_or_full_name === 'short'"
                  >
                    {{ product.short_name }}
                  </td>
                  <td class="left">
                    <barcode v-bind:value="product.barcode">
                      barcode unable to load
                    </barcode>
                  </td>
                  <td
                    class="left"
                    v-if="form.product_barcode_with_barcode_number === 'on'"
                  >
                    {{ product.barcode }}
                  </td>
                  <td class="center" v-if="form.product_serial_number === 'on'">
                    {{ product.serial_number }}
                  </td>
                  <td class="right" v-if="form.selling_price === 'on'">
                    {{ product.selling_price }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </vue-html2pdf>

      <div v-for="index in form">
        <label>{{ index }} </label>
        <CSwitch shape="pill" color="success" checked />
      </div>
    </CCardBody>
  </CCard>
</template>
<script>
import Loader from "@/components/layouts/Loader";
import VueHtml2pdf from "vue-html2pdf";
import SettingService from "@/services/settings/SettingService";
import ProductService from "@/services/products/ProductService";
import VueBarcode from "vue-barcode";

export default {
  name: "ShowBarcode",
  components: { Loader, VueHtml2pdf, barcode: VueBarcode },

  data() {
    return {
      productId: "",
      form: {
        product_barcode_with_barcode_number: "",
        short_name_or_full_name: "",
        product_serial_number: "",
        selling_price: "",
      },
      product: {
        name: "",
        short_name: "",
        barcode: "",
        serial_number: "",
        selling_price: "",
      },
    };
  },
  created() {
    this.productId = this.$route.params.id;
    this.getProductData();
    this.ProductSettingService();
  },
  methods: {
    async print() {
      await this.$htmlToPaper("printMe");
    },
    savePdf() {
      this.$refs.html2Pdf.generatePdf();
    },
    getProductData() {
      this.$store.commit("set_loader");
      ProductService.get(this.productId)
        .then(({ data }) => {
          if (data) {
            this.product.name = data.name ?? "N/A";
            this.product.short_name = data.short_name ?? "N/A";
            this.product.selling_price =
              parseFloat(data.price?.selling_price_without_tax).toFixed(2) ??
              "N/A";
            this.product.barcode = data.barcode;
            this.product.serial_number = data.serial_number;
          }
          this.$store.commit("close_loader");
        })
        .catch((err) => {
          console.log(err);
          this.$store.commit("close_loader");
          this.$router.push("/products/index");
          this.errorHandler(err.status);
        });
    },
    ProductSettingService() {
      let type = "product";
      this.$store.commit("set_loader");
      SettingService.getAll(type)
        .then(({ data }) => {
          if (data) {
            data.map((item) => {
              if (item.key === "product_barcode_settings") {
                this.form = JSON.parse(item.value);
              }
            });
          }
          this.$store.commit("close_loader");
        })
        .catch((error) => {
          this.$store.commit("close_loader");
          this.$router.push("/products/index");
          console.log(error);
        });
    },
  },
};
</script>

<style>
.vue-html2pdf .layout-container {
  position: inherit !important;
  width: auto !important;
  height: auto !important;
  background: initial !important;
}
.vue-barcode-element {
  max-width: 300px;
}
</style>
