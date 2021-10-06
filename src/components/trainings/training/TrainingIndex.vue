<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CDataTable
          :items="employeeTraining"
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

          <template #trainer="{ item }">
            <td>
              {{ item.trainer.full_name }}
            </td>
          </template>
          <template #training_type="{ item }">
            <td>
              {{ item.training_type.name }}
            </td>
          </template>
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
import TrainingService from "@/services/trainings/TrainingService";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";

const fields = [
  // {
  //   key: "select",
  //   label: "",
  //   _style: "min-width:1%",
  //   sorter: false,
  //   filter: false,
  // },
  { key: "trainer", label: "TRAINER", _style: "min-width:15%;" },
  { key: "training_type", label: "TRAINING TYPE", _style: "min-width:15%;" },
  { key: "employee", label: "EMPLOYEE", _style: "min-width:15%;" },
  { key: "start_date", label: "START DATE", _style: "min-width:15%;" },
  { key: "end_date", label: "END DATE", _style: "min-width:15%;" },
  { key: "training_cost", label: "TRAINING COST", _style: "min-width:15%;" },
  { key: "description", label: "DESCRIPTION", _style: "min-width:15%;" },
  { key: "status", label: "STATUS", _style: "min-width:15%;" },
  { key: "actions", label: "ACTION", _style: "min-width:15%;" },
];

export default {
  name: "TrainingIndex",
  cilPencil,
  cilTrash,
  cilEye,
  data() {
    return {
      employeeTrainingData: [],
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
    this.getTraining();
  },
  computed: {
    employeeTraining() {
      return this.employeeTrainingData;
    },
  },
  watch: {
    reloadParams() {
      this.onTableChange();
    },
    activePage() {
      this.getTraining(this.activePage, this.perPage);
    },
  },
  methods: {
    getTraining(page = "", per_page = "") {
      this.empId = this.$route.params.id;

      TrainingService.getAll(page, per_page)
        .then(({ data }) => {
          if (data !== "" && data !== undefined) {
            this.employeeTrainingData = [];
            this.loading = true;
            if (data.data) {
              data.data.map((item, id) => {
                this.employeeTrainingData.push({ ...item, id });
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
      const val = Boolean(this.employeeTrainingData[item.id]._selected);
      this.$set(this.employeeTrainingData[item.id], "_selected", !val);
    },
    viewRow(uuid) {
      alert("page not ready");
    },
    editRow(uuid) {
      // this.$emit("employee-training-types-edit", uuid);
      this.$router.push({ path: "/trainings/edit/" + uuid });
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
            TrainingService.delete(this.deleteRows)
              .then((res) => {
                if (res.status == 200) {
                  this.$swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Training Deleted Successfully",
                    timer: 3600,
                  });
                  this.employeeTrainingData = this.employeeTrainingData.filter(
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
        this.employeeTrainingData = agent.currentItems;
        this.pages = Math.ceil(agent.sortedItems.length / 5);
      }, 1000);
    },
    changePagination(value) {
      this.perPage = parseInt(value);
      this.getTraining("", this.perPage);
    },
  },
};
</script>
