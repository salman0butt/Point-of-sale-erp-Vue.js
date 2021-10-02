<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>New Payment Method</CCardHeader>
          <CCardBody>
            <form @submit.prevent="saveData">
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Name"
                    v-model="form.name"
                    :class="{ error: $v.form.name.$error }"
                    @input="$v.form.name.$touch()"
                  />
                  <div v-if="$v.form.name.$error">
                    <p v-if="!$v.form.name.required" class="errorMsg">
                      Payment Method Name is required
                    </p>
                    <p v-if="!$v.form.name.minLength" class="errorMsg">
                      Payment Method Name should be at least 4 character
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Type"
                    :options="options.type"
                    :value.sync="form.type"
                    :class="{ error: $v.form.type.$error }"
                    @input="$v.form.type.$touch()"
                  />
                  <div v-if="$v.form.type.$error">
                    <p v-if="!$v.form.type.required" class="errorMsg">
                      Type of Payment Method is required
                    </p>
                  </div>
                </CCol>

                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Choose Account"
                    :options="options.account"
                    :value.sync="form.account"
                    :class="{ error: $v.form.account.$error }"
                    @input="$v.form.account.$touch()"
                  />
                  <div v-if="$v.form.account.$error">
                    <p v-if="!$v.form.account.required" class="errorMsg">
                      Account is required
                    </p>
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Percent"
                    type="number"
                    min="0"
                    step="any"
                    v-model="form.percent"
                    :class="{ error: $v.form.percent.$error }"
                    @input="$v.form.percent.$touch()"
                  />
                  <div v-if="$v.form.percent.$error">
                    <p v-if="!$v.form.percent.required" class="errorMsg">
                      Percent is required
                    </p>
                    <p v-if="!$v.form.percent.decimal" class="errorMsg">
                      Must be Digit
                    </p>
                    <p v-if="!$v.form.percent.minValue" class="errorMsg">
                      Minimum number must be zero
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Fix Amount"
                    type="number"
                    min="0"
                    step="any"
                    v-model="form.amount"
                    :class="{ error: $v.form.amount.$error }"
                    @input="$v.form.amount.$touch()"
                  />
                  <div v-if="$v.form.amount.$error">
                    <p v-if="!$v.form.amount.required" class="errorMsg">
                      Fix amount is required
                    </p>
                    <p v-if="!$v.form.amount.decimal" class="errorMsg">
                      Must be Digit
                    </p>
                    <p v-if="!$v.form.amount.minValue" class="errorMsg">
                      Minimum number must be zero
                    </p>
                  </div>
                </CCol>
                <!-- <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Currency"
                    :options="options.currency"
                    :value.sync="form.currency"
                  />
                </CCol> -->
              </CRow>

              <CRow class="mt-4">
                <CButton
                  progress
                  timeout="2000"
                  block
                  color="success"
                  style="float: right; width: 200px; margin-left: 20px"
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
import AccoutingSettingService from "@/services/settings/AccoutingSettingService";
import AccountServices from "@/services/accounting/accounts/AccountServices";
import PaymentMethodsServices from "@/services/accounting/paymentMethods/PaymentMethodsServices";

import {
  required,
  minValue,
  minLength,
  decimal,
} from "vuelidate/lib/validators";

export default {
  name: "CreatePaymentMethods",
  data: () => ({
    form: {
      name: "",
      type: "",
      account: "",
      percent: "0.000",
      amount: "0.000",
    },
    active: "active",
    options: {
      type: [
        {
          value: "",
          label: "Choose Type",
          disabled: true,
          selected: "",
        },
      ],
      account: [
        {
          value: "",
          label: "Choose Account",
          disabled: true,
          selected: "",
        },
      ],
      currency: [
        { value: "", label: "Choose Currency", disabled: true, selected: "" },
        { value: "BHD", label: "Bahraini Dinar" },
      ],
    },
  }),
  validations() {
    return {
      form: {
        name: { required, minLength: minLength(4) },
        type: { required },
        account: { required },
        percent: { required, decimal, minValue: minValue(0) },
        amount: { required, decimal, minValue: minValue(0) },
      },
    };
  },
  created() {
    this.getAccountingSetting();
    this.getAccounts();
  },
  methods: {
    getAccountingSetting() {
      let type = "accounting";
      AccoutingSettingService.getAll(type)
        .then(({ data }) => {
          let type = this.options.type;

          data.map(function (val) {
            // Payment Methods Types
            if (val.key == "payment_methods_types") {
              let payment_methods_types = JSON.parse(val.value);
              payment_methods_types.forEach((element) => {
                type.push({
                  value: element,
                });
              });
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getAccounts() {
      AccountServices.getActiveAccounts(this.active)
        .then(({ data }) => {
          let account = this.options.account;
          data.map(function (val) {
            account.push({
              value: val.uuid,
              label: val.name,
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    saveData() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        PaymentMethodsServices.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Payment Method Created Successfully",
                timer: 3600,
              });
              this.$v.$reset();

              this.$router.push({ path: "/accounting/paymentMethods/index" });
            }
          })
          .catch((error) => {
            console.log(error);
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: "Something Went Wrong",
              timer: 3600,
            });
          });
      }
    },
  },
};
</script>

<style scoped>
.errorMsg {
  color: red;
}
</style>
