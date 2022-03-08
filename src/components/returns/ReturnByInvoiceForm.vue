<template>
  <div>
    <CRow>
      <Loader />
      <CCol xs="12" lg="12">
        <form @submit.prevent="saveReturnByInvoice()">
          <CRow>
            <CCol sm="12" md="12" class="pt-2">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Product Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Unit Price</th>
                    <th scope="col">Discount</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{ product.product.name.en }}</td>
                    <td>
                      <CInput
                        type="number"
                        style="max-width: 100px"
                        min="1"
                        v-model="form.qty"
                        :value="product.qty"
                        @change="updateQty()"
                      />
                    </td>
                    <td>{{ product.selling_price }}</td>
                    <td>{{ product.discount }}</td>
                    <td>
                      {{
                        parseInt(form.qty) * parseInt(product.selling_price) +
                        parseInt(product.discount)
                      }}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div class="form-check m-1">
                <input
                  class="form-check-input"
                  type="radio"
                  id="product_replacement"
                  value="replacement"
                  name="some-radios"
                  @change="changeReplacement()"
                  checked
                />
                <label class="form-check-label" for="product_replacement">
                  Product Replacement
                </label>
              </div>
              <div v-if="showReplacement">
                <div class="d-flex">
                  <div class="form-check m-1">
                    <input
                      class="form-check-input"
                      type="radio"
                      value="exchange"
                      v-model="exchange"
                      id="exchange"
                    />
                    <label class="form-check-label" for="exchange"> Exchange </label>
                  </div>
                  <div class="form-check m-1">
                    <input
                      class="form-check-input"
                      type="radio"
                      value="damage"
                      v-model="exchange_return"
                      id="damage"
                    />
                    <label class="form-check-label" for="damage"> Damage </label>
                  </div>
                </div>

                <CInput
                  class="col-md-4"
                  placeholder="i.e Expiry Date"
                  v-model="form.expiry"
                />
              </div>
              <div class="form-check m-1">
                <input
                  class="form-check-input"
                  type="radio"
                  value="return_cash"
                  @change="changeReturnCash()"
                  name="some-radios"
                  id="return_cash"
                />
                <label class="form-check-label" for="return_cash"> Return Cash </label>
              </div>
              <CInput v-if="showCash" class="col-md-4" readonly v-model="form.total" />
              <div class="form-check m-1">
                <input
                  class="form-check-input"
                  type="radio"
                  name="some-radios"
                  value="voucher"
                  id="voucher"
                  @change="changeVoucher()"
                />
                <label class="form-check-label" for="voucher"> Return Voucher </label>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="12" md="12" class="pt-2">
              <CTextarea
                label="Return Note"
                placeholder="content.."
                v-model="form.return_note"
              />
            </CCol>
          </CRow>
        </form>
      </CCol>
    </CRow>
  </div>
</template>
<script>
// import ReturnByInvoiceService from "@/services/catalogs/ReturnByInvoices/ReturnByInvoiceService";
// import { required } from "vuelidate/lib/validators";
import { cilTrash } from "@coreui/icons-pro";
import Loader from "@/components/layouts/Loader.vue";

export default {
  name: "CreateOrUpdateReturnByInvoice",
  components: {
    Loader,
  },
  props: {
    submit: {
      type: Boolean,
      default: false,
    },
    product: {
      type: Object,
      default: () => {},
    },
  },
  cilTrash,
  data: () => ({
    isEditing: false,
    showCash: false,
    showReplacement: false,
    form: {
      id: "",
      qty: 1,
      expiry: "",
      return_note: "",
      total: 0,
    },
  }),
  // validations() {
  //   return {
  //     form: {
  //       name: { required },
  //     },
  //   };
  // },
  created() {
    this.form.id = this.$route.params.id;
    // if (this.form.id !== "" && this.form.id !== undefined) {
    //   this.isEditing = true;
    //   this.getReturnByInvoice();
    // }
  },
  watch: {
    submitForm() {
      // this.$v.$touch();
      if (this.submit) {
        this.saveReturnByInvoice();
        this.$emit("reset-model");
      } else {
        this.$emit("reset-submit");
      }
    },
    product() {
      this.updateQty();
    },
  },
  computed: {
    submitForm() {
      return this.submit;
    },
  },
  methods: {
    saveReturnByInvoice() {
      alert("Return Saved");
    },
    changeReplacement() {
      this.showReplacement = true;
      this.showCash = false;
    },
    changeReturnCash() {
      this.showReplacement = false;
      this.showCash = true;
    },
    changeVoucher() {
      this.showReplacement = false;
      this.showCash = false;
    },
    updateQty() {
      this.form.total =
        parseInt(this.form.qty) * parseInt(this.product.selling_price) +
        parseInt(this.product.discount);
    },
  },
};
</script>
