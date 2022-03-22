<template>
  <div>
    <CCard>
      <CCardHeader> General </CCardHeader>
      <CCardBody>
        <CRow>
          <Loader />
          <CCol xs="12" lg="12">
            <form @submit.prevent="updateGeneralSetting()">
              <CRow>
                <CCol sm="6" md="6" class="pt-2">
                  <CSelect
                    label="Enable Tax"
                    :options="options.enable_tax"
                    :value.sync="form.enable_tax"
                  />
                  <div v-if="$v.form.enable_tax.$error">
                    <p v-if="!$v.form.enable_tax.required" class="errorMsg">
                      Enable Tax is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="6" class="pt-2">
                  <CSelect
                    label="Open And Closing"
                    :options="options.open_and_close"
                    :value.sync="form.open_and_close"
                  />
                  <div v-if="$v.form.open_and_close.$error">
                    <p v-if="!$v.form.open_and_close.required" class="errorMsg">
                      Open And Close is required
                    </p>
                  </div>
                </CCol>

                <CCol sm="6" md="6" class="pt-2">
                  <CSelect
                    label="Show Payment Terms On Quotation"
                    :options="options.show_payment_term_on_quotation"
                    :value.sync="form.show_payment_term_on_quotation"
                  />
                </CCol>

                <CCol sm="6" md="6" class="pt-2">
                  <CSelect
                    label="Show Terms And Conditions On Quotation"
                    :options="options.show_terms_and_conditions_on_quotation"
                    :value.sync="form.show_terms_and_conditions_on_quotation"
                  />
                </CCol>
                <CCol sm="6" md="6" class="pt-2">
                  <CSelect
                    label="Show Note On Quotation"
                    :options="options.show_note_on_quotation"
                    :value.sync="form.show_note_on_quotation"
                  />
                </CCol>
                <CCol sm="6" md="6" class="pt-2">
                  <CSelect
                    label="Show Attachment On Quotation"
                    :options="options.show_attachment_on_quotation"
                    :value.sync="form.show_attachment_on_quotation"
                  />
                </CCol>
                <CCol sm="6" md="6" class="pt-2">
                  <CSelect
                    label="Show Delivery On Quotation"
                    :options="options.show_delivery_on_quotation"
                    :value.sync="form.show_delivery_on_quotation"
                  />
                </CCol>
                <CCol sm="6" md="6" class="pt-2">
                  <CSelect
                    label="Show Payment Term On Invoice"
                    :options="options.show_payment_term_on_invoice"
                    :value.sync="form.show_payment_term_on_invoice"
                  />
                </CCol>
                <CCol sm="6" md="6" class="pt-2">
                  <CSelect
                    label="Show Terms And Conditions On Invoice"
                    :options="options.show_terms_and_conditions_on_invoice"
                    :value.sync="form.show_terms_and_conditions_on_invoice"
                  />
                </CCol>
                <CCol sm="6" md="6" class="pt-2">
                  <CSelect
                    label="Show Note On Invoice"
                    :options="options.show_note_on_invoice"
                    :value.sync="form.show_note_on_invoice"
                  />
                </CCol>
                <CCol sm="6" md="6" class="pt-2">
                  <CSelect
                    label="Show Attachment On Invoice"
                    :options="options.show_attachment_on_invoice"
                    :value.sync="form.show_attachment_on_invoice"
                  />
                </CCol>
                <CCol sm="6" md="6" class="pt-2">
                  <CSelect
                    label="Show Delivery On Invoice"
                    :options="options.show_delivery_on_invoice"
                    :value.sync="form.show_delivery_on_invoice"
                  />
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
  name: "GeneralSettingForm",
  components: { Loader },
  data: () => ({
    settingData: [],
    form: {
      enable_tax: "",
      open_and_close: "",
      show_payment_term_on_quotation: "",
      show_terms_and_conditions_on_quotation: "",
      show_note_on_quotation: "",
      show_attachment_on_quotation: "",
      show_delivery_on_quotation: "",
      show_payment_term_on_invoice: "",
      show_terms_and_conditions_on_invoice: "",
      show_note_on_invoice: "",
      show_attachment_on_invoice: "",
      show_delivery_on_invoice: "",
    },
    options: {
      enable_tax: [
        { value: "", label: "Choose Type", disabled: true, selected: "" },
        { value: "on", label: "ON" },
        { value: "off", label: "OFF" },
      ],
      open_and_close: [
        { value: "", label: "Choose Type", disabled: true, selected: "" },
        { value: "on", label: "ON" },
        { value: "off", label: "OFF" },
      ],
      show_payment_term_on_quotation: [
        { value: "on", label: "ON" },
        { value: "off", label: "OFF" },
      ],
      show_terms_and_conditions_on_quotation: [
        { value: "on", label: "ON" },
        { value: "off", label: "OFF" },
      ],
      show_note_on_quotation: [
        { value: "on", label: "ON" },
        { value: "off", label: "OFF" },
      ],
      show_attachment_on_quotation: [
        { value: "on", label: "ON" },
        { value: "off", label: "OFF" },
      ],
      show_delivery_on_quotation: [
        { value: "on", label: "ON" },
        { value: "off", label: "OFF" },
      ],
      show_payment_term_on_invoice: [
        { value: "on", label: "ON" },
        { value: "off", label: "OFF" },
      ],
      show_terms_and_conditions_on_invoice: [
        { value: "on", label: "ON" },
        { value: "off", label: "OFF" },
      ],
      show_note_on_invoice: [
        { value: "on", label: "ON" },
        { value: "off", label: "OFF" },
      ],
      show_attachment_on_invoice: [
        { value: "on", label: "ON" },
        { value: "off", label: "OFF" },
      ],
      show_delivery_on_invoice: [
        { value: "on", label: "ON" },
        { value: "off", label: "OFF" },
      ],
    },
  }),
  validations() {
    return {
      form: {
        enable_tax: { required },
        open_and_close: { required },
      },
    };
  },
  created() {
    this.GeneralSettingService();
  },
  methods: {
    GeneralSettingService() {
      let type = "general";
      this.$store.commit("set_loader");
      SettingService.getAll(type)
        .then(({ data }) => {
          if (data) {
            data.map((item) => {
              if (item.key === "enable_tax") {
                this.form.enable_tax = item.value;
              } else if (item.key === "open_and_close") {
                this.form.open_and_close = item.value;
              } else if (item.key === "show_payment_term_on_quotation") {
                this.form.show_payment_term_on_quotation = item.value;
              } else if (
                item.key === "show_terms_and_conditions_on_quotation"
              ) {
                this.form.show_terms_and_conditions_on_quotation = item.value;
              } else if (item.key === "show_note_on_quotation") {
                this.form.show_note_on_quotation = item.value;
              } else if (item.key === "show_attachment_on_quotation") {
                this.form.show_attachment_on_quotation = item.value;
              } else if (item.key === "show_delivery_on_quotation") {
                this.form.show_delivery_on_quotation = item.value;
              } else if (item.key === "show_payment_term_on_invoice") {
                this.form.show_payment_term_on_invoice = item.value;
              } else if (item.key === "show_terms_and_conditions_on_invoice") {
                this.form.show_terms_and_conditions_on_invoice = item.value;
              } else if (item.key === "show_note_on_invoice") {
                this.form.show_note_on_invoice = item.value;
              } else if (item.key === "show_attachment_on_invoice") {
                this.form.show_attachment_on_invoice = item.value;
              } else if (item.key === "show_delivery_on_invoice") {
                this.form.show_delivery_on_invoice = item.value;
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
    updateGeneralSetting() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.commit("set_loader");
        this.settingData = [];
        for (const key in this.form) {
          this.settingData.push({
            key: key,
            value: this.form[key],
            type: "general",
          });
        }
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
