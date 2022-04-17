<template>
  <div class="row">
    <Loader />

    <div class="col-3">
      <div v-if="invoice.invoice_ref_no && customer.uuid">
        <CCard>
          <CCardHeader>
            Invoice
            <strong style="text-align: center"># {{ invoice.invoice_ref_no }}</strong>
          </CCardHeader>
          <CCardBody>
            <div class="float-center">
              Customer
              <div>
                <router-link
                  :to="`/customers/show/${customer.uuid}`"
                  v-if="$can('show customers')"
                >
                  <strong class="margin:auto" style="color: red; font-size: 22px">{{
                    customer.name
                  }}</strong></router-link
                >
              </div>
            </div>
          </CCardBody>
        </CCard>
      </div>
      <div>
        <CCard>
          <CCardHeader> Payment </CCardHeader>
          <CCardBody>
            <form @submit.prevent="paymentSubmit()">
              <CCol sm="12" md="12" class="pt-2">
                <Label
                  ><CIcon style="color: green" :content="$options.cisWallet" /> Payment
                  Method</Label
                >
                <CSelect
                  :options="options.paymentMethods"
                  :value.sync="form.payment_method_id"
                  :class="{ error: $v.form.payment_method_id.$error }"
                  @input="$v.form.payment_method_id.$touch()"
                />
                <div v-if="$v.form.payment_method_id.$error">
                  <p v-if="!$v.form.payment_method_id.required" class="errorMsg">
                    Payment Method is required
                  </p>
                </div>
              </CCol>
              <CCol sm="12" md="12" class="pt-2">
                <CInput
                  label="Amount"
                  type="number"
                  step="any"
                  placeholder="0.000"
                  v-model="form.amount"
                  :class="{ error: $v.form.amount.$error }"
                  @input="$v.form.amount.$touch()"
                />
              </CCol>
              <div v-if="$v.form.amount.$error">
                <p v-if="!$v.form.amount.required" class="errorMsg">Amount is required</p>
              </div>
              <CButton
                progress
                timeout="2000"
                block
                color="success"
                style="width: 200px; margin-left: 20px"
                type="submit"
                >Pay</CButton
              >
            </form>
          </CCardBody>
        </CCard>
      </div>
    </div>
    <div class="col-9">
      <div>
        <CCard>
          <CCardHeader>
            <!-- Invoice <strong># {{ invoice.invoice_ref_no }}</strong> -->
            <strong>New Exchange</strong>
            <div class="float-right buttons-box">
              <!-- <a
                v-if="showWhatsappButton"
                color="success"
                class="btn btn-sm btn-success"
                style="color: #fff; margin-right: 5px; text-align: center"
                @click.prevent="
                  options.contacts && options.contacts.length > 1
                    ? openWhatsappModel()
                    : sendWhatsapp('quotation')
                "
              >
                <CIcon name="cib-whatsapp" /> Send WhatsApp</a
              > -->
              <a href="#" class="btn btn-sm btn-info" @click.prevent="savePdf()">
                <CIcon name="cil-save" /> Download
              </a>
              <a
                class="btn btn-sm btn-info ml-1"
                style="color: #fff"
                @click.prevent="print()"
              >
                <CIcon name="cil-print" class="mr-1" /> Print Me
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
              filename="invoice"
              :pdf-quality="2"
              :manual-pagination="false"
              pdf-format="a4"
              pdf-orientation="landscape"
              pdf-content-width="100%"
              ref="html2Pdf"
            >
              <section slot="pdf-content" md="12" style="padding: 0 20px">
                <form @submit.prevent="saveData()">
                  <!-- <CRow class="mb-4">
                  <CCol sm="4">
                    <CImg
                      v-bind:src="business.logo"
                      block
                      class="mb-2 imger"
                      width="100%"
                    />
                    <h6 class="mb-3">To:</h6>
                    <div>
                      <strong>{{ customer.name }}</strong>
                    </div>
                    <div v-if="customer.address">
                      Address : {{ customer.address.street }}
                    </div>
                    <div v-if="customer.email">Email: {{ customer.email.email }}</div>
                    <div v-if="customer.contact_number">
                      Phone: {{ customer.contact_number.number }}
                    </div>
                  </CCol>
                  <CCol sm="8" class="mt-5" style="text-align: right">
                    <div>
                      Dated :<strong># {{ invoice.dated }}</strong>
                    </div>
                    <div>
                      Due Date :<strong># {{ invoice.due_date }}</strong>
                    </div>
                  </CCol>
                </CRow> -->
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
                        <tr
                          v-for="(product, index) in invoice.products"
                          :key="product.uuid"
                        >
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
                        <!-- <tr v-if="invoice.delivery">
                        <td></td>
                        <td><b>Delivery</b></td>
                        <td>
                          <b>
                            {{
                              invoice.delivery.name.en ? invoice.delivery.name.en : "-"
                            }}
                          </b>
                        </td>
                        <td colspan="4">
                          <b>Address : </b> {{ invoice.address_for_delivery }}
                        </td>
                        <td>{{ invoice.delivery_method_price }}</td>
                      </tr> -->
                      </tbody>
                    </table>
                  </div>
                  <CRow>
                    <CCol sm="12" md="12" class="pt-2">
                      <SearchProduct
                        searchType="quotation"
                        :itemsData="form.items"
                        :readOnly="true"
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <!-- <CCol lg="4" sm="5">
                    <div>
                      <label><b> Payment Terms :</b></label>

                      <span v-html="invoice.payment_terms"></span>
                    </div>
                    <div>
                      <label><b>Terms & Conditions :</b></label>

                      <span v-html="invoice.terms_and_conditions"></span>
                    </div>
                    <div>
                      <label><b> Note : </b></label>
                      {{ invoice.note }}
                    </div>
                  </CCol> -->

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
                          <!-- <tr v-if="invoice.delivery">
                          <td class="left">
                            <strong>Delivery charges</strong>
                          </td>
                          <td class="right">
                            <strong>{{ invoice.delivery_method_price }}</strong>
                          </td>
                        </tr>
                        <tr v-if="invoice.delivery">
                          <td class="left">
                            <strong>Total With Delivery</strong>
                          </td>
                          <td class="right">
                            <strong>{{ invoice.total_price_with_delivery }}</strong>
                          </td>
                        </tr> -->
                          <!-- <tr>
                      <td class="left"><strong>Payment </strong></td>
                      <td class="right">
                        <strong>{{ invoice.grand_total }}</strong>
                      </td>
                    </tr> -->
                        </tbody>
                      </table>
                      <!-- <a href="#" class="btn btn-success">
            <CIcon name="cil-dollar" /> Proceed to Payment
          </a> -->
                    </CCol>
                  </CRow>
                </form>
              </section>
            </vue-html2pdf>
          </CCardBody>
        </CCard>
      </div>
      <div>
        <CCard>
          <CCardHeader> <strong>Payment List</strong> </CCardHeader>
          <CCardBody>
            <CDataTable
              :items="payments"
              :fields="fields"
              table-filter
              sorter
              hover
              ref="externalAgent"
            >
              <template #created_by="{ item }">
                <td>
                  {{ item.created_by.username }}
                </td>
              </template>
              <template #payment_no="{ item }">
                <td>
                  {{ item.payment_no ? item.payment_no : "-" }}
                </td>
              </template>
              <template #actions="{ item }">
                <td>
                  <CButtonGroup>
                    <CButton @click="viewRow(item.uuid)" class="btn-sm" color="success"
                      >View</CButton
                    >
                    <CButton
                      @click="editRow(item)"
                      class="btn-sm text-white"
                      color="warning"
                    >
                      <CIcon :content="$options.cilPencil"
                    /></CButton>
                    <CButton @click="deleteRow(item.uuid)" class="btn-sm" color="danger">
                      <CIcon :content="$options.cilTrash" />
                    </CButton>
                  </CButtonGroup>
                </td>
              </template>
            </CDataTable>
          </CCardBody>
        </CCard>
        <!-- <WhatsappPluginModel :contacts="options.contacts" type="invoice" />
        <ReturnByInvoiceModel :product="openInvoice" /> -->
      </div>
    </div>
    <ExchangePaymentModel @update-table="updateTable" :editData="editData" />
  </div>
</template>
<script>
import QuotationService from "@/services/sale/QuotationService";
import PaymentInvoiceService from "@/services/sale/PaymentInvoiceService";
import ExchangePaymentModel from "@/components/exchanges/payment/ExchangePaymentModel";
import ProductExchangePaymentService from "@/services/exchanges/ProductExchangePaymentService";
import { cisWallet } from "@coreui/icons-pro";
import { required } from "vuelidate/lib/validators";
import Loader from "@/components/layouts/Loader.vue";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";
// import { whatsappMixin } from "@/mixins/plugins/whatsappMixin";
import VueHtml2pdf from "vue-html2pdf";
// import WhatsappPluginModel from "@/components/plugins/whatsapp/WhatsappPluginModel";
import SearchProduct from "@/components/layouts/SearchProduct";
// import ProductService from "@/services/products/ProductService";
// import ReturnByInvoiceModel from "@/components/returns/ReturnByInvoiceModel";
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
  name: "ShowExchange",
  cisWallet,
  cilPencil,
  cilTrash,
  cilEye,
  components: {
    Loader,
    VueHtml2pdf,
    // WhatsappPluginModel,
    // ReturnByInvoiceModel,
    SearchProduct,
    ExchangePaymentModel,
  },
  // mixins: [whatsappMixin],
  data() {
    return {
      fields,
      output: null,
      openInvoice: {},
      editData: {},
      contact: "",
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
        delivery: "",
        address_for_delivery: "",
        delivery_method_price: "",
        total_price_with_delivery: "",
      },
      business: {
        logo: "",
      },
      customer: {
        name: "",
        uuid: "",
        address: "",
        contact_number: "",
        email: "",
      },
      form: {
        payment_method_id: "",
        amount: "",
        customer_id: "",
        invoice: "",
        product_exchange_id: "",
        items: [],
      },
      options: {
        paymentMethods: [{ label: "Choose Payment Method", value: "" }],
        contacts: [{ label: "Choose Contact", value: "" }],
      },
      payments: [],
    };
  },

  validations() {
    return {
      form: {
        payment_method_id: { required },
        amount: { required },
      },
    };
  },
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
    // this.product_id = this.$route.params.id;
    this.exchange_id = this.$route.params.id;
    this.form.product_exchange_id = this.exchange_id;

    if (this.exchange_id) {
      this.getExchange();
    }

    this.getPaymentMethods();
    this.getAllPayments();
    // ProductService.get(this.product_id)
    //   .then((response) => {
    //     const { data } = response;
    //     if (data) {
    //       this.invoice.products.push({
    //         name: data.name,
    //         uuid: data.uuid,
    //         description: data.description,
    //         selling_price: data.price.selling_price_with_tax,
    //         qty: 1,
    //         tax: data.price.tax.percentage,
    //         total: data.price.selling_price_with_tax,
    //       });
    //       this.invoice.sub_total = data.price.selling_price_with_tax;
    //       this.invoice.total_tax = data.price.tax.percentage;
    //       this.invoice.product_price = data.price.selling_price_with_tax;
    //       this.invoice.grand_total = data.price.selling_price_with_tax;

    //       this.$forceUpdate();
    //     }
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  },
  methods: {
    setProductPrice(val) {
      this.invoice.product_price = val;
    },
    async print() {
      // Pass the element id here
      await this.$htmlToPaper("printMe");
    },
    savePdf() {
      this.$refs.html2Pdf.generatePdf();
    },
    updateTable() {
      setTimeout(() => {
        this.getAllPayments();
      }, 1000);
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
            this.$router.push({ path: "/exchanges/index" });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getServerData() {
      this.$store.commit("set_loader");
      QuotationService.get(this.invoice_id)
        .then(({ data }) => {
          this.invoice.quotation_ref_no = data.quotation_ref_no;
          // this.invoice.dated = data.dated;
          // this.invoice.due_date = data.due_date;
          // this.invoice.sub_total = data.sub_total;
          // this.invoice.total_tax = data.total_tax;
          // this.invoice.total_discount = data.total_discount;
          // this.invoice.grand_total = data.grand_total;
          // this.invoice.note = data.note;
          // this.invoice.payment_terms = data.payment_terms;
          // this.invoice.terms_and_conditions = data.terms_and_conditions;
          this.invoice.invoice_ref_no = data.invoice_ref_no;

          // customer
          this.form.customer_id = data.customer.uuid;
          this.customer.uuid = data.customer.uuid;
          this.customer.name = data.customer.full_name;
          this.customer.address = data.customer.default_address;
          this.customer.contact_number = data.customer.default_contact;
          this.customer.email = data.customer.default_email;
          // let serverproducts = this.invoice.products;

          // if (
          //   data.customer &&
          //   data.customer.all_contacts &&
          //   data.customer.all_contacts.length > 0
          // ) {
          //   if (data.customer.all_contacts.length === 1) {
          //     const number =
          //       data.customer.contact.country.dialCode + data.customer.contact.number.en;
          //     this.customer.contact_number = number;
          //     this.whatsapp.name = data.customer.full_name;
          //     this.whatsapp.number = number;
          //   } else {
          //     let contacts = this.options.contacts;
          //     data.customer.all_contacts.map(function (item) {
          //       contacts.push({
          //         label:
          //           item.country.dialCode + item.number.en + " (" + item.name.en + ")",
          //         value: JSON.stringify({
          //           uuid: item.uuid,
          //           name: data.customer.full_name,
          //           number: item.country.dialCode + item.number.en,
          //         }),
          //       });
          //     });
          //   }
          // }

          // delivery
          // this.invoice.delivery = data.delivery;
          // this.invoice.delivery_method_price = data.delivery_method_price;
          // this.invoice.address_for_delivery = data.address_for_delivery;
          // this.invoice.total_price_with_delivery = data.total_price_with_delivery;

          // data.products.map((item, id) => {
          //   serverproducts.push(item);
          // });
          this.$store.commit("close_loader");
        })
        .catch((err) => {
          this.$store.commit("close_loader");
          console.log(err);
        });

      // Business logo
      // this.$store.commit("set_loader");
      // let business_id = localStorage.getItem("business_id");
      // this.$http
      //   .get("/business/" + business_id)
      //   .then(({ data }) => {
      //     if (data.logo && data.logo.path) {
      //       this.business.logo = data.logo.path;
      //     }
      //     this.$store.commit("close_loader");
      //   })
      //   .catch((err) => {
      //     this.$store.commit("close_loader");
      //     console.log(err);
      //   });
    },
    getPaymentMethods() {
      // Payment Methods display
      let paymentMethods = this.options.paymentMethods;
      this.$store.commit("set_loader");
      PaymentInvoiceService.create()
        .then(({ data }) => {
          if (data && data.paymentMethods) {
            data.paymentMethods.map((value, index) => {
              paymentMethods.push({ label: value.name, value: value.uuid });
            });
            this.$store.commit("close_loader");
          }
        })
        .catch((err) => {
          this.$store.commit("close_loader");
          console.log(err);
        });
    },
    getAllPayments() {
      // All Payments of exchanges
      this.$store.commit("set_loader");
      this.payments = [];
      let payments = this.payments;
      ProductExchangePaymentService.getExchangePayments(this.exchange_id)
        .then(({ data }) => {
          if (data) {
            data.map((value, index) => {
              payments.push(value);
            });
          }
          this.$store.commit("close_loader");
        })
        .catch((err) => {
          console.log(err);
          this.$store.commit("close_loader");
        });
    },
    getExchange() {
      this.$store.commit("set_loader");
      ProductExchangeService.get(this.exchange_id)
        .then(({ data }) => {
          if (data) {
            // this.isEditing = true;
            this.invoice.invoice_ref_no = data.invoice?.invoice_ref_no ?? "";
            this.invoice.uuid = data.invoice?.uuid ?? "";

            if (data.customer) {
              // customer
              this.customer.uuid = data.customer.uuid;
              this.form.customer_id = data.customer.uuid;
              this.customer.name = data.customer.full_name;
            }

            if (data.items && data.items.length > 0) {
              let items = this.form.items;
              let products = this.invoice.products;
              data.items.map((item) => {
                if (item.qty < 0) {
                  this.product_id = item.inventable.uuid;
                  products.push({
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
                  items.push({
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

    // changeWhatsappContact() {
    //   if (this.contact) {
    //     const contact = JSON.parse(this.contact);
    //     this.whatsapp.name = contact.name;
    //     this.whatsapp.number = contact.number;
    //   } else {
    //     this.whatsapp.name = "";
    //     this.whatsapp.number = "";
    //   }
    // },
    paymentSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let payments = this.payments;
        this.$store.commit("set_loader");
        this.form.customer = this.customer.uuid;
        this.form.invoice = this.uuid;
        ProductExchangePaymentService.store(this.form)
          .then(({ data }) => {
            payments.unshift(data);
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Payment Added Successfully",
              timer: 3600,
            });
            this.resetForm();

            this.$store.commit("close_loader");
          })
          .catch((err) => {
            this.$store.commit("close_loader");
            console.log(err);
          });
      }
    },
    resetForm() {
      this.$v.$reset();
      // for (let index in this.form) {
      //   this.form[index] = "";
      // }
      this.form.payment_method_id = "";
      this.form.amount = "";
    },
    viewRow(uuid) {
      this.$router.push({ path: "/exchange/payment/reciept/show/" + uuid });
    },
    editRow(item) {
      this.editData = item;
      this.$store.commit("set_exchange_payment_model", true);
    },
    addReturn(k) {
      this.openInvoice = this.invoice.products[k];
      this.$store.commit("set_return_by_invoice_model", true);
    },
    deleteRow(uuid) {
      this.deleteRows = JSON.stringify([uuid]);
      this.$swal
        .fire({
          title: "Are you sure you want to delete this record?",
          text: "This will be record from Database",
          showCancelButton: true,
          confirmButtonColor: "#e55353",
          confirmButtonText: "Yes, remove it it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            ProductExchangePaymentService.delete(this.deleteRows)
              .then((res) => {
                if (res.status == 200) {
                  this.$swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Payment Deleted Successfully",
                    timer: 3600,
                  });
                  this.payments = this.payments.filter((item) => item.uuid != uuid);
                }
              })
              .catch((error) => {
                this.$swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Something went Wrong",
                  timer: 3600,
                });
              });
            this.deleteRows = [];
          }
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
.buttons-box {
  display: flex;
  width: auto;
  align-items: center;
}
</style>
