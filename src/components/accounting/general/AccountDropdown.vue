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
  name: "AccountDropdown",
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
  created() {
    this.setValue();
    this.getData();
  },
  methods: {
    setValue() {
      this.account = this.uuid;
    },
    getData() {
      AccountServices.getActiveAccounts("active")
        .then(({ data }) => {
          let account = this.options.account;
          data.map(function (val) {
            // console.log(val);
            if (!val.parent) {
              // Main Accounts

              account.push({
                value: val.uuid,
                label: val.name,
              });
              //   seconday accounts
              if (val.children.length != 0) {
                val.children.map(function (child) {
                  account.push({
                    value: child.uuid,
                    label: "-" + child.name.en,
                  });
                  if (child.children.length != 0) {
                    child.children.map(function (child2) {
                      account.push({
                        value: child2.uuid,
                        label: "--" + child2.name.en,
                      });
                    });
                  }
                });
              }
            }
          });
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