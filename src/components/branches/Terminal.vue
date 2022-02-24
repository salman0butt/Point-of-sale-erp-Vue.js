<template>
  <div>
    <Loader />
    <form
      v-for="(terminal, k) in form.terminals"
      :key="k"
      @submit.prevent="terminal.isEditing ? updateTerminal(k) : saveTerminal(k)"
    >
      <CRow>
        <CCol sm="6" md="6" class="pt-2">
          <CInput label="Name" v-model="terminal.name" :disabled="terminal.isDisabled" />
        </CCol>
        <CCol sm="2" md="2" class="pt-2">
          <span class="midler"
            >((
            <span v-if="terminal.deleteable === 'yes'"
              ><a @click="deleteTerminal(terminal.uuid)" class="del-record"
                >Delete</a
              ></span
            >
            <span v-if="terminal.deleteable === 'yes' && terminal.uuid"> - </span>
            <span v-if="terminal.uuid">
              <a class="edit-record" @click="editRow(k)">Edit</a></span
            >
            ))</span
          >
        </CCol>

        <CCol sm="6" md="6" class="pt-2">
          <CButton
            :class="{ 'd-none': terminal.isDisabled }"
            progress
            timeout="2000"
            style="margin-top: 5px"
            color="success"
            type="submit"
            >Save</CButton
          >
        </CCol>
      </CRow>
      <!-- <i class="thumb" @click="addTerminal()"
        ><CIcon :content="$options.cibAddthis" /> Add Terminal</i
      > -->
    </form>
    <br v-show="pages > 1" />
    <CPagination v-show="pages > 1" :pages="pages" :active-page.sync="activePage" />
    <br v-show="pages > 1" />
    <hr />
    <form @submit.prevent="saveTerminal()">
      <CRow>
        <CCol sm="6" md="6" class="pt-2">
          <CInput
            label="Name"
            v-model="form.name"
            :class="{ error: $v.form.name.$error }"
            @input="$v.form.name.$touch()"
          />
          <div v-if="$v.form.name.$error">
            <p v-if="!$v.form.name.required" class="errorMsg">Name is required</p>
          </div>
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="6" md="6" class="pt-2">
          <CButton
            progress
            timeout="2000"
            style="margin-top: 5px"
            color="success"
            type="submit"
            >Save</CButton
          >
        </CCol>
      </CRow>
    </form>
  </div>
</template>

<script>
import { cilTrash, cibAddthis, cisMinusSquare } from "@coreui/icons-pro";
import BranchTerminalService from "@/services/branches/BranchTerminalServices";
import { required } from "vuelidate/lib/validators";
import Loader from "@/components/layouts/Loader";

export default {
  name: "Terminal",
  components: { Loader },
  cilTrash,
  cibAddthis,
  cisMinusSquare,
  data() {
    return {
      activePage: 1,
      pages: 0,
      perPage: 5,
      deleteRows: [],
      form: {
        name: "",
        terminals: [],
      },
    };
  },
  created() {
    this.getTerminalsData();
  },
  watch: {
    activePage() {
      this.getTerminalsData(this.activePage, this.perPage);
    },
  },
  validations() {
    return {
      form: {
        name: { required },
      },
    };
  },
  methods: {
    // addTerminal() {
    //   this.form.terminals.push({
    //     uuid: "",
    //     name: "",
    //     isDisabled: false,
    //     deleteable: "yes",
    //   });
    // },
    editRow(k) {
      this.form.terminals[k].isDisabled = !this.form.terminals[k].isDisabled;
      this.form.terminals[k].isEditing = !this.form.terminals[k].isEditing;
    },
    getTerminalsData(page = "", per_page = 5) {
      this.$store.commit("set_loader");
      BranchTerminalService.getAll(page, per_page)
        .then(({ data }) => {
          if (data) {
            this.form.terminals = [];
            if (data.data) {
              data.data.map((item, id) => {
                this.form.terminals.push({
                  ...{ uuid: item.uuid, name: item.name, deleteable: item.deleteable },
                  id,
                  isDisabled: true,
                  isEditing: false,
                });
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
    },
    deleteTerminal(uuid) {
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
            BranchTerminalService.delete(this.deleteRows)
              .then((res) => {
                if (res.status == 200) {
                  this.$swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Terminal Deleted Successfully",
                    timer: 3600,
                  });
                  this.form.terminals = this.form.terminals.filter(
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
    saveTerminal() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        this.$store.commit("set_loader");
        BranchTerminalService.create(data)
          .then((res) => {
            if (res.status == 201 || res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Terminal Added Successfully",
                timer: 3600,
              });
              const { data } = res;
              if (data) {
                this.form.terminals.push({
                  ...{
                    uuid: data.uuid,
                    name: data.name,
                    deleteable: data.deleteable ? data.deleteable : "yes",
                  },
                  isDisabled: true,
                  isEditing: false,
                });
              }
              this.resetForm();
              this.getTerminalsData();
              this.$store.commit("close_loader");
            }
          })
          .catch((error) => {
            console.log(error);
            this.$store.commit("close_loader");
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: "Something Went Wrong.",
              timer: 3600,
            });
          });
      }
    },
    updateTerminal(k) {
      // this.$v.$touch();
      // if (!this.$v.$invalid) {
      let data = this.form.terminals[k];
      let uuid = this.form.terminals[k].uuid;
      this.$store.commit("set_loader");
      BranchTerminalService.update(uuid, data)
        .then((res) => {
          if (res.status == 200) {
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Terminal Updated Successfully",
              timer: 3600,
            });
            this.resetForm();
            this.form.terminals[k].isDisabled = true;
            this.form.terminals[k].isEditing = false;
            this.$store.commit("close_loader");
          }
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("close_loader");
          this.$swal.fire({
            icon: "error",
            title: "Error",
            text: "Something Went Wrong.",
            timer: 3600,
          });
        });
      // }
    },
    setPagination(meta) {
      this.activePage = parseInt(meta.current_page);
      this.pages = parseInt(meta.last_page);
      this.perPage = parseInt(meta.per_page);
    },
    changePagination(value) {
      this.perPage = parseInt(value);
      this.getTerminalData("", this.perPage);
    },
    onTableChange() {
      setTimeout(() => {
        const agent = this.$refs.externalAgent;
        this.notesData = agent.currentItems;
        this.pages = Math.ceil(agent.sortedItems.length / 5);
      }, 1000);
    },
    resetForm() {
      this.$v.$reset();
      this.form.name = "";
    },
  },
};
</script>
<style scoped>
.edit-record {
  color: green !important;
  cursor: pointer;
}
.del-record {
  color: red !important;
  cursor: pointer;
}
.midler {
  position: relative;
  top: 2rem;
}
.del-btn {
  background: transparent;
  height: fit-content;
  margin-top: 2rem;
}
.thumb {
  cursor: pointer;
}
</style>
