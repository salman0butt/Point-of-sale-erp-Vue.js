<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Roles </CCardHeader>
          <CCardBody>
            <router-link
              v-if="$can('create roles-and-permissions')"
              class="btn btn-success"
              :to="{ name: 'Create Role' }"
              style="float: right"
              >Create New Role</router-link
            >
            <div style="clear: both; margin-bottom: 20px"></div>
            <CDataTable
              :items="items"
              :fields="fields"
              table-filter
              items-per-page-select
              @pagination-change="changePagination"
              :items-per-page="perPage"
              sorter
              pagination
              clickable-rows
              hover
              :loading="loading"
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
              <template #actions="{ item }">
                <td>
                  <CButtonGroup>
                    <CButton
                      v-if="$can('show roles-and-permissions')"
                      @click="viewRow(item.uuid)"
                      class="btn-sm"
                      color="success"
                      >View</CButton
                    >
                    <CButton
                      v-if="$can('edit roles-and-permissions')"
                      @click="editRow(item.uuid)"
                      class="btn-sm text-white"
                      color="warning"
                    >
                      <CIcon :content="$options.cilPencil"
                    /></CButton>
                    <CButton
                      v-if="$can('delete roles-and-permissions')"
                      @click="deleteRow(item.uuid)"
                      class="btn-sm"
                      color="danger"
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
import RolesAndPermissionsService from "@/services/rolesandpermissions/RolesAndPermissionsService";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";

const fields = [
  { key: "name", label: "NAME", _style: "min-width:40%" },
  { key: "actions", label: "ACTIONS", _style: "min-width:15%;" },
];

export default {
  name: "IndexRoles",
  cilPencil,
  cilTrash,
  cilEye,
  data() {
    return {
      serverData: [],
      fields,
      loading: false,
      activePage: 1,
      pages: 0,
      perPage: 10,
    };
  },
  created() {
    this.loading = true;
    this.getServerData();
  },
  watch: {
    activePage() {
      this.getServerData(this.activePage, this.perPage);
    },
  },
  computed: {
    items() {
      return this.serverData;
    },
  },
  methods: {
    getServerData() {
      RolesAndPermissionsService.getAllPaginate(this.activePage, this.perPage)
        .then(({ data }) => {
          this.loading = true;
          if (data !== "" && data !== undefined) {
            this.serverData = [];
            data.data.map((item, id) => {
              this.serverData.push({ ...item, id });
            });
            this.loading = false;
          }
          if (data.meta) {
            this.setPagination(data.meta);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    check(item) {
      const val = Boolean(this.usersData[item.id]._selected);
      this.$set(this.usersData[item.id], "_selected", !val);
    },
    viewRow(uuid) {
      alert("page not ready");
    },
    editRow(uuid) {
      this.$router.push({ name: "Edit Role", params: { id: uuid } });
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
            EmployeeService.delete(this.deleteRows)
              .then((res) => {
                if (res.status == 200) {
                  this.$swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Employee Deleted Successfully",
                    timer: 3600,
                  });
                  this.usersData = this.usersData.filter(
                    (item) => item.uuid != uuid
                  );
                  this.getTotalCardData();
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
            this.deleteRows = [];
          }
        });
    },
    setPagination(meta) {
      this.activePage = parseInt(meta.current_page);
      this.pages = parseInt(meta.last_page);
      this.perPage = parseInt(meta.per_page);
    },
    changePagination(value) {
      this.perPage = parseInt(value);
      this.getServerData(this.activePage, this.perPage);
    },
  },
};
</script>
<style scoped>
.bolder {
  font-weight: 600;
}
</style>
