<template>
  <div>
    <CModal
      title="Create Brand"
      :fade="true"
      :centered="true"
      :closeOnBackdrop="false"
      color="success"
      :show.sync="showBrandModel"
    >
      <template #header>
        <h6 class="modal-title">Create Brand</h6>
      </template>
      <BrandForm :submit="isSubmit" @reset-model="resetModel()" />
      <template #footer>
        <CButton @click="closeModel()" color="danger">Close</CButton>
        <CButton @click="saveBrand()" color="success">Save</CButton>
      </template>
    </CModal>
  </div>
</template>

<script>
import BrandForm from "./BrandForm";
export default {
  name: "BrandModel",
  components: {
    BrandForm,
  },
  data() {
    return {
      isSubmit: false,
    };
  },
  computed: {
    showBrandModel() {
      return this.$store.getters.getBrandModel;
    },
  },
  methods: {
    resetModel() {
      this.isSubmit = false;
      this.$store.commit("set_brand_model", false);
    },
    saveBrand() {
      this.isSubmit = true;

      this.$emit("update-table");
    },
    closeModel() {
      this.isSubmit = false;
      this.$store.commit("set_brand_model", false);
    },
  },
};
</script>
