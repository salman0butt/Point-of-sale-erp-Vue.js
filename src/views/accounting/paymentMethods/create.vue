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
                  <AccountDropdown @getAccountDropdown="getAccountDropdown" />
                </CCol>

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
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Tax Percent"
                    type="number"
                    min="0"
                    step="any"
                    v-model="form.tax"
                  />
                </CCol>
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
import PaymentMethodsServices from "@/services/accounting/paymentMethods/PaymentMethodsServices";
import AccountDropdown from "@/components/general/AccountDropdown";

import {
  required,
  minValue,
  minLength,
  decimal,
} from "vuelidate/lib/validators";

export default {
  name: "CreatePaymentMethods",
  components: {
    AccountDropdown,
  },
  data: () => ({
    form: {
      name: "",
      account: "",
      percent: "0.000",
      amount: "0.000",
      tax: "0.000",
    },
    active: "active",
    options: {
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
        account: { required },
        percent: { required, decimal, minValue: minValue(0) },
        amount: { required, decimal, minValue: minValue(0) },
      },
    };
  },
  created() {},
  methods: {
    getAccountDropdown(value) {
      this.form.account = value.value;
    },

    saveData() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        PaymentMethodsServices.create(data)
          .then((res) => {
            if (res.status === 201 || res.status === 200) {
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
