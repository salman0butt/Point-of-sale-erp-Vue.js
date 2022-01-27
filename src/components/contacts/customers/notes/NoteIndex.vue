<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CDataTable
          :items="Notes"
          :fields="fields"
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
import SupplierNoteServices from "@/services/contacts/supplier/SupplierNoteServices";
import CustomerNoteServices from "@/services/contacts/customers/CustomerNoteServices";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";

const fields = [
  { key: "note", label: "NOTE", _style: "min-width:40%" },
  // { key: "status", label: "STATUS", _style: "min-width:15%;" },
  { key: "actions", label: "ACTION", _style: "min-width:15%;" },
];

export default {
  name: "NoteIndex",
  cilPencil,
  cilTrash,
  cilEye,

  data() {
    return {
      notesData: [],
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
  },

  created() {
    this.getNoteData();
  },
  computed: {
    Notes() {
      return this.notesData;
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
      this.getNoteData(this.activePage, this.perPage);
    },
  },
  methods: {
    getNoteData(page = "", per_page = "") {
      this.uuid = this.$route.params.id;
      if (this.module == "customer") {
        this.$store.commit("set_loader");
        CustomerNoteServices.getCustomerNotes(this.uuid, page, per_page)
          .then(({ data }) => {
            if (data !== "" && data !== undefined) {
              this.notesData = [];
              if (data.data) {
                data.data.map((item, id) => {
                  this.notesData.push({ ...item, id });
                });
              }
              if (data.meta) {
                this.setPagination(data.meta);
              }
            }
            this.$store.commit("close_loader");
          })
          .catch((err) => {
            console.log(err);
            this.$store.commit("close_loader");
          });
      }
      if (this.module == "supplier") {
        this.$store.commit("set_loader");
        SupplierNoteServices.getCustomerNotes(this.uuid, page, per_page)
          .then(({ data }) => {
            if (data !== "" && data !== undefined) {
              this.notesData = [];
              if (data.data) {
                data.data.map((item, id) => {
                  this.notesData.push({ ...item, id });
                });
              }
              if (data.meta) {
                this.setPagination(data.meta);
              }
            }
            this.$store.commit("close_loader");
          })
          .catch((err) => {
            console.log(err);
            this.$store.commit("close_loader");
          });
      }
    },

    viewRow(uuid) {
      alert("page not ready");
    },
    editRow(uuid) {
      this.$emit("NoteEdit", uuid);
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
            SupplierNoteServices.delete(this.deleteRows)
              .then((res) => {
                if (res.status == 200) {
                  this.$swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Note Deleted Successfully",
                    timer: 3600,
                  });
                  this.notesData = this.notesData.filter(
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
        this.notesData = agent.currentItems;
        this.pages = Math.ceil(agent.sortedItems.length / 5);
      }, 1000);
    },
    changePagination(value) {
      this.perPage = parseInt(value);
      this.getNoteData("", this.perPage);
    },
  },
};
</script>
