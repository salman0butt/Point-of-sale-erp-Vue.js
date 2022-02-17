<template>
  <div>
    <CSelect
      label="Parent Account"
      :options="options.account"
      @change="updateValue"
      :value.sync="account"
    />
  </div>
</template>
<script>
import AccountServices from "@/services/accounting/accounts/AccountServices";

export default {
  name: "AccountTypeDropdown",
  props: {
    uuid: String,
  },
  data() {
    return {
      options: {
        account: [
          {
            value: "",
            label: "Choose Parent",
            selected: "",
          },
        ],
      },

      account: "",
    };
  },
  watch: {
    // It listens to the change in prop name
    uuid: function () {
      // console.log("name change"); // print out when the name changes
      this.setValue();
    },
  },
  created() {
    this.setValue();
    this.getData();
  },
  methods: {
    setValue() {
      this.account = this.uuid;
    },
    getData() {
      AccountServices.getAllAccountTypes()
        .then(({ data }) => {
          if (data) {
            let account = this.options.account;
            data.map(function (val) {
              // Main Accounts
              account.push({
                value: val.uuid,
                label: val.name,
                disabled: true,
                custom: true,
                attrs: [{ style: "font-size: 15px; font-weight: bold" }],
              });
              //   seconday accounts
              if (val.children && val.children.length > 0) {
                val.children.map(function (child) {
                  account.push({
                    value: child.uuid,
                    label: "-" + child.name,
                  });
                  //     if (child.accounts && child.accounts.length > 0) {
                  //       child.accounts.map(function (child2) {
                  //         account.push({
                  //           value: child2.uuid,
                  //           label: "--" + child2.name,
                  //           attrs: [
                  //             {
                  //               style:
                  //                 "font-size: 15px; font-weight: bold; color:black",
                  //             },
                  //           ],
                  //         });
                  //       });
                  //     }
                });
              }
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateValue() {
      this.$emit("getAccountDropdown", this.account);
    },
  },
};
</script>
<style scoped>
.coloring {
  color: red;
}
</style>
