<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <Loader />
        <CDataTable
          :items="Biller"
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
          <!-- <template #select="{ item }">
            <td>
              <CInputCheckbox
                :checked="item._selected"
                @update:checked="() => check(item)"
                custom
              />
            </td>
          </template> -->

          <template #category="{ item }">
            <td>
              {{ item.category.name }}
            </td>
          </template>

          <template #actions="{ item }">
            <td>
              <CButtonGroup>
                <!-- <CButton
                  @click="viewRow(item.uuid)"
                  class="btn-sm"
                  color="success"
                  title="View"
                  >View</CButton
                > -->
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
import RecurringBillService from "@/services/accounting/recurringbill/RecurringBillService";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";
import Loader from "@/components/layouts/Loader";
const fields = [
  // {
  //   key: "select",
  //   label: "",
  //   _style: "min-width:1%",
  //   sorter: false,
  //   filter: false,
  // },
  { key: "category", label: "CATEGORY", _style: "min-width:15%;" },
  { key: "title", label: "TITLE", _style: "min-width:15%;" },
  { key: "amount", label: "AMOUNT", _style: "min-width:15%;" },
  { key: "bill_date", label: "BILL DATE", _style: "min-width:15%;" },
  { key: "remind_date", label: "REMIND DATE", _style: "min-width:15%;" },
  { key: "due_date", label: "DUE DATE", _style: "min-width:15%;" },
  { key: "actions", label: "ACTION", _style: "min-width:15%;" },
];

export default {
  name: "RecurringBillerIndex",
  components: { Loader },
  cilPencil,
  cilTrash,
  cilEye,
  data() {
    return {
      BillerData: [],
      fields,
      deleteRows: [],
      activePage: 1,
      pages: 0,
      perPage: 10,
    };
  },
  created() {
    this.getBiller();
  },
  computed: {
    Biller() {
      return this.BillerData;
    },
  },
  watch: {
    reloadParams() {
      this.onTableChange();
    },
    activePage() {
      this.getBiller(this.activePage, this.perPage);
    },
  },
  methods: {
    getBiller(page = "", per_page = "") {
      this.$store.commit("set_loader");
      this.empId = this.$route.params.id;
      RecurringBillService.getAll(page, per_page)
        .then(({ data }) => {
          if (data) {
            this.BillerData = [];
            if (data.data) {
              data.data.map((item, id) => {
                this.BillerData.push({ ...item, id });
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
    },
    rowClicked(item, index, column, e) {
      if (!["INPUT", "LABEL"].includes(e.target.tagName)) {
        this.check(item);
      }
    },
    check(item) {
      const val = Boolean(this.BillerData[item.id]._selected);
      this.$set(this.BillerData[item.id], "_selected", !val);
    },
    viewRow(uuid) {
      alert("page not ready");
    },
    editRow(uuid) {
      this.$router.push({ path: "/accounting/biller/recurring/edit/" + uuid });
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
            RecurringBillService.delete(this.deleteRows)
              .then((res) => {
                if (res.status == 200) {
                  this.$swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Biller Deleted Successfully",
                    timer: 3600,
                  });
                  this.BillerData = this.BillerData.filter((item) => item.uuid != uuid);
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
        this.BillerData = agent.currentItems;
        this.pages = Math.ceil(agent.sortedItems.length / 5);
      }, 1000);
    },
    changePagination(value) {
      this.perPage = parseInt(value);
      this.getBiller("", this.perPage);
    },
  },
};
</script>
