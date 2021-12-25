<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Modifiers </CCardHeader>
          <CCardBody>
            <form
              @submit.prevent="
                isEditing ? updateProductModifier() : saveProductModifier()
              "
            >
              <CRow>
                <CCol sm="12" md="12" class="pt-2">
                  <div class="form-group" v-for="(input, k) in form.modifiers" :key="k">
                    <CRow>
                      <CInput label="Name" class="col-md-3" :value.sync="input.name" />
                      <CInput
                        label="Cost Price"
                        placeholder="0.00"
                        type="number"
                        class="col-md-3"
                        :value.sync="input.cost_price"
                      />
                      <CInput
                        label="Selling Price"
                        placeholder="0.00"
                        type="number"
                        class="col-md-3"
                        :value.sync="input.selling_price"
                      />
                      <CSelect
                        label="Status"
                        class="col-md-3"
                        :options="options.status"
                        :value.sync="input.status"
                      />
                      <span class="ml-4">
                        <i
                          @click="removeModifier(k)"
                          class="thumb"
                          v-show="k || (!k && form.modifiers.length > 1)"
                        >
                          <CIcon :content="$options.cisMinusSquare" /> Remove</i
                        ><br />
                        <i
                          class="thumb"
                          @click="addModifier(k)"
                          v-show="k == form.modifiers.length - 1"
                          ><CIcon :content="$options.cibAddthis" /> Add More</i
                        >
                      </span>
                    </CRow>
                  </div>
                </CCol>
              </CRow>

              <CRow class="mt-4 d-block">
                <CButton
                  progress
                  timeout="2000"
                  block
                  color="success"
                  style="float: right; width: 150px; margin-right: 20px"
                  type="submit"
                  >Save</CButton
                >
              </CRow>
            </form>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import ProductModifierService from "@/services/products/ProductModifierService";
import { cibAddthis, cisMinusSquare } from "@coreui/icons-pro";

export default {
  name: "ProductModifierForm",
  cibAddthis,
  cisMinusSquare,
  data: () => ({
    isEditing: false,
    form: {
      product_id: "",
      modifiers: [
        {
          name: "",
          cost_price: "",
          selling_price: "",
          status: "",
        },
      ],
    },
    productId: "",
    options: {
      status: [
        { value: "", label: "Choose Status", disabled: true, selected: "" },
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
      ],
    },
  }),
  created() {
    this.productId = this.$route.params.id;
    this.form.product_id = this.$route.params.id;
    if (this.productId !== "" && this.productId !== undefined) {
      this.getProductModifier();
    }
  },
  methods: {
    addModifier() {
      this.form.modifiers.push({
        name: "",
        cost_price: "",
        selling_price: "",
        status: "",
      });
    },
    removeModifier(index) {
      this.form.modifiers.splice(index, 1);
    },
    getProductModifier() {
      ProductModifierService.get(this.productId)
        .then(({ data }) => {
          if (data && data.length) {
            this.isEditing = true;
            this.form.modifiers = [];
            data.forEach((element) => {
              this.form.modifiers.push({
                name: element.name,
                cost_price: element.price.cost_price,
                selling_price: element.price.selling_price,
                status: element.status,
              });
            });
          }
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
          // this.$router.push({ path: "/products" });
        });
    },
    saveProductModifier() {
      let formData = this.form;
      ProductModifierService.create(formData)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Product Modifier Created Successfully",
              timer: 3600,
            });
            this.getProductModifier();
          }
        })
        .catch((error) => {
          console.log(error);
          this.$swal.fire({
            icon: "error",
            title: "Error",
            text: "Something Went wrong.",
            timer: 3600,
          });
        });
    },
    updateProductModifier() {
      let formData = this.form;
      ProductModifierService.update(this.productId, formData)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Product Modifier Updated Successfully",
              timer: 3600,
            });
            this.getProductModifier();
          }
        })
        .catch((error) => {
          console.log(error);
          this.$swal.fire({
            icon: "error",
            title: "Error",
            text: "Something went Wrong",
            timer: 3600,
          });
        });
    },
  },
};
</script>
