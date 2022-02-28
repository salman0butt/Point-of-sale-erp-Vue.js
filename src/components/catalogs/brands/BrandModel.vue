<template>
  <div>
    <CModal
      :title="$t('brands.form.modelTitle')"
      :fade="true"
      :centered="true"
      :closeOnBackdrop="false"
      color="success"
      :show.sync="showBrandModel"
    >
      <template #header>
        <h6 class="modal-title">{{ $t("brands.form.modelTitle") }}</h6>
      </template>
      <BrandForm
        :submit="isSubmit"
        @reset-model="resetModel()"
        @reset-submit="resetSubmit()"
      />
      <template #footer>
        <CButton @click="closeModel()" color="danger">{{
          $t("brands.form.close")
        }}</CButton>
        <CButton @click="saveBrand()" color="success">{{
          $t("brands.form.save")
        }}</CButton>
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
    resetSubmit() {
      this.isSubmit = false;
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
