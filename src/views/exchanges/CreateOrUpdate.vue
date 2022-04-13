<template>
  <div>
    <CCard>
      <CCardHeader>
        <strong>New Exchange</strong>
      </CCardHeader>
      <CCardBody>
        <CRow>
          <Loader />
          <CCol xs="12" lg="12">
            <form @submit.prevent="isEditing ? updateData() : saveData()">
              <div class="table-responsive-sm">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th class="center">#</th>
                      <th>Item</th>
                      <th>Description</th>
                      <th class="center">Quantity</th>
                      <th class="right">Unit Cost</th>
                      <th class="right">Tax</th>
                      <!-- <th class="right">Discount</th> -->
                      <th class="right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(product, index) in invoice.products" :key="product.uuid">
                      <td class="center">{{ index + 1 }}</td>
                      <td class="left">{{ product.name }}</td>
                      <td class="left">{{ product.description }}</td>
                      <td class="center">{{ product.qty }}</td>
                      <td class="right">{{ product.selling_price }}</td>
                      <td class="right">{{ product.tax }}</td>
                      <!-- <td class="right">
                          {{
                            product.discount_per
                              ? product.discount + "%"
                              : product.discount
                          }}
                        </td> -->
                      <td class="right">{{ product.total }}</td>
                      {{
                        setProductPrice(product.total)
                      }}
                    </tr>
                  </tbody>
                </table>
              </div>
              <CRow>
                <CCol sm="12" md="12" class="pt-2">
                  <SearchProduct searchType="quotation" :itemsData="form.items" />
                </CCol>
              </CRow>
              <CRow>
                <CCol lg="4" sm="5" class="ml-auto">
                  <table class="table table-clear">
                    <tbody>
                      <tr v-if="invoice.return_price">
                        <td class="left"><strong>Return</strong></td>
                        <td class="right">{{ invoice.return_price }}</td>
                      </tr>
                      <tr>
                        <td class="left"><strong>Subtotal</strong></td>
                        <td class="right">{{ invoice.sub_total }}</td>
                      </tr>
                      <tr>
                        <td class="left"><strong>VAT </strong></td>
                        <td class="right">{{ invoice.total_tax }}</td>
                      </tr>
                      <!-- <tr>
                          <td class="left"><strong>Discount </strong></td>
                          <td class="right">{{ invoice.total_discount }}</td>
                        </tr> -->

                      <tr>
                        <td class="left"><strong>Total</strong></td>
                        <td class="right">
                          <strong>{{ invoice.grand_total }}</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </CCol>
              </CRow>

              <CRow class="mt-4">
                <CButton
                  progress
                  timeout="2000"
                  block
                  color="success"
                  style="float: right; width: 200px; margin-left: 20px"
                  type="submit"
                  @click="saveAndExit = false"
                  >Save & Continue</CButton
                >
                <CButton
                  timeout="2000"
                  block
                  color="danger"
                  style="float: right; width: 140px; margin-left: 20px; margin-top: 0"
                  @click="saveAndExit = true"
                  type="submit"
                  >Save & Exit</CButton
                >
              </CRow>
            </form>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  </div>
</template>
<script>
import QuotationService from "@/services/sale/QuotationService";
import { cisWallet } from "@coreui/icons-pro";
// import { required } from "vuelidate/lib/validators";
import Loader from "@/components/layouts/Loader.vue";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";
import SearchProduct from "@/components/layouts/SearchProduct";
import ProductService from "@/services/products/ProductService";
import ProductExchangeService from "@/services/exchanges/ProductExchangeService";

const fields = [
  { key: "created_by", label: "Created By", _style: "min-width:15%;" },
  { key: "payment_no", label: "Ref No", _style: "min-width:15%;" },
  { key: "dated", label: "Dated", _style: "min-width:40%" },
  { key: "amount", label: "Amount", _style: "min-width:15%;" },
  { key: "total_amount", label: "Total Amount", _style: "min-width:15%;" },
  { key: "actions", label: "ACTIONS", _style: "min-width:15%;" },
];

export default {
  name: "CreateOrUpdateReturn",
  cisWallet,
  cilPencil,
  cilTrash,
  cilEye,
  components: {
    Loader,
    SearchProduct,
  },
  data() {
    return {
      fields,
      saveAndExit: false,
      isEditing: false,
      editId: null,
      openInvoice: {},
      product_id: "",
      invoice_id: "",
      uuid: "",
      invoice: {
        product_price: 0,
        return_price: 0,
        items: [],
        dated: "",
        due_date: "",
        sub_total: "",
        total_tax: "",
        total_discount: "",
        grand_total: "",
        quotation_ref_no: "",
        invoice_ref_no: "",
        payment_terms: "",
        terms_and_conditions: "",
        note: "",
        products: [],
        // delivery
      },
      form: {
        invoice: "",
        items: [],
      },
      customer: {
        name: "",
        uuid: "",
        address: "",
        contact_number: "",
        email: "",
      },
    };
  },

  // validations() {
  //   return {
  //     form: {
  //       paymentMethod: { required },
  //       amount: { required },
  //     },
  //   };
  // },
  computed: {
    items() {
      return this.$store.getters.getSearchProductItems;
    },
    subTotal() {
      return this.$store.getters.getQuotationSubTotal;
    },
    taxTotal() {
      return this.$store.getters.getQuotationTaxTotal;
    },
    totalDiscount() {
      return this.$store.getters.getQuotationDiscount;
    },
    allTotal() {
      return this.$store.getters.getQuotationTotal;
    },
  },
  beforeDestroy() {
    this.$store.commit("set_search_product_items", []);
    this.$store.commit("set_quotation_sub_total", 0);
    this.$store.commit("set_quotation_tax_total", 0);
    this.$store.commit("set_quotation_total_discount", 0);
    this.$store.commit("set_quotation_total", 0);
  },
  watch: {
    items(val) {
      if (val) {
        this.invoice.items = val;
      } else {
        this.return_price = 0;
      }
    },
    subTotal(val) {
      this.invoice.sub_total = val;
    },
    taxTotal(val) {
      this.invoice.total_tax = val;
    },
    totalDiscount(val) {
      this.invoice.total_discount = val;
    },
    allTotal(val) {
      this.invoice.return_price = this.invoice.product_price - val;
      this.invoice.grand_total = val;
      this.invoice.total_price_with_delivery =
        parseFloat(val) + parseFloat(this.invoice.delivery_method_price);
    },
  },
  created() {
    this.product_id = this.$route.params.id;
    this.invoice_id = this.$route.params.invoice_id;

    this.editId = this.$route.params.editId;
    console.log(this.$route.params);
    if (this.editId) {
      this.getExchange();
    }

    if (this.invoice_id) {
      this.getInvoiceDetail();
    }
    if (this.product_id) {
      this.getProduct();
    }
  },
  methods: {
    getProduct() {
      ProductService.get(this.product_id)
        .then((response) => {
          const { data } = response;
          if (data) {
            this.invoice.products.push({
              name: data.name,
              uuid: data.uuid,
              description: data.description,
              selling_price: data.price.selling_price_with_tax,
              qty: 1,
              tax: data.price.tax.percentage,
              total: data.price.selling_price_with_tax,
            });
            this.invoice.sub_total = data.price.selling_price_with_tax;
            this.invoice.total_tax = data.price.tax.percentage;
            this.invoice.product_price = data.price.selling_price_with_tax;
            this.invoice.grand_total = data.price.selling_price_with_tax;

            this.$forceUpdate();
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    setProductPrice(val) {
      this.invoice.product_price = val;
    },
    saveData() {
      let data = {
        from_product_id: this.product_id,
        qty: 1,
        unit_price: this.invoice.products[0].selling_price,
        total_price: this.invoice.products[0].total,
        items: this.invoice.items,
        sub_total: this.invoice.sub_total,
        total_tax: this.invoice.total_tax,
        total_discount: this.invoice.total_discount,
        grand_total: this.invoice.grand_total,
        exchange_price: this.invoice.return_price,
        customer_id: this.customer?.uuid ?? null,
        invoice_id: this.invoice_id ?? null,
      };
      // console.log(data)
      ProductExchangeService.create(data)
        .then(({ data }) => {
          if (data) {
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Exchange added Successfully",
              timer: 3600,
            });
            if (this.saveAndExit) {
              this.$router.push({ path: "/exchanges/index" });
            } else {
              this.$router.push({ path: "/exchanges/edit/" + data.uuid });
            }
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateData() {
      let data = {
        from_product_id: this.product_id,
        qty: 1,
        unit_price: this.invoice.products[0].selling_price,
        total_price: this.invoice.products[0].total,
        items: this.invoice.items,
        sub_total: this.invoice.sub_total,
        total_tax: this.invoice.total_tax,
        total_discount: this.invoice.total_discount,
        grand_total: this.invoice.grand_total,
        exchange_price: this.invoice.return_price,
        customer_id: this.customer?.uuid ?? null,
        invoice_id: this.invoice_id ?? null,
      };
      // console.log(data)
      ProductExchangeService.update(this.editId, data)
        .then(({ data }) => {
          if (data) {
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Exchange Updated Successfully",
              timer: 3600,
            });
            if (this.saveAndExit) {
              this.$router.push({ path: "/exchanges/index" });
            }
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getInvoiceDetail() {
      this.$store.commit("set_loader");
      QuotationService.get(this.invoice_id)
        .then(({ data }) => {
          if (data) {
            this.invoice.invoice_ref_no = data.invoice_ref_no;

            // customer
            if (data.customer) {
              this.customer.uuid = data.customer.uuid;
              this.customer.name = data.customer.full_name;
            }
          }
          this.$store.commit("close_loader");
        })
        .catch((err) => {
          this.$store.commit("close_loader");
          console.log(err);
        });

      this.$store.commit("close_loader");
    },

    getExchange() {
      this.$store.commit("set_loader");
      ProductExchangeService.get(this.editId)
        .then(({ data }) => {
          if (data) {
            this.isEditing = true;
            this.invoice.invoice_ref_no = data.invoice.invoice_ref_no;
            this.invoice.uuid = data.invoice.uuid;

            if (data.customer) {
              // customer
              this.customer.uuid = data.customer.uuid;
              this.customer.name = data.customer.full_name;
            }

            if (data.items && data.items.length > 0) {
              data.items.map((item) => {
                if (item.qty < 0) {
                  this.product_id = item.inventable.uuid;
                  this.invoice.products.push({
                    name: item.inventable.name,
                    uuid: item.inventable.uuid,
                    description: item.inventable.description,
                    selling_price: item.inventable.price.selling_price_with_tax,
                    qty: Math.abs(item.qty),
                    tax: item.inventable.price.tax.percentage,
                    total: item.total,
                  });
                } else {
                  console.log(item);
                  this.form.items.push({
                    uuid: item.inventable.uuid,
                    type: "product",
                    name: item.inventable.name,
                    unit_price: item.selling_price ?? 0,
                    tax_price: item.tax ?? 0,
                    qty: Math.abs(item.qty),
                    description: item.description,
                    weight_unit: item.inventable.weight_unit,
                    discount: item.discount,
                    total: item.total,
                  });
                }
              });
            }
          }

          this.$store.commit("close_loader");
        })
        .catch((err) => {
          this.isEditing = false;
          this.$store.commit("close_loader");
          console.log(err);
        });

      this.$store.commit("close_loader");
    },

    // resetForm() {
    //   this.$v.$reset();
    //   for (let index in this.form) {
    //     this.form[index] = "";
    //   }
    // },
  },
};
</script>
<style>
.buttons-box {
  display: flex;
  width: auto;
  align-items: center;
}
</style>
