<template>
  <div>
    <Loader />
    <CCard>
      <CCardHeader>
        Reciept <strong># {{ reciept.invoice.invoice_ref_no }}</strong>
        <div class="float-right">
          <a href="#" class="btn btn-sm btn-info"> <CIcon name="cil-save" /> Save </a>
          <a class="btn btn-sm btn-info ml-1" @click="print">
            <CIcon name="cil-print" class="mr-1" /> Print Me
          </a>
        </div>
      </CCardHeader>
      <CCardBody id="printMe">
        <CRow class="mb-4">
          <CCol sm="12" md="12">
            <!-- <CImg v-bind:src="business.logo" block class="mb-2 imger" width="100%" /> -->
            <h6 class="mb-3">
              Recieved From: <strong>{{ reciept.customer.name }}</strong>
            </h6>

            <h5>Merchat</h5>
            <div>{{ business.name }}</div>
            <div>Email: {{ business.email }}</div>
            <div>Phone: {{ business.mobile }}</div>
          </CCol>
          <!-- <CCol sm="8" class="mt-5" style="text-align: right">
            <div>
              Dated :<strong># {{ reciept.dated }}</strong>
            </div>
          </CCol> -->
        </CRow>
        <div class="table-responsive-sm">
          <table class="table table-striped">
            <thead>
              <tr>
                <th class="center">#</th>
                <th>Pyament No</th>
                <th>Payment Method</th>
                <th class="center">Invoice ID</th>
                <th class="right">Amount</th>
                <th class="right">Total</th>
                <th class="right">Dated</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="center">1</td>
                <td class="left">{{ reciept.payment_no }}</td>
                <td class="left">{{ reciept.paymentMethod.paymentMethod }}</td>
                <td class="left">{{ reciept.invoice.quotation_ref_no }}</td>
                <td class="right">{{ reciept.amount }}</td>
                <td class="right">{{ reciept.amount }}</td>
                <td class="right">{{ reciept.dated }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <CRow>
          <CCol lg="4" sm="5" class="ml-auto">
            <table class="table table-clear">
              <tbody>
                <tr>
                  <td class="left"><strong>Subtotal</strong></td>
                  <td class="right">{{ reciept.amount }}</td>
                </tr>
                <tr>
                  <td class="left"><strong>Total</strong></td>
                  <td class="right">
                    <strong>{{ reciept.amount }}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  </div>
</template>
<script>
import PaymentInvoiceService from "@/services/sale/PaymentInvoiceService";
import { cisWallet } from "@coreui/icons-pro";
import Loader from "@/components/layouts/Loader.vue";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";

const fields = [
  { key: "created_by", label: "Created By", _style: "min-width:15%;" },
  { key: "payment_no", label: "Ref No", _style: "min-width:15%;" },
  { key: "dated", label: "Dated", _style: "min-width:40%" },
  { key: "amount", label: "Amount", _style: "min-width:15%;" },
  { key: "total_amount", label: "Total Amount", _style: "min-width:15%;" },
  { key: "actions", label: "ACTIONS", _style: "min-width:15%;" },
];

export default {
  name: "Invoice",
  cisWallet,
  cilPencil,
  cilTrash,
  cilEye,
  components: {
    Loader,
  },
  data() {
    return {
      fields,
      output: null,
      uuid: "",
      business: {
        name: "",
        email: "",
        mobile: "",
      },
      reciept: {
        customer: {
          name: "",
          uuid: "",
          address: "",
        },
        paymnet_no: "",
        dated: "",
        amount: "",
        total_amount: "",
        invoice: {
          invoice_ref_no: "",
        },
        paymentMethod: {
          paymentMethod: "",
          amount: "",
        },
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
      this.$store.commit("set_loader");
      this.uuid = this.$route.params.id;
      PaymentInvoiceService.get(this.uuid)
        .then(({ data }) => {
          if (data) {
            console.log(data);
            this.reciept.customer.uuid = data.customer.uuid;
            this.reciept.customer.name = data.customer?.full_name.en;
            this.reciept.customer.address = data.customer.address;
            this.reciept.payment_no = data.payment_no;
            this.reciept.dated = data.dated;
            this.reciept.amount = data.amount;
            this.reciept.total_amount = data.total_amount;
            this.reciept.invoice.invoice_ref_no = data.invoice_id.invoice_ref_no;
            this.reciept.paymentMethod.paymentMethod = data.paymentMethod.name;
            this.reciept.paymentMethod.amount = data.amount;
          }
        })
        .catch((err) => {
          console.log(err);
        });

      // Business
      let business_id = localStorage.getItem("business_id");
      this.$http
        .get("/business/" + business_id)
        .then(({ data }) => {
          if (data) {
            this.business.name = JSON.parse(data.business_name).en;
            this.business.email = data.business_email;
            this.business.mobile = data.business_mobile_no;
          }
        })
        .catch((err) => {
          this.$store.commit("close_loader");
          console.log(err);
        });

      this.$store.commit("close_loader");
    },
  },
};
</script>
