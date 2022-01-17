<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>New Quotation </CCardHeader>
          <form @submit.prevent="formSubmit()">
            <CCardBody>
              <CRow>
                <!-- <CCol xs="12" lg="12">
                  <CInput
                    label="Test"
                    type="text"
                    v-model="form.test"
                    :class="{ error: $v.form.test.$error }"
                    @input="$v.form.test.$touch()"
                  />
                  <div v-if="$v.form.test.$error">
                    <p v-if="!$v.form.test.required" class="errorMsg">
                      Supplier is required
                    </p>
                  </div>
                </CCol> -->
                <CCol sm="6" md="4" class="pt-2">
                  <CustomerSearchField />
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput label="Dated" type="date" v-model="form.dated" />
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput label="Due Date" type="date" />
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <SelectSalePerson />
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="12" md="12" class="pt-2">
                  <SearchProduct searchType="quotation" />
                </CCol>
                <CRow class="mt-4">
                  <CButton
                    progress
                    timeout="2000"
                    block
                    color="success"
                    style="float: right; width: 200px; margin-left: 20px"
                    type="submit"
                    @click="saveAndExit = false"
                    >Save & Continue</CButton
                  >
                  <CButton
                    timeout="2000"
                    block
                    color="danger"
                    style="
                      float: right;
                      width: 140px;
                      margin-left: 20px;
                      margin-top: 0;
                    "
                    @click="saveAndExit = true"
                    type="submit"
                    >Save & Exit</CButton
                  >
                </CRow>
              </CRow>
            </CCardBody>
          </form>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import CustomerSearchField from "@/components/general/CustomerSearchField";
import SearchProduct from "@/components/layouts/SearchProduct";
import SelectSalePerson from "@/components/general/SelectSalePerson";
import { required } from "vuelidate/lib/validators";

export default {
  name: "CreateBrand",
  components: {
    CustomerSearchField,
    SearchProduct,
    SelectSalePerson,
  },
  data: () => ({
    form: {
      customer: "",
      test: "",
      dated: "",
    },
  }),
  validations() {
    return {
      form: {
        // dated: { required },
        // test: { required },
      },
    };
  },
  created() {},
  methods: {
    formSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        alert("Please");
      }
    },
  },
};
</script>

