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
    <CustomerModel
      @update-table="newCustomerAdded"
      @new-data="newData($event)"
    />
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
    previousValue: [Object, String, Function],
    createOnly: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    form: {
      customer: "",
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
    async getCustomers() {
      store.commit("set_loader");
      let customers = this.options.customers;
      let create_only = this.createOnly;
      let default_data = null;
      await new Promise((resolve, reject) => {
        CustomerServices.getAll(1, 10)
          .then(function ({ data }) {
            if (data && data.data) {
              data.data.map(function (item) {
                let contacts = "";
                if (item.all_contacts && item.all_contacts.length > 0) {
                  item.all_contacts.map(function (contact, index) {
                    if (index > 0) {
                      contacts += ",";
                    }
                    if (typeof contact.number == "object") {
                      contacts += contact.number.en;
                    } else {
                      contacts += contact.number;
                    }
                  });
                }
                customers.push({
                  value: item.uuid,
                  label: item.full_name + " (mobile: " + contacts + ")",
                  defaultAddress: item.defaultAddress,
                });
                if (item.full_name == "Walk In Customer" && create_only) {
                  // eslint-disable-next-line no-unused-vars
                  default_data = {
                    label: item.full_name + " (mobile: " + contacts + ")",
                    value: item.uuid,
                    defaultAddress: item.defaultAddress,
                  };
                  //assign object to default_data
                }
              });
              resolve();
            }
            store.commit("close_loader");
          })
          .catch((error) => {
            store.commit("close_loader");
            console.log(error);
          });
      });
      if (default_data) {
        this.form.customer = default_data;
      }
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
                  label: item.full_name + " (mobile: " + contacts + ")",
                  defaultAddress: item.defaultAddress,
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
    newData(item) {
      const obj = {
        value: item.uuid,
        label: item.full_name + " (mobile: " + item.contact.number.en + ")",
        defaultAddress: item.defaultAddress,
      };
      this.options.customers.push(obj);
      this.form.customer = obj;
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
