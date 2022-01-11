<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form @submit.prevent="isEditing ? updateModifier() : saveModifier()">
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Name"
                v-model="form.name"
                :class="{ error: $v.form.name.$error }"
                @input="$v.form.name.$touch()"
              />
              <div v-if="$v.form.name.$error">
                <p v-if="!$v.form.name.required" class="errorMsg">Name is required</p>
              </div>
            </CCol>

            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Cost Price"
                placeholder="0.00"
                type="number"
                :value.sync="form.cost_price"
                :class="{ error: $v.form.cost_price.$error }"
                @input="$v.form.cost_price.$touch()"
              />
              <div v-if="$v.form.cost_price.$error">
                <p v-if="!$v.form.cost_price.required" class="errorMsg">
                  Cost Price is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Selling Price"
                placeholder="0.00"
                type="number"
                :value.sync="form.selling_price"
                :class="{
                  error: $v.form.selling_price.$error,
                }"
                @input="$v.form.selling_price.$touch()"
              />
              <div v-if="$v.form.selling_price.$error">
                <p v-if="!$v.form.selling_price.required" class="errorMsg">
                  Selling Price is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Status"
                :options="options.status"
                :value.sync="form.status"
                :class="{ error: $v.form.status.$error }"
                @input="$v.form.status.$touch()"
              />
              <div v-if="$v.form.status.$error">
                <p v-if="!$v.form.status.required" class="errorMsg">Status is required</p>
              </div>
            </CCol>
          </CRow>
          <p v-if="$v.$anyError" class="errorMsg">Please Fill the required data</p>
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
              style="float: right; width: 140px; margin-left: 20px; margin-top: 0"
              @click="saveAndExit = true"
              type="submit"
              >Save & Exit</CButton
            >
          </CRow>
        </form>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import ModifierService from "@/services/modifiers/ModifierService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "ModifierForm",
  data: () => ({
    isEditing: false,
    saveAndExit: false,
    form: {
      id: "",
      name: "",
      cost_price: "",
      selling_price: "",
      status: "active",
    },
    options: {
      status: [
        { value: "", label: "Choose Status", disabled: true, selected: "" },
        { value: "active", label: "Active" },
        { value: "inactive", label: "InActive" },
      ],
    },
  }),
  validations() {
    return {
      form: {
        name: { required },
        cost_price: { required },
        selling_price: { required },
        status: { required },
      },
    };
  },
  created() {
    this.form.id = this.$route.params.id;
    if (this.form.id !== "" && this.form.id !== undefined) {
      this.isEditing = true;
      this.getModifier();
    }
  },
  methods: {
    saveModifier() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        ModifierService.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Modifier Added Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.resetForm();

              if (this.saveAndExit) {
                this.$router.push({ path: "/modifiers/index" });
              } else {
                this.$router.push({
                  path: "/modifiers/edit/" + res.data.uuid,
                });
              }
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
    },
    updateModifier() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        ModifierService.update(this.form.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Modifier Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();

              if (this.saveAndExit) {
                this.$router.push({ path: "/modifiers/index" });
              }
              //  else {
              //   this.$router.push({
              //     path: "/modifiers/edit/" + res.data.uuid,
              //   });
              // }
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
    },
    getModifier() {
      ModifierService.get(this.form.id)
        .then(({ data }) => {
          console.log(data);
          if (data != null && data != "") {
            this.isEditing = true;
            this.form.id = data.uuid;
            this.form.name = data.name;
            this.form.cost_price = data.price?.cost_price;
            this.form.selling_price = data.price?.selling_price;
            this.form.status = data.status;
          }
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
          this.$router.push({ path: "/modifiers/index" });
        });
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
