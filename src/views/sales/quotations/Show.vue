<template>
  <CCard>
    <CCardHeader>
      Quotation <strong># {{ invoice.quotation_ref_no }}</strong>
      <div class="float-right">
        <a href="#" class="btn btn-sm btn-info">
          <CIcon name="cil-save" /> Save
        </a>
        <a class="btn btn-sm btn-info ml-1" @click="print">
          <CIcon name="cil-print" class="mr-1" /> Print Me
        </a>
      </div>
    </CCardHeader>
    <CCardBody id="printMe">
      <CRow class="mb-4">
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
          <div>Customer address</div>
          <div>43-190 Mikolow, Poland</div>
          <div>Email: lukasz@bootstrapmaster.com</div>
          <div>Phone: +48 123 456 789</div>
        </CCol>
        <CCol sm="8" class="mt-5" style="text-align: right">
          <div>
            Dated :<strong># {{ invoice.dated }}</strong>
          </div>
          <div>
            Due Date :<strong># {{ invoice.due_date }}</strong>
          </div>
        </CCol>
      </CRow>
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
              <th class="right">Discount</th>
              <th class="right">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(product, index) in invoice.products"
              :key="product.uuid"
            >
              <td class="center">{{ index + 1 }}</td>
              <td class="left">{{ product.product.name.en }}</td>
              <td class="left">{{ product.description }}</td>
              <td class="center">{{ product.qty }}</td>
              <td class="right">{{ product.selling_price }}</td>
              <td class="right">{{ product.tax }}</td>
              <td class="right">
                {{
                  product.discount_per
                    ? product.discount + "%"
                    : product.discount
                }}
              </td>
              <td class="right">{{ product.total }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <CRow>
        <CCol lg="4" sm="5">
          <div>
            <label><b> Payment Terms :</b></label>

            <span v-html="invoice.payment_terms"></span>
          </div>
          <div>
            <label><b> Note : </b></label>
            {{ invoice.note }}
          </div>
        </CCol>

        <CCol lg="4" sm="5" class="ml-auto">
          <table class="table table-clear">
            <tbody>
              <tr>
                <td class="left"><strong>Subtotal</strong></td>
                <td class="right">{{ invoice.sub_total }}</td>
              </tr>
              <tr>
                <td class="left"><strong>VAT </strong></td>
                <td class="right">{{ invoice.total_tax }}</td>
              </tr>
              <tr>
                <td class="left"><strong>Discount </strong></td>
                <td class="right">{{ invoice.total_discount }}</td>
              </tr>

              <tr>
                <td class="left"><strong>Total</strong></td>
                <td class="right">
                  <strong>{{ invoice.grand_total }}</strong>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- <a href="#" class="btn btn-success">
            <CIcon name="cil-dollar" /> Proceed to Payment
          </a> -->
        </CCol>
      </CRow>
    </CCardBody>
  </CCard>
</template>
<script>
import QuotationService from "@/services/sale/QuotationService";

export default {
  name: "Invoice",
  data() {
    return {
      output: null,
      uuid: "",

      invoice: {
        dated: "",
        due_date: "",
        sub_total: "",
        total_tax: "",
        total_discount: "",
        grand_total: "",
        quotation_ref_no: "",
        invoice_ref_no: "",
        payment_terms: "",
        note: "",
        products: [],
      },
      business: {
        logo: "",
      },
      customer: {
        name: "",
        address: "",
      },
    };
  },
  created() {
    this.getServerData();
  },
  methods: {
    async print() {
      // Pass the element id here
      await this.$htmlToPaper("printMe");
    },
    getServerData() {
      // Quotation Data
      this.uuid = this.$route.params.id;
      QuotationService.get(this.uuid)
        .then(({ data }) => {
          console.log(data);
          // invoice
          this.invoice.quotation_ref_no = data.quotation_ref_no;
          this.invoice.dated = data.dated;
          this.invoice.due_date = data.due_date;
          this.invoice.sub_total = data.sub_total;
          this.invoice.total_tax = data.total_tax;
          this.invoice.total_discount = data.total_discount;
          this.invoice.grand_total = data.grand_total;
          this.invoice.note = data.note;
          this.invoice.payment_terms = data.payment_terms;

          // customer
          this.customer.name = data.customer.full_name.en;
          this.customer.address = data.customer.default_address;
          let serverproducts = this.invoice.products;
          data.products.map((item, id) => {
            serverproducts.push(item);
          });
        })

        .catch((err) => {
          console.log(err);
        });

      let business_id = localStorage.getItem("business_id");
      this.$http
        .get("/business/" + business_id)
        .then(({ data }) => {
          if (data.logo.path) {
            this.business.logo = data.logo.path;
          }
        })
        .catch((err) => {
          this.$store.commit("close_loader");
          console.log(err);
        });
    },
  },
};
</script>
