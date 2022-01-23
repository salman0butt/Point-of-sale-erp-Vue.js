<template>
  <CRow>
    <CCol xs="12" lg="12">
      <CRow>
        <CCol sm="12" md="12" class="pt-2">
          <CDataTable
            :items="taxes"
            :fields="taxFields"
            table-filter
            items-per-page-select
            @pagination-change="changePagination"
            :items-per-page="perPage"
            sorter
            clickable-rows
            hover
            :loading="loading"
            ref="externalAgent"
          >
            <template #actions="{ item }">
              <td>
                <CButtonGroup>
                  <CButton
                    @click="editRow(item.uuid)"
                    class="btn-sm text-white"
                    color="warning"
                    >Edit <CIcon :content="$options.cilPencil"
                  /></CButton>
                  <CButton @click="defaultRow(item.uuid)" class="btn-sm" color="success"
                    >Default</CButton
                  >
                  <CButton @click="deleteRow(item.uuid)" class="btn-sm" color="danger">
                    <CIcon :content="$options.cilTrash" />
                  </CButton>
                </CButtonGroup>
              </td>
            </template>
          </CDataTable>
          <CPagination v-show="pages > 1" :pages="pages" :active-page.sync="activePage" />
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="4" md="4" class="pt-2">
          <CInputCheckbox custom :checked="true" label="Prices Include Tax:" />
        </CCol>
        <CCol sm="4" md="4" class="pt-2">
          <CInputCheckbox custom :checked="true" label="Charge Tax On Receivings:" />
        </CCol>
        <CCol sm="4" md="4" class="pt-2">
          <CInputCheckbox
            custom
            :checked="true"
            label="Use Tax Values At ALL Branches:"
          />
        </CCol>
      </CRow>
    </CCol>
  </CRow>
</template>
<script>
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";
import TaxService from "@/services/taxes/TaxService";
const taxFields = [
  { key: "name", label: "Name", _style: "min-width:40%" },
  { key: "percentage", label: "RATE %", _style: "min-width:15%;" },
  { key: "actions", label: "ACTION", _style: "width:25%;" },
];

export default {
  name: "TaxForm",
  cilPencil,
  cilTrash,
  cilEye,
  props: {
    updatedObj: { Object },
  },
  data: () => ({
    taxFields,
    taxes: [],
    activePage: 1,
    pages: 0,
    perPage: 10,
  }),
  created() {
    this.getTaxes();
  },
  computed: {
    taxItems() {
      return this.taxes;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  watch: {
    reloadParams() {
      this.onTableChange();
    },
    activePage() {
      this.getTaxes(this.activePage, this.perPage);
    },
    updatedObj(obj) {
      if (obj.type === "store") {
        this.taxes.unshift(obj.payload);
      } else if (obj.type === "update") {
        this.taxes.forEach((tax, index) => {
          if (tax.uuid === obj.payload.uuid) {
            this.taxes[index] = obj.payload;
          }
        });
      }
    },
  },
  methods: {
    getTaxes(page = "", per_page = "") {
      this.$store.commit("set_loader");
      TaxService.getAll(page, per_page)
        .then(({ data }) => {
          if (data && data.data) {
            this.taxes = data.data;
            if (data.meta) {
              this.setPagination(data.meta);
            }
            this.$store.commit("close_loader");
          }
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("close_loader");
        });
    },
    defaultRow(uuid) {
      alert("page not ready");
    },
    editRow(uuid) {
      this.isEditingTax = true;
      // this.$store.commit("set_loader");
      // this.getTax(uuid);
      this.$emit("edit-tax", uuid);
    },
    deleteRow(uuid) {
      this.deleteRows = JSON.stringify([uuid]);
      this.$swal
        .fire({
          title: "Do you want to delete this record",
          text: "This will be record from Database",
          showCancelButton: true,
          confirmButtonColor: "#e55353",
          confirmButtonText: "Yes, remove it it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            TaxService.delete(this.deleteRows)
              .then((res) => {
                if (res.status == 200) {
                  this.$swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Brand Deleted Successfully",
                    timer: 3600,
                  });
                  this.taxes = this.taxes.filter((item) => item.uuid != uuid);
                  this.deleteRows = [];
                }
              })
              .catch((error) => {
                this.$swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Something went Wrong",
                  timer: 3600,
                });
              });
          }
        });
    },
    setPagination(meta) {
      this.activePage = parseInt(meta.current_page);
      this.pages = parseInt(meta.last_page);
      this.perPage = parseInt(meta.per_page);
    },
    onTableChange() {
      setTimeout(() => {
        this.loading = false;
        const agent = this.$refs.externalAgent;
        this.taxes = agent.currentItems;
        this.pages = Math.ceil(agent.sortedItems.length / 5);
      }, 1000);
    },
    changePagination(value) {
      this.perPage = parseInt(value);
      this.getTaxes("", this.perPage);
    },
  },
};
</script>
