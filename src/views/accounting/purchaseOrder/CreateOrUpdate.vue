<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>{{ isEditing ? "Edit" : "New" }} Purchase </CCardHeader>
          <CCardBody>
            <CRow>
              <Loader />
              <CCol xs="12" lg="12">
                <form @submit.prevent="isEditing ? updatePurchase() : savePurchase()">
                  <CRow>
                    <CCol xs="6" md="4" class="pt-2">
                      <CSelect
                        label="Supplier"
                        :options="options.supplier"
                        :value.sync="form.supplier"
                        :class="{ error: $v.form.supplier.$error }"
                        @input="$v.form.supplier.$touch()"
                      />
                      <div v-if="$v.form.supplier.$error">
                        <p v-if="!$v.form.supplier.required" class="errorMsg">
                          Supplier is required
                        </p>
                      </div>
                    </CCol>

                    <CCol xs="6" md="4" class="pt-2">
                      <CSelect
                        label="Deliver To"
                        :options="options.deliver_to"
                        :value.sync="form.deliver_to"
                        :class="{ error: $v.form.deliver_to.$error }"
                        @input="$v.form.deliver_to.$touch()"
                      />
                      <div v-if="$v.form.deliver_to.$error">
                        <p v-if="!$v.form.deliver_to.required" class="errorMsg">
                          Deliver To is required
                        </p>
                      </div>
                    </CCol>
                    <CCol
                      v-if="form.deliver_to === 'organization'"
                      xs="6"
                      md="4"
                      class="pt-2"
                    >
                      <CSelect
                        label="Branch"
                        :options="options.branches"
                        :value.sync="form.branch"
                        :class="{ error: $v.form.branch.$error }"
                        @input="$v.form.branch.$touch()"
                      />
                      <div v-if="$v.form.branch.$error">
                        <p v-if="!$v.form.branch.required" class="errorMsg">
                          Branch is required
                        </p>
                      </div>
                    </CCol>

                    <CCol
                      v-if="form.deliver_to === 'customer'"
                      xs="6"
                      md="4"
                      class="pt-2"
                    >
                      <CSelect
                        label="Customer"
                        :options="options.customers"
                        :value.sync="form.customer"
                        :class="{ error: $v.form.customer.$error }"
                        @input="$v.form.customer.$touch()"
                      />
                      <div v-if="$v.form.customer.$error">
                        <p v-if="!$v.form.customer.required" class="errorMsg">
                          Customer is required
                        </p>
                      </div>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol xs="6" lg="4" class="pt-2">
                      <CInput
                        label="Purchase Order #"
                        v-model="form.po"
                        :class="{ error: $v.form.po.$error }"
                        @input="$v.form.po.$touch()"
                      />
                      <div v-if="$v.form.po.$error">
                        <p v-if="!$v.form.po.required" class="errorMsg">PO is required</p>
                      </div>
                    </CCol>
                    <CCol xs="6" md="4" class="pt-2">
                      <CInput
                        label="Reference#"
                        v-model="form.ref"
                        :class="{ error: $v.form.ref.$error }"
                        @input="$v.form.ref.$touch()"
                      />
                      <div v-if="$v.form.ref.$error">
                        <p v-if="!$v.form.ref.required" class="errorMsg">
                          Reference is required
                        </p>
                      </div>
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
                  </CRow>
                  <CRow>
                    <CCol xs="6" lg="4" class="pt-2">
                      <CInput
                        type="date"
                        label="Expected Delivery Date"
                        v-model="form.expected_delivery_date"
                        :class="{ error: $v.form.expected_delivery_date.$error }"
                        @input="$v.form.expected_delivery_date.$touch()"
                      />
                      <div v-if="$v.form.expected_delivery_date.$error">
                        <p
                          v-if="!$v.form.expected_delivery_date.required"
                          class="errorMsg"
                        >
                          Expected Delivery Date is required
                        </p>
                      </div>
                    </CCol>

                    <CCol xs="6" md="4" class="pt-2">
                      <CSelect
                        label="Payment Terms"
                        :options="options.payment_terms"
                        :value.sync="form.payment_terms"
                        :class="{ error: $v.form.payment_terms.$error }"
                        @input="$v.form.payment_terms.$touch()"
                      />
                      <div v-if="$v.form.payment_terms.$error">
                        <p v-if="!$v.form.payment_terms.required" class="errorMsg">
                          Payment Terms is required
                        </p>
                      </div>
                    </CCol>

                    <CCol xs="6" md="4" class="pt-2">
                      <CInput
                        label="Shipment Preference"
                        v-model="form.shipment_preference"
                        :class="{ error: $v.form.shipment_preference.$error }"
                        @input="$v.form.shipment_preference.$touch()"
                      />
                      <div v-if="$v.form.shipment_preference.$error">
                        <p v-if="!$v.form.shipment_preference.required" class="errorMsg">
                          Shipment Preference is required
                        </p>
                      </div>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol xs="12" md="12" class="pt-2">
                      <table class="table table-bordered">
                        <thead>
                          <tr>
                            <th scope="col">Item Details</th>
                            <th scope="col">Acount</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Rate</th>
                            <th scope="col">Tax</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, k) in form.items" :key="k">
                            <th>
                              <CSelect
                                :options="options.products"
                                :value.sync="form.product"
                              />
                            </th>
                            <td>
                              <CSelect
                                :options="options.accounts"
                                :value.sync="form.payment_terms"
                              />
                            </td>
                            <td>1.00</td>
                            <td>0.00</td>
                            <td>
                              <CSelect :options="options.tax" :value.sync="form.tax" />
                            </td>
                            <td>0.000</td>
                            <td>
                              <CIcon :content="$options.cilTrash" style="color: red" />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <CRow>
                        <CCol xs="12" md="6" class="pt-2">
                          <CButton
                            progress
                            timeout="2000"
                            color="default"
                            @click="addItem()"
                            >Add another line
                            <CIcon :content="$options.cisCaretBottom" style="width: 10px"
                          /></CButton>
                          <CTextarea
                            class="mt-4"
                            label="Customer Notes"
                            placeholder="Will be displayed on purchase order"
                            v-model="form.description"
                          />
                        </CCol>
                        <CCol xs="12" md="5" class="pt-2 ml-5">
                          <CRow class="pt-2 ra">
                            <CCol> <h6>Sub Total</h6> </CCol>
                            <CCol> </CCol>
                            <CCol><h6>0.00</h6> </CCol>
                          </CRow>
                          <CRow class="pt-2 ra">
                            <CCol> <h6>Discount %</h6></CCol>
                            <CCol>
                              <CInput v-model="form.discount" />
                            </CCol>
                            <CCol><h6>0.00</h6> </CCol>
                          </CRow>
                          <CRow class="pt-2 ra">
                            <CCol>
                              <h5>Total</h5>
                            </CCol>
                            <CCol> </CCol>
                            <CCol
                              ><h5><strong>0.00</strong></h5>
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
                            v-model="form.description"
                          />
                        </CCol>
                        <CCol xs="12" md="4" class="mt-3">
                          <label for="attachment">Attach File(s) to Purchase Order</label>
                          <input
                            class="form-control"
                            id="attachment"
                            type="file"
                            @change="pickFile"
                          />
                          <span style="font-size: 12px"
                            >You can upload maximum of 5 files</span
                          >
                        </CCol>
                      </CRow>
                    </CCol>
                  </CRow>

                  <p v-if="$v.$anyError" class="errorMsg">
                    Please Fill the required data
                  </p>
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
// import PurchaseService from "@/services/purchaseOrder/PurchaseService";
import { required } from "vuelidate/lib/validators";
import { cilTrash, cisCaretBottom } from "@coreui/icons-pro";
import Loader from "@/components/layouts/Loader.vue";

export default {
  name: "CreateOrUpdatePurchase",
  components: {
    Loader,
  },
  cilTrash,
  cisCaretBottom,
  data: () => ({
    isEditing: false,
    saveAndExit: false,
    form: {
      id: "",
      date: "",
      po: "",
      ref: "",
      supplier: "",
      deliver_to: "organization",
      branch: "",
      customer: "",
      billed_status: "",
      amount: "",
      shipment_preference: "",
      expected_delivery_date: "",
      payment_terms: "",
      items: [
        {
          item: "",
          description: "",
          quantity: "",
          unit_price: "",
          discount: "",
          tax: "",
          amount: "",
        },
      ],
    },
    options: {
      supplier: [
        { value: "", label: "Choose Supplier", disabled: true, selected: "" },
        { value: "1", label: "Supplier 1" },
        { value: "2", label: "Supplier 2" },
        { value: "3", label: "Supplier 3" },
      ],
      billed_status: [
        { value: "", label: "Choose Status", disabled: true, selected: "" },
        { value: "billed", label: "Billed" },
        { value: "unbilled", label: "Unbilled" },
      ],
      deliver_to: [
        { value: "", label: "Choose Deliver To", disabled: true, selected: "" },
        { value: "organization", label: "Organization" },
        { value: "customer", label: "Customer" },
      ],
      branches: [
        { value: "", label: "Choose Branch", disabled: true, selected: "" },
        { value: "1", label: "Branch 1" },
        { value: "2", label: "Branch 2" },
        { value: "3", label: "Branch 3" },
      ],
      customers: [
        { value: "", label: "Choose Customer", disabled: true, selected: "" },
        { value: "1", label: "Customer 1" },
        { value: "2", label: "Customer 2" },
        { value: "3", label: "Customer 3" },
      ],
      payment_terms: [
        { value: "", label: "Choose Payment Term", disabled: true, selected: "" },
        { value: "1", label: "Payment Term 1" },
        { value: "2", label: "Payment Term 2" },
        { value: "3", label: "Payment Term 3" },
      ],
      accounts: [
        { value: "", label: "Choose Account", disabled: true, selected: "" },
        { value: "1", label: "Account 1" },
        { value: "2", label: "Account 2" },
        { value: "3", label: "Account 3" },
      ],
      tax: [
        { value: "", label: "Choose Tax", disabled: true, selected: "" },
        { value: "1", label: "Tax 1" },
        { value: "2", label: "Tax 2" },
        { value: "3", label: "Tax 3" },
      ],
      products: [
        { value: "", label: "Choose Item", disabled: true, selected: "" },
        { value: "1", label: "Product 1" },
        { value: "2", label: "Product 2" },
        { value: "3", label: "Product 3" },
      ],
    },
  }),
  validations() {
    return {
      form: {
        date: { required },
        po: { required },
        ref: { required },
        supplier: { required },
        billed_status: { required },
        amount: { required },
        expected_delivery_date: { required },
        deliver_to: { required },
        branch: { required },
        customer: { required },
        payment_terms: { required },
        shipment_preference: { required },
      },
    };
  },
  created() {
    // this.form.id = this.$route.params.id;
    // if (this.form.id !== "" && this.form.id !== undefined) {
    //   this.isEditing = true;
    //   this.getPurchase();
    // }
  },
  methods: {
    addItem() {
      this.form.items.push({
        item: "",
        description: "",
        quantity: "",
        unit_price: "",
        discount: "",
        tax: "",
        amount: "",
      });
    },

    // savePurchase() {
    //   this.$v.$touch();
    //   if (!this.$v.$invalid) {
    //     this.$store.commit("set_loader");
    //     let formData = new FormData();
    //     formData.append("name", this.form.name);
    //     const config = {
    //       headers: { "Content-Type": "multipart/form-data" },
    //     };
    //     // let data = this.form;
    //     PurchaseService.create(formData, config)
    //       .then((res) => {
    //         if (res.status == 201) {
    //           this.displayData(res.data);
    //           this.$swal.fire({
    //             icon: "success",
    //             title: "Success",
    //             text: "Purchase Added Successfully",
    //             timer: 3600,
    //           });
    //           this.$v.$reset();
    //           this.resetForm();
    //           this.$store.commit("close_loader");
    //           if (this.saveAndExit) {
    //             this.$router.push({ path: "/catalogs/brands/index" });
    //           } else {
    //             this.$router.push({
    //               path: "/catalogs/brands/edit/" + res.data.uuid,
    //             });
    //           }
    //         }
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //         this.$store.commit("close_loader");
    //         this.$swal.fire({
    //           icon: "error",
    //           title: "Error",
    //           text: "Something Went Wrong.",
    //           timer: 3600,
    //         });
    //       });
    //   }
    // },
    // updatePurchase() {
    //   this.$v.$touch();
    //   if (!this.$v.$invalid) {
    //     this.$store.commit("set_loader");
    //     let formData = new FormData();
    //     formData.append("name", this.form.name);
    //     formData.append("status", this.form.status);
    //     formData.append("image", this.form.image);
    //     formData.append("parent_id", this.form.parent_id);
    //     formData.append("_method", "PATCH");
    //     const config = {
    //       headers: { "Content-Type": "multipart/form-data" },
    //     };
    //     PurchaseService.update(this.form.id, formData, config)
    //       .then((res) => {
    //         if (res.status == 200) {
    //           this.displayData(res.data);
    //           this.$swal.fire({
    //             icon: "success",
    //             title: "Success",
    //             text: "Purchase Updated Successfully",
    //             timer: 3600,
    //           });
    //           this.$v.$reset();
    //           this.$store.commit("close_loader");
    //           if (this.saveAndExit) {
    //             this.$router.push({ path: "/catalogs/brands/index" });
    //           }
    //           //  else {
    //           //   this.$router.push({
    //           //     path: "/catalogs/brands/edit/" + res.data.uuid,
    //           //   });
    //           // }
    //         }
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //         this.$store.commit("close_loader");
    //         this.$swal.fire({
    //           icon: "error",
    //           title: "Error",
    //           text: "Something Went Wrong.",
    //           timer: 3600,
    //         });
    //       });
    //   }
    // },
    // getPurchase() {
    //   this.$store.commit("set_loader");
    //   PurchaseService.get(this.form.id)
    //     .then(({ data }) => {
    //       this.displayData(data);
    //       this.$store.commit("close_loader");
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       this.$store.commit("close_loader");
    //       this.isEditing = false;
    //       this.$router.push({ path: "/catalogs/brands/index" });
    //     });
    // },
    // displayData(data = null) {
    //   if (data != null && data != "") {
    //     this.resetForm();
    //     this.isEditing = true;
    //     this.form.id = data.uuid;
    //     this.form.name = data.name;
    //     if (data.parent_id !== "" && data.parent_id !== null) {
    //       this.form.parent_id = data.parent_id ?? "";
    //     }
    //     this.form.status = data.status;
    //     this.display_images = data.image ?? "";
    //     this.form.image = "";
    //   }
    // },
    // resetForm() {
    //   for (let index in this.form) {
    //     this.form[index] = "";
    //   }
    //   this.isEditing = false;
    // },
  },
};
</script>
<style scoped>
.ra {
  align-items: baseline;
}
</style>
