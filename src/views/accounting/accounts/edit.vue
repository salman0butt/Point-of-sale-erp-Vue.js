<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Edit Account</CCardHeader>
          <CCardBody>
            <form @submit.prevent="updateMethod">
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
                    label="Bank Account"
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
                  <AccountDropdown
                    :uuid="form.parent"
                    @getAccountDropdown="getAccountDropdown"
                  />
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Status"
                    :options="options.status"
                    :value.sync="form.status"
                  />
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CTextarea label="Desription" v-model="form.description" />
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
                  >Update</CButton
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
import AccountDropdown from "@/components/accounting/general/AccountDropdown";

import {
  required,
  minValue,
  minLength,
  decimal,
} from "vuelidate/lib/validators";

export default {
  name: "EditAccount",
  components: {
    AccountDropdown,
  },
  data: () => ({
    url_data: "",
    form: {
      name: "",
      type: "",
      banks: "",
      opening_amount: "0.000",
      status: "",
      description: "",
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
      status: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
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
    this.getEditDetail();
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
    },
    getEditDetail() {
      this.url_data = this.$route.params.id;
      AccountServices.get(this.url_data).then((res) => {
        if (res.status == 200) {
          this.form.name = res.data.name;
          this.form.type = res.data.type;
          this.form.banks = res.data.banks;
          this.form.opening_amount = res.data.opening_amount;
          this.form.status = res.data.status;
          this.form.description = res.data.description;
          this.form.parent = res.data.parent.uuid;
        }
      });
    },
    updateMethod() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        AccountServices.update(this.url_data, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Account Updated Successfully",
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
    getAccountDropdown(value) {
      this.form.parent = value;
    },
  },
};
</script>

<style scoped>
.errorMsg {
  color: red;
}
</style>
