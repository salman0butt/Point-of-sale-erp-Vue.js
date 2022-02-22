<template>
  <div>
    <CCard>
      <CCardHeader> Currency </CCardHeader>
      <CCardBody>
        <CRow>
          <Loader />
          <CCol xs="12" lg="12">
            <form @submit.prevent="updateCurrencySetting()">
              <CRow>
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
                <CCol sm="6" md="3" class="pt-2">
                  <CInput
                    label="Exchange Rate"
                    v-model="item.exchange_rate"
                    type="number"
                    step="any"
                  />
                </CCol>
                <CCol sm="12" md="12" class="pt-2">
                  <i @click="removeCurrencyExhangeRate(k)" class="thumb"
                    ><CIcon :content="$options.cisMinusSquare" /> Remove</i
                  ><br />
                  <!-- <CButton
                    @click="removeCurrencyExhangeRate(k)"
                    class="btn-sm del-btn"
                    style="background: transparent"
                  >
                    <CIcon :content="$options.cilTrash" style="color: red" />
                  </CButton> -->
                </CCol>
              </CRow>
              <i class="thumb" @click="addCurrencyExchangeRate()"
                ><CIcon :content="$options.cibAddthis" /> Add Currency Exchnage Rate</i
              >
              <br /><br />
              <CRow>
                <CCol sm="12" md="12" class="pt-2">
                  <h5>Currency Dominations</h5>
                  <hr />
                </CCol>
              </CRow>
              <CRow v-for="(item, index) in form.items2" :key="index">
                <CCol sm="6" md="4" class="pt-2">
                  <CInput label="Domination" v-model="item.domnation" />
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Currency Vlaue"
                    v-model="item.currency_value"
                    type="number"
                    step="any"
                  />
                </CCol>
                <CCol sm="12" md="12" class="pt-2">
                  <i @click="removeDomination(k)" class="thumb"
                    ><CIcon :content="$options.cisMinusSquare" /> Remove</i
                  ><br />
                </CCol>
              </CRow>
              <i class="thumb" @click="addDomination()"
                ><CIcon :content="$options.cibAddthis" /> Add Currency Domination</i
              >

              <!-- <CRow class="mt-4 d-block">
                <CButton
                  progress
                  timeout="2000"
                  block
                  color="success"
                  style="float: right; width: 150px; margin-right: 20px"
                  type="submit"
                  >Save</CButton
                >
              </CRow> -->
            </form>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  </div>
</template>
<script>
// import CurrencySettingService from "@/services/settings/CurrencySettingService";
// import { required } from "vuelidate/lib/validators";
// import { VueTagsInput } from "@johmun/vue-tags-input";
import Loader from "@/components/layouts/Loader";
import { cilTrash, cibAddthis, cisMinusSquare } from "@coreui/icons-pro";

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
      items2: [
        {
          dominnation: "",
          currency_value: "",
        },
      ],
    },
  }),
  // validations() {
  //   return {
  //     form: {

  //     },
  //   };
  // },
  created() {
    // this.CurrencySettingService();
  },
  methods: {
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
    addDomination() {
      this.form.items2.push({
        dominnation: "",
        currency_value: "",
      });
    },
    removeDomination(index) {
      this.form.items2.splice(index, 1);
    },

    // CurrencySettingService() {
    //   let type = "customer";
    //   this.$store.commit("set_loader");
    //   CurrencySettingService.getAll(type)
    //     .then(({ data }) => {
    //       if (data != null && data != "") {
    //         let arr = this.form;
    //         data.forEach(function (item) {
    //           if (arr[item.key] !== undefined) {
    //             const regx = /type/gm;
    //             if (regx.test(item.key)) {
    //               let data = JSON.parse(item.value).map((value) => {
    //                 return { text: value, tiClasses: ["ti-valid"] };
    //               });
    //               arr[item.key].values = data;
    //             } else {
    //               arr[item.key] = item.value;
    //             }
    //           }
    //         });
    //       }
    //       this.$store.commit("close_loader");
    //     })
    //     .catch((error) => {
    //       this.$store.commit("close_loader");
    //       console.log(error);
    //     });
    // },
    // updateCurrencySetting() {
    //   this.settingData = [];
    //   for (var key in this.form) {
    //     const regx = /type/gm;
    //     if (regx.test(key)) {
    //       let data = JSON.stringify(
    //         this.form[key].values.map(function (item) {
    //           return item.text;
    //         })
    //       );
    //       this.settingData.push({ key: key, value: data });
    //     } else {
    //       this.settingData.push({ key: key, value: this.form[key] });
    //     }
    //   }
    //   this.$v.$touch();
    //   if (!this.$v.$invalid) {
    //     this.$store.commit("set_loader");
    //     let data = this.settingData;
    //     CurrencySettingService.update(data)
    //       .then((res) => {
    //         if (res.status == 200) {
    //           this.$swal.fire({
    //             icon: "success",
    //             title: "Success",
    //             text: "Settings Updated Successfully",
    //             timer: 3600,
    //           });
    //           this.$v.$reset();
    //           this.$store.commit("close_loader");
    //         }
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //         this.$store.commit("close_loader");
    //         this.$swal.fire({
    //           icon: "error",
    //           title: "Error",
    //           text: "Something Went Wrong.",
    //           timer: 3600,
    //         });
    //       });
    //   }
    // },
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
