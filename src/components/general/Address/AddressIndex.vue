<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <Loader />
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
          ref="externalAgent"
        >
          <!-- item.floor = item.floor?.en;
                  item.building = item.building?.en;
                  item.street = item.street?.en;
                  item.block = item.block?.en;
                  item.area = item.area?.en;
                  item.flat = item.flat?.en; -->
          <template #select="{ item }">
            <td>
              {{ item.floor ? item.floor : "" }}
            </td>
          </template>
          <template #building="{ item }">
            <td>
              {{ item.building ? item.building : "" }}
            </td>
          </template>
          <template #street="{ item }">
            <td>
              {{ item.street ? item.street : "" }}
            </td>
          </template>
          <template #block="{ item }">
            <td>
              {{ item.block ? item.block : "" }}
            </td>
          </template>
          <template #area="{ item }">
            <td>
              {{ item.area ? item.area : "" }}
            </td>
          </template>
          <template #flat="{ item }">
            <td>
              {{ item.flat ? item.flat : "" }}
            </td>
          </template>
          <template #floor="{ item }">
            <td>
              {{ item.floor ? item.floor : "" }}
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
        <CPagination v-show="pages > 1" :pages="pages" :active-page.sync="activePage" />
      </CCol>
    </CRow>
  </div>
</template>

<script>
import SupplierAddressServices from "@/services/contacts/supplier/SupplierAddressServices";
import CustomerAddressServices from "@/services/contacts/customers/CustomerAddressServices";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";
import Loader from "@/components/layouts/Loader";

let fields = [
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
  components: { Loader },
  data() {
    return {
      AddressesData: [],
      fields,
      deleteRows: [],
      uuid: null,
      activePage: 1,
      pages: 0,
      perPage: 10,
    };
  },
  props: {
    module: String,
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.getAddressData();
    if (this.readOnly) {
      this.fields = this.fields.filter((field) => field.key !== "actions");
    }
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
        this.$store.commit("set_loader");
        CustomerAddressServices.getCustomerAddresses(this.uuid, page, per_page)
          .then(({ data }) => {
            if (data !== "" && data !== undefined) {
              this.AddressesData = [];
              if (data.data) {
                data.data.map((item, id) => {
                  item.floor = item.floor?.en;
                  item.building = item.building?.en;
                  item.street = item.street?.en;
                  item.block = item.block?.en;
                  item.area = item.area?.en;
                  item.flat = item.flat?.en;
                  this.AddressesData.push({ ...item, id });
                });
              }
              if (data.meta) {
                this.setPagination(data.meta);
              }
            }
            this.$store.commit("close_loader");
          })
          .catch((err) => {
            this.$store.commit("close_loader");
            console.log(err);
          });
      }
      if (this.module == "supplier") {
        this.$store.commit("set_loader");
        SupplierAddressServices.getCustomerAddresses(this.uuid, page, per_page)
          .then(({ data }) => {
            if (data !== "" && data !== undefined) {
              this.AddressesData = [];
              if (data.data) {
                data.data.map((item, id) => {
                  item.floor = item.floor?.en;
                  item.building = item.building?.en;
                  item.street = item.street?.en;
                  item.block = item.block?.en;
                  item.area = item.area?.en;
                  item.flat = item.flat?.en;
                  this.AddressesData.push({ ...item, id });
                });
              }
              if (data.meta) {
                this.setPagination(data.meta);
              }
            }
            this.$store.commit("close_loader");
          })
          .catch((err) => {
            this.$store.commit("close_loader");
            console.log(err);
          });
      }
    },

    viewRow(uuid) {
      alert("page not ready");
    },
    editRow(uuid) {
      this.$emit("AddressEdit", uuid);
    },

    deleteRow(uuid) {
      this.deleteRows = JSON.stringify([uuid]);
      this.$swal
        .fire({
          title: "Are you sure you want to delete this record?",
          text: "This will be record from Database",
          showCancelButton: true,
          confirmButtonColor: "#e55353",
          confirmButtonText: "Yes, remove it it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            SupplierAddressServices.delete(this.deleteRows)
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
