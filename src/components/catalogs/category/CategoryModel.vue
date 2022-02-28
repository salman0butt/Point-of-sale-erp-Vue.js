<template>
  <div>
    <CModal
      :title="$t('categories.form.modelTitle')"
      :fade="true"
      :centered="true"
      :closeOnBackdrop="false"
      color="success"
      :show.sync="showCategoryModel"
    >
      <template #header>
        <h6 class="modal-title">{{ $t("categories.form.modelTitle") }}</h6>
      </template>
      <CategoryForm :submit="isSubmit" @reset-model="resetModel()" />
      <template #footer>
        <CButton @click="closeModel()" color="danger">{{
          $t("categories.form.close")
        }}</CButton>
        <CButton @click="saveCategory()" color="success">{{
          $t("categories.form.save")
        }}</CButton>
      </template>
    </CModal>
  </div>
</template>

<script>
import CategoryForm from "./CategoryForm";
export default {
  name: "CategoryModel",
  components: {
    CategoryForm,
  },
  data() {
    return {
      isSubmit: false,
    };
  },
  computed: {
    showCategoryModel() {
      return this.$store.getters.getCategoryModel;
    },
  },
  methods: {
    resetModel() {
      this.isSubmit = false;
      this.$store.commit("set_category_model", false);
    },
    saveCategory() {
      this.isSubmit = true;
      this.$emit("update-table");
    },
    closeModel() {
      this.isSubmit = false;
      this.$store.commit("set_category_model", false);
    },
  },
};
</script>
