<template>
  <CCard>
    <Loader />
    <CCardHeader>
      Barcode

      <div class="float-right">
        <a class="btn btn-sm btn-info ml-1" @click.prevent="print" style="color: #fff">
          <CIcon name="cil-print" class="mr-1" /> Print Me
        </a>
        <a href="#" class="btn btn-sm btn-info ml-1" @click.prevent="savePdf()">
          <CIcon name="cil-save" /> Download
        </a>
      </div>
      <div class="float-right">
        <CSelect
          label="Size"
          style="width: 200px"
          :options="options.sizes"
          :value.sync="size"
          horizontal=""
        />
      </div>
    </CCardHeader>

    <CCardBody>
      <CRow>
        <CCol
          sm="6"
          md="3"
          class="pt-2 checked-row"
          v-for="(item, index) in filter"
          :key="index"
        >
          <CSwitch shape="pill" color="success" :checked.sync="item.value" />
          <label>{{ item.label }} </label>
        </CCol>
      </CRow>
      <hr />
      <div id="printMe">
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
            <div
              style="
                max-width: 300px;
                border: 1px solid #808080ba;
                padding: 5px;
                text-align: center;
                display: block;
                margin: 0 auto;
              "
            >
              <p v-if="!checkFilter('short_name_or_full_name')">
                <strong>Name:</strong> {{ product.name }}
              </p>
              <p v-if="checkFilter('short_name_or_full_name')">
                <strong>Short Name:</strong> {{ product.short_name }}
              </p>

              <p v-if="checkFilter('product_serial_number')">
                <strong>Product Serial Number:</strong> {{ product.serial_number }}
              </p>
              <p v-if="checkFilter('selling_price')">
                <strong>Selling Price:</strong> {{ product.selling_price }}
              </p>

              <p>
                {{ $log(checkFilter("product_with_barcode_number")) }}
                <barcode
                  v-bind:value="product.barcode"
                  :displayValue="
                    checkFilter('product_with_barcode_number')
                      ? checkFilter('product_with_barcode_number').value
                      : false
                  "
                >
                  barcode unable to load
                </barcode>
              </p>
            </div>
            <!-- <div class="table-responsive-sm">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th v-if="!checkFilter('short_name_or_full_name')">Name</th>
                    <th v-if="checkFilter('short_name_or_full_name')">Short Name</th>
                    <th>Barcode</th>
                    <th v-if="checkFilter('product_with_barcode_number')">
                      Barcode Number
                    </th>
                    <th v-if="checkFilter('product_serial_number')" class="center">
                      Serial Number
                    </th>
                    <th v-if="checkFilter('selling_price')" class="right">
                      Selling Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td v-if="!checkFilter('short_name_or_full_name')" class="left">
                      {{ product.name }}
                    </td>
                    <td v-if="checkFilter('short_name_or_full_name')" class="left">
                      {{ product.short_name }}
                    </td>
                    <td class="left">
                      <barcode v-bind:value="product.barcode">
                        barcode unable to load
                      </barcode>
                    </td>
                    <td v-if="checkFilter('product_with_barcode_number')" class="left">
                      {{ product.barcode }}
                    </td>
                    <td v-if="checkFilter('product_serial_number')" class="center">
                      {{ product.serial_number }}
                    </td>
                    <td v-if="checkFilter('selling_price')" class="right">
                      {{ product.selling_price }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div> -->
          </section>
        </vue-html2pdf>
      </div>
    </CCardBody>
  </CCard>
</template>
<script>
import Loader from "@/components/layouts/Loader";
import VueHtml2pdf from "vue-html2pdf";
// import SettingService from "@/services/settings/SettingService";
import ProductService from "@/services/products/ProductService";
import VueBarcode from "vue-barcode";

export default {
  name: "ShowBarcode",
  components: { Loader, VueHtml2pdf, barcode: VueBarcode },

  data() {
    return {
      size: "A4",
      productId: "",
      filter: [
        {
          label: "Product With Barcode Number",
          value: false,
          key: "product_with_barcode_number",
        },
        {
          label: "Short Name",
          value: true,
          key: "short_name_or_full_name",
        },
        {
          label: "Product Serial Number",
          value: true,
          key: "product_serial_number",
        },
        {
          label: "Selling Price",
          value: true,
          key: "selling_price",
        },
      ],
      product: {
        name: "",
        short_name: "",
        barcode: "",
        serial_number: "",
        selling_price: "",
      },
      options: {
        sizes: [
          {
            label: "A4",
            value: "A4",
          },
          {
            label: "Landscape",
            value: "landscape",
          },
        ],
      },
    };
  },
  created() {
    this.productId = this.$route.params.id;
    this.getProductData();
    // this.ProductSettingService();
  },
  methods: {
    async print() {
      let obj = null;
      if (this.size === "A4") {
        obj = {
          styles: [
            "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
            "https://unpkg.com/kidlat-css/css/kidlat.css",
            "/css/A4.css",
          ],
        };
      } else {
        obj = {
          styles: [
            "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
            "https://unpkg.com/kidlat-css/css/kidlat.css",
            "/css/lanscape.css",
          ],
        };
      }
      await this.$htmlToPaper("printMe", obj);
    },
    checkFilter(key) {
      let result = this.filter.find((item) => {
        if (item.key === key) {
          return item.value;
        }
      });
      console.log(result);
      return result;
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
              parseFloat(data.price?.selling_price_without_tax).toFixed(2) ?? "N/A";
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
    // ProductSettingService() {
    //   let type = "product";
    //   this.$store.commit("set_loader");
    //   SettingService.getAll(type)
    //     .then(({ data }) => {
    //       if (data) {
    //         data.map((item) => {
    //           if (item.key === "product_barcode_settings") {
    //             this.form = JSON.parse(item.value);
    //           }
    //         });
    //       }
    //       this.$store.commit("close_loader");
    //     })
    //     .catch((error) => {
    //       this.$store.commit("close_loader");
    //       this.$router.push("/products/index");
    //       console.log(error);
    //     });
    // },
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
.checked-row {
  display: flex;
  /* justify-content: space-evenly; */
}
.checked-row label {
  margin: 5px;
}
.box-detail {
  max-width: 300px;
  border: 1px solid #808080ba;
  padding: 5px;
  text-align: center;
  display: block;
  margin: 0 auto;
}
.box-detail p {
  margin-bottom: 0.2rem !important;
}
</style>
