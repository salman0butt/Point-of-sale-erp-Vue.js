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
                    label="Code"
                    v-model="form.code"
                    :class="{ error: $v.form.code.$error }"
                    @input="$v.form.code.$touch()"
                  />
                  <div v-if="$v.form.code.$error">
                    <p v-if="!$v.form.code.required" class="errorMsg">
                      Account Code is required
                    </p>
                    <p v-if="!$v.form.code.minLength" class="errorMsg">
                      Account Code should be at least 6 character
                    </p>
                    <p v-if="!$v.form.code.numeric" class="errorMsg">
                      Account Code should be numeric
                    </p>
                  </div>
                </CCol>
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
                      Account Type is required
                    </p>
                  </div>
                </CCol>

                <CCol sm="6" md="4" class="pt-2">
                  <AccountTypeDropdown
                    @getAccountDropdown="getAccountDropdown"
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
import AccountServices from "@/services/accounting/accounts/AccountServices";
import AccountTypeDropdown from "@/components/accounting/general/AccountTypeDropdown";

import { required, minLength, numeric } from "vuelidate/lib/validators";

export default {
  name: "CreateAccount",
  components: {
    AccountTypeDropdown,
  },
  data: () => ({
    form: {
      code: "",
      name: "",
      parent: "",
      description: "",
      type: "",
    },
    options: {
      type: [
        {
          value: "",
          label: "Select Account Type",
          selected: true,
          disabled: true,
        },
        { value: "debited", label: "Debited" },
        { value: "credited", label: "Credited" },
      ],
    },
  }),
  validations() {
    return {
      form: {
        code: { required, minLength: minLength(6), numeric },
        name: { required, minLength: minLength(4) },
        type: { required },
      },
    };
  },
  created() {},
  methods: {
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
            if (res.status == 422) {
              this.$swal.fire({
                icon: "error",
                title: "Error",
                text: "testlksjadfl",
                timer: 3600,
              });
            }
          })
          .catch((error) => {
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
