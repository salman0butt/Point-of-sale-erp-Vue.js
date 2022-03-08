<template>
  <div>
    <CRow>
      <Loader />
      <CCol xs="12" lg="12">
        <form @submit.prevent="saveReturnByProduct()">
          <CRow>
            <CCol sm="12" md="12" class="pt-2">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Product Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Unit Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{ product.name }}</td>
                    <td>
                      <CInput type="number" style="max-width: 100px" v-model="form.qty" />
                    </td>
                    <td>
                      {{
                        product.price
                          ? parseInt(product.price.cost_price) * parseInt(form.qty)
                          : 0
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
                    name="exampleRadios"
                    id="exchange"
                    value="exchange"
                  />
                  <label class="form-check-label" for="exchange"> Exchange </label>
                </div>
                <div class="form-check m-1">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="damage"
                    value="damage"
                  />
                  <label class="form-check-label" for="damage"> Damage </label>
                </div>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="6" md="6" class="pt-2">
              <CInput placeholder="i.e Expiry Date" v-model="form.expiry" />
            </CCol>
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
// import ReturnByProductService from "@/services/catalogs/ReturnByProducts/ReturnByProductService";
// import { required } from "vuelidate/lib/validators";
import { cilTrash } from "@coreui/icons-pro";
import Loader from "@/components/layouts/Loader.vue";

export default {
  name: "CreateOrUpdateReturnByProduct",
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
    form: {
      id: "",
      qty: 1,
      expiry: "",
      return_note: "",
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
    //   this.getReturnByProduct();
    // }
  },
  watch: {
    submitForm() {
      // this.$v.$touch();
      if (this.submit) {
        this.saveReturnByProduct();
        this.$emit("reset-model");
      } else {
        this.$emit("reset-submit");
      }
    },
  },
  computed: {
    submitForm() {
      return this.submit;
    },
  },
  methods: {
    saveReturnByProduct() {
      alert("Return Saved");
    },
  },
};
</script>
