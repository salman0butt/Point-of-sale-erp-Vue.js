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
                <form
                  @submit.prevent="
                    isEditing ? updatePurchase() : savePurchase()
                  "
                >
                  <CRow>
                    <CCol xs="6" md="4" class="pt-2">
                      <CSelect
                        label="Supplier"
                        :options="options.suppliers"
                        :value.sync="form.supplier_id"
                        :class="{ error: $v.form.supplier_id.$error }"
                        @input="$v.form.supplier_id.$touch()"
                      />
                      <div v-if="$v.form.supplier_id.$error">
                        <p
                          v-if="!$v.form.supplier_id.required"
                          class="errorMsg"
                        >
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
                        :value.sync="form.branch_id"
                        :class="{ error: $v.form.branch_id.$error }"
                        @input="$v.form.branch_id.$touch()"
                      />
                      <div v-if="$v.form.branch_id.$error">
                        <p v-if="!$v.form.branch_id.required" class="errorMsg">
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
                        :value.sync="form.customer_id"
                        :class="{ error: $v.form.customer_id.$error }"
                        @input="$v.form.customer_id.$touch()"
                      />
                      <div v-if="$v.form.customer_id.$error">
                        <p
                          v-if="!$v.form.customer_id.required"
                          class="errorMsg"
                        >
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
                        <p v-if="!$v.form.po.required" class="errorMsg">
                          PO is required
                        </p>
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
                        :class="{
                          error: $v.form.expected_delivery_date.$error,
                        }"
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
                        <p
                          v-if="!$v.form.payment_terms.required"
                          class="errorMsg"
                        >
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
                        <p
                          v-if="!$v.form.shipment_preference.required"
                          class="errorMsg"
                        >
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
                        <tbody v-if="form.items && form.items.length > 0">
                          <tr v-for="(item, k) in form.items" :key="k">
                            <th style="position: relative">
                              <CInput
                                placeholder="Products"
                                v-model="item.name"
                                @input="searchProduct(k)"
                                required
                              /><br />
                              <ul
                                v-if="
                                  item.options.products &&
                                  item.options.products.length > 0
                                "
                                class="search-content"
                              >
                                <li
                                  v-for="(i, key) in item.options.products"
                                  :key="key"
                                  @click="addOptions(i, k)"
                                >
                                  {{ i.label }}
                                </li>
                              </ul>
                            </th>
                            <td>
                              <CSelect
                                :options="options.accounts"
                                :value.sync="item.account"
                                required
                              />
                            </td>
                            <td>
                              <CInput
                                type="number"
                                placeholder="0"
                                v-model="item.qty"
                                min="1"
                                step="any"
                                style="width: 100px"
                                required
                                @change="calculateAmount(k)"
                              />
                            </td>
                            <td>
                              <CInput
                                type="number"
                                placeholder="0.00"
                                v-model="item.rate"
                                step="any"
                                style="width: 100px"
                                required
                                @change="calculateAmount(k)"
                              />
                            </td>
                            <td>
                              <CSelect
                                :options="options.taxes"
                                :value.sync="item.tax"
                                @change="calculateAmount(k)"
                              />
                            </td>
                            <td>
                              <CInput
                                type="number"
                                placeholder="0.00"
                                v-model="item.amount"
                                step="any"
                                style="width: 100px"
                                required
                                @change="calculateTotalAmount()"
                              />
                            </td>
                            <td>
                              <CButton @click="removeItem(k)">
                                <CIcon
                                  :content="$options.cilTrash"
                                  style="color: red"
                                />
                              </CButton>
                            </td>
                          </tr>
                        </tbody>
                        <tfoot v-else>
                          <tr>
                            <td colspan="7">
                              <p class="text-center">No items added</p>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                      <CRow>
                        <CCol xs="12" md="6" class="pt-2">
                          <CButton
                            progress
                            timeout="2000"
                            color="default"
                            @click="addItem()"
                            >Add another line
                            <CIcon
                              :content="$options.cisCaretBottom"
                              style="width: 10px"
                          /></CButton>
                          <CTextarea
                            class="mt-4"
                            label="Customer Notes"
                            placeholder="Will be displayed on purchase order"
                            v-model="form.customer_notes"
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
                          <label for="attachment"
                            >Attach File(s) to Purchase Order</label
                          >
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
                            v-if="
                              displayAttachment && displayAttachment.length > 0
                            "
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
                                  @click.prevent="
                                    deleteAttachment(attachment.uuid)
                                  "
                                  class="delete-attachment"
                                >
                                  <CIcon :content="$options.cilTrash" />
                                </a>
                              </li>
                            </ul>
                          </div>
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

export default {
  name: "CreateOrUpdatePurchase",
  mixins: [attachmentMixin, globalMixin],
  components: {
    Loader,
  },
  cilTrash,
  cisCaretBottom,
  cisFile,
  data: () => ({
    // unit_form: [],
    pro_unit: false,
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
      expected_delivery_date: "",
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
      taxes: [{ value: "", label: "Choose Tax" }],
      suppliers: [
        { value: "", label: "Choose Supplier", disabled: true, selected: "" },
      ],
      deliver_to: [
        { value: "", label: "Choose Deliver To", disabled: true, selected: "" },
        { value: "organization", label: "Organization" },
        { value: "customer", label: "Customer" },
      ],
      branches: [
        { value: "", label: "Choose Branch", disabled: true, selected: "" },
      ],
      customers: [
        { value: "", label: "Choose Customer", disabled: true, selected: "" },
      ],
      payment_terms: [
        {
          value: "",
          label: "Choose Payment Term",
          disabled: true,
          selected: "",
        },
        { value: "1", label: "Payment Term 1" },
        { value: "2", label: "Payment Term 2" },
        { value: "3", label: "Payment Term 3" },
      ],
      accounts: [
        {
          value: "",
          label: "Choose Account",
          disabled: true,
          selected: "",
        },
      ],
    },
  }),
  validations() {
    if (this.form.deliver_to === "organization") {
      return {
        form: {
          date: { required },
          po: { required },
          ref: { required },
          deliver_to: { required },
          supplier_id: { required },
          branch_id: { required },
          subTotal: { required },
          total: { required },
          shipment_preference: { required },
          expected_delivery_date: { required },
          payment_terms: { required },
          items: { required },
        },
      };
    } else {
      return {
        form: {
          date: { required },
          po: { required },
          ref: { required },
          deliver_to: { required },
          supplier_id: { required },
          customer_id: { required },
          subTotal: { required },
          total: { required },
          shipment_preference: { required },
          expected_delivery_date: { required },
          payment_terms: { required },
          items: { required },
        },
      };
    }
  },
  async created() {
    this.form.date = this.calculateTodayDate();
    await this.getAccounts();
    await this.getAllSuppliers();
    await this.getAllBranches();
    await this.getAllCustomers();
    await this.getTaxes();
    this.form.id = this.$route.params.id;
    if (this.form.id) {
      await this.getPurchaseOrder();
    }
  },
  computed: {
    taxData() {
      return this.options.taxes;
    },
  },
  methods: {
    addItem() {
      this.form.items.push({
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
      });
    },
    removeItem(index) {
      this.form.items.splice(index, 1);
      this.calculateTotalAmount();
    },
    getAccounts() {
      AccountServices.getActiveAccounts("active")
        .then(({ data }) => {
          let account = this.options.accounts;
          data.map(function (val) {
            account.push({
              value: val.uuid,
              label: val.name,
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    searchProduct(k) {
      if (!this.form.items[k].name) {
        this.resetSearch();
        return;
      }
      this.products_list = [];
      this.unit_form = [];
      ReceivingService.searchProduct(this.form.items[k].name)
        .then(({ data }) => {
          if (data !== undefined && data !== "") {
            this.form.items[k].options.products = [];
            data.map((product) => {
              if (product) {
                if (
                  product.quantity_units &&
                  product.quantity_units.length > 0
                ) {
                  product.quantity_units.map((unit) => {
                    if (product.variations && product.variations.length > 0) {
                      this.form.items[k].options.products.push({
                        value: product.uuid,
                        type: "variation",
                        label: `${product.name} (Unit: ${unit.name} | Qty: ${unit.qty})`,
                        is_unit: true,
                        unit_id: unit.uuid,
                        unit_qty: unit.qty ?? 1,
                        unit_cost_price: unit.price?.cost_price,
                        unit_selling_price:
                          unit.price?.selling_price_without_tax,
                      });
                    } else {
                      this.form.items[k].options.products.push({
                        value: product.uuid,
                        type: "product",
                        label: `${product.name} (Unit: ${unit.name} | Qty: ${unit.qty})`,
                        is_unit: true,
                        unit_id: unit.uuid,
                        unit_qty: unit.qty ?? 1,
                        unit_cost_price: unit.price?.cost_price,
                        unit_selling_price:
                          unit.price?.selling_price_without_tax,
                      });
                    }
                  });
                }
                if (product.variations && product.variations.length > 0) {
                  product.variations.map((variation) => {
                    this.form.items[k].options.products.push({
                      value: variation.uuid,
                      type: "variation",
                      label: `${product.name} (Variation: ${
                        JSON.parse(variation.name)?.en
                      } | Stock:  ${
                        variation.inventory && variation.inventory.length
                          ? variation.inventory[0]?.current_quantity
                          : 0
                      })`,
                    });
                  });
                } else {
                  this.form.items[k].options.products.push({
                    value: product.uuid,
                    type: "product",
                    label: `${product.name} (Stock:  ${
                      product.inventory && product.inventory.length
                        ? product.inventory[0]?.current_quantity
                        : 0
                    })`,
                  });
                }

                this.products_list.push({ ...product });
              }
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addOptions(item, k) {
      this.form.product_id = item.value;
      // this.unit_form = [];
      let option = item;
      if (
        !["", undefined].includes(option.is_unit) &&
        !["", undefined].includes(option.unit_id)
      ) {
        if (this.products_list && this.products_list.length > 0) {
          this.products_list.find((product) => {
            if (option.type === "product") {
              this.pro_unit = true;
              this.addProduct(option);
            }
            // else if (option.type === "variation") {
            //   if (product.uuid === this.form.product_id) {
            //     let parts = product.variations.length;
            //     let num = option.unit_qty;
            //     let half_qty = [...Array(parts)].map(
            //       (_, i) => 0 | (num / parts + (i < num % parts))
            //     );
            //     product.variations.find((variation, index) => {
            //       this.unit_form.push({
            //         uuid: variation.uuid,
            //         type: "variation",
            //         name: `${JSON.parse(variation.name)?.en}`,
            //         qty: half_qty[index] ?? 1,
            //         rate: option.unit_cost_price,
            //         account: "",
            //         tax: "",
            //         amount: "",
            //       });
            //     });
            //   }
            // }
          });
          // if (option.type === "variation") {
          //   this.toggleModel = true;
          // }
        }
      } else {
        if (option.type === "product") {
          this.addProduct({}, k);
        }
        // else if (option.type === "variation") {
        //   this.addProductVariation();
        // }
      }
    },
    // saveQuantityUnits() {
    //   this.toggleModel = false;
    //   this.addUnitVariation();
    // },
    // addUnitVariation() {
    //   if (
    //     this.unit_form &&
    //     this.unit_form.length > 0 &&
    //     this.form.product_id !== "" &&
    //     this.form.product_id !== undefined
    //   ) {
    //     this.products_list.map((product) => {
    //       product.variations.map((variation) => {
    //         if (this.unit_form.some((item) => item.uuid === variation.uuid)) {
    //           if (
    //             this.form.items.length > 0 &&
    //             this.form.items.some((item) => item.uuid === variation.uuid)
    //           ) {
    //             this.form.items.map((item, key) => {
    //               if (item.uuid === variation.uuid) {
    //                 let unit = this.unit_form.find(
    //                   (item) => item.uuid === variation.uuid
    //                 );
    //                 this.form.items[key].qty =
    //                   parseFloat(this.form.items[key].qty) + unit?.qty ?? 1;
    //                 unit?.qty ?? 1;
    //                 this.form.items[key].rate = unit?.cost_price ?? 0;
    //               }
    //             });
    //           } else {
    //             let unit = this.unit_form.find((item) => item.uuid === variation.uuid);
    //             this.form.items.push({
    //               uuid: variation.uuid,
    //               type: "variation",
    //               name: `${product.name} (Variation: ${JSON.parse(variation.name)?.en})`,
    //               account: "",
    //               rate: unit?.cost_price ?? 0,
    //               tax: "",
    //               qty: unit?.qty ?? 1,
    //               amount: "",
    //             });
    //           }
    //         }
    //       });
    //     });
    //     this.resetSearch();
    //     // this.$store.commit("set_search_product_items", this.form.items);
    //   }
    // },
    addProduct(option = {}, k = null) {
      if (this.form.product_id !== "" && this.form.product_id !== undefined) {
        let product = this.products_list.find(
          (product) => product.uuid === this.form.product_id
        );

        if (Object.keys(option).length === 0 && option.constructor === Object) {
          Object.assign(option, { unit_qty: 1 });
          if (product.price) {
            Object.assign(option, {
              unit_cost_price: product.price.cost_price,
            });
            Object.assign(option, {
              unit_selling_price: product.price.selling_price_without_tax,
            });
            Object.assign(option, {
              tax_price:
                parseFloat(product.price.selling_price_without_tax) *
                (parseFloat(product.price.tax.percentage) / 100),
            });
          }
        }

        // if (
        //   product.uuid === this.form.product_id &&
        //   this.form.items &&
        //   this.form.items.length > 0 &&
        //   this.form.items.some((item) => item.uuid === product.uuid)
        // ) {
        //   if (this.pro_unit) {
        //     this.form.items.map((item, key) => {
        //       if (item.uuid === product.uuid) {
        //         this.form.items[key].qty =
        //           parseFloat(this.form.items[key].qty) + option.unit_qty;
        //         this.form.items[key].rate = option.cost_price;
        //       }
        //     });
        //   } else {
        //     this.form.items.map((item, key) => {
        //       if (item.uuid === product.uuid) {
        //         this.form.items[key].qty =
        //           parseFloat(this.form.items[key].qty) + option.unit_qty;
        //       }
        //     });
        //   }
        // } else {
        if (k !== null) {
          let item = this.form.items[k];
          // item.options.tax = [{ value: "", label: "Choose Tax" }];
          item.uuid = product.uuid;
          // item.type = "product";
          item.name = product.name;
          item.account = "";
          item.rate = option.unit_cost_price;
          // if (product.price && product.price.tax) {
          //   item.options.tax.push({
          //     // uuid: product.price.tax.uuid,
          //     label: product.price.tax.name,
          //     percentage: product.price.tax.percentage,
          //     value: product.price.tax.uuid,
          //   });
          // }
          item.qty = option.unit_qty;
          item.amount = "";
        }

        // this.form.items.push({
        //   uuid: product.uuid,
        //   type: "product",
        //   name: product.name,
        //   account: "",
        //   rate: option.unit_cost_price ?? 0,
        //   qty: option.unit_qty,
        //   tax: "",
        //   amount: "",
        // });
        // }
        this.calculateAmount(k);
        this.resetSearch();
        // this.$store.commit("set_search_product_items", this.form.items);
      }
    },
    // addProductVariation() {
    //   let data = [];
    //   if (this.form.product_id !== "" && this.form.product_id !== undefined) {
    //     this.products_list.find((product) => {
    //       return product.variations.find((variation) => {
    //         if (variation.uuid === this.form.product_id) {
    //           data.push({
    //             uuid: variation.uuid,
    //             type: "variation",
    //             name: `${product.name} (Variation: ${JSON.parse(variation.name)?.en})`,
    //             account: "",
    //             rate: variation.price?.cost_price ?? 0,
    //             qty: 1,
    //             tax: "",
    //             amount: "",
    //           });
    //         }
    //       });
    //     });

    //     if (
    //       data[0].uuid === this.form.product_id &&
    //       this.form.items.length > 0 &&
    //       this.form.items.some((item) => item.uuid === data[0].uuid)
    //     ) {
    //       this.form.items.map((item, key) => {
    //         if (item.uuid === data[0].uuid) {
    //           this.form.items[key].qty = parseFloat(this.form.items[key].qty) + 1;
    //         }
    //       });
    //     } else {
    //       this.form.items.push(data[0]);
    //     }
    //     this.resetSearch();
    //     // this.$store.commit("set_search_product_items", this.form.items);
    //   }
    // },
    calculateAllItems() {
      this.form.items.map((item, key) => {
        this.calculateAmount(key);
      });
    },
    calculateAmount(k) {
      let amount = 0;
      if (this.form.items[k].qty && this.form.items[k].rate) {
        amount =
          parseFloat(this.form.items[k].qty) *
          parseFloat(this.form.items[k].rate);
        // calculate tax
        if (this.form.items[k].tax) {
          let tax = this.options.taxes.find(
            (tax) => tax.value === this.form.items[k].tax
          );
          if (tax) {
            amount = amount + amount * (parseFloat(tax.percentage) / 100);
          }
        }
        this.form.items[k].amount = amount;
      }
      this.calculateTotalAmount();
    },
    calculateTotalAmount() {
      let sub_total = 0;
      let discount = 0;
      let total = 0;
      this.form.items.map((item) => {
        sub_total = sub_total + parseFloat(item.amount);
      });
      this.form.subTotal = sub_total.toFixed(2);
      if (this.form.discount) {
        let isPercentage = /%/gi;
        if (isPercentage.test(this.form.discount)) {
          discount = parseFloat(this.form.discount);
          this.form.discount_val = (
            (sub_total * parseFloat(discount)) /
            100
          ).toFixed(2);
          total = (sub_total - this.form.discount_val).toFixed(2);
        } else {
          total = sub_total - parseFloat(this.form.discount);
          this.form.discount_val = parseFloat(this.form.discount);
        }
      } else {
        total = sub_total.toFixed(2);
      }
      this.form.total = total;
    },

    resetSearch() {
      this.form.product_id = "";
      // this.search = "";
      this.form.items.map((item) => {
        item.options.products = [];
      });
      // this.options.products = [];
    },
    getAllSuppliers() {
      this.$store.commit("set_loader");
      PurchaseService.getAllSuppliers()
        .then((res) => {
          if (res.status === 200) {
            const { data } = res.data;
            if (data) {
              data.map((supplier) => {
                this.options.suppliers.push({
                  value: supplier.uuid,
                  label: supplier.name,
                });
              });
            }

            this.$store.commit("close_loader");
          }
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("close_loader");
        });
    },
    getAllBranches() {
      this.$store.commit("set_loader");
      PurchaseService.getAllBranches()
        .then((res) => {
          if (res.status === 200) {
            const { data } = res;
            if (data) {
              data.map((branch) => {
                this.options.branches.push({
                  value: branch.uuid,
                  label: branch.name,
                });
              });
            }

            this.$store.commit("close_loader");
          }
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("close_loader");
        });
    },
    getAllCustomers() {
      this.$store.commit("set_loader");
      PurchaseService.getAllCustomers()
        .then((res) => {
          if (res.status === 200) {
            const { data } = res;
            if (data) {
              data.map((customer) => {
                this.options.customers.push({
                  value: customer.uuid,
                  label: customer.full_name,
                });
              });
            }

            this.$store.commit("close_loader");
          }
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("close_loader");
        });
    },
    savePurchase() {
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

    updatePurchase() {
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
      formData.append(
        "expected_delivery_date",
        this.form.expected_delivery_date
      );
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
        this.form.expected_delivery_date = data.expected_delivery_date;
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
    getTaxes() {
      this.$store.commit("set_loader");
      PurchaseService.getAllTaxes()
        .then(({ data }) => {
          if (data && data.data) {
            let taxes = this.options.taxes;
            data.data.forEach((tax) => {
              taxes.push({
                value: tax.uuid,
                label: tax.name,
                percentage: tax.percentage,
              });
            });

            this.$store.commit("close_loader");
          }
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("close_loader");
        });
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
