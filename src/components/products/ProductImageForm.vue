<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Images </CCardHeader>
          <CCardBody>
            <form @submit.prevent="saveProductImages()">
              <CRow>
                <CCol sm="12" md="12" class="pt-2">
                  <app-upload
                    ref="fileUpload"
                    @file:changed="handleFile"
                    fileType="image/jpg,image/jpeg,image/png"
                  />

                  <div class="attachment-display">
                    <ul class="mt-5 d-flex">
                      <li
                        v-for="(img, index) in display_images"
                        v-bind:key="index"
                        class="display-attachment-row"
                      >
                        <div>
                          <span>
                            <img
                              v-bind:src="img.path"
                              class="name-attachment"
                              style="max-width: 80px"
                            />
                          </span>
                        </div>
                        <span
                          >{{ img.name }}
                          <a
                            @click.prevent="deleteAttachment(img.uuid)"
                            class="delete-attachment"
                          >
                            <CIcon :content="$options.cilTrash" /> </a
                        ></span>
                      </li>
                    </ul>
                  </div>
                </CCol>
              </CRow>

              <CRow class="mt-4 d-block">
                <CButton
                  progress
                  timeout="2000"
                  block
                  color="success"
                  style="float: right; width: 150px; margin-right: 20px"
                  type="submit"
                  :disabled="loading"
                  >{{ loading ? "loading..." : "Save" }}</CButton
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
import ProductImageService from "@/services/products/ProductImageService";
import AppUpload from "@/components/uploads/Upload.vue";
import { cilTrash } from "@coreui/icons-pro";

export default {
  name: "ProductImageForm",
  components: {
    AppUpload,
  },
  cilTrash,
  data: () => ({
    form: {
      images: [],
    },
    display_images: [],
    productId: "",
  }),
  created() {
    this.productId = this.$route.params.id;
    if (this.productId !== "" && this.productId !== undefined) {
      this.getProductImages();
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
  },
  methods: {
    getProductImages() {
      ProductImageService.get(this.productId)
        .then(({ data }) => {
          if (data && data.length) {
            this.display_images = [];
            let display_images = this.display_images;
            data.map(function (item) {
              display_images.push(item);
            });
          }
        })
        .catch((error) => {
          console.log(error);
          this.$router.push({ path: "/products" });
        });
    },
    saveProductImages() {
      let formData = new FormData();
      if (this.form.images) {
        for (const i of Object.keys(this.form.images)) {
          formData.append("images[]", this.form.images[i]);
        }
      }
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      this.$store.commit("set_loader");
      ProductImageService.create(this.productId, formData, config)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Product Images Added Successfully",
              timer: 3600,
            });
            this.resetForm();
            this.getProductImages();
            this.$store.commit("close_loader");
          }
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("close_loader");
          if (error.response && error.response.status === 422) {
            let errors = error.response.data.errors;
            for (const err in errors) {
              this.$toast.error(errors[err][0]);
            }
          } else {
            this.$toast.error("Something went wrong.");
          }
        });
    },
    handleFile(files) {
      this.form.images = Object.values(files);
    },
    deleteAttachment(uuid) {
      this.$swal
        .fire({
          title: "Are You Sure You Want to Deleted This Attachment?",
          icon: "warning",
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
                  this.$swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Attachment Deleted Successfully",
                    timer: 3600,
                  });
                  this.display_images = this.display_images.filter(
                    (item) => item.uuid != uuid
                  );
                }
              })
              .catch((error) => {
                if (error.response && error.response.status === 422) {
                  let errors = error.response.data.errors;
                  for (const err in errors) {
                    this.$toast.error(errors[err][0]);
                  }
                } else {
                  this.$toast.error("Something went wrong.");
                }
                console.log(err);
              });
          }
        });
    },
    resetForm() {
      this.form.images = [];
      this.display_images = [];
      this.$refs.fileUpload.reset();
    },
  },
};
</script>

<style scoped>
li.display-attachment-row {
  margin: 1rem;
}
</style>
