<template>
  <div>
    <label class="typo__label">{{ label }}</label>
    <multiselect
      v-model="form.user"
      :options="options.users"
      :multiple="true"
      :close-on-select="false"
      :clear-on-select="false"
      :preserve-search="true"
      placeholder="Select Sales"
      label="label"
      track-by="label"
      :preselect-first="true"
      @input="salesPersonSelected()"
    >
      <template slot="selection" slot-scope="{ values, search, isOpen }">
        <span class="multiselect__single" v-if="values.value &amp;&amp; !isOpen"
          >{{ values.length }} options selected</span
        ></template
      >
    </multiselect>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import UserService from "@/services/users/UserService";
export default {
  name: "SelectSalePerson",
  components: {
    Multiselect,
  },
  props: {
    previousSalesPersons: [Object, String, Array, Function],
    createOnly: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "Sales Person",
    },
  },
  watch: {
    previousSalesPersons(newValue, oldValue) {
      var users = [];
      newValue.map(function (item) {
        users.push({ label: item.name, value: item.uuid });
      });
      this.form.user = users;
    },
  },
  data: () => ({
    form: {
      user: [],
    },
    options: {
      users: [],
    },
  }),
  created() {
    this.getAllUsers();
    if (this.createOnly) {
      this.loggedInUser();
    }
  },
  methods: {
    async loggedInUser() {
      let default_user = "";
      await new Promise((resolve, reject) => {
        UserService.getLoggedInUser()
          .then(function ({ data }) {
            if (data) {
              // eslint-disable-next-line no-const-assign
              default_user = {
                label: data.name,
                value: data.uuid,
              };
            }
            resolve();
          })
          .catch((error) => {
            console.log(error);
          });
      });
      if (default_user) {
        this.form.user = default_user;
        this.$emit("salesPersonSelected", [default_user.value]);
      }
    },

    getAllUsers() {
      let users = this.options.users;
      UserService.getAll(1, 50)
        .then(function ({ data }) {
          data.data.map(function (item) {
            users.push({ value: item.uuid, label: item.name });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    salesPersonSelected() {
      let salesPersonSelected = this.form.user;

      let salesPersonSelectedArray = [];
      salesPersonSelected.map(function (item) {
        salesPersonSelectedArray.push(item.value);
      });
      this.$emit("salesPersonSelected", salesPersonSelectedArray);
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
