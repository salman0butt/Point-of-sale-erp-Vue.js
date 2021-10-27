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
          :value.sync="form.branches"
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
        branches: "",
      },
      options: {
        branches: [{ value: "", label: "Choose Branch", disabled: true, selected: "" }],
      },
    };
  },
  watch: {
    listBranches(branch_list) {
      this.getbranches(branch_list);
    },
  },
  computed: {
    showBranchModel() {
      return this.$store.getters.showBranchModel;
    },
    listBranches() {
      return this.$store.getters.branchLists;
    },
  },
  methods: {
    saveBranch() {
      if (this.form.branches !== "" && this.form.branches !== undefined) {
        localStorage.setItem("selected_branches", JSON.stringify([this.form.branches]));
        this.$store.commit("set_show_branch_model", false);
        this.$store.commit("set_branches", this.form.branches);
      }
    },
    getbranches(list) {
      let branch_list = list;
      this.options.branches = [
        { value: "", label: "Choose Branch", disabled: true, selected: "" },
      ];
      let branches = this.options.branches;
      if (branch_list) {
        branch_list.map(function (val) {
          branches.push({ value: val.uuid, label: val.name });
        });
      }
    },
  },
};
</script>
