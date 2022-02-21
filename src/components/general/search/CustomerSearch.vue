<template>
  <div>
    <label class="typo__label" @click="quickAddCustomer()"
      >Customer
      <a v-if="$can('create groups')" href="#">
        <CIcon :content="$options.cibAddthis" /></a
    ></label>
    <multiselect
      v-model="form.customer"
      :options="options.customers"
      :multiple="false"
      :close-on-select="true"
      :clear-on-select="false"
      :preserve-search="true"
      :loading="loading"
      placeholder="Search..."
      label="label"
      track-by="label"
      :preselect-first="true"
      :limit="10"
      @search-change="searchCustomers"
    >
      <template slot="selection" slot-scope="{ values, search, isOpen }">
        <span class="multiselect__single" v-if="values.value &amp;&amp; !isOpen"
          >{{ values.length }} options selected</span
        ></template
      >
    </multiselect>
    <CustomerModel @update-table="newCustomerAdded" />
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import CustomerServices from "@/services/contacts/customers/CustomerServices";
import CustomerModel from "@/components/contacts/customers/CustomerModel";

import { cibAddthis } from "@coreui/icons-pro";

import store from "@/store";
export default {
  name: "CustomerSearch",
  components: {
    Multiselect,
    CustomerModel,
  },
  cibAddthis,

  props: {
    previousValue: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    form: {
      customer: [],
    },
    options: {
      customers: [],
    },
  }),
  computed: {
    customers() {
      return this.form.customer;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  async created() {
    await this.getCustomers();
  },
  watch: {
    customers: {
      handler: function (val) {
        this.$emit("customer-change", val);
      },
      deep: true,
    },
    previousValue: {
      handler: function (val) {
        if (val) {
          this.form.customer = val;
        }
      },
      deep: true,
    },
  },
  methods: {
    getCustomers() {
      store.commit("set_loader");
      let customers = this.options.customers;
      CustomerServices.getAll(1, 10)
        .then(function ({ data }) {
          if (data && data.data) {
            data.data.map(function (item) {
              customers.push({
                value: item.uuid,
                label: item.full_name + " (serial: " + item.serial_no + ")",
              });
              if (
                item.full_name == "Walk In Customer" ||
                item.full_name.en == "Walk In Customer"
              ) {
                // default_customer = {
                //   label: item.full_name + " (serial: " + item.serial_no + ")",
                //   value: item.uuid,
                // };
              }
            });
          }
          store.commit("close_loader");
        })
        .catch((error) => {
          store.commit("close_loader");
          console.log(error);
        });
    },
    searchCustomers(searchQuery) {
      if (searchQuery && searchQuery.length > 0) {
        store.commit("set_loader");
        this.options.customers = [];
        let customers = this.options.customers;
        CustomerServices.search(searchQuery)
          .then(function ({ data }) {
            if (data) {
              data.map(function (item) {
                customers.push({
                  value: item.uuid,
                  label: item.full_name + " (serial: " + item.serial_no + ")",
                });
              });
            }
            store.commit("close_loader");
          })
          .catch((error) => {
            store.commit("close_loader");
            console.log(error);
          });
      }
    },
    quickAddCustomer() {
      this.$store.commit("set_customer_model", true);
    },
    newCustomerAdded() {
      // this.$emit("newCustomerAdded", this.customer);
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
