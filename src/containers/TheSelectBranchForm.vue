<template>
  <div>
    <form>
      <CSelect
        :options="options.branches"
        :value.sync="form.branches"
        @change="saveBranch()"
        readonly
      />
    </form>
  </div>
</template>

<script>
export default {
  name: "TheSelectBranchForm",
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
  created() {
    this.getbranches(this.$store.getters.branchLists);
  },
  computed: {
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
        this.$swal.fire({
          icon: "success",
          title: "Success",
          text: "Branch Updated Successfully",
          timer: 3600,
        });
        this.$router.go(this.$router.currentRoute);
      }
    },
    getbranches(list) {
      let branch_list = list;
      this.options.branches = [
        { value: "", label: "Choose Branch", disabled: true, selected: "" },
      ];
      let branches = this.options.branches;
      if (branch_list) {
        const selected_branch = JSON.parse(localStorage.getItem("selected_branches"));
        if (selected_branch) {
          this.form.branches = selected_branch[0];
        }
        branch_list.map(function (val) {
          branches.push({
            value: val.uuid,
            label: val.name,
          });
        });
      }
    },
  },
};
</script>
<style scoped>
.form-group {
  margin-bottom: 0 !important;
}
</style>
