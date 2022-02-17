<template>
  <div>
    <CCard>
      <CCardHeader>
        Customer Report
        <CButton
          @click="toggleSection()"
          style="float: right; border: none; box-shadow: none"
          >{{ toggleOptions ? "-" : "+" }}</CButton
        ></CCardHeader
      >
      <CCardBody v-if="toggleOptions">
        <CRow>
          <CCol xs="12" lg="12">
            <form @submit.prevent="">
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Date Range"
                    :options="options.date_ranges"
                    :value.sync="form.date_range"
                    :class="{ error: $v.form.date_range.$error }"
                    @input="$v.form.date_range.$touch()"
                  />
                  <div v-if="$v.form.date_range.$error">
                    <p v-if="!$v.form.date_range.required" class="errorMsg">
                      Date Range is required
                    </p>
                  </div>
                </CCol>

                <CCol
                  v-if="form.date_range === 'custom_date_range'"
                  sm="6"
                  md="4"
                  class="pt-2"
                >
                  <CInput
                    label="From Date"
                    type="date"
                    :value.sync="form.from_date"
                    :class="{ error: $v.form.from_date.$error }"
                    @input="$v.form.from_date.$touch()"
                  />
                  <div v-if="$v.form.from_date.$error">
                    <p v-if="!$v.form.from_date.required" class="errorMsg">
                      From Date is required
                    </p>
                  </div>
                </CCol>
                <CCol
                  v-if="form.date_range === 'custom_date_range'"
                  sm="6"
                  md="4"
                  class="pt-2"
                >
                  <CInput
                    label="To Date"
                    type="date"
                    :value.sync="form.to_date"
                    :class="{ error: $v.form.to_date.$error }"
                    @input="$v.form.to_date.$touch()"
                  />
                  <div v-if="$v.form.to_date.$error">
                    <p v-if="!$v.form.to_date.required" class="errorMsg">
                      TO Date is required
                    </p>
                  </div>
                </CCol>

                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Customer"
                    :options="options.customers"
                    :value.sync="form.customer"
                  />
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Total Spent"
                    :options="options.total_spent"
                    :value.sync="form.total_spent"
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Sale Type"
                    :options="options.sale_types"
                    :value.sync="form.sale_type"
                  />
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Customer Group"
                    :options="options.customer_groups"
                    :value.sync="form.ustomer_group"
                  />
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Birthday Date"
                    type="date"
                    :value.sync="form.birthday_date"
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="3" class="pt-2">
                  <CSelect
                    label="Select Custom Field"
                    :options="options.custom_fields"
                    :value.sync="form.custom_field"
                  />
                </CCol>
                <CCol sm="6" md="3" class="pt-2">
                  <CSelect
                    label="Action"
                    :options="options.actions"
                    :value.sync="form.action"
                  />
                </CCol>
                <CCol sm="6" md="3" class="pt-2">
                  <CInput label="Data" :value.sync="form.data" />
                </CCol>
                <CCol sm="6" md="3" class="pt-2">
                  <CButton
                    progress
                    timeout="2000"
                    block
                    color="success"
                    style="margin-top: 30px"
                    >+</CButton
                  >
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="3" class="pt-2">
                  <CButton
                    progress
                    timeout="2000"
                    block
                    color="success"
                    style="margin-top: 30px"
                    @click="genrateReport()"
                    >Genrate Report</CButton
                  >
                </CCol>
              </CRow>
            </form>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
    <CRow style="display: flex; justify-content: flex-end; margin-bottom: 20px">
      <CCol sm="2" md="2">
        <CButton color="success" class="btn-block"> Download PDF</CButton>
      </CCol>
      <CCol sm="2" md="2">
        <CButton color="primary" class="btn-block"> Print Report</CButton>
      </CCol>
    </CRow>
    <CCard>
      <CCardHeader> Result </CCardHeader>
      <CCardBody>
        <div>
          <CDataTable
            :items="items"
            :fields="fields"
            table-filter
            items-per-page-select
            @pagination-change="changePagination"
            :items-per-page="perPage"
            sorter
            clickable-rows
            hover
            :loading="loading"
            @row-clicked="rowClicked"
            ref="externalAgent"
          >
          </CDataTable>
          <CPagination v-show="pages > 1" :pages="pages" :active-page.sync="activePage" />
        </div>
      </CCardBody>
    </CCard>
  </div>
</template>
<script>
import { cibAddthis, cisMinusSquare } from "@coreui/icons-pro";
import CustomerServices from "@/services/contacts/customers/CustomerServices";
import GroupServices from "@/services/groups/GroupServices";
import { tableMixin } from "@/mixins/tableMixin";
import { required } from "vuelidate/lib/validators";

const fields = [
  { key: "custmer_name", label: "CUSTOMER NAME", _style: "width:50%" },
  { key: "phone_number", label: "PHONE NUMBER", _style: "width:30%;" },
  { key: "email", label: "EMAIL", _style: "width:30%;" },
  { key: "address", label: "ADDRESS", _style: "width:30%;" },
  { key: "group", label: "GROUP", _style: "width:20%;" },
  { key: "total_spent", label: "TOTAL SPENT", _style: "width:30%;" },
  { key: "sale_type", label: "SALE TYPE", _style: "width:30%;" },
  { key: "birthday_date", label: "BIRTHDAY DATE", _style: "width:30%;" },
  { key: "created_at", label: "CREATED AT", _style: "width:30%;" },
];

export default {
  name: "CustomerReport",
  mixins: [tableMixin],
  cibAddthis,
  cisMinusSquare,
  data: () => ({
    perPage: 25,
    data: [
      {
        id: 1,
        custmer_name: "John Doe",
        phone_number: "123456789",
        email: "test@example.com",
        address: "123 Main St",
        group: "Group1",
        total_spent: "100",
        sale_type: "return",
        birthday_date: "12/12/12",
        created_at: "12/12/12",
      },
      {
        id: 1,
        custmer_name: "John Doe",
        phone_number: "123456789",
        email: "test@example.com",
        address: "123 Main St",
        group: "Group1",
        total_spent: "100",
        sale_type: "return",
        birthday_date: "12/12/12",
        created_at: "12/12/12",
      },
      {
        id: 1,
        custmer_name: "John Doe",
        phone_number: "123456789",
        email: "test@example.com",
        address: "123 Main St",
        group: "Group1",
        total_spent: "100",
        sale_type: "return",
        birthday_date: "12/12/12",
        created_at: "12/12/12",
      },
      {
        id: 1,
        custmer_name: "John Doe",
        phone_number: "123456789",
        email: "test@example.com",
        address: "123 Main St",
        group: "Group1",
        total_spent: "100",
        sale_type: "return",
        birthday_date: "12/12/12",
        created_at: "12/12/12",
      },
      {
        id: 1,
        custmer_name: "John Doe",
        phone_number: "123456789",
        email: "test@example.com",
        address: "123 Main St",
        group: "Group1",
        total_spent: "100",
        sale_type: "return",
        birthday_date: "12/12/12",
        created_at: "12/12/12",
      },
    ],
    fields,
    toggleOptions: true,
    form: {
      date_range: "",
      customer: "",
      total_spent: "",
      sale_type: "",
      customer_group: "",
      birthday_date: "",
      custom_field: "",
      action: "",
      data: "",
      from_date: "",
      to_date: "",
    },
    options: {
      date_ranges: [
        { value: "", label: "Choose Date Range", disabled: true, selected: "" },
        { value: "today", label: "Today" },
        { value: "yesterday", label: "Yesterday" },
        { value: "last_7_days", label: "Last 7 Days" },
        { value: "last_30_days", label: "Last 30 Days" },
        { value: "this_week", label: "This Week" },
        { value: "last_week", label: "Last Week" },
        { value: "this_month", label: "This Month" },
        { value: "last_month", label: "Last Month" },
        { value: "this_quarter", label: "This Quarter" },
        { value: "last_quarter", label: "Last Quarter" },
        { value: "this_year", label: "This Year" },
        { value: "last_year", label: "Last Year" },
        { value: "all_times", label: "All Times" },
        { value: "custom_date_range", label: "Custom Date Range" },
      ],
      customers: [{ value: "", label: "Choose Customer" }],
      total_spent: [
        { value: "", label: "Choose Total Spent" },
        { value: "any_amount", label: "Any Amount" },
        { value: "grater", label: "Greater Than (>)" },
        { value: "less", label: "Less Than (<)" },
        { value: "equal", label: "Equal To (=)" },
      ],
      sale_types: [
        { value: "", label: "Choose Sale Type" },
        { value: "sale", label: "Sales" },
        { value: "return", label: "Return" },
      ],
      customer_groups: [{ value: "", label: "Choose Customer Group" }],
      custom_fields: [
        { value: "", label: "Choose Custom Field", disabled: true, selected: "" },
        { value: "custom_field_1", label: "Custom Field 1" },
        { value: "custom_field_2", label: "Custom Field 2" },
        { value: "custom_field_3", label: "Custom Field 3" },
        { value: "custom_field_4", label: "Custom Field 4" },
        { value: "custom_field_5", label: "Custom Field 5" },
      ],
      actions: [
        { value: "", label: "Choose Action", disabled: true, selected: "" },
        { value: "any_amount", label: "Any Amount" },
        { value: "grater", label: "Greater Than (>)" },
        { value: "less", label: "Less Than (<)" },
        { value: "equal", label: "Equal To (=)" },
      ],
    },
  }),
  created() {
    // this.getData();
    this.getAllCustomers();
    this.getCustomerGroups();
  },
  computed: {
    items() {
      return this.data;
    },
  },
  validations() {
    if (this.form.date_range === "custom_date_range") {
      return {
        form: {
          date_range: { required },
          from_date: { required },
          to_date: { required },
        },
      };
    } else {
      return {
        form: {
          date_range: { required },
        },
      };
    }
  },
  methods: {
    toggleSection() {
      this.toggleOptions = !this.toggleOptions;
    },
    getCustomers(val) {
      console.log(val);
    },
    genrateReport() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.toggleSection();
        console.log(this.form);
      }
    },
    getAllCustomers() {
      this.$store.commit("set_loader");
      CustomerServices.getAllCustomers()
        .then((res) => {
          if (res.status === 200) {
            const { data } = res;
            if (data) {
              data.map((customer) => {
                this.options.customers.push({
                  value: customer.uuid,
                  label: customer.full_name,
                });
              });
            }

            this.$store.commit("close_loader");
          }
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("close_loader");
        });
    },
    getCustomerGroups() {
      let active = "active";
      let module_type = "customer";
      GroupServices.getActivegroups(active, module_type)
        .then(({ data }) => {
          let group = this.options.customer_groups;
          data.map(function (val) {
            group.push({
              value: val.uuid,
              label: val.name,
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
