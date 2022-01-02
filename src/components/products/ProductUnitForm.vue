<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Units </CCardHeader>
          <CCardBody>
            <form @submit.prevent="isEditing ? updateProductUnit() : saveProductUnit()">
              <CRow>
                <CCol sm="12" md="12" class="pt-2">
                  <div class="form-group" v-for="(input, k) in form.units" :key="k">
                    <CRow>
                      <CInput label="Name" class="col-md-3" :value.sync="input.name" />
                      <CInput
                        label="Qty"
                        min="1"
                        type="number"
                        class="col-md-3"
                        :value.sync="input.qty"
                      />
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
                      <CInput
                        label="Barcode"
                        class="col-md-3"
                        :value.sync="input.barcode"
                      />
                      <CSelect
                        label="Status"
                        class="col-md-3"
                        :options="options.status"
                        :value.sync="input.status"
                      />
                      <span class="ml-4">
                        <!-- <i
                          @click="removeUnit(k)"
                          class="thumb"
                          v-show="k || (!k && form.units.length > 1)"
                        > -->
                        <i
                          @click="removeUnit(k)"
                          class="thumb"
                          v-show="k || (!k && form.units[0].uuid)"
                        >
                          <CIcon :content="$options.cisMinusSquare" /> Remove</i
                        ><br />
                        <i
                          class="thumb"
                          @click="addUnit(k)"
                          v-show="k == form.units.length - 1"
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
                  :disabled="loading"
                  >{{ loading ? "loading..." : "Save" }}</CButton
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
import ProductUnitService from "@/services/products/ProductUnitService";
import { cibAddthis, cisMinusSquare } from "@coreui/icons-pro";

export default {
  name: "ProductUnitForm",
  cibAddthis,
  cisMinusSquare,
  data: () => ({
    isEditing: false,
    form: {
      product_id: "",
      deleteRows: [],
      units: [
        {
          name: "",
          qty: "",
          cost_price: "",
          selling_price: "",
          barcode: "",
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
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
  },
  created() {
    this.productId = this.$route.params.id;
    this.form.product_id = this.$route.params.id;
    if (this.productId !== "" && this.productId !== undefined) {
      this.getProductUnit();
    }
  },
  methods: {
    addUnit() {
      this.form.units.push({
        name: "",
        qty: "",
        cost_price: "",
        selling_price: "",
        barcode: "",
        status: "",
      });
    },
    removeUnit(index) {
      if (
        this.form.units &&
        this.form.units.length > 0 &&
        this.form.units[index].uuid &&
        this.form.units[index].uuid !== ""
      ) {
        let uuid = this.form.units[index].uuid;
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
              ProductUnitService.delete(this.deleteRows)
                .then((res) => {
                  if (res.status == 200) {
                    this.$swal.fire({
                      icon: "success",
                      title: "Success",
                      text: "Unit Deleted Successfully",
                      timer: 3600,
                    });
                    this.form.units.splice(index, 1);
                    if (this.form.units.length == 0) {
                      this.form.units.push({
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
        this.form.units.splice(index, 1);
      }
    },
    getProductUnit() {
      ProductUnitService.get(this.productId)
        .then(({ data }) => {
          this.displayData(data);
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
          this.$router.push({ path: "/products" });
        });
    },
    displayData(data = null) {
      if (data && data.length) {
        this.isEditing = true;
        this.form.units = [];
        data.forEach((element) => {
          if (element) {
            this.form.units.push({
              uuid: element.uuid,
              name: element.name,
              qty: element.qty,
              cost_price: element.price?.cost_price,
              selling_price: element.price?.selling_price,
              barcode: element.barcode,
              status: element.status,
            });
          }
        });
      }
    },
    saveProductUnit() {
      let formData = this.form;
      this.$store.commit("set_loader");
      ProductUnitService.create(formData)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Product Unit Created Successfully",
              timer: 3600,
            });
            this.displayData(res.data);
            this.$store.commit("close_loader");
          }
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("close_loader");
          this.$swal.fire({
            icon: "error",
            title: "Error",
            text: "Something Went wrong.",
            timer: 3600,
          });
        });
    },
    updateProductUnit() {
      let formData = this.form;
      this.$store.commit("set_loader");
      ProductUnitService.update(this.productId, formData)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Product Unit Updated Successfully",
              timer: 3600,
            });
            this.displayData(res.data);
            this.$store.commit("close_loader");
          }
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("close_loader");
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
