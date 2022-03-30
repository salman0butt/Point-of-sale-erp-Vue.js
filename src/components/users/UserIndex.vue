<template>
  <div>
    <Loader />
    <CDataTable
      :items="User"
      :fields="fields"
      table-filter
      items-per-page-select
      @pagination-change="changePagination"
      :items-per-page="perPage"
      sorter
      clickable-rows
      hover
      @row-clicked="rowClicked"
      ref="externalAgent"
    >
      <template #full_name="{ item }">
        <td>{{ item.employee.full_name }}</td>
      </template>
      <template #status="{ item }">
        <td>{{ item.status === 1 ? "active" : "inactive" }}</td>
      </template>

      <template #actions="{ item }">
        <td>
          <CButtonGroup>
            <!-- <CButton @click="viewRow(item.uuid)" class="btn-sm" color="success"
                      >View</CButton
                    > -->
            <CButton
              v-if="$can('edit users')"
              @click="editRow(item.uuid)"
              class="btn-sm text-white"
              color="warning"
              ><CIcon :content="$options.cilPencil"
            /></CButton>
            <CButton
              v-if="$can('delete users') && item.roleDetail.name != 'super-admin'"
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
    <CPagination v-show="pages > 1" :pages="pages" :active-page.sync="activePage" />
  </div>
</template>

<script>
import UserService from "@/services/users/UserService";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";
import Loader from "@/components/layouts/Loader";
const fields = [
  { key: "full_name", label: "NAME", _style: "min-width:40%" },
  { key: "username", label: "USERNAME", _style: "min-width:15%;" },
  { key: "email", label: "EMAIL", _style: "min-width:15%;" },
  { key: "status", label: "STATUS", _style: "min-width:15%;" },
  { key: "actions", label: "ACTION", _style: "min-width:15%;" },
];

export default {
  name: "IndexUser",
  components: { Loader },
  cilPencil,
  cilTrash,
  cilEye,
  data() {
    return {
      UserData: [],
      fields,
      deleteRows: [],
      activePage: 1,
      pages: 0,
      perPage: 10,
    };
  },
  created() {
    this.getUserData();
  },
  watch: {
    reloadParams() {
      this.onTableChange();
    },
    activePage() {
      this.getUserData(this.activePage, this.perPage);
    },
  },
  computed: {
    User() {
      return this.UserData;
    },
  },
  methods: {
    getUserData(page = "", per_page = "") {
      this.$store.commit("set_loader");
      UserService.getAll(page, per_page)
        .then(({ data }) => {
          if (data !== "" && data !== undefined) {
            this.UserData = [];

            if (data.data) {
              data.data.map((item, id) => {
                this.UserData.push({ ...item, id });
              });
            }
            if (data.meta) {
              this.setPagination(data.meta);
            }

            this.$store.commit("close_loader");
          }
        })
        .catch((err) => {
          this.$store.commit("close_loader");
          console.log(err);
        });
    },
    rowClicked(item, index, column, e) {
      if (!["INPUT", "LABEL"].includes(e.target.tagName)) {
        this.check(item);
      }
    },
    check(item) {
      const val = Boolean(this.UserData[item.id]._selected);
      this.$set(this.UserData[item.id], "_selected", !val);
    },
    viewRow(uuid) {
      alert("page not ready");
    },
    editRow(uuid) {
      this.$router.push({ path: "/users/edit/" + uuid });
    },

    deleteRow(uuid) {
      this.deleteRows = JSON.stringify([uuid]);
      this.$swal
        .fire({
          title: "Are you sure you want to delete this record?",
          text: "This will be deleted from Database",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#e55353",
          confirmButtonText: "Yes, remove it it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            UserService.delete(this.deleteRows)
              .then((res) => {
                if (res.status == 200) {
                  this.$swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "User Deleted Successfully",
                    timer: 3600,
                  });
                  this.UserData = this.UserData.filter((item) => item.uuid != uuid);
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
        this.UserData = agent.currentItems;
        this.pages = Math.ceil(agent.sortedItems.length / 5);
      }, 1000);
    },
    changePagination(value) {
      this.perPage = parseInt(value);
      this.getUserData("", this.perPage);
    },
  },
};
</script>
