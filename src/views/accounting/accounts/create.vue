<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>New Account</CCardHeader>
          <CCardBody>
            <form @submit.prevent="saveAccount">
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
                      Account Name is required
                    </p>
                    <p v-if="!$v.form.name.minLength" class="errorMsg">
                      Account Name should be at least 4 character
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
                      Type of Account is required
                    </p>
                  </div>
                </CCol>

                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Bank"
                    :options="options.banks"
                    :value.sync="form.banks"
                    :class="{ error: $v.form.banks.$error }"
                    @input="$v.form.banks.$touch()"
                  />
                  <div v-if="$v.form.banks.$error">
                    <p v-if="!$v.form.banks.required" class="errorMsg">
                      Bank Name is required
                    </p>
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Opening Balance"
                    type="number"
                    min="0"
                    step="any"
                    v-model="form.opening_amount"
                    :class="{ error: $v.form.opening_amount.$error }"
                    @input="$v.form.opening_amount.$touch()"
                  />
                  <div v-if="$v.form.opening_amount.$error">
                    <p v-if="!$v.form.opening_amount.required" class="errorMsg">
                      Opening balance is required
                    </p>
                    <p v-if="!$v.form.opening_amount.decimal" class="errorMsg">
                      Must be Digit
                    </p>
                    <p v-if="!$v.form.opening_amount.minValue" class="errorMsg">
                      Minimum number must be zero
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Parent Account"
                    :options="options.parent"
                    :value.sync="form.parent"
                  />
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

import {
  required,
  minValue,
  minLength,
  decimal,
} from "vuelidate/lib/validators";

export default {
  name: "CreateAccount",
  data: () => ({
    form: {
      name: "",
      type: "",
      banks: "",
      opening_amount: "0.000",
      currency: "BHD",
      parent: "",
    },
    options: {
      type: [
        {
          value: "",
          label: "Choose Type",
          disabled: true,
          selected: "",
        },
      ],
      banks: [
        {
          value: "",
          label: "Choose Bank",
          disabled: true,
          selected: "",
        },
      ],
      currency: [
        { value: "", label: "Choose Currency", disabled: true, selected: "" },
        { value: "BHD", label: "Bahraini Dinar" },
      ],
      parent: [
        {
          value: "",
          label: "Choose Parent",
          selected: "",
        },
      ],
    },
  }),
  validations() {
    return {
      form: {
        name: { required, minLength: minLength(4) },
        type: { required },
        banks: { required },
        opening_amount: { required, decimal, minValue: minValue(0) },
      },
    };
  },
  created() {
    this.getAccountingSetting();
  },
  methods: {
    getAccountingSetting() {
      let type = "accounting";
      AccoutingSettingService.getAll(type)
        .then(({ data }) => {
          let type = this.options.type;
          let banks = this.options.banks;

          data.map(function (val) {
            // Account Types
            if (val.key == "account_types") {
              let account_types = JSON.parse(val.value);
              account_types.forEach((element) => {
                type.push({
                  value: element,
                });
              });
            }

            // Banks
            if (val.key == "banks_types") {
              let banks_types = JSON.parse(val.value);
              banks_types.forEach((element) => {
                banks.push({
                  value: element,
                });
              });
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });

      AccountServices.getActiveAccounts("active")
        .then(({ data }) => {
          let parent = this.options.parent;
          data.map(function (val) {
            parent.push({
              value: val.uuid,
              label: val.name,
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    saveAccount() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        AccountServices.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Account Created Successfully",
                timer: 3600,
              });
              this.$v.$reset();

              this.$router.push({ path: "/accounting" });
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
