<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Attributes </CCardHeader>
          <CCardBody>
            <form
              @submit.prevent="
                isEditing ? updateProductAttribute() : saveProductAttribute()
              "
            >
              <CRow>
                <CCol sm="12" md="12" class="pt-2">
                  <div class="form-group" v-for="(input, k) in form.attributes" :key="k">
                    <CRow>
                      <CInput
                        placeholder="Name"
                        class="col-md-4"
                        :value.sync="input.name"
                      />
                      <vue-tags-input
                        v-model="input.tag"
                        class="col-md-4"
                        placeholder="Values"
                        :tags="input.values"
                        @tags-changed="(newTags) => (input.values = newTags)"
                      />
                      <span class="ml-4">
                        <!-- <i
                          @click="removeAttribute(k)"
                          class="thumb"
                          v-show="k || (!k && form.attributes.length > 1)"
                        > -->
                        <i @click="removeAttribute(k)" class="thumb">
                          <CIcon :content="$options.cisMinusSquare" /> Remove</i
                        ><br />
                        <i
                          class="thumb"
                          @click="addAttribute(k)"
                          v-show="k == form.attributes.length - 1"
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
import ProductAttributeService from "@/services/products/ProductAttributeService";
import { VueTagsInput, createTag } from "@johmun/vue-tags-input";
import { cibAddthis, cisMinusSquare } from "@coreui/icons-pro";

export default {
  name: "ProductAttributeForm",
  components: { VueTagsInput },
  cibAddthis,
  cisMinusSquare,
  data: () => ({
    isEditing: false,
    form: {
      product_id: "",
      attributes: [
        {
          name: "",
          values: [],
          tag: "",
        },
      ],
    },
    productId: "",
  }),
  created() {
    this.productId = this.$route.params.id;
    this.form.product_id = this.$route.params.id;
    if (this.productId !== "" && this.productId !== undefined) {
      this.getProductAttribute();
    }
  },
  methods: {
    addAttribute() {
      this.form.attributes.push({ name: "", values: [], tag: "" });
    },
    removeAttribute(index) {
      if (
        this.form.attributes &&
        this.form.attributes.length > 0 &&
        this.form.attributes[index].uuid &&
        this.form.attributes[index].uuid !== ""
      ) {
        let uuid = this.form.attributes[index].uuid;
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
              ProductAttributeService.delete(this.deleteRows)
                .then((res) => {
                  if (res.status == 200) {
                    this.$swal.fire({
                      icon: "success",
                      title: "Success",
                      text: "Attribute Deleted Successfully",
                      timer: 3600,
                    });
                    this.form.attributes.splice(index, 1);
                    if (this.form.attributes.length == 0) {
                      this.form.attributes.push({
                        name: "",
                        serial_number: "",
                        barcode: "",
                        values: [],
                        value: "",
                      });
                    }
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
      } else {
        this.form.attributes.splice(index, 1);
      }
    },
    getProductAttribute() {
      ProductAttributeService.get(this.productId)
        .then(({ data }) => {
          if (data && data.length) {
            this.isEditing = true;
            this.form.attributes = [];
            data.forEach((element) => {
              this.form.attributes.push({
                uuid: element.uuid,
                name: element.name,
                values: element.values.map((value) => {
                  return { text: value.value, tiClasses: ["ti-valid"], uuid: value.uuid };
                }),
              });
            });
          }
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
          this.$router.push({ path: "/products" });
        });
    },
    saveProductAttribute() {
      let formData = this.form;
      ProductAttributeService.create(formData)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            if (res.data && res.data.length) {
              this.isEditing = true;
              this.form.attributes = [];
              res.data.forEach((element) => {
                this.form.attributes.push({
                  uuid: element.uuid,
                  name: element.name,
                  values: element.values.map((value) => {
                    return {
                      text: value.value,
                      tiClasses: ["ti-valid"],
                      uuid: value.uuid,
                    };
                  }),
                });
              });
            }
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Product Attribute Created Successfully",
              timer: 3600,
            });
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
    updateProductAttribute() {
      let formData = this.form;
      ProductAttributeService.update(this.productId, formData)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            if (res.data && res.data.length) {
              this.isEditing = true;
              this.form.attributes = [];
              res.data.forEach((element) => {
                this.form.attributes.push({
                  uuid: element.uuid,
                  name: element.name,
                  values: element.values.map((value) => {
                    return {
                      text: value.value,
                      tiClasses: ["ti-valid"],
                      uuid: value.uuid,
                    };
                  }),
                });
              });
            }
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Product Attribute Updated Successfully",
              timer: 3600,
            });
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
