<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardBody>
            <CDataTable
              :items="Addresses"
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
              <template #select="{ item }">
                <td>
                  <CInputCheckbox
                    :checked="item._selected"
                    @update:checked="() => check(item)"
                    custom
                  />
                </td>
              </template>
              <template #business="{ item }">
                <td>
                  {{ item.name }}
                </td>
              </template>
              <template #parent="{ item }">
                <td>
                  {{ item.name }}
                </td>
              </template>
              <template #actions="{ item }">
                <td>
                  <CButtonGroup>
                    <CButton
                      @click="editRow(item.uuid)"
                      class="btn-sm text-white"
                      color="warning"
                      title="Edit"
                    >
                      <CIcon :content="$options.cilPencil"
                    /></CButton>
                    <CButton
                      @click="deleteRow(item.uuid)"
                      class="btn-sm"
                      color="danger"
                      title="Delete"
                    >
                      <CIcon :content="$options.cilTrash" />
                    </CButton>
                  </CButtonGroup>
                </td>
              </template>
            </CDataTable>
            <CPagination
              v-show="pages > 1"
              :pages="pages"
              :active-page.sync="activePage"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import CustomerAddressServices from "@/services/customers/CustomerAddressServices";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";

const fields = [
  { key: "flat", label: "FLAT", _style: "min-width:40%" },
  { key: "floor", label: "FLOOR", _style: "min-width:15%;" },
  { key: "building", label: "BUILDING", _style: "min-width:15%;" },
  { key: "street", label: "STREET", _style: "min-width:15%;" },
  { key: "block", label: "BLOCK", _style: "min-width:15%;" },
  { key: "area", label: "AREA", _style: "min-width:15%;" },
  { key: "set_default", label: "DEFAULT", _style: "min-width:15%;" },
  { key: "actions", label: "ACTION", _style: "min-width:15%;" },
];

export default {
  name: "AddressIndex",
  cilPencil,
  cilTrash,
  cilEye,

  data() {
    return {
      AddressesData: [],
      fields,
      loading: true,
      deleteRows: [],
      uuid: null,
      activePage: 1,
      pages: 0,
      perPage: 10,
    };
  },
  props: {
    module: String,
  },

  created() {
    this.loading = false;
    this.getAddressData();
  },
  computed: {
    Addresses() {
      return this.AddressesData;
    },
  },
  watch: {
    reloadParams() {
      this.onTableChange();
    },
    activePage() {
      this.getAddressData(this.activePage, this.perPage);
    },
  },
  methods: {
    getAddressData(page = "", per_page = "") {
      this.uuid = this.$route.params.id;
      if (this.module == "customer") {
        CustomerAddressServices.getCustomerAddresses(this.uuid, page, per_page)
          .then(({ data }) => {
            if (data !== "" && data !== undefined) {
              this.AddressesData = [];
              this.loading = true;
              if (data.data) {
                data.data.map((item, id) => {
                  this.AddressesData.push({ ...item, id });
                });
              }
              if (data.meta) {
                this.setPagination(data.meta);
              }
            }
            this.loading = false;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    // rowClicked(item, index, column, e) {
    //   if (!["INPUT", "LABEL"].includes(e.target.tagName)) {
    //     this.check(item);
    //   }
    // },
    // check(item) {
    //   const val = Boolean(this.AddressesData[item.id]._selected);
    //   this.$set(this.AddressesData[item.id], "_selected", !val);
    // },
    viewRow(uuid) {
      alert("page not ready");
    },
    editRow(uuid) {
      this.$emit("employeeAddressEdit", uuid);
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
            EmployeeAddressService.delete(this.deleteRows)
              .then((res) => {
                if (res.status == 200) {
                  this.$swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Address Deleted Successfully",
                    timer: 3600,
                  });
                  this.AddressesData = this.AddressesData.filter(
                    (department) => department.uuid != uuid
                  );
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
        this.AddressesData = agent.currentItems;
        this.pages = Math.ceil(agent.sortedItems.length / 5);
      }, 1000);
    },
    changePagination(value) {
      this.perPage = parseInt(value);
      this.getAddressData("", this.perPage);
    },
  },
};
</script>
<style scoped>
.bolder {
  font-weight: 600;
}
</style>
