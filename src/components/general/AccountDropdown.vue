<template>
  <div>
    <label v-if="showLabel">Select Account</label>
    <multiselect
      v-model="account"
      :options="options.account"
      :close-on-select="true"
      :clear-on-select="false"
      :disabled="isDisabled"
      :preselect-first="true"
      label="label"
    >
    </multiselect>
  </div>
</template>
<script>
import Multiselect from "vue-multiselect";

import AccountServices from "@/services/accounting/accounts/AccountServices";

export default {
  name: "AccountDropdown",
  props: {
    previousValue: [Object, String, Function],
    showLabel: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    Multiselect,
  },
  data() {
    return {
      isDisabled: false,
      options: {
        account: [],
      },
      account: "",
    };
  },
  watch: {
    previousValue: {
      handler: function (val) {
        this.account = val;
      },
      deep: true,
    },
    account: function () {
      this.updateValue();
    },
  },
  created() {
    this.getData();
  },
  methods: {
    // setValue() {
    //   this.account = this.previousValue;
    // },
    getData() {
      AccountServices.getTreeStructure()
        .then(({ data }) => {
          let account = this.options.account;
          data.map(function (val) {
            if (val) {
              // Account type
              account.push({
                value: val.uuid,
                label: val.name,
                $isDisabled: true,
              });
            }
            if (val.children && val.children.length > 0) {
              // Account Subtype

              val.children.map(function (val2) {
                if (val2.accounts && val2.accounts.length > 0) {
                  account.push({
                    value: val2.uuid,
                    label: "-" + val2.name,
                    $isDisabled: true,
                  });
                  val2.accounts.map(function (val3) {
                    account.push({
                      value: val3.uuid,
                      label: "-- " + val3.name,
                    });
                  });
                }
              });
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
<style scoped>
.coloring {
  color: red;
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
