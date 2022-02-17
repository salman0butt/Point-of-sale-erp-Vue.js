<template>
  <div>
    <label class="typo__label">Suppliers</label>
    <multiselect
      v-model="form.supplier"
      :options="options.suppliers"
      :multiple="true"
      :close-on-select="false"
      :clear-on-select="false"
      :preserve-search="true"
      :loading="loading"
      placeholder="Search..."
      label="label"
      track-by="label"
      :preselect-first="true"
      :limit="10"
      @search-change="searchSuppliers"
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
import SupplierServices from "@/services/contacts/supplier/SupplierServices";
import store from "@/store";
export default {
  name: "SupplierSearch",
  components: {
    Multiselect,
  },
  props: {
    previousValue: {
      type: Array,
      default: () => [],
    },
  },

  data: () => ({
    form: {
      supplier: [],
    },
    options: {
      suppliers: [],
    },
  }),
  computed: {
    suppliers() {
      return this.form.supplier;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  created() {
    this.getSuppliers();
  },
  watch: {
    suppliers: {
      handler: function (val) {
        this.$emit("supplier-change", val);
      },
      deep: true,
    },
    previousValue: {
      handler: function (val) {
        if (val) {
          this.form.supplier = val;
        }
      },
      deep: true,
    },
  },
  methods: {
    getSuppliers() {
      store.commit("set_loader");
      let suppliers = this.options.suppliers;
      SupplierServices.getAll(1, 10)
        .then(function ({ data }) {
          if (data && data.data) {
            data.data.map(function (item) {
              suppliers.push({
                value: item.uuid,
                label: item.name + " (serial: " + item.serial_no + ")",
              });
            });
          }
          store.commit("close_loader");
        })
        .catch((error) => {
          store.commit("close_loader");
          console.log(error);
        });
    },
    searchSuppliers(searchQuery) {
      if (searchQuery && searchQuery.length > 0) {
        store.commit("set_loader");
        this.options.suppliers = [];
        let suppliers = this.options.suppliers;
        SupplierServices.searchSuppliers(searchQuery)
          .then(function ({ data }) {
            if (data) {
              data.map(function (item) {
                suppliers.push({
                  value: item.uuid,
                  label: item.name + " (serial: " + item.serial_no + ")",
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
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
