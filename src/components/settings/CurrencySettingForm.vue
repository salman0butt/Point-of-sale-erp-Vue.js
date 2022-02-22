<template>
  <div>
    <CCard>
      <CCardHeader> Currency </CCardHeader>
      <CCardBody>
        <CRow>
          <Loader />
          <CCol xs="12" lg="12">
            <form @submit.prevent="updateCurrencySetting()">
              <!-- <CRow>
                <CCol sm="12" md="12" class="pt-2">
                  <h5>Exchange Rates</h5>
                  <hr />
                </CCol>
              </CRow>
              <CRow v-for="(item, index) in form.items" :key="index">
                <CCol sm="6" md="3" class="pt-2">
                  <CInput label="Payment Currency" v-model="item.payment_currency" />
                </CCol>
                <CCol sm="6" md="3" class="pt-2">
                  <CInput
                    label="Currency Sybmbol"
                    v-model="item.currency_symbol"
                    placeholder="$"
                  />
                </CCol>
                <CCol sm="6" md="3" class="pt-2">
                  <CInput
                    label="Currency Sybmbol Location"
                    v-model="item.currency_symbol"
                    placeholder="Before Number"
                  />
                </CCol>
                <CCol sm="6" md="3" class="pt-2">
                  <CInput
                    label="Number of Decimals"
                    v-model="item.number_of_decimal"
                    placeholder="Let system decide (Recommended)"
                  />
                </CCol>
                <CCol sm="6" md="3" class="pt-2">
                  <CInput
                    label="Thousand Separator"
                    v-model="item.thousand_seprater"
                    placeholder=","
                  />
                </CCol>
                <CCol sm="6" md="3" class="pt-2">
                  <CInput
                    label="Decimal Points"
                    v-model="item.decimal_points"
                    placeholder="."
                  />
                </CCol>
          
                </CCol> 
                <CCol sm="12" md="12" class="pt-2">
                  <i @click="removeCurrencyExhangeRate(k)" class="thumb"
                    ><CIcon :content="$options.cisMinusSquare" /> Remove</i
                  ><br />
            
                </CCol>
              </CRow>
              <i class="thumb" @click="addCurrencyExchangeRate()"
                ><CIcon :content="$options.cibAddthis" /> Add Currency Exchnage Rate</i
              >
              <br /><br /> -->
              <CRow>
                <CCol sm="12" md="12" class="pt-2">
                  <h5>Currency Denominations</h5>
                  <hr />
                </CCol>
              </CRow>
              <CRow
                v-for="(item, index) in form.currency_denominations"
                :key="index"
              >
                <CCol sm="6" md="4" class="pt-2">
                  <CInput label="Denomination" v-model="item.denominations" />
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Currency Vlaue"
                    v-model="item.value"
                    type="number"
                    step="any"
                  />
                </CCol>
                <CCol sm="12" md="12" class="pt-2">
                  <i @click="removeDenomination(index)" class="thumb"
                    ><CIcon :content="$options.cisMinusSquare" /> Remove</i
                  ><br />
                </CCol>
              </CRow>
              <i class="thumb" @click="addDenomination()"
                ><CIcon :content="$options.cibAddthis" /> Add Currency
                Denomination</i
              >

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
import Loader from "@/components/layouts/Loader";
import { cilTrash, cibAddthis, cisMinusSquare } from "@coreui/icons-pro";
import CurrencyDenominationService from "@/services/currency/CurrencyDenominationService";

export default {
  name: "CurrencySettingForm",
  components: { Loader },
  cilTrash,
  cibAddthis,
  cisMinusSquare,
  data: () => ({
    settingData: [],
    form: {
      items: [
        {
          payment_currency: "",
          currency_symbol: "",
          currency_symbol_location: "",
          number_of_decimal: "",
          thousand_seprater: "",
          decimal_points: "",
          exchange_rate: "",
        },
      ],
      currency_denominations: [],
    },
  }),

  created() {
    this.createMethod();
  },
  methods: {
    createMethod() {
      let denominations = this.form.currency_denominations;
      CurrencyDenominationService.getAll()
        .then(({ data }) => {
          data.map((value) => {
            denominations.push(value);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addCurrencyExchangeRate() {
      this.form.items.push({
        payment_currency: "",
        currency_symbol: "",
        currency_symbol_location: "",
        number_of_decimal: "",
        thousand_seprater: "",
        decimal_points: "",
        exchange_rate: "",
      });
    },
    removeCurrencyExhangeRate(index) {
      this.form.items.splice(index, 1);
    },
    addDenomination() {
      this.form.currency_denominations.push({
        denominations: "",
        value: "",
      });
    },
    removeDenomination(index) {
      this.form.currency_denominations.splice(index, 1);
    },
    updateCurrencySetting() {
      let data = this.form.currency_denominations;
      CurrencyDenominationService.store(data)
        .then(({ data }) => {
          this.$swal.fire({
            icon: "success",
            title: "Success",
            text: "Currency Denomination Updated Successfully",
            timer: 3600,
          });
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
    },
  },
};
</script>
<style scoped>
.del-btn {
  background: transparent;
  height: fit-content;
  margin-top: 2rem;
}
.thumb {
  cursor: pointer;
}
</style>
