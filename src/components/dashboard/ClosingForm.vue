<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form @submit.prevent="saveData()">
          <CRow>
            <CCol sm="6" md="6" class="pt-2">
              <CRow>
                <CCol sm="6" md="4" class="pt-2 bolder"> Date: </CCol>
                <CCol sm="6" md="8" class="pt-2"> {{ form.date }} </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="4" class="pt-2 bolder"> Time: </CCol>
                <CCol sm="6" md="8" class="pt-2"> {{ form.time }} </CCol>
              </CRow>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="6" md="6" class="pt-2">
              <CRow>
                <CCol sm="6" md="6" class="pt-2 bolder"> Cash </CCol>
                <CCol sm="6" md="6" class="pt-2"> {{ form.total_cash }} </CCol>
              </CRow>
              <CRow v-for="(item, index) in form.items" :key="index">
                <CCol sm="6" md="6" class="pt-2 bolder">
                  {{ item.payment_method ? item.payment_method.name : "" }}
                </CCol>
                <CCol sm="6" md="6" class="pt-2"> {{ item.total }} </CCol>
              </CRow>
              <!-- <CRow>
                <CCol sm="6" md="4" class="pt-2 bolder"> Total Card </CCol>
                <CCol sm="6" md="8" class="pt-2"> 0.000 </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="4" class="pt-2 bolder"> Total Benefits </CCol>
                <CCol sm="6" md="8" class="pt-2"> 0.000 </CCol>
              </CRow> -->
              <CRow>
                <CCol sm="6" md="6" class="pt-2 bolder"> Total Opening </CCol>
                <CCol sm="6" md="6" class="pt-2"> {{ form.total_opening }} </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="6" class="pt-2 bolder"> Total Amount </CCol>
                <CCol sm="6" md="6" class="pt-2"> {{ form.total_amount }} </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="6" class="pt-2 bolder"> Total </CCol>
                <CCol sm="6" md="6" class="pt-2"> {{ form.total }} </CCol>
              </CRow>
            </CCol>
            <!-- <CCol sm="6" md="6" class="pt-2">
              <CRow>
                <CCol sm="6" md="4" class="pt-2 bolder"> Total Discount </CCol>
                <CCol sm="6" md="8" class="pt-2"> 0.000 </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="4" class="pt-2 bolder"> Total Tax </CCol>
                <CCol sm="6" md="8" class="pt-2"> 0.000 </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="4" class="pt-2 bolder"> Total Return </CCol>
                <CCol sm="6" md="8" class="pt-2"> 0.000 </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="4" class="pt-2 bolder"> Total Expense </CCol>
                <CCol sm="6" md="8" class="pt-2"> 0.000 </CCol>
              </CRow>
            </CCol> -->
            <CCol sm="6" md="6" class="pt-2">
              <CCol
                sm="12"
                md="12"
                v-for="(value, index) in form.serverValues"
                :key="index"
                class="floater"
              >
                <CRow>
                  <CCol sm="6" md="3" class="pt-2 bolder">
                    {{ value.denominations }}
                  </CCol>
                  <CCol sm="6" md="8" class="pt-2">
                    <CInput
                      type="number"
                      v-model="form.formValues[index].input"
                      @change="calculate()"
                    />
                  </CCol>
                </CRow>
              </CCol>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="6" md="6"> </CCol>
            <CCol sm="6" md="6" class="d-flex">
              <CCol sm="6" md="4" class="pt-2 bolder"> Total </CCol>
              <CCol sm="6" md="8" class="pt-2"> {{ form.total_new_opening }} </CCol>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="12" md="8" class="pt-2">
              <CTextarea
                label="Note"
                placeholder="content.."
                type="textarea"
                v-model="form.note"
              />
            </CCol>
            <CCol sm="12" md="4" class="pt-2">
              <!-- <a
                v-if="showSmsButton"
                color="success"
                class="btn btn-sm btn-warning"
                style="color: #fff; margin-right: 5px; text-align: center"
                @click.prevent="
                  options.contacts && options.contacts.length > 1
                    ? openSmsModel()
                    : sendSms('quotation')
                "
              >
                <CIcon name="cis-mobile-sms" /> Send Sms</a
              > -->
              <CButton color="success" style="margin-top: 3rem" @click="saveData()"
                >Closing</CButton
              >
            </CCol>
          </CRow>

          <!-- <p v-if="$v.$anyError" class="errorMsg">Please Fill the required data</p> -->
        </form>
      </CCol>
    </CRow>
    <!-- <SmsPluginModel :contacts="options.contacts" type="invoice" /> -->
  </div>
</template>
<script>
// import SupplierServices from "@/services/contacts/supplier/SupplierServices";
// import { required } from "vuelidate/lib/validators";
// import { smsMixin } from "@/mixins/plugins/smsMixin";
// import SmsPluginModel from "@/components/plugins/sms/SmsPluginModel";
import { globalMixin } from "@/mixins/globalMixin";
import BranchTerminalServices from "@/services/branches/BranchTerminalServices";
import CurrencyDenominationService from "@/services/currency/CurrencyDenominationService";

export default {
  name: "OpeningForm",
  // components: {
  //   SmsPluginModel,
  // },
  mixins: [globalMixin],
  props: {
    submit: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    form: {
      date: "",
      time: "",
      total_sales: "",
      items: null,
      payment_methods: null,
      serverValues: [],
      formValues: [],
      total: "0.000",
      total_amount: "0.000",
      total_opening: "0.000",
      total_cash: "0.000",
      total_new_opening: "0.000",
    },
    options: {
      type: [{ value: "", label: "Choose type", disabled: true, selected: "" }],
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
    this.getDenominations();
    this.getTerminalRecord();
  },
  watch: {
    submitForm() {
      alert("submit");
      // this.$v.$touch(); //&& !this.$v.$invalid
      if (this.submit) {
        this.saveData();
        this.$emit("reset-model");
      }
    },
    showClosingModel() {
      this.form.date = this.calculateTodayDate();
      this.form.time = new Date().toLocaleTimeString();
    },
  },
  computed: {
    submitForm() {
      return this.submit;
    },
    showClosingModel() {
      return this.$store.getters.getClosingModel;
    },
    terminalId() {
      return localStorage.getItem("terminal_id");
    },
  },
  methods: {
    getClosing() {
      let terminal_id = this.terminalId;
      if (!terminal_id) return;
      this.$http
        .get(`/terminal-record/${terminal_id}/closing`)
        .then(({ data }) => {
          if (data) {
            this.form.items = data.data;
            console.log(this.form.items);

            // this.form.payment_methods = data.data[0].payment_method;
            this.form.total_amount = data.total_amount;
            this.form.total_cash = data.cash_amount;
          }
        })
        .catch((error) => {
          console.log(error.response);
          if (error.response && error.response.status === 422) {
            let errors = error.response.data.errors;
            for (const err in errors) {
              this.$toast.error(errors[err][0]);
            }
          } else {
            this.$toast.error("Something went wrong.");
          }
        });
    },
    getTerminalRecord() {
      let terminal_id = this.terminalId;
      if (!terminal_id) return;
      BranchTerminalServices.get(terminal_id)
        .then(({ data }) => {
          if (data) {
            let record = data.records.find((record) => {
              if (record.type === "open") {
                return record;
              }
            });
            if (record) {
              this.form.total_opening = record.total;
              this.form.total = (
                parseFloat(record.total) + parseFloat(this.form.total_opening)
              ).toFixed(3);
              this.getClosing();
            } else {
              this.$emit("hide-button");
            }
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response && error.response.status === 422) {
            let errors = error.response.data.errors;
            for (const err in errors) {
              this.$toast.error(errors[err][0]);
            }
          } else {
            this.$toast.error("Something went wrong.");
          }
        });
    },
    getDenominations() {
      let denominations = this.form.serverValues;
      let formValues = this.form.formValues;
      CurrencyDenominationService.getAll()
        .then(({ data }) => {
          if (data && data.length) {
            data.map((value) => {
              denominations.push(value);
              formValues.push({
                input: 0,
                value: value.value,
                denominations: value.denominations,
              });
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    calculate() {
      let total = parseFloat("0.000");
      let formValues = this.form.formValues;
      formValues.map((value) => {
        total += parseFloat(value.input) * parseFloat(value.value);
      });
      this.form.total_new_opening = total;
    },
    saveData() {
      if (this.form.total !== this.form.total_new_opening && !this.form.note) {
        // alert("Please fill the note");
        this.$swal.fire({
          icon: "error",
          title: "Error",
          text: "Please fill the note",
          timer: 3600,
        });
      } else {
        let terminal_id = localStorage.getItem("terminal_id");

        let formValues = this.form.formValues;
        let storeValue = [];
        if (formValues && formValues.length > 0) {
          formValues.map((item) => {
            if (item && item.input && item.value && item.denominations) {
              storeValue.push({
                denomination: item.denominations,
                value: parseFloat(item.value),
                total_number: parseInt(item.input),
              });
            }
          });
        }

        if (!terminal_id) return;
        const data = {
          terminal_id: terminal_id,
          type: "close",
          total: this.form.total,
          details: storeValue,
          note: this.form.note,
          date: this.form.date,
          time: this.form.time,
          total_amount: this.form.total_amount,
          total_cash: this.form.total_cash,
          total_opening_amount: this.form.total_opening,
          grand_total: this.form.grand_total,
          payment_methods: this.form.items,
        };
        this.$http
          .post(`/terminal-record/${terminal_id}/closing`, data)
          .then((res) => {
            if (res.status === 201) {
              this.$store.commit("set_show_opening_form", true);
              this.$store.commit("set_show_closing_button", false);
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Closing Created Successfully",
                timer: 3600,
              });
              // this.$router.go(this.$router.currentRoute);
              this.resetForm();
              this.$store.commit("set_closing_model", false);
            }
          })
          .catch((error) => {
            console.log(error);
            localStorage.removeItem("terminal_id");
          });
      }
      // this.$v.$touch();
      // if (!this.$v.$invalid) {
      // }
    },
    resetForm() {
      this.form = {
        date: "",
        time: "",
        total_sales: "",
        items: null,
        payment_methods: null,
        serverValues: [],
        formValues: [],
        total: "0.000",
        total_amount: "0.000",
        total_opening: "0.000",
        total_cash: "0.000",
        total_new_opening: "0.000",
      };
    },
  },
};
</script>

<style scoped>
.bolder {
  font-weight: bold;
}
</style>
