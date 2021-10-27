<template>
  <div>
    <CModal
      title="Modal title"
      :fade="true"
      :centered="true"
      :closeOnBackdrop="false"
      color="success"
      :show.sync="showBranchModel"
    >
      <form>
        <CSelect
          label="Branches"
          :options="options.branches"
          :value.sync="form.branches_id"
        />
      </form>
      <template #header>
        <h6 class="modal-title">Select Branches</h6>
      </template>
      <template #footer>
        <CButton @click="saveBranch()" color="success">Save</CButton>
      </template>
    </CModal>
  </div>
</template>

<script>
export default {
  name: "BranchModel",
  data() {
    return {
      form: {
        branches_id: "",
      },
      // showBranchModel: this.$store.getters.showBranchModel,
      options: {
        branches: [{ value: "", label: "Choose Branch", disabled: true, selected: "" }],
      },
    };
  },
  computed: {
    showBranchModel() {
      return this.$store.getters.showBranchModel;
    },
  },
  mounted() {
    let branch_list = this.$store.getters.branchLists;
    let branches = this.options.branches;
    if (branch_list) {
      branch_list.map(function (val) {
        branches.push({ value: val.uuid, label: val.name });
      });
    }
  },
  methods: {
    saveBranch() {
      if (this.form.branches_id !== "" && this.form.branches_id !== undefined) {
        localStorage.setItem("selected_branch", this.form.branches_id);
        this.$store.commit("set_show_branch_model", false);
        this.$store.commit("set_branches", this.form.branches_id);
      }
    },
  },
};
</script>
