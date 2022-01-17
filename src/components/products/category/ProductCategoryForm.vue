<template>
  <div>
    <CRow>
      <Loader />
      <CCol xs="12" lg="12">
        <form
          @submit.prevent="isEditing ? updateProductCategory() : saveProductCategory()"
        >
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
            <CCol
              v-if="options.parent_categories && options.parent_categories.length"
              sm="6"
              md="4"
              class="pt-2"
            >
              <CSelect
                label="Parent"
                :options="options.parent_categories"
                :value.sync="form.parent_id"
              />
            </CCol>

            <CCol v-if="isEditing" sm="6" md="4" class="pt-2">
              <CSelect
                label="Status"
                :options="options.status"
                :value.sync="form.status"
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <color-panel v-model="form.color"></color-panel>
            </CCol>
            <CCol sm="6" md="8" class="pt-2">
              <app-upload
                ref="fileUpload"
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
import ProductCategoryService from "@/services/products/ProductCategoryService";
import { required } from "vuelidate/lib/validators";
import AppUpload from "@/components/uploads/Upload.vue";
import { cilTrash } from "@coreui/icons-pro";
import Loader from "@/components/layouts/Loader.vue";

export default {
  name: "ProductCategoryForm",
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
      color: "",
      image: "",
      status: "active",
    },
    display_images: null,
    options: {
      parent_categories: [
        { value: "", label: "Choose Parent", disabled: true, selected: "" },
      ],
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
    this.getProductCategoryOptions();
    if (this.form.id !== "" && this.form.id !== undefined) {
      this.isEditing = true;
      this.getProductCategory();
    }
  },
  methods: {
    saveProductCategory() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.commit("set_loader");
        let formData = new FormData();
        formData.append("name", this.form.name);
        formData.append("parent_id", this.form.parent_id);
        formData.append("color", this.form.color);
        formData.append("image", this.form.image);
        formData.append("status", this.form.status);

        const config = {
          headers: { "Content-Type": "multipart/form-data" },
        };
        ProductCategoryService.create(formData, config)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Product Category Added Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.resetForm();
              this.displayData(res.data);
              this.$store.commit("close_loader");

              if (this.saveAndExit) {
                this.$router.push({ path: "/product/category/index" });
              } else {
                this.$router.push({
                  path: "/product/category/edit/" + res.data.uuid,
                });
              }
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
    updateProductCategory() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.commit("set_loader");
        let formData = new FormData();
        formData.append("name", this.form.name);
        formData.append("parent_id", this.form.parent_id);
        formData.append("color", this.form.color);
        formData.append("image", this.form.image);
        formData.append("status", this.form.status);
        formData.append("_method", "PATCH");

        const config = {
          headers: { "Content-Type": "multipart/form-data" },
        };
        ProductCategoryService.update(this.form.id, formData, config)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Product Category Updated Successfully",
                timer: 3600,
              });
              this.resetForm();
              this.$v.$reset();
              this.displayData(res.data);
              this.$store.commit("close_loader");
              if (this.saveAndExit) {
                this.$router.push({ path: "/product/category/index" });
              }
              //  else {
              //   this.$router.push({
              //     path: "/product/category/edit/" + res.data.uuid,
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
    getProductCategory() {
      this.$store.commit("set_loader");
      ProductCategoryService.get(this.form.id)
        .then(({ data }) => {
          this.displayData(data);
          this.$store.commit("close_loader");
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
          this.$router.push({ path: "/product/category/index" });
        });
    },
    getProductCategoryOptions() {
      ProductCategoryService.getProductCategoryOptions()
        .then(({ data }) => {
          if (data != null && data != "") {
            data.forEach((item) => {
              this.options.parent_categories.push({
                value: item.uuid,
                label: item.name,
              });
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    displayData(data = null) {
      if (data != null && data != "") {
        this.isEditing = true;
        this.form.id = data.uuid;
        this.form.name = data.name;
        this.form.color = data.color;
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
