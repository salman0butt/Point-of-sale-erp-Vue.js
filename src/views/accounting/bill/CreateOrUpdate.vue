<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>{{ isEditing ? "Edit" : "New" }} Bill </CCardHeader>
          <CCardBody>
            <CRow>
              <Loader />
              <CCol xs="12" lg="12">
                <form @submit.prevent="isEditing ? updateBill() : storeBill()">
                  <CRow>
                    <CCol xs="6" md="4" class="pt-2">
                      <SupplierSearch />
                    </CCol>
                    <CCol xs="6" md="4" class="pt-2">
                      <CInput
                        type="date"
                        label="Date"
                        v-model="form.date"
                        :class="{ error: $v.form.date.$error }"
                        @input="$v.form.date.$touch()"
                      />
                      <div v-if="$v.form.date.$error">
                        <p v-if="!$v.form.date.required" class="errorMsg">
                          Date is required
                        </p>
                      </div>
                    </CCol>

                    <CCol xs="6" lg="4" class="pt-2">
                      <CInput
                        type="date"
                        label="Due Date"
                        v-model="form.due_date"
                        :class="{
                          error: $v.form.due_date.$error,
                        }"
                        @input="$v.form.due_date.$touch()"
                      />
                      <div v-if="$v.form.due_date.$error">
                        <p v-if="!$v.form.due_date.required" class="errorMsg">
                          Due Date is required
                        </p>
                      </div>
                    </CCol>
                    <CCol sm="6" md="4" class="pt-2">
                      <CSelect
                        label="Status"
                        :options="options.status"
                        :value.sync="form.status"
                        :class="{ error: $v.form.status.$error }"
                        @input="$v.form.status.$touch()"
                      />
                      <div v-if="$v.form.status.$error">
                        <p v-if="!$v.form.status.required" class="errorMsg">
                          Status is required
                        </p>
                      </div>
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
                      style="
                        float: right;
                        width: 140px;
                        margin-left: 20px;
                        margin-top: 0;
                      "
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
      </CCol>
    </CRow>
  </div>
</template>
<script>
import PurchaseService from "@/services/accounting/purchaseOrder/PurchaseOrderServices";
import { required } from "vuelidate/lib/validators";
import { cilTrash, cisCaretBottom, cisFile } from "@coreui/icons-pro";
import Loader from "@/components/layouts/Loader.vue";
import ReceivingService from "@/services/receivings/ReceivingService";
import AccountServices from "@/services/accounting/accounts/AccountServices";
import { attachmentMixin } from "@/mixins/attachmentMixin";
import { globalMixin } from "@/mixins/globalMixin";

// new

import SupplierSearch from "@/components/general/search/SupplierSearch";

export default {
  name: "CreateOrUpdateBill",
  mixins: [attachmentMixin, globalMixin],
  components: {
    Loader,
    SupplierSearch,
  },
  cilTrash,
  cisCaretBottom,
  cisFile,
  data: () => ({
    form: {
      product_id: "",
      id: "",
      date: "",
      po: "",
      ref: "",
      supplier_id: "",
      deliver_to: "organization",
      branch_id: "",
      customer_id: "",
      subTotal: 0.0,
      discount: "",
      discount_val: 0.0,
      total: 0.0,
      customer_notes: "",
      terms_and_conditions: "",
      shipment_preference: "",
      due_date: "",
      payment_terms: "",
      status: "",

      items: [
        {
          uuid: "",
          name: "",
          // type: "",
          account: "",
          qty: "",
          rate: "",
          tax: "",
          amount: "",
          options: {
            products: [],
          },
        },
      ],
    },
    products_list: [],
    options: {
      status: [
        { value: "draft", label: "Draft" },
        { value: "approved", label: "Approved" },
        { value: "rejected", label: "Rejected" },
      ],
    },
  }),
  validations() {
    return {
      form: {
        date: { required },
        po: { required },
        status: { required },
        ref: { required },
        deliver_to: { required },
        supplier_id: { required },
        branch_id: { required },
        subTotal: { required },
        total: { required },
        shipment_preference: { required },
        due_date: { required },
        payment_terms: { required },
        items: { required },
      },
    };
  },
  async created() {
    this.form.date = this.calculateTodayDate();
    this.form.due_date = this.calculateDueDate();

    if (this.form.id) {
      await this.getPurchaseOrder();
    }
  },

  methods: {
    resetSearch() {
      this.form.product_id = "";
      // this.search = "";
      this.form.items.map((item) => {
        item.options.products = [];
      });
      // this.options.products = [];
    },

    storeBill() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.commit("set_loader");
        const formData = this.formData();
        const config = {
          headers: { "Content-Type": "multipart/form-data" },
        };
        // let data = this.form;
        PurchaseService.create(formData, config)
          .then((res) => {
            if (res.status == 201) {
              this.displayData(res.data);
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Purchase Added Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.resetForm();
              this.$store.commit("close_loader");
              if (this.saveAndExit) {
                this.$router.push({ path: "/purchases/index" });
              } else {
                this.$router.push({
                  path: "/purchases/edit/" + res.data.uuid,
                });
              }
            }
          })
          .catch((error) => {
            console.log(error);
            this.$store.commit("close_loader");
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: "Something Went Wrong.",
              timer: 3600,
            });
          });
      }
    },

    updateBill() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.commit("set_loader");
        let formData = this.formData(true);
        const config = {
          headers: { "Content-Type": "multipart/form-data" },
        };
        PurchaseService.update(this.form.id, formData, config)
          .then((res) => {
            if (res.status == 200) {
              this.displayData(res.data);
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Purchase Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.$store.commit("close_loader");
              if (this.saveAndExit) {
                this.$router.push({ path: "/purchases/index" });
              }
            }
          })
          .catch((error) => {
            console.log(error);
            this.$store.commit("close_loader");
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: "Something Went Wrong.",
              timer: 3600,
            });
          });
      }
    },

    formData(update = false) {
      let formData = new FormData();
      formData.append("supplier_id", this.form.supplier_id);
      formData.append("branch_id", this.form.branch_id);
      formData.append("customer_id", this.form.customer_id);
      formData.append("purchase_order_id", this.form.po);
      formData.append("reference", this.form.ref);
      formData.append("deliver_to", this.form.deliver_to);
      formData.append("date", this.form.date);
      formData.append("due_date", this.form.due_date);
      formData.append("discount", this.form.discount);
      formData.append("discount_val", this.form.discount_val);
      formData.append("total", this.form.total);
      formData.append("customer_note", this.form.customer_notes);
      formData.append("terms_and_conditions", this.form.terms_and_conditions);
      formData.append("shipment_preference", this.form.shipment_preference);
      formData.append("payment_terms", this.form.payment_terms);
      formData.append("sub_total", this.form.subTotal);
      formData.append("items", JSON.stringify(this.form.items));

      if (this.form.attachments && this.form.attachments.length > 0) {
        this.form.attachments.map((attachment) => {
          formData.append("attachments[]", attachment);
        });
      }
      if (update) {
        formData.append("_method", "PATCH");
      }
      return formData;
    },
    getPurchaseOrder() {
      this.$store.commit("set_loader");
      PurchaseService.get(this.form.id)
        .then(({ data }) => {
          this.displayData(data);
          this.$store.commit("close_loader");
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("close_loader");
          this.isEditing = false;
          this.$router.push({ path: "/purchases/index" });
        });
    },

    displayData(data = null) {
      if (data) {
        this.resetForm();
        this.isEditing = true;
        this.form.id = data.uuid;
        this.form.supplier_id = data.supplier?.uuid ?? "";
        this.form.branch_id = data.branch?.uuid ?? "";
        this.form.customer_id = data.customer?.uuid ?? "";
        this.form.po = data.purchase_order_id;
        this.form.ref = data.reference;
        this.form.deliver_to = data.deliver_to
          ? data.deliver_to
          : "organization";
        this.form.date = data.date;
        this.form.due_date = data.due_date;
        this.form.discount = data.discount ? data.discount : "";
        this.form.total = parseFloat(data.total);
        this.form.customer_notes = data.customer_note;
        this.form.terms_and_conditions = data.terms_and_conditions;
        this.form.shipment_preference = data.shipment_preference;
        this.form.payment_terms = data.payment_term;
        this.form.subTotal = parseFloat(data.sub_total);
        this.displayAttachment = [];

        if (data.attachments && data.attachments.length > 0) {
          data.attachments.map((attachment) => {
            this.displayAttachment.push(attachment);
          });
        }
        if (data.items && data.items.length > 0) {
          this.form.items = [];
          data.items.forEach((item) => {
            const data = {
              uuid: item.product?.uuid,
              // type: "product",
              name: item.name,
              account: item.account?.uuid,
              rate: parseFloat(item.rate) ?? 0,
              qty: parseFloat(item.qty),
              tax: item && item.tax ? item.tax.uuid : "",
              amount: parseFloat(item.amount),
              options: {
                product: [],
              },
            };
            this.form.items.push(data);
          });
        }
        this.calculateAllItems();
      }
    },

    resetForm() {
      for (let index in this.form) {
        if (index === "items" || index === "attachments") {
          this.form.items[index] = [];
        } else {
          this.form[index] = "";
        }
      }
      this.displayAttachment = [];
      this.isEditing = false;
    },
  },
};
</script>
<style scoped>
.ra {
  align-items: baseline;
}
.search-content {
  position: absolute;
  width: 94%;
  top: 3rem;
  background-color: #fff !important;
  z-index: 99;
  padding: 10px 20px;
  -webkit-box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  cursor: pointer;
  font-weight: 600;
}
.search-content li {
  list-style-type: none;
  padding: 5px 0;
  border-bottom: 1px solid #80808045;
}
span#basic-addon2 {
  margin-top: 1.8rem !important;
}
.del-btn {
  background: transparent;
  height: fit-content;
  margin-top: 2rem;
}
</style>
