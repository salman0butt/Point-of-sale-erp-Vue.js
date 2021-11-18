<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form @submit.prevent="isEditing ? updateBrand() : saveBrand()">
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

            <CCol v-if="isEditing" sm="6" md="4" class="pt-2">
              <CSelect
                label="Status"
                :options="options.status"
                :value.sync="form.status"
              />
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
import BrandService from "@/services/brands/BrandService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "BrandForm",
  data: () => ({
    isEditing: false,
    saveAndExit: false,
    form: {
      id: "",
      name: "",
      parent_id: "",
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
        // status: { required },
      },
    };
  },
  created() {
    this.form.id = this.$route.params.id;
    if (this.form.id !== "" && this.form.id !== undefined) {
      this.isEditing = true;
      this.getBrand();
    }
  },
  methods: {
    saveBrand() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        BrandService.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Brand Added Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.resetForm();

              if (this.saveAndExit) {
                this.$router.push({ path: "/brands/index" });
              } else {
                this.$router.push({
                  path: "/brands/edit/" + res.data.uuid,
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
    updateBrand() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        BrandService.update(this.form.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Brand Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();

              if (this.saveAndExit) {
                this.$router.push({ path: "/brands/index" });
              }
              //  else {
              //   this.$router.push({
              //     path: "/brands/edit/" + res.data.uuid,
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
    getBrand() {
      BrandService.get(this.form.id)
        .then(({ data }) => {
          console.log(data);
          if (data != null && data != "") {
            this.isEditing = true;
            this.form.id = data.uuid;
            this.form.name = data.name;
            if (data.parent_id !== "" && data.parent_id !== null) {
              this.form.parent_id = data.parent_id;
            }
            this.form.status = data.status;
          }
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
          this.$router.push({ path: "/brands/index" });
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
