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
                        (
                          parseInt(form.qty) * parseInt(product.selling_price) +
                          parseInt(product.discount)
                        ).toFixed(3)
                      }}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div class="d-flex">
                <div class="form-check m-1">
                  <input
                    class="form-check-input"
                    type="radio"
                    value="exchange"
                    v-model="exchange_return"
                    id="exchange"
                    name="return_type"
                    @change="changeReplacement()"
                  />
                  <label class="form-check-label" for="exchange"> Replacement </label>
                </div>

                <!-- <div class="form-check m-1">
                  <input
                    class="form-check-input"
                    type="radio"
                    value="damage"
                    v-model="exchange_return"
                    id="damage"
                    name="return_type"
                    @change="changeDamage()"
                  />
                  <label class="form-check-label" for="damage"> Damage </label>
                </div> -->
                <div class="form-check m-1">
                  <input
                    class="form-check-input"
                    type="radio"
                    value="return_cash"
                    @change="changeReturnCash()"
                    name="return_type"
                    id="return_cash"
                  />
                  <label class="form-check-label" for="return_cash"> Return Cash </label>
                </div>
              </div>
              <!-- <ProductSearchSelect
                v-if="showReplacement"
                @product-change="productSelected($event)"
                class="mb-2"
              /> -->

              <CInput
                v-if="showCash"
                class="col-md-4"
                readonly
                v-model="form.total_price"
              />
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
// import ProductSearchSelect from "@/components/general/search/ProductSearchSelect";
import ReturnByProductService from "@/services/returns/ReturnByProductService";
export default {
  name: "CreateOrUpdateReturnByInvoice",
  components: {
    Loader,
    // ProductSearchSelect,
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
    exchange_return: "",
    form: {
      id: "",
      qty: 1,
      return_note: "",
      unit_price: 0,
      total_price: 0,
      return_cash: 0,
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
      // alert("saveReturnByInvoice");

      ReturnByProductService.create(this.form)
        .then((res) => {
          if (res.status === 201) {
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Return Added Successfully",
              timer: 3600,
            });
            // this.$v.$reset();
            // this.resetForm();
          }
        })
        .catch((error) => {
          this.isEditing = false;
          if (error.response && error.response.status === 422) {
            let errors = error.response.data.errors;
            for (const err in errors) {
              this.$toast.error(errors[err][0]);
            }
          } else {
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: "Something Went Wrong.",
              timer: 3600,
            });
          }
        });
    },
    changeReplacement() {
      // this.showReplacement = true;
      this.$emit("replacement-change", true);
      this.showCash = false;
    },
    changeDamage() {
      this.$emit("replacement-change", false);
      this.$store.commit("set_return_by_invoice_model", false);
      this.showReplacement = false;
      this.$router.push({ path: "/catalogs/damages/create" });
    },
    changeReturnCash() {
      this.$emit("replacement-change", false);
      this.showCash = true;
      this.showReplacement = false;
    },
    // productSelected(val) {
    //   console.log(val);
    // },
    updateQty() {
      this.form.total_price =
        parseFloat(this.form.qty) * parseFloat(this.product.selling_price) +
        parseFloat(this.product.discount).toFixed(3);
    },
  },
};
</script>
