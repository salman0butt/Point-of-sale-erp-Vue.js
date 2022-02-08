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
                      Account Code should be at least 4 character
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
                  <AccountDropdown
                    :uuid="form.parent"
                    @getAccountDropdown="getAccountDropdown"
                  />
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CTextarea label="Desription" v-model="form.description" />
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Status"
                    :options="options.status"
                    :value.sync="form.status"
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
import AccountServices from "@/services/accounting/accounts/AccountServices";
import AccountDropdown from "@/components/accounting/general/AccountDropdown";

import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "EditAccount",
  components: {
    AccountDropdown,
  },
  data: () => ({
    url_data: "",
    form: {
      code: "",
      name: "",
      status: "",
      description: "",
      parent: "",
    },
    options: {
      status: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
      ],
    },
  }),
  validations() {
    return {
      form: {
        code: { required, minLength: minLength(4) },
        name: { required, minLength: minLength(4) },
      },
    };
  },
  created() {
    this.getEditDetail();
  },
  methods: {
    getEditDetail() {
      this.url_data = this.$route.params.id;
      AccountServices.get(this.url_data).then((res) => {
        if (res.status == 200) {
          this.form.code = res.data.code;
          this.form.name = res.data.name;
          this.form.description = res.data.description;
          this.form.status = res.data.status;
          this.form.parent = res.data.accountType.uuid;
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
