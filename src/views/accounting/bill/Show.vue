<template>
  <div class="row">
    <!-- <Loader /> -->

    <div class="col-3">
      <div>
        <CCard>
          <CCardHeader>
            Bill
            <strong style="text-align: center"># {{ bill.bill_no }}</strong>
          </CCardHeader>
          <CCardBody>
            <div class="float-center">
              Supplier
              <div>
                <router-link
                  :to="`/supplier/show/${bill.supplier.uuid}`"
                  v-if="$can('show customers')"
                >
                  <strong class="margin:auto" style="color: red; font-size: 22px">{{
                    bill.supplier.name
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
      <div><ShowBill @bill-updated="billUpdated($event)" /></div>
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
                      @click="editRow(item.uuid)"
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
      </div>
    </div>
  </div>
</template>
<script>
// import QuotationService from "@/services/sale/QuotationService";
import BillPaymentService from "@/services/accounting/bill/BillPaymentService";
import { cisWallet } from "@coreui/icons-pro";
import { required } from "vuelidate/lib/validators";
// import Loader from "@/components/layouts/Loader.vue";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";
import ShowBill from "@/components/accounting/bill/ShowBill";

const fields = [
  { key: "created_by", label: "Created By", _style: "min-width:15%;" },
  { key: "payment_no", label: "Ref No", _style: "min-width:15%;" },
  { key: "dated", label: "Dated", _style: "min-width:40%" },
  { key: "amount", label: "Amount", _style: "min-width:15%;" },
  { key: "total_amount", label: "Total Amount", _style: "min-width:15%;" },
  { key: "actions", label: "ACTIONS", _style: "min-width:15%;" },
];

export default {
  name: "ShowBillAndPayment",
  cisWallet,
  cilPencil,
  cilTrash,
  cilEye,
  components: {
    // Loader,
    ShowBill,
  },
  data() {
    return {
      fields,
      deleteRows: [],
      contact: "",
      uuid: "",
      bill: {
        bill_no: "",
        supplier: {
          name: "",
          uuid: "",
          address: "",
          contact_number: "",
          email: "",
        },
      },
      form: {
        payment_method_id: "",
        amount: "",
        supplier_id: "",
        bill_id: "",
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
  created() {
    this.uuid = this.$route.params.id;
    this.getServerData();
  },
  methods: {
    getServerData() {
      this.$store.commit("set_loader");

      // Payment Methods display
      let paymentMethods = this.options.paymentMethods;
      this.$store.commit("set_loader");
      BillPaymentService.create()
        .then(({ data }) => {
          if (data && data.paymentMethods) {
            data.paymentMethods.map((value) => {
              paymentMethods.push({ label: value.name, value: value.uuid });
            });
            this.$store.commit("close_loader");
          }
        })
        .catch((err) => {
          this.$store.commit("close_loader");
          console.log(err);
        });

      // All Payments of invoice
      let payments = this.payments;
      BillPaymentService.getBillPayments(this.uuid)
        .then(({ data }) => {
          if (data) {
            data.map((value) => {
              payments.push(value);
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });

      this.$store.commit("close_loader");
    },
    paymentSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let payments = this.payments;
        this.$store.commit("set_loader");
        this.form.bill_id = this.uuid;
        this.form.total_amount = this.form.amount;
        BillPaymentService.store(this.form)
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
    billUpdated(obj) {
      if (obj) {
        this.bill.bill_no = obj.bill_no;
        if (obj.supplier) {
          this.form.supplier_id = obj.supplier.uuid;
          this.bill.supplier.uuid = obj.supplier.uuid;
          this.bill.supplier.name = obj.supplier.name;
        }
      }
    },
    resetForm() {
      this.$v.$reset();
      for (let index in this.form) {
        if (index !== "supplier_id") this.form[index] = "";
      }
    },
    viewRow(uuid) {
      alert("not ready");
      // this.$router.push({ path: "/sales/invoice/payments/show/" + uuid });
    },
    editRow(uuid) {
      alert("not ready");
      // this.$router.push({ path: "/sales/invoices/edit/" + uuid });
    },
    deleteRow(uuid) {
      this.deleteRows = JSON.stringify([uuid]);
      this.$swal
        .fire({
          title: "Do you want to delete this record",
          text: "This will be record from Database",
          showCancelButton: true,
          confirmButtonColor: "#e55353",
          confirmButtonText: "Yes, remove it it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            BillPaymentService.delete(this.deleteRows)
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
