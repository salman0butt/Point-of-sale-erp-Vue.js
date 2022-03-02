<template>
  <div>
    <Loader />
    <CCard>
      <CCardHeader> Credit Payment Account </CCardHeader>
      <CCardBody>
        <CRow>
          <CCol xs="12" lg="12">
            <form @submit.prevent="formSubmit()">
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Credit Limit"
                    type="number"
                    placeholder="0.000"
                    v-model="form.credit_limit"
                    :class="{ error: $v.form.credit_limit.$error }"
                    @input="$v.form.credit_limit.$touch()"
                  />
                  <div v-if="$v.form.credit_limit.$error">
                    <p v-if="!$v.form.credit_limit.required" class="errorMsg">
                      Credit Limit is required
                    </p>
                  </div>
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
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>

    <CRow>
      <CCol xs="6" lg="6">
        <CCard>
          <CCardBody>
            <h3>Total Credit</h3>
            <hr />
            <h5>0.000</h5>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="6" lg="6">
        <CCard>
          <CCardBody>
            <h3>Credit Balance</h3>
            <hr />
            <h5>0.000</h5>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import Loader from "@/components/layouts/Loader";
export default {
  name: "CreditPaymentAccount",
  components: { Loader },
  data: () => ({
    isEditing: false,
    form: {
      id: "",
      credit_limit: "",
    },
  }),
  props: {
    module: {
      type: String,
      required: true,
    },
  },
  validations() {
    return {
      form: {
        credit_limit: { required },
      },
    };
  },
  created() {
    this.form.id = this.$route.params.id;
    console.log(this.form.id);
    this.displayData();
  },
  computed: {},
  methods: {
    formSubmit() {
      if (this.$v.form.$invalid) {
        this.$v.form.$touch();
        return;
      }
      let url = "";
      if (this.module === "customer") {
        url = `/customers/${this.form.id}/credit-limit`;
      } else {
        url = `/supplier/${this.form.id}/credit-limit`;
      }
      this.$store.commit("set_loader");
      this.$http
        .post(url, {
          credit_limit: this.form.credit_limit,
        })
        .then(({ data }) => {
          console.log(data);
          this.$swal.fire({
            icon: "success",
            title: "Success",
            text: "Credit Limit Updated",
            timer: 3600,
            timerProgressBar: true,
            confirmButtonText: this.$t("general.swal.ok"),
          });
          this.displayData();
          this.$store.commit("close_loader");
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("close_loader");
          this.$swal.fire({
            icon: "error",
            title: "Error",
            text: this.$t("general.swal.errorMsg"),
            timer: 3600,
          });
        });
    },
    displayData() {
      this.$store.commit("set_loader");

      let url = "";
      if (this.module === "customer") {
        url = `/customers/${this.form.id}`;
      } else {
        url = `/supplier/${this.form.id}`;
      }
      this.$http
        .get(url)
        .then(({ data }) => {
          if (data) {
            this.form.id = data.uuid;
            this.form.credit_limit = data.credit_limit;
          }

          this.$store.commit("close_loader");
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("close_loader");
          this.$swal.fire({
            icon: "error",
            title: "Error",
            text: this.$t("general.swal.errorMsg"),
            timer: 3600,
          });
        });
    },
    // resetForm() {
    //   for (let index in this.form) {
    //     this.form[index] = "";
    //   }
    //   this.isEditing = false;
    // },
  },
};
</script>
