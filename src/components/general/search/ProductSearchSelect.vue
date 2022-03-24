<template>
  <div>
    <!-- <label class="typo__label">Products</label> -->
    <multiselect
      v-model="form.product"
      :options="options.products"
      :multiple="false"
      :close-on-select="true"
      :clear-on-select="true"
      :loading="loading"
      placeholder="Search..."
      label="label"
      track-by="label"
      :taggable="true"
      @tag="addTag"
      :preselect-first="true"
      :limit="10"
      @search-change="searchProducts"
      ref="proSelect"
      :block-keys="['Tab', 'Enter']"
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
import ProductService from "@/services/products/ProductService";
import store from "@/store";
export default {
  name: "ProductSearch",
  components: {
    Multiselect,
  },
  props: {
    previousValue: {
      type: [Array, Object],
      default: () => [],
    },
  },

  data: () => ({
    onTouch: false,
    form: {
      product: null,
    },
    options: {
      products: [],
    },
  }),
  computed: {
    products() {
      return this.form.product;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  created() {
    this.getProducts();
  },
  watch: {
    products: {
      handler: function (val) {
        if (val) {
          this.$emit("product-change", val);
        }
      },
      deep: true,
    },
    previousValue: {
      handler: function (val) {
        if (val && val.label) {
          this.form.product = val;
        }
        this.$nextTick();
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    addTag(newTag, isBarcode = false) {
      console.log(newTag);
      let tag = null;
      if (!isBarcode) {
        tag = {
          value: "",
          label: newTag,
          searchType: "empty",
        };
        if (tag) {
          this.options.products.unshift(tag);
          this.form.product = tag;
        }
      } else {
        tag = {
          value: newTag.value,
          label: newTag.label,
          searchType: "product",
          product: newTag.product,
        };
        if (tag) {
          // this.options.products.unshift(tag);
          this.form.product = tag;
          this.$refs.proSelect.deactivate();
        }
      }
    },
    getProducts() {
      store.commit("set_loader");
      let products = this.options.products;
      ProductService.getAll(1, 10)
        .then(function ({ data }) {
          if (data && data.data) {
            data.data.map(function (item) {
              products.push({
                value: item.uuid,
                label: item.name + " (serial: " + item.serial_number + ")",
                product: item,
                searchType: "product",
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
    async searchProducts(searchQuery) {
      if (searchQuery && searchQuery.length > 0) {
        store.commit("set_loader");
        let barcode_item = null;
        this.options.products = [];
        let products = this.options.products;
        await new Promise(function (resolve, reject) {
          ProductService.search(searchQuery)
            .then(function ({ data }) {
              if (data) {
                data.map(function (item) {
                  products.push({
                    value: item.uuid,
                    label: item.name + " (serial: " + item.serial_number + ")",
                    product: item,
                    searchType: "product",
                  });
                });
                barcode_item = data.find((item) => item.barcode === searchQuery);
                resolve();
              }

              store.commit("close_loader");
            })
            .catch((error) => {
              store.commit("close_loader");
              console.log(error);
            });
        });

        if (barcode_item) {
          let serial = barcode_item.serial_number;
          // console.log("🚀 ~ serial", serial);
          let data = {
            value: barcode_item.uuid,
            label: barcode_item.name + " (serial: " + serial + ")",
            product: barcode_item,
            searchType: "product",
          };
          this.addTag(data, true);
          // console.log(data);
          this.$emit("product-change", data);
        }
      }
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
