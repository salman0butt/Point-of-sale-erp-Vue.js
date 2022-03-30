<template>
  <div>
    <CRow>
      <Loader />
      <CCol xs="12" lg="12">
        <div v-if="notesData && notesData.length > 0">
          <form
            v-for="(note, k) in notesData"
            :key="k"
            @submit.prevent="notesData[k].isEditing ? updateNote(k) : saveNote(k)"
          >
            <CRow>
              <CCol sm="12" md="12" class="pt-2">
                <CTextarea
                  label="Note"
                  placeholder="Content..."
                  v-model="notesData[k].note"
                  :disabled="notesData[k].disabled"
                />
                <span
                  >Created by: {{ note.created_by ? note.created_by.username : "N/A" }} |
                  {{ note.created_at }} - {{ note.time }}
                  <span v-if="!readOnly"
                    >((<a class="del-record" @click.prevent="deleteNote(note.uuid)"
                      >Delete</a
                    >
                    -
                    <a class="edit-record" @click.prevent="editNote(k)">Edit</a>))</span
                  >
                </span>

                <!-- <div v-if="$v.form.note.$error">
                <p v-if="!$v.form.note.required" class="errorMsg">Notes is required</p>
              </div> -->
                <CButton
                  v-if="!readOnly"
                  :class="{ 'd-none': notesData[k].disabled }"
                  progress
                  timeout="2000"
                  style="float: right; margin-top: 5px"
                  color="success"
                  type="submit"
                  >Save</CButton
                >
                <hr style="margin-top: 25px" />
              </CCol>
            </CRow>

            <!-- <p v-if="$v.$anyError" class="errorMsg">Please Fill the required data</p> -->
          </form>
        </div>

        <div v-if="notesData && notesData.length == 0 && readOnly">
          <p class="text-center">No record found</p>
        </div>
        <form @submit.prevent="saveNote()" v-if="!readOnly">
          <CRow>
            <CCol sm="12" md="12" class="pt-2">
              <CTextarea
                label="Note"
                placeholder="Content..."
                v-model="form.note"
                :class="{ error: $v.form.note.$error }"
                @input="$v.form.note.$touch()"
              />
              <div v-if="$v.form.note.$error">
                <p v-if="!$v.form.note.required" class="errorMsg">Notes is required</p>
              </div>
              <CButton
                progress
                timeout="2000"
                style="float: right; margin-top: 5px"
                color="success"
                type="submit"
                >Save</CButton
              ><br />
              <hr style="margin-top: 25px" />
            </CCol>
          </CRow>

          <!-- <p v-if="$v.$anyError" class="errorMsg">Please Fill the required data</p> -->
        </form>
      </CCol>
    </CRow>
    <CPagination v-show="pages > 1" :pages="pages" :active-page.sync="activePage" />
  </div>
</template>
<script>
import CustomerNoteServices from "@/services/contacts/customers/CustomerNoteServices";
import SupplierNoteServices from "@/services/contacts/supplier/SupplierNoteServices";
import Loader from "@/components/layouts/Loader";
import { required } from "vuelidate/lib/validators";

export default {
  name: "NoteForm",
  props: {
    module: {
      type: String,
      default: "customer",
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Loader,
  },
  data: () => ({
    isEditing: false,
    activePage: 1,
    pages: 0,
    perPage: 10,
    notesData: [],
    form: {
      note: "",
      module: "",
      data_uuid: null,
    },
    deleteRows: [],
    options: {
      set_default: [
        { value: "", label: "Choose Status", disabled: true, selected: "" },
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    },
  }),
  created() {
    // this.form.module = this.module;
    this.getNoteData();
  },
  validations() {
    return {
      form: {
        note: { required },
      },
    };
  },

  watch: {
    activePage() {
      this.getNoteData(this.activePage, this.perPage);
    },
  },
  methods: {
    saveNote() {
      // for module customer
      if (this.module == "customer") {
        this.form.module_uuid = this.$route.params.id;
        this.form.module = this.module;
        this.$v.$touch();
        let data = this.form;
        if (!this.$v.$invalid) {
          this.$store.commit("set_loader");
          CustomerNoteServices.store(data)
            .then((res) => {
              if (res.status == 201 || res.status == 200) {
                this.$swal.fire({
                  icon: "success",
                  title: "Success",
                  text: "Note Added Successfully",
                  timer: 3600,
                });
                this.getNoteData();
                // this.$emit("NoteCreated");
                this.$v.$reset();
                this.resetForm();
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
      }
      if (this.module == "supplier") {
        this.form.module_uuid = this.$route.params.id;
        this.form.module = this.module;
        this.$v.$touch();
        if (!this.$v.$invalid) {
          let data = this.form;
          this.$store.commit("set_loader");
          SupplierNoteServices.store(data)
            .then((res) => {
              if (res.status == 201 || res.status == 200) {
                this.$swal.fire({
                  icon: "success",
                  title: "Success",
                  text: "Note Added Successfully",
                  timer: 3600,
                });
                this.getNoteData();
                // this.$emit("NoteCreated");
                // this.$v.$reset();
                this.resetForm();
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
      }
    },
    // getEditData(uuid) {
    //   this.isEditing = true;
    //   this.form.data_uuid = uuid;
    //   this.getNote();
    // },
    getNote() {
      // for module customer
      if (this.module == "customer") {
        CustomerNoteServices.get(this.form.data_uuid)
          .then(({ data }) => {
            if (data != null && data != "") {
              this.form.note = data.note;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
      if (this.module == "supplier") {
        SupplierNoteServices.get(this.form.data_uuid)
          .then(({ data }) => {
            if (data != null && data != "") {
              this.form.note = data.note;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    updateNote(k) {
      // this.$v.$touch();
      if (this.module == "customer") {
        let note = this.notesData[k];
        // if (!this.$v.$invalid) {
        let data = {
          ...note,
          module_uuid: this.$route.params.id,
          module: this.module,
        };
        this.$store.commit("set_loader");
        CustomerNoteServices.update(data.uuid, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Note Updated Successfully",
                timer: 3600,
              });
              this.getNoteData();
              // this.$emit("NoteCreated");
              // this.$v.$reset();
              this.resetForm();
              this.notesData[k].disabled = true;
              this.$store.commit("close_loader");
            }
          })
          .catch((error) => {
            this.$store.commit("close_loader");
            console.log(error);
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: "Something Went Wrong.",
              timer: 3600,
            });
          });
        // }
      }
      if (this.module == "supplier") {
        // if (!this.$v.$invalid) {
        let data = this.form;
        this.$store.commit("set_loader");
        SupplierNoteServices.update(this.form.data_uuid, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Note Updated Successfully",
                timer: 3600,
              });
              this.getNoteData();
              // this.$emit("NoteCreated");
              // this.$v.$reset();
              this.resetForm();
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
      }
    },
    getNoteData(page = "", per_page = 5) {
      this.uuid = this.$route.params.id;

      if (this.module == "customer") {
        this.$store.commit("set_loader");
        CustomerNoteServices.getCustomerNotes(this.uuid, page, per_page)
          .then(({ data }) => {
            if (data !== "" && data !== undefined) {
              this.notesData = [];
              if (data.data) {
                data.data.map((item, id) => {
                  this.notesData.push({ ...item, id, disabled: true, isEditing: false });
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
                  this.notesData.push({ ...item, id, disabled: true, isEditing: false });
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
    editNote(key) {
      this.notesData[key].disabled = !this.notesData[key].disabled;
      this.notesData[key].isEditing = true;
    },
    deleteNote(uuid) {
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
            CustomerNoteServices.delete(this.deleteRows)
              .then((res) => {
                if (res.status == 200) {
                  this.$swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Note Deleted Successfully",
                    timer: 3600,
                  });
                  this.notesData = this.notesData.filter((item) => item.uuid != uuid);
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
    addNewNote() {
      this.notesData.push({
        id: this.notesData.length,
        note: "",
        disabled: false,
        isEditing: false,
      });
    },
    setPagination(meta) {
      this.activePage = parseInt(meta.current_page);
      this.pages = parseInt(meta.last_page);
      this.perPage = parseInt(meta.per_page);
    },
    changePagination(value) {
      this.perPage = parseInt(value);
      this.getNoteData("", this.perPage);
    },
    resetForm() {
      // for (let index in this.form) {
      this.form.note = "";
      // }
      // this.isEditing = false;
    },
    onTableChange() {
      setTimeout(() => {
        const agent = this.$refs.externalAgent;
        this.notesData = agent.currentItems;
        this.pages = Math.ceil(agent.sortedItems.length / 5);
      }, 1000);
    },
  },
};
</script>

<style>
textarea {
  height: 100px !important;
}
.form-group {
  margin-bottom: 0px !important;
}
.edit-record {
  color: green !important;
  cursor: pointer;
}
.del-record {
  color: red !important;
  cursor: pointer;
}
</style>
