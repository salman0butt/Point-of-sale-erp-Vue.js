<template>
  <div>
    <label @click="quickAddCustomer()"
      >Customer
      <a v-if="$can('create groups')" href="#">
        <CIcon :content="$options.cibAddthis" /></a
    ></label>
    <CInput
      v-model="search"
      @input="searchCustomer()"
      placeholder="Search..."
    /><br />
    <ul
      v-if="options.customers && options.customers.length > 0"
      class="search-content"
    >
      <li
        v-for="(item, key) in options.customers"
        :key="key"
        @click="addOptions(item)"
      >
        {{ item.label }}
      </li>
    </ul>
    <CustomerModel @update-table="newCustomerAdded" />
  </div>
</template>
<script>
import CustomerModel from "@/components/contacts/customers/CustomerModel";
import { required } from "vuelidate/lib/validators";
import CustomerServices from "@/services/contacts/customers/CustomerServices";
import { cibAddthis } from "@coreui/icons-pro";

export default {
  name: "CustomerSearchField",
  components: {
    CustomerModel,
  },
  cibAddthis,
  props: {
    previousValueCustomer: [Object, String, Array, Function],
  },
  data: () => ({
    search: "",
    customer: "",
    options: {
      customers: [],
    },
  }),

  validations() {
    return {
      form: {
        name: { required },
      },
    };
  },
  watch: {
    previousValueCustomer(newValue, oldValue) {
      this.search =
        newValue.full_name.en + " (Sr No: " + newValue.serial_no + ")";
      this.customer = newValue.uuid;
    },
  },
  created() {},
  methods: {
    quickAddCustomer() {
      this.$store.commit("set_customer_model", true);
    },
    newCustomerAdded() {
      // this.$emit("newCustomerAdded", this.customer);
    },
    searchCustomer() {
      if (this.search !== "") {
        this.list = [];
        this.options.customers = [];
        CustomerServices.search(this.search)
          .then(({ data }) => {
            if (data !== undefined && data !== "") {
              this.options.customers = [];
              data.map((customer) => {
                if (customer) {
                  this.options.customers.push({
                    value: customer.uuid,
                    label:
                      customer.full_name +
                      " (Sr No: " +
                      customer.serial_no +
                      ")",
                  });
                }
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.search = "";
        this.list = [];
        this.options.customers = [];
      }
    },
    addOptions(item) {
      this.search = item.label;
      this.options.customers = [];
      this.customer = item.value;
      this.$emit("customerSelected", this.customer);
    },
  },
};
</script>
<style scoped>
.search-content {
  position: absolute;
  top: 4rem;
  width: 99%;
  background-color: #fff !important;
  z-index: 99;
  padding: 10px 20px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  cursor: pointer;
  font-weight: 600;
}
.search-content li {
  list-style-type: none;
  padding: 5px 0;
  border-bottom: 1px solid #80808045;
}
</style>
