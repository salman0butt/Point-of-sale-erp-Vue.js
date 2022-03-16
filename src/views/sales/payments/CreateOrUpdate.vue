<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader
            >{{ isEditing ? $t("brands.form.editBrand") : $t("brands.form.newBrand") }}
          </CCardHeader>
          <CCardBody>
            <CRow>
              <Loader />
              <CCol xs="12" lg="12">
                <form @submit.prevent="isEditing ? updateBrand() : saveBrand()">
                  <CRow>
                    <CCol
                      :sm="isEditing ? '6' : '12'"
                      :md="isEditing ? '6' : '12'"
                      class="pt-2"
                    >
                      <CInput
                        :label="$t('brands.form.name')"
                        v-model="form.name"
                        :class="{ error: $v.form.name.$error }"
                        @input="$v.form.name.$touch()"
                      />
                      <div v-if="$v.form.name.$error">
                        <p v-if="!$v.form.name.required" class="errorMsg">
                          {{ $t("brands.form.validations.name.required") }}
                        </p>
                      </div>
                    </CCol>

                    <CCol
                      v-if="isEditing"
                      :sm="isEditing ? '6' : '12'"
                      :md="isEditing ? '6' : '12'"
                      class="pt-2"
                    >
                      <CSelect
                        :label="$t('brands.form.status')"
                        :options="options.status"
                        :value.sync="form.status"
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol sm="12" md="12" class="pt-2">
                      <label for="brand_logo">{{ $t("brands.form.logo") }}</label>
                      <app-upload
                        ref="fileUpload"
                        class="col-md-12"
                        :max="1"
                        fileType="image/jpg,image/jpeg,image/png"
                        @file:changed="handleFile"
                      />

                      <div v-if="display_images && isEditing" class="attachment-display">
                        <ul class="mt-5 d-flex">
                          <li class="display-attachment-row">
                            <div>
                              <span>
                                <img
                                  v-bind:src="display_images.path"
                                  class="name-attachment"
                                  style="max-width: 80px"
                                />
                              </span>
                            </div>
                            <span
                              >{{ display_images.name }}
                              <a
                                @click.prevent="deleteAttachment(display_images.uuid)"
                                class="delete-attachment"
                              >
                                <CIcon :content="$options.cilTrash" /> </a
                            ></span>
                          </li>
                        </ul>
                      </div>
                    </CCol>
                  </CRow>
                  <p v-if="$v.$anyError" class="errorMsg">
                    {{ $t("general.validationError") }}
                  </p>
                  <CRow class="mt-4">
                    <CButton
                      progress
                      timeout="2000"
                      block
                      color="success"
                      style="float: right; width: 200px; margin-left: 20px"
                      type="submit"
                      @click="saveAndExit = false"
                      >{{ $t("brands.form.saveAndContinue") }}</CButton
                    >
                    <CButton
                      timeout="2000"
                      block
                      color="danger"
                      style="float: right; width: 140px; margin-left: 20px; margin-top: 0"
                      @click="saveAndExit = true"
                      type="submit"
                      >{{ $t("brands.form.saveAndExit") }}</CButton
                    >
                  </CRow>
                </form>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import BrandService from "@/services/catalogs/brands/BrandService";
import { required } from "vuelidate/lib/validators";
import AppUpload from "@/components/uploads/Upload.vue";
import { cilTrash } from "@coreui/icons-pro";
import Loader from "@/components/layouts/Loader.vue";

export default {
  name: "CreateOrUpdateBrand",
  components: {
    AppUpload,
    Loader,
  },
  cilTrash,
  data: () => ({
    isEditing: false,
    saveAndExit: false,
    form: {
      id: "",
      name: "",
      parent_id: "",
      image: "",
      status: "active",
    },
    display_images: null,
    options: {
      status: [],
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
    this.getStatus();
    this.form.id = this.$route.params.id;
    if (this.form.id !== "" && this.form.id !== undefined) {
      this.isEditing = true;
      this.getBrand();
    }
  },
  methods: {
    getStatus() {
      this.options.status = [
        {
          value: "",
          label: this.$t("general.status.choose"),
          disabled: true,
          selected: "",
        },
        { value: "active", label: this.$t("general.status.active") },
        { value: "inactive", label: this.$t("general.status.inactive") },
      ];
    },
    saveBrand() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.commit("set_loader");
        let formData = new FormData();
        formData.append("name", this.form.name);
        formData.append("status", this.form.status);
        formData.append("image", this.form.image);
        formData.append("parent_id", this.form.parent_id);

        const config = {
          headers: { "Content-Type": "multipart/form-data" },
        };
        // let data = this.form;
        BrandService.create(formData, config)
          .then((res) => {
            if (res.status == 201) {
              this.displayData(res.data);
              this.$swal.fire({
                icon: "success",
                title: this.$t("general.swal.success"),
                text: this.$t("brands.form.successMsg"),
                timer: 3600,
                timerProgressBar: true,
                confirmButtonText: this.$t("general.swal.ok"),
              });
              this.$v.$reset();
              this.resetForm();
              this.$store.commit("close_loader");
              if (this.saveAndExit) {
                this.$router.push({ path: "/catalogs/brands/index" });
              } else {
                this.$router.push({
                  path: "/catalogs/brands/edit/" + res.data.uuid,
                });
              }
            }
          })
          .catch((error) => {
            console.log(error);
            this.$store.commit("close_loader");
            this.$swal.fire({
              icon: "error",
              title: this.$t("general.swal.error"),
              text: this.$t("general.swal.errorMsg"),
              timer: 3600,
            });
          });
      }
    },
    updateBrand() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.commit("set_loader");
        let formData = new FormData();
        formData.append("name", this.form.name);
        formData.append("status", this.form.status);
        formData.append("image", this.form.image);
        formData.append("parent_id", this.form.parent_id);
        formData.append("_method", "PATCH");

        const config = {
          headers: { "Content-Type": "multipart/form-data" },
        };
        BrandService.update(this.form.id, formData, config)
          .then((res) => {
            if (res.status == 200) {
              this.displayData(res.data);
              this.$swal.fire({
                icon: "success",
                title: this.$t("general.swal.success"),
                text: this.$t("brands.form.updateMsg"),
                timer: 3600,
                timerProgressBar: true,
                confirmButtonText: this.$t("general.swal.ok"),
              });
              this.$v.$reset();
              this.$store.commit("close_loader");
              if (this.saveAndExit) {
                this.$router.push({ path: "/catalogs/brands/index" });
              }
              //  else {
              //   this.$router.push({
              //     path: "/catalogs/brands/edit/" + res.data.uuid,
              //   });
              // }
            }
          })
          .catch((error) => {
            console.log(error);
            this.$store.commit("close_loader");
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
      this.$store.commit("set_loader");
      BrandService.get(this.form.id)
        .then(({ data }) => {
          this.displayData(data);
          this.$store.commit("close_loader");
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("close_loader");
          this.isEditing = false;
          this.$router.push({ path: "/catalogs/brands/index" });
        });
    },
    displayData(data = null) {
      if (data != null && data != "") {
        this.resetForm();
        this.isEditing = true;
        this.form.id = data.uuid;
        this.form.name = data.name;
        if (data.parent_id !== "" && data.parent_id !== null) {
          this.form.parent_id = data.parent_id ?? "";
        }
        this.form.status = data.status;
        this.display_images = data.image ?? "";
        this.form.image = "";
      }
    },
    handleFile(files) {
      this.form.image = files[0];
    },
    deleteAttachment(uuid) {
      this.$swal
        .fire({
          title: "Do you want to delete this Attachment",
          text: "This will be Deleted from Database",
          showCancelButton: true,
          confirmButtonColor: "#e55353",
          confirmButtonText: "Yes, remove it it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$store
              .dispatch("deleteAttachment", uuid)
              .then((res) => {
                if (res.status == 200) {
                  this.$store.commit("set_loader");
                  this.$swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Attachment Deleted Successfully",
                    timer: 3600,
                  });
                  this.display_images = null;
                  this.$store.commit("close_loader");
                }
              })
              .catch((err) => {
                console.log(err);
                this.$swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Something went Wrong",
                  timer: 3600,
                });
                this.$store.commit("close_loader");
                console.log(err);
              });
          }
        });
    },
    resetForm() {
      for (let index in this.form) {
        this.form[index] = "";
      }
      this.isEditing = false;
      this.$refs.fileUpload.reset();
    },
  },
};
</script>
