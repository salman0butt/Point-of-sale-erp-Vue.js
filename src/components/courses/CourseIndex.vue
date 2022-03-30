<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CDataTable
          :items="employeeCourse"
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
          <!-- <template #select="{ item }">
            <td>
              <CInputCheckbox
                :checked="item._selected"
                @update:checked="() => check(item)"
                custom
              />
            </td>
          </template> -->
          <template #employee="{ item }">
            <td>
              {{ item.employee.full_name }}
            </td>
          </template>
          <template #status="{ item }">
            <td>
              {{ item.status ? item.status : "" }}
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
import CourseService from "@/services/courses/CourseService";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";

const fields = [
  // {
  //   key: "select",
  //   label: "",
  //   _style: "min-width:1%",
  //   sorter: false,
  //   filter: false,
  // },
  { key: "employee", label: "EMPLOYEE", _style: "min-width:15%;" },
  { key: "name", label: "NAME", _style: "min-width:15%;" },
  { key: "type", label: "TYPE", _style: "min-width:15%;" },
  { key: "institution", label: "INSTITUTION", _style: "min-width:15%;" },
  { key: "start_date", label: "START DATE", _style: "min-width:15%;" },
  { key: "end_date", label: "END DATE", _style: "min-width:15%;" },
  { key: "total_amount", label: "TOTAL AMOUNT", _style: "min-width:15%;" },
  { key: "status", label: "STATUS", _style: "min-width:15%;" },
  { key: "actions", label: "ACTION", _style: "min-width:15%;" },
];

export default {
  name: "CourseIndex",
  cilPencil,
  cilTrash,
  cilEye,
  data() {
    return {
      employeeCourseData: [],
      fields,
      loading: false,
      deleteRows: [],
      activePage: 1,
      pages: 0,
      perPage: 10,
    };
  },
  created() {
    this.loading = true;
    this.getCourse();
  },
  computed: {
    employeeCourse() {
      return this.employeeCourseData;
    },
  },
  watch: {
    reloadParams() {
      this.onTableChange();
    },
    activePage() {
      this.getCourse(this.activePage, this.perPage);
    },
  },
  methods: {
    getCourse(page = "", per_page = "") {
      this.empId = this.$route.params.id;

      CourseService.getAll(page, per_page)
        .then(({ data }) => {
          if (data !== "" && data !== undefined) {
            this.employeeCourseData = [];
            this.loading = true;
            if (data.data) {
              data.data.map((item, id) => {
                this.employeeCourseData.push({ ...item, id });
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
    },
    rowClicked(item, index, column, e) {
      if (!["INPUT", "LABEL"].includes(e.target.tagName)) {
        this.check(item);
      }
    },
    check(item) {
      const val = Boolean(this.employeeCourseData[item.id]._selected);
      this.$set(this.employeeCourseData[item.id], "_selected", !val);
    },
    viewRow(uuid) {
      alert("page not ready");
    },
    editRow(uuid) {
      // this.$emit("employee-grade-edit", uuid);
      this.$router.push({ path: "/courses/edit/" + uuid });
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
            CourseService.delete(this.deleteRows)
              .then((res) => {
                if (res.status == 200) {
                  this.$swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Course Deleted Successfully",
                    timer: 3600,
                  });
                  this.employeeCourseData = this.employeeCourseData.filter(
                    (item) => item.uuid != uuid
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
        this.employeeCourseData = agent.currentItems;
        this.pages = Math.ceil(agent.sortedItems.length / 5);
      }, 1000);
    },
    changePagination(value) {
      this.perPage = parseInt(value);
      this.getCourse("", this.perPage);
    },
  },
};
</script>
