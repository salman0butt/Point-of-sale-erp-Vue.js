<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form @submit.prevent="isEditing ? updateNote() : saveNote()">
          <CRow>
            <CCol sm="12" md="12" class="pt-2">
              <CTextarea
                label="Notes"
                placeholder="Content..."
                v-model="form.note"
                :class="{ error: $v.form.note.$error }"
                @input="$v.form.note.$touch()"
              />
              <div v-if="$v.form.note.$error">
                <p v-if="!$v.form.note.required" class="errorMsg">Notes is required</p>
              </div>
            </CCol>
          </CRow>

          <p v-if="$v.$anyError" class="errorMsg">Please Fill the required data</p>
          <CRow class="mt-4 d-block">
            <CButton
              progress
              timeout="2000"
              block
              color="success"
              style="float: right; width: 150px; margin-right: 20px"
              type="submit"
              >Save</CButton
            >
          </CRow>
        </form>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import CustomerNoteServices from "@/services/contacts/customers/CustomerNoteServices";
import SupplierNoteServices from "@/services/contacts/supplier/SupplierNoteServices";

import { required } from "vuelidate/lib/validators";

export default {
  name: "NoteForm",
  data: () => ({
    isEditing: false,
    form: {
      note: "",
      module: "",
      data_uuid: null,
    },
    options: {
      set_default: [
        { value: "", label: "Choose Status", disabled: true, selected: "" },
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    },
  }),

  validations() {
    return {
      form: {
        note: { required },
      },
    };
  },
  props: {
    module: String,
  },

  methods: {
    saveNote() {
      // for module customer
      if (this.module == "customer") {
        this.form.module_uuid = this.$route.params.id;
        this.form.module = this.module;
        this.$v.$touch();
        if (!this.$v.$invalid) {
          let data = this.form;
          CustomerNoteServices.store(data)
            .then((res) => {
              if (res.status == 201 || res.status == 200) {
                this.$swal.fire({
                  icon: "success",
                  title: "Success",
                  text: "Note Added Successfully",
                  timer: 3600,
                });
                this.$emit("NoteCreated");
                this.$v.$reset();
                this.resetForm();
              }
            })
            .catch((error) => {
              console.log(error);
              this.$swal.fire({
                icon: "error",
                title: "Error",
                text: "Something Went Wrong.",
                timer: 3600,
              });
            });
        }
      }
      if (this.module == "supplier") {
        this.form.module_uuid = this.$route.params.id;
        this.form.module = this.module;
        this.$v.$touch();
        if (!this.$v.$invalid) {
          let data = this.form;
          SupplierNoteServices.store(data)
            .then((res) => {
              if (res.status == 201 || res.status == 200) {
                this.$swal.fire({
                  icon: "success",
                  title: "Success",
                  text: "Note Added Successfully",
                  timer: 3600,
                });
                this.$emit("NoteCreated");
                this.$v.$reset();
                this.resetForm();
              }
            })
            .catch((error) => {
              console.log(error);
              this.$swal.fire({
                icon: "error",
                title: "Error",
                text: "Something Went Wrong.",
                timer: 3600,
              });
            });
        }
      }
    },
    getEditData(uuid) {
      this.isEditing = true;
      this.form.data_uuid = uuid;
      this.getNote();
    },
    getNote() {
      // for module customer
      if (this.module == "customer") {
        CustomerNoteServices.get(this.form.data_uuid)
          .then(({ data }) => {
            if (data != null && data != "") {
              this.form.note = data.note;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
      if (this.module == "supplier") {
        SupplierNoteServices.get(this.form.data_uuid)
          .then(({ data }) => {
            if (data != null && data != "") {
              this.form.note = data.note;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    updateNote() {
      this.$v.$touch();
      if (this.module == "customer") {
        if (!this.$v.$invalid) {
          let data = this.form;
          CustomerNoteServices.update(this.form.data_uuid, data)
            .then((res) => {
              if (res.status == 200) {
                this.$swal.fire({
                  icon: "success",
                  title: "Success",
                  text: "Note Updated Successfully",
                  timer: 3600,
                });
                this.$emit("NoteCreated");
                this.$v.$reset();
                this.resetForm();
              }
            })
            .catch((error) => {
              console.log(error);
              this.$swal.fire({
                icon: "error",
                title: "Error",
                text: "Something Went Wrong.",
                timer: 3600,
              });
            });
        }
      }
      if (this.module == "supplier") {
        if (!this.$v.$invalid) {
          let data = this.form;
          SupplierNoteServices.update(this.form.data_uuid, data)
            .then((res) => {
              if (res.status == 200) {
                this.$swal.fire({
                  icon: "success",
                  title: "Success",
                  text: "Note Updated Successfully",
                  timer: 3600,
                });
                this.$emit("NoteCreated");
                this.$v.$reset();
                this.resetForm();
              }
            })
            .catch((error) => {
              console.log(error);
              this.$swal.fire({
                icon: "error",
                title: "Error",
                text: "Something Went Wrong.",
                timer: 3600,
              });
            });
        }
      }
    },

    resetForm() {
      for (let index in this.form) {
        this.form[index] = "";
      }
      this.isEditing = false;
    },
  },
};
</script>

<style>
.errorMsg {
  color: red;
}
</style>
