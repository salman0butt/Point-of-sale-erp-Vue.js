<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form @submit.prevent="isEditing ? updateReceiving() : saveReceiving()">
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Supplier"
                :options="options.suppliers"
                :value.sync="form.supplier_id"
                :class="{ error: $v.form.supplier_id.$error }"
                @input="$v.form.supplier_id.$touch()"
              />
              <div v-if="$v.form.supplier_id.$error">
                <p v-if="!$v.form.supplier_id.required" class="errorMsg">
                  Supplier is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Date"
                type="date"
                v-model="form.date"
                :class="{ error: $v.form.date.$error }"
                @input="$v.form.date.$touch()"
              />
              <div v-if="$v.form.date.$error">
                <p v-if="!$v.form.date.required" class="errorMsg">Date is required</p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Receiving Status"
                :options="options.receiving_status"
                :value.sync="form.receiving_status"
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="12" md="12" class="pt-2">
              <CSelect
                label="Products"
                :options="options.products"
                :value.sync="form.product_id"
                @change="addOptions()"
              />
            </CCol>
          </CRow>
          <hr v-if="form.items && form.items.length > 0" />
          <CRow v-if="form.items && form.items.length > 0">
            <CCol sm="12" md="12" class="pt-2">
              <div class="form-group" v-for="(input, k) in form.items" :key="k">
                <CRow>
                  <CInput label="Product" class="col-md-3" :value.sync="input.name" />
                  <CInput
                    label="Qty"
                    class="col-md-3"
                    type="number"
                    placeholder="0"
                    min="1"
                    v-model="input.qty"
                    @input="calculateTotal()"
                  />
                  <CInput
                    label="Cost Price"
                    class="col-md-3"
                    type="number"
                    placeholder="0.00"
                    v-model="input.cost_price"
                    @input="calculateTotal()"
                  />
                  <CInput
                    label="Selling Price"
                    class="col-md-3"
                    type="number"
                    placeholder="0.00"
                    :value.sync="input.selling_price"
                  />
                </CRow>
              </div>
            </CCol>
          </CRow>
          <hr v-if="form.items && form.items.length > 0" />
          <CRow>
            <CCol sm="12" md="12" class="pt-2">
              <CInput
                label="Total Cost"
                type="number"
                v-model="form.total_cost"
                :class="{ error: $v.form.total_cost.$error }"
                @input="$v.form.total_cost.$touch()"
              />
              <div v-if="$v.form.total_cost.$error">
                <p v-if="!$v.form.total_cost.required" class="errorMsg">
                  Total Cost is required
                </p>
              </div>
            </CCol>

            <CCol sm="12" md="12" class="pt-2">
              <CTextarea label="Note" placeholder="Content..." v-model="form.note" />
            </CCol>
          </CRow>
          <p v-if="$v.$anyError" class="errorMsg">Please Fill the required data</p>
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
  </div>
</template>
<script>
import ReceivingService from "@/services/receivings/ReceivingService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "ReceivingForm",
  data: () => ({
    isEditing: false,
    saveAndExit: false,
    form: {
      id: "",
      supplier_id: "",
      date: "",
      note: "",
      total_cost: "",
      receiving_status: "",
      items: [],
      product_id: "",
    },
    products_list: [],
    options: {
      suppliers: [{ value: "", label: "Choose Supplier", disabled: true, selected: "" }],
      receiving_status: [
        { value: "", label: "Choose receiving Status", disabled: true, selected: "" },
        { value: "pending", label: "Pending" },
        { value: "completed", label: "Completed" },
      ],
      products: [{ value: "", label: "Choose Product", disabled: true, selected: "" }],
    },
  }),
  validations() {
    return {
      form: {
        supplier_id: { required },
        date: { required },
        total_cost: { required },
      },
    };
  },
  created() {
    this.form.id = this.$route.params.id;
    this.getAllSuppliers();
    this.getAllProducts();
    if (this.form.id !== "" && this.form.id !== undefined) {
      this.isEditing = true;
      this.getReceiving();
    }
  },
  methods: {
    getAllSuppliers() {
      ReceivingService.getAllSuppliers()
        .then(({ data }) => {
          if (data !== undefined && data !== "") {
            data.data.map((supplier) => {
              this.options.suppliers.push({
                value: supplier.uuid,
                label: supplier.name,
              });
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getAllProducts() {
      ReceivingService.getAllProducts()
        .then(({ data }) => {
          if (data !== undefined && data !== "") {
            data.map((product) => {
              this.options.products.push({
                value: product.uuid,
                type: "product",
                label: product.name,
              });
              if (product.variations && product.variations.length > 0) {
                product.variations.map((variation) => {
                  this.options.products.push({
                    value: variation.uuid,
                    type: "variation",
                    label: product.name + " (" + JSON.parse(variation.name).en + ")",
                  });
                });
              }
              this.products_list.push({ ...product });
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    calculateTotal() {
      let total = 0;
      this.form.items.map((item) => {
        total += parseInt(item.qty) * parseInt(item.cost_price);
      });

      this.form.total_cost = parseInt(total);
    },
    addOptions() {
      let option = this.options.products.find(
        (product) => product.value === this.form.product_id
      );
      if (option.type === "product") {
        this.addProduct();
      } else if (option.type === "variation") {
        this.addProductVariation();
      }
      this.calculateTotal();
    },
    addProduct() {
      if (this.form.product_id !== "" && this.form.product_id !== undefined) {
        let product = this.products_list.find(
          (product) => product.uuid === this.form.product_id
        );
        if (
          product.uuid === this.form.product_id &&
          this.form.items.length > 0 &&
          this.form.items.some((item) => item.uuid === product.uuid)
        ) {
          this.form.items.map((item, key) => {
            if (item.uuid === product.uuid) {
              this.form.items[key].qty = parseInt(this.form.items[key].qty) + 1;
            }
          });
        } else {
          this.form.items.push({
            uuid: product.uuid,
            type: "product",
            name: product.name,
            cost_price: product.price.cost_price,
            selling_price: product.price.selling_price,
            qty: 1,
          });
        }
        this.form.product_id = "";
      }
    },
    addProductVariation() {
      let data = [];
      if (this.form.product_id !== "" && this.form.product_id !== undefined) {
        this.products_list.find((product) => {
          return product.variations.find((variation) => {
            if (variation.uuid === this.form.product_id) {
              data.push({
                uuid: variation.uuid,
                type: "variation",
                name: product.name + " (" + JSON.parse(variation.name).en + ")",
                cost_price: variation.price.cost_price,
                selling_price: variation.price.selling_price,
                qty: 1,
              });
              return variation;
            }
          });
        });

        if (
          data[0].uuid === this.form.product_id &&
          this.form.items.length > 0 &&
          this.form.items.some((item) => item.uuid === data[0].uuid)
        ) {
          this.form.items.map((item, key) => {
            if (item.uuid === data[0].uuid) {
              this.form.items[key].qty = parseInt(this.form.items[key].qty) + 1;
            }
          });
        } else {
          this.form.items.push(data[0]);
        }
        this.form.product_id = "";
      }
    },
    saveReceiving() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        ReceivingService.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Receiving Added Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.resetForm();

              if (this.saveAndExit) {
                this.$router.push({ path: "/receivings/index" });
              } else {
                this.$router.push({
                  path: "/receivings/edit/" + res.data.uuid,
                });
              }
            }
          })
          .catch((error) => {
            console.log(error);
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: "Something Went Wrong.",
              timer: 3600,
            });
          });
      }
    },
    updateReceiving() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        ReceivingService.update(this.form.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Receiving Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();

              if (this.saveAndExit) {
                this.$router.push({ path: "/receivings/index" });
              }
              //  else {
              //   this.$router.push({
              //     path: "/receivings/edit/" + res.data.uuid,
              //   });
              // }
            }
          })
          .catch((error) => {
            console.log(error);
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: "Something Went Wrong.",
              timer: 3600,
            });
          });
      }
    },
    getReceiving() {
      ReceivingService.get(this.form.id)
        .then(({ data }) => {
          if (data != null && data != "") {
            this.isEditing = true;
            this.form.id = data.uuid;
            this.form.supplier_id = data.supplier.uuid;
            this.form.date = data.date;
            this.form.note = data.note;
            this.form.total_cost = data.total_cost;
            this.form.receiving_status = data.receiving_status;

            if (data.items && data.items.length > 0) {
              data.items.map((item) => {
                if (item && item.product_variation && item.product_variation.uuid) {
                  this.form.items.push({
                    uuid: item.product_variation.uuid,
                    type: "variation",
                    name:
                      item.product.name +
                      " (" +
                      JSON.parse(item.product_variation.name).en +
                      ")",
                    cost_price: item.product_variation.price.cost_price,
                    selling_price: item.product_variation.price.selling_price,
                    qty: item.qty,
                  });
                } else {
                  this.form.items.push({
                    uuid: item.product.uuid,
                    type: "product",
                    name: item.product.name,
                    cost_price: item.price.cost_price,
                    selling_price: item.price.selling_price,
                    qty: item.qty,
                  });
                }
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
          this.$router.push({ path: "/receivings/index" });
        });
    },
    resetForm() {
      for (let index in this.form) {
        this.form[index] = "";
      }
      this.isEditing = false;
    },
  },
};
</script>
