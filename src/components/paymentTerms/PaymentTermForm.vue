<template>
  <CRow>
    <CCol xs="12" lg="12">
      <form @submit.prevent="isEditing ? updatePaymentTerm() : createPaymentTerm()">
        <CRow>
          <Loader />
          <CCol sm="12" md="12" class="pt-2">
            <div class="form-group">
              <label for="tax_name">Name</label>
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="Name"
                v-model="form.name"
                @input="$v.form.name.$touch()"
              />
            </div>
            <div v-if="$v.form.name.$error">
              <p v-if="!$v.form.name.required" class="errorMsg">Name is required</p>
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="12" md="12" class="pt-2">
            <vue-editor
              v-model="form.description"
              :editor-toolbar="customToolbar"
            ></vue-editor>
          </CCol>
        </CRow>
      </form>
    </CCol>
  </CRow>
</template>
<script>
import { required } from "vuelidate/lib/validators";
import PaymentTermService from "@/services/paymentTerms/PaymentTermService";
import { VueEditor } from "vue2-editor";
import Loader from "@/components/layouts/Loader";

export default {
  name: "PaymentTermForm",
  components: { VueEditor, Loader },
  props: {
    submit: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    isEditing: false,
    form: {
      id: "",
      name: "",
      description: "",
    },
    customToolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  }),
  watch: {
    submitForm() {
      this.$v.$touch();
      if (this.submit && !this.$v.$invalid) {
        if (this.isEditing) {
          this.updatePaymentTerm();
        } else {
          this.createPaymentTerm();
        }
        this.$emit("reset-model");
      }
    },
    edit(val) {
      this.editPaymentTerm(val);
      this.resetForm();
    },
  },
  computed: {
    submitForm() {
      return this.submit;
    },
    edit() {
      return this.$store.getters.getPaymentTermId;
    },
  },
  validations() {
    return {
      form: {
        name: { required },
      },
    };
  },
  methods: {
    getPaymentTerm(uuid) {
      this.$store.commit("set_loader");
      PaymentTermService.get(uuid)
        .then(({ data }) => {
          if (data) {
            this.form.id = data.uuid;
            this.form.name = data.name;
            this.form.description = data.description;
          }
          this.$store.commit("close_loader");
        })
        .catch((error) => {
          this.$store.commit("close_loader");
          this.isEditing = false;
          console.log(error);
        });
    },
    editPaymentTerm(uuid) {
      if (uuid) {
        this.form.id = uuid;
        this.isEditing = true;
        this.getPaymentTerm(uuid);
      }
    },
    createPaymentTerm() {
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        this.$store.commit("set_loader");
        let data = this.form;
        PaymentTermService.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Payment Term Added Successfully",
                timer: 3600,
              });

              this.resetForm();
              this.$store.commit("set_payment_term_id", "");
              this.$store.commit("close_loader");
            }
          })
          .catch((error) => {
            console.log(error);
            this.$store.commit("close_loader");
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: "Something went Wrong",
              timer: 3600,
            });
          });
      }
    },
    updatePaymentTerm() {
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        this.$store.commit("set_loader");
        let data = this.form;
        if (this.form.id === "" || this.form.id === undefined) {
          this.createPaymentTerm();
        }
        PaymentTermService.update(this.form.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Payment Term Updated Successfully",
                timer: 3600,
              });

              this.resetForm();
              this.$store.commit("set_payment_term_id", "");
              this.$store.commit("close_loader");
            }
          })
          .catch((error) => {
            console.log(error);
            this.$store.commit("close_loader");
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: "Something went Wrong",
              timer: 3600,
            });
          });
      }
    },
    resetForm() {
      this.form.id = "";
      this.form.name = "";
      this.form.description = "";
      this.isEditing = false;
      this.$v.$reset();
    },
  },
};
</script>
