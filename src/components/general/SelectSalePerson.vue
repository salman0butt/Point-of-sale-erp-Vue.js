<template>
  <div>
    <label class="typo__label">SalesPerson</label>
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
  },
  watch: {
    previousSalesPersons(newValue, oldValue) {
      let users = this.form.user;
      newValue.map(function (item) {
        users.push({ label: item.name, value: item.uuid });
      });
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
  },
  methods: {
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
