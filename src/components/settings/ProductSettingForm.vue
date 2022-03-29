<template>
  <div>
    <CCard>
      <CCardHeader> Product Barcode Setting </CCardHeader>
      <CCardBody>
        <CRow>
          <Loader />
          <CCol xs="12" lg="12">
            <form @submit.prevent="updateProductSetting()">
              <CRow>
                <CCol sm="6" md="6" class="pt-2">
                  <CSelect
                    label="Product Barcode With Barcode Number"
                    :options="options.product_barcode_with_barcode_number"
                    :value.sync="form.product_barcode_with_barcode_number"
                  />
                  <div v-if="$v.form.product_barcode_with_barcode_number.$error">
                    <p
                      v-if="!$v.form.product_barcode_with_barcode_number.required"
                      class="errorMsg"
                    >
                      Product Barcode With Barcode Number is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="6" class="pt-2">
                  <CSelect
                    label="Short Name or Full Name"
                    :options="options.short_name_or_full_name"
                    :value.sync="form.short_name_or_full_name"
                  />
                  <div v-if="$v.form.short_name_or_full_name.$error">
                    <p v-if="!$v.form.short_name_or_full_name.required" class="errorMsg">
                      Short Name or Full Name is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="6" class="pt-2">
                  <CSelect
                    label="Product Serial Number"
                    :options="options.product_serial_number"
                    :value.sync="form.product_serial_number"
                  />
                  <div v-if="$v.form.product_serial_number.$error">
                    <p v-if="!$v.form.product_serial_number.required" class="errorMsg">
                      Product Serial Number is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="6" class="pt-2">
                  <CSelect
                    label="Product Selling Price"
                    :options="options.selling_price"
                    :value.sync="form.selling_price"
                  />
                  <div v-if="$v.form.selling_price.$error">
                    <p v-if="!$v.form.selling_price.required" class="errorMsg">
                      Product Selling Price is required
                    </p>
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
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  </div>
</template>
<script>
import SettingService from "@/services/settings/SettingService";
import { required } from "vuelidate/lib/validators";
import Loader from "@/components/layouts/Loader";

export default {
  name: "ProductSettingForm",
  components: { Loader },
  data: () => ({
    settingData: [],
    form: {
      product_barcode_with_barcode_number: "",
      short_name_or_full_name: "",
      product_serial_number: "",
      selling_price: "",
    },
    options: {
      product_barcode_with_barcode_number: [
        { value: "", label: "Choose Type", disabled: true, selected: "" },
        { value: "on", label: "ON" },
        { value: "off", label: "OFF" },
      ],
      product_serial_number: [
        { value: "", label: "Choose Type", disabled: true, selected: "" },
        { value: "on", label: "ON" },
        { value: "off", label: "OFF" },
      ],
      selling_price: [
        { value: "", label: "Choose Type", disabled: true, selected: "" },
        { value: "on", label: "ON" },
        { value: "off", label: "OFF" },
      ],
      short_name_or_full_name: [
        { value: "", label: "Choose Type", disabled: true, selected: "" },
        { value: "full", label: "Full Name" },
        { value: "short", label: "Short Name" },
      ],
    },
  }),
  validations() {
    return {
      form: {
        product_barcode_with_barcode_number: { required },
        short_name_or_full_name: { required },
        product_serial_number: { required },
        selling_price: { required },
      },
    };
  },
  created() {
    this.ProductSettingService();
  },
  methods: {
    ProductSettingService() {
      let type = "product";
      this.$store.commit("set_loader");
      SettingService.getAll(type)
        .then(({ data }) => {
          if (data) {
            data.map((item) => {
              if (item.key === "product_barcode_settings") {
                this.form = JSON.parse(item.value);
              }
            });
          }
          this.$store.commit("close_loader");
        })
        .catch((error) => {
          this.$store.commit("close_loader");
          console.log(error);
        });
    },
    updateProductSetting() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.commit("set_loader");
        this.settingData = [];
        // for (const key in this.form) {
        //   this.settingData.push({
        //     key: key,
        //     value: this.form[key],
        //     type: "product",
        //   });
        // }
        this.settingData.push({
          key: "product_barcode_settings",
          value: JSON.stringify(this.form),
          type: "product",
        });
        let data = this.settingData;
        SettingService.update(data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Settings Updated Successfully",
                timer: 3600,
              });

              this.$v.$reset();
              this.$store.commit("close_loader");
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
  },
};
</script>
