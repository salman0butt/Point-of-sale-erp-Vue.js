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
                    <!-- <CCol xs="6" md="4" class="pt-2">
                      <CInput
                        type="Text"
                        label="Bill #"
                        v-model="form.bill_no"
                        :class="{ error: $v.form.bill_no.$error }"
                        @input="$v.form.bill_no.$touch()"
                      />
                      <div v-if="$v.form.bill_no.$error">
                        <p v-if="!$v.form.bill_no.required" class="errorMsg">
                          Bill Number is required
                        </p>
                      </div>
                    </CCol> -->
                    <CCol xs="6" md="4" class="pt-2">
                      <SupplierSearch
                        @supplier-change="supplierChange($event)"
                        :previousValue="previousValue"
                      />
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
                  <CRow>
                    <CCol xs="12" md="12" class="pt-2">
                      <ProductSearch
                        @update-items="updateItems($event)"
                        :previousValue="form.items"
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol xs="12" md="6" class="pt-2">
                      <CTextarea
                        class="mt-4"
                        label="Supplier Notes"
                        placeholder="Will be displayed on Bill"
                        v-model="form.supplier_notes"
                      />
                    </CCol>
                    <CCol xs="12" md="4" class="pt-2 offset-md-2">
                      <CRow class="pt-2 ra">
                        <CCol> <h6>Sub Total</h6> </CCol>
                        <CCol> </CCol>
                        <CCol md="3"
                          ><h6>{{ form.subTotal }}</h6>
                        </CCol>
                      </CRow>

                      <CRow class="pt-2 ra">
                        <CCol> <h6>Discount %</h6></CCol>
                        <CCol>
                          <CInput
                            v-model="form.discount"
                            @change="calculateTotalAmount()"
                          />
                        </CCol>
                        <CCol md="3"
                          ><h6>{{ form.discount_val }}</h6>
                        </CCol>
                      </CRow>
                      <CRow v-if="form.total_tax" class="pt-2 ra">
                        <CCol> <h6>Total Tax</h6> </CCol>
                        <CCol> </CCol>
                        <CCol md="3"
                          ><h6>{{ form.total_tax }}</h6>
                        </CCol>
                      </CRow>
                      <CRow class="pt-2 ra">
                        <CCol><h5>Total</h5> </CCol>
                        <CCol> </CCol>
                        <CCol md="3"
                          ><h5>
                            <strong>{{ form.total }}</strong>
                          </h5>
                        </CCol>
                      </CRow>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol xs="12" md="8">
                      <CTextarea
                        class="mt-4"
                        label="Terms & Conditions"
                        placeholder="Enter the terms and conditions of your business to be displayed in your transection"
                        v-model="form.terms_and_conditions"
                      />
                    </CCol>
                    <CCol xs="12" md="4" class="mt-3">
                      <label for="attachment">Attach File(s) to Bill</label>
                      <input
                        class="form-control"
                        id="attachment"
                        type="file"
                        @change="pickFile"
                        multiple
                      />
                      <!-- <span style="font-size: 12px"
                            >You can upload maximum of 5 files</span
                          > -->

                      <div
                        class="attachment-display"
                        v-if="displayAttachment && displayAttachment.length > 0"
                      >
                        <ul class="pl-0">
                          <li
                            v-for="(attachment, index) in displayAttachment"
                            v-bind:key="index"
                            class="display-attachment-row"
                          >
                            <CIcon :content="$options.cisFile" />
                            <a
                              v-bind:href="attachment.path"
                              target="_blank"
                              class="name-attachment"
                            >
                              {{ attachment.name }}</a
                            >
                            <a
                              @click.prevent="deleteAttachment(attachment.uuid)"
                              class="delete-attachment"
                            >
                              <CIcon :content="$options.cilTrash" />
                            </a>
                          </li>
                        </ul>
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
      </CCol>
    </CRow>
  </div>
</template>
<script>
import BillService from "@/services/accounting/bill/BillService";
import { required } from "vuelidate/lib/validators";
import { cilTrash, cisCaretBottom, cisFile } from "@coreui/icons-pro";
import Loader from "@/components/layouts/Loader.vue";
import { attachmentMixin } from "@/mixins/attachmentMixin";
import { globalMixin } from "@/mixins/globalMixin";
import ProductSearch from "@/components/general/search/ProductSearch.vue";
import SupplierSearch from "@/components/general/search/SupplierSearch";

export default {
  name: "CreateOrUpdateBill",
  mixins: [attachmentMixin, globalMixin],
  components: {
    Loader,
    SupplierSearch,
    ProductSearch,
  },
  cilTrash,
  cisCaretBottom,
  cisFile,
  data: () => ({
    isEditing: false,
    saveAndExit: false,
    previousValue: null,
    form: {
      // bill_no: "",
      product_id: "",
      id: "",
      date: "",
      supplier_id: "",
      subTotal: 0.0,
      total_tax: "",
      discount: "",
      discount_val: 0.0,
      total: 0.0,
      supplier_notes: "",
      terms_and_conditions: "",
      due_date: "",
      status: "",
      items: [
        {
          uuid: "",
          name: "",
          // type: "",
          account: Object,
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
        { value: "", label: "Choose Status", disabled: true, selected: true },
        { value: "draft", label: "Draft" },
        { value: "approved", label: "Approved" },
        { value: "rejected", label: "Rejected" },
      ],
    },
  }),
  validations() {
    return {
      form: {
        // bill_no: { required },
        date: { required },
        due_date: { required },
        supplier_id: { required },
        items: { required },
        subTotal: { required },
        total: { required },
        status: { required },
      },
    };
  },
  async created() {
    this.form.id = this.$route.params.id;
    this.form.date = this.calculateTodayDate();
    this.form.due_date = this.calculateDueDate();

    if (this.form.id) {
      await this.getBill();
    }
  },

  methods: {
    updateItems({ items, sub_total, total_tax }) {
      this.form.items = items;
      this.form.subTotal = sub_total;
      this.form.total_tax = total_tax;
      this.calculateTotalAmount();
    },
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
        BillService.create(formData, config)
          .then((res) => {
            if (res.status == 201) {
              this.displayData(res.data);
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Bill Added Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.resetForm();
              this.$store.commit("close_loader");
              if (this.saveAndExit) {
                this.$router.push({ path: "/accounting/bill/index" });
              } else {
                this.$router.push({
                  path: "/accounting/bill/edit/" + res.data.uuid,
                });
              }
            }
          })
          .catch((error) => {
            console.log(error);
            this.$store.commit("close_loader");
            if (error.response && error.response.status === 422) {
              let errors = error.response.data.errors;
              for (const err in errors) {
                this.$toast.error(errors[err][0]);
              }
            } else {
              this.$toast.error("Something went wrong.");
            }
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
        BillService.update(this.form.id, formData, config)
          .then((res) => {
            if (res.status == 200) {
              this.displayData(res.data);
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Bill Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.$store.commit("close_loader");
              if (this.saveAndExit) {
                this.$router.push({ path: "/accounting/bill/index" });
              }
            }
          })
          .catch((error) => {
            console.log(error);
            this.$store.commit("close_loader");
            if (error.response && error.response.status === 422) {
              let errors = error.response.data.errors;
              for (const err in errors) {
                this.$toast.error(errors[err][0]);
              }
            } else {
              this.$toast.error("Something went wrong.");
            }
          });
      }
    },
    supplierChange(val) {
      this.form.supplier_id = val;
    },
    formData(update = false) {
      let formData = new FormData();
      // formData.append("bill_no", this.form.bill_no);
      console.log(this.form.supplier_id);
      if (this.form.supplier_id && this.form.supplier_id.value) {
        formData.append("supplier_id", this.form.supplier_id.value);
      }
      formData.append("date", this.form.date);
      formData.append("due_date", this.form.due_date);
      formData.append("status", this.form.status);
      formData.append("total_discount", this.form.discount);
      formData.append("total_tax", this.form.total_tax);
      // formData.append("discount_val", this.form.discount_val);
      formData.append("total", this.form.total);
      formData.append("note", this.form.supplier_notes);
      formData.append("terms_and_conditions", this.form.terms_and_conditions);
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
    getBill() {
      this.$store.commit("set_loader");
      BillService.get(this.form.id)
        .then(({ data }) => {
          this.displayData(data);
          this.$store.commit("close_loader");
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("close_loader");
          this.isEditing = false;
          this.$router.push({ path: "/accounting/bill/index" });
        });
    },

    displayData(data = null) {
      if (data) {
        this.resetForm();
        this.isEditing = true;
        this.form.id = data.uuid;
        // this.form.bill_no = data.bill_no;
        if (data.supplier) {
          // this.form.supplier_id =
          //   {
          //     value: data.supplier.uuid,
          //     label: data.supplier?.name + " (serial: " + data.supplier?.serial_no + ")",
          //   } ?? "";
          this.previousValue = {
            value: data.supplier.uuid,
            label: data.supplier?.name + " (serial: " + data.supplier?.serial_no + ")",
          };
        }
        this.form.date = data.date;
        this.form.due_date = data.due_date;
        this.form.discount = data.total_discount ? data.total_discount : "";
        this.form.total = data.grand_total ? parseFloat(data.grand_total).toFixed(3) : "";
        this.form.supplier_notes = data.note;
        this.form.terms_and_conditions = data.terms_and_conditions;
        this.form.subTotal = parseFloat(data.sub_total);
        this.form.total_tax = data.total_tax ? parseFloat(data.total_tax) : "";
        this.form.status = data.status;
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
              name: item.product_name,
              account: item.account?.uuid,
              ...(item.account && {
                previousAccount: {
                  label: "-- " + item.account?.name,
                  value: item.account?.uuid,
                },
              }),
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
        this.calculateTotalAmount();
      }
    },
    calculateTotalAmount() {
      let sub_total = 0;
      let discount = 0;
      let total = 0;
      this.form.items.map((item) => {
        sub_total = sub_total + parseFloat(item.amount);
      });
      this.form.subTotal = sub_total.toFixed(3);
      if (this.form.discount) {
        let isPercentage = /%/gi;
        if (isPercentage.test(this.form.discount)) {
          discount = parseFloat(this.form.discount);
          this.form.discount_val = ((sub_total * parseFloat(discount)) / 100).toFixed(3);
          total = (sub_total - this.form.discount_val).toFixed(3);
        } else {
          total = sub_total - parseFloat(this.form.discount);
          this.form.discount_val = parseFloat(this.form.discount);
        }
      } else {
        total = sub_total.toFixed(3);
      }
      this.form.total = total;
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
