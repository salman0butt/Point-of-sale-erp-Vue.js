<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>{{ isEditing ? "Edit" : "New" }} Journal </CCardHeader>
          <CCardBody>
            <CRow>
              <Loader />
              <CCol xs="12" lg="12">
                <form @submit.prevent="isEditing ? updateJournal() : saveJournal()">
                  <CRow>
                    <CCol xs="12" md="6" class="pt-2">
                      <CInput
                        type="date"
                        horizontal
                        label="Date"
                        v-model="form.date"
                        :class="{ error: $v.form.date.$error }"
                        @input="$v.form.date.$touch()"
                      />
                      <div v-if="$v.form.date.$error">
                        <p v-if="!$v.form.date.required" class="errorMsg">
                          Date is required
                        </p>
                      </div>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol xs="12" md="6" class="pt-2">
                      <CInput
                        horizontal
                        label="Journal#"
                        v-model="form.journal"
                        :class="{ error: $v.form.journal.$error }"
                        @input="$v.form.journal.$touch()"
                      />
                      <div v-if="$v.form.journal.$error">
                        <p v-if="!$v.form.journal.required" class="errorMsg">
                          Journal is required
                        </p>
                      </div>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol xs="12" md="6" class="pt-2">
                      <CInput
                        horizontal
                        label="Refernce#"
                        v-model="form.reference"
                        :class="{ error: $v.form.reference.$error }"
                        @input="$v.form.reference.$touch()"
                      />
                      <div v-if="$v.form.reference.$error">
                        <p v-if="!$v.form.reference.required" class="errorMsg">
                          Journal is required
                        </p>
                      </div>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol xs="12" md="6" class="pt-2">
                      <CTextarea
                        horizontal
                        class="mt-4"
                        label="Notes"
                        placeholder="content here.."
                        v-model="form.description"
                        :class="{ error: $v.form.reference.$error }"
                        @input="$v.form.reference.$touch()"
                      />
                      <div v-if="$v.form.reference.$error">
                        <p v-if="!$v.form.reference.required" class="errorMsg">
                          Notes is required
                        </p>
                      </div>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol xs="12" md="6" class="pt-2">
                      <CRow>
                        <CCol xs="12" md="3" class="pt-2">
                          <label for="jornal_type">Journal Type</label>
                        </CCol>
                        <CCol xs="12" md="9" class="pt-2">
                          <CInputCheckbox
                            id="jornal_type"
                            label="Cash based journal"
                            :checked="true"
                            custom
                          />
                        </CCol>
                      </CRow>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol xs="12" md="6" class="pt-2">
                      <CSelect
                        label="Currency"
                        horizontal
                        :options="options.currency"
                        :value.sync="form.currency"
                        :class="{ error: $v.form.currency.$error }"
                        @input="$v.form.currency.$touch()"
                      />
                      <div v-if="$v.form.currency.$error">
                        <p v-if="!$v.form.currency.required" class="errorMsg">
                          Currency To is required
                        </p>
                      </div>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol xs="12" md="12" class="pt-2">
                      <table class="table table-bordered">
                        <thead>
                          <tr>
                            <th scope="col">Account</th>
                            <th scope="col">Description</th>
                            <th scope="col">Contact(BHD)</th>
                            <th scope="col">Debits</th>
                            <th scope="col">Credits</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, k) in form.items" :key="k">
                            <th>
                              <CSelect
                                :options="options.account"
                                :value.sync="form.account"
                              />
                            </th>
                            <td>
                              <CTextarea
                                placeholder="content..."
                                v-model="form.description"
                              />
                            </td>
                            <td>
                              <CSelect
                                :options="options.contact"
                                :value.sync="form.contact"
                              />
                            </td>
                            <td></td>

                            <td></td>
                            <td>
                              <CIcon :content="$options.cilTrash" style="color: red" />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <CRow>
                        <CCol xs="12" md="6" class="pt-2">
                          <CButton
                            progress
                            timeout="2000"
                            color="default"
                            @click="addItem()"
                            >Add another line
                            <CIcon :content="$options.cisCaretBottom" style="width: 10px"
                          /></CButton>
                        </CCol>
                        <CCol xs="12" md="5" class="pt-2 ml-5">
                          <CRow class="pt-2 ra">
                            <CCol> <h6>Sub Total</h6> </CCol>
                            <CCol> </CCol>
                            <CCol><h6>0.00</h6> </CCol>
                          </CRow>
                          <CRow class="pt-2 ra">
                            <CCol>
                              <h5>Total</h5>
                            </CCol>
                            <CCol> </CCol>
                            <CCol
                              ><h5><strong>0.00</strong></h5>
                            </CCol>
                          </CRow>
                        </CCol>
                      </CRow>
                    </CCol>
                  </CRow>

                  <p v-if="$v.$anyError" class="errorMsg">
                    Please Fill the required data
                  </p>
                  <CRow class="mt-4">
                    <CButton
                      progress
                      timeout="2000"
                      block
                      color="success"
                      style="float: right; width: 200px; margin-left: 20px"
                      type="submit"
                      @click="saveAndExit = false"
                      >Save & Continue</CButton
                    >
                    <CButton
                      timeout="2000"
                      block
                      color="danger"
                      style="float: right; width: 140px; margin-left: 20px; margin-top: 0"
                      @click="saveAndExit = true"
                      type="submit"
                      >Save & Exit</CButton
                    >
                  </CRow>
                </form>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<script>
// import JournalService from "@/services/purchaseOrder/JournalService";
import { required } from "vuelidate/lib/validators";
import { cilTrash, cisCaretBottom } from "@coreui/icons-pro";
import Loader from "@/components/layouts/Loader.vue";

export default {
  name: "CreateOrUpdateJournal",
  components: {
    Loader,
  },
  cilTrash,
  cisCaretBottom,
  data: () => ({
    isEditing: false,
    saveAndExit: false,
    form: {
      id: "",
      date: "",
      journal: "",
      reference: "",
      notes: "",
      journal_type: "",
      currency: "",
      items: [
        {
          account: "",
          description: "",
          contact: "",
          debit: "",
          credit: "",
        },
      ],
    },
    options: {
      supplier: [
        { value: "", label: "Choose Supplier", disabled: true, selected: "" },
        { value: "1", label: "Supplier 1" },
        { value: "2", label: "Supplier 2" },
        { value: "3", label: "Supplier 3" },
      ],
      products: [
        { value: "", label: "Choose Item", disabled: true, selected: "" },
        { value: "1", label: "Product 1" },
        { value: "2", label: "Product 2" },
        { value: "3", label: "Product 3" },
      ],
      currency: [
        { value: "", label: "Choose Currency", disabled: true, selected: "" },
        { value: "1", label: "Currency 1" },
        { value: "2", label: "Currency 2" },
        { value: "3", label: "Currency 3" },
      ],
      account: [
        { value: "", label: "Choose Account", disabled: true, selected: "" },
        { value: "1", label: "Account 1" },
        { value: "2", label: "Account 2" },
        { value: "3", label: "Account 3" },
      ],
      contact: [
        { value: "", label: "Choose Contact", disabled: true, selected: "" },
        { value: "1", label: "Contact 1" },
        { value: "2", label: "Contact 2" },
        { value: "3", label: "Contact 3" },
      ],
    },
  }),
  validations() {
    return {
      form: {
        date: { required },
        journal: { required },
        reference: { required },
        notes: { required },
        journal_type: { required },
        currency: { required },
      },
    };
  },
  created() {
    // this.form.id = this.$route.params.id;
    // if (this.form.id !== "" && this.form.id !== undefined) {
    //   this.isEditing = true;
    //   this.getJournal();
    // }
  },
  methods: {
    addItem() {
      this.form.items.push({
        account: "",
        description: "",
        contact: "",
        debit: "",
        credit: "",
      });
    },

    // saveJournal() {
    //   this.$v.$touch();
    //   if (!this.$v.$invalid) {
    //     this.$store.commit("set_loader");
    //     let formData = new FormData();
    //     formData.append("name", this.form.name);
    //     const config = {
    //       headers: { "Content-Type": "multipart/form-data" },
    //     };
    //     // let data = this.form;
    //     JournalService.create(formData, config)
    //       .then((res) => {
    //         if (res.status == 201) {
    //           this.displayData(res.data);
    //           this.$swal.fire({
    //             icon: "success",
    //             title: "Success",
    //             text: "Journal Added Successfully",
    //             timer: 3600,
    //           });
    //           this.$v.$reset();
    //           this.resetForm();
    //           this.$store.commit("close_loader");
    //           if (this.saveAndExit) {
    //             this.$router.push({ path: "/catalogs/brands/index" });
    //           } else {
    //             this.$router.push({
    //               path: "/catalogs/brands/edit/" + res.data.uuid,
    //             });
    //           }
    //         }
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //         this.$store.commit("close_loader");
    //         this.$swal.fire({
    //           icon: "error",
    //           title: "Error",
    //           text: "Something Went Wrong.",
    //           timer: 3600,
    //         });
    //       });
    //   }
    // },
    // updateJournal() {
    //   this.$v.$touch();
    //   if (!this.$v.$invalid) {
    //     this.$store.commit("set_loader");
    //     let formData = new FormData();
    //     formData.append("name", this.form.name);
    //     formData.append("status", this.form.status);
    //     formData.append("image", this.form.image);
    //     formData.append("parent_id", this.form.parent_id);
    //     formData.append("_method", "PATCH");
    //     const config = {
    //       headers: { "Content-Type": "multipart/form-data" },
    //     };
    //     JournalService.update(this.form.id, formData, config)
    //       .then((res) => {
    //         if (res.status == 200) {
    //           this.displayData(res.data);
    //           this.$swal.fire({
    //             icon: "success",
    //             title: "Success",
    //             text: "Journal Updated Successfully",
    //             timer: 3600,
    //           });
    //           this.$v.$reset();
    //           this.$store.commit("close_loader");
    //           if (this.saveAndExit) {
    //             this.$router.push({ path: "/catalogs/brands/index" });
    //           }
    //           //  else {
    //           //   this.$router.push({
    //           //     path: "/catalogs/brands/edit/" + res.data.uuid,
    //           //   });
    //           // }
    //         }
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //         this.$store.commit("close_loader");
    //         this.$swal.fire({
    //           icon: "error",
    //           title: "Error",
    //           text: "Something Went Wrong.",
    //           timer: 3600,
    //         });
    //       });
    //   }
    // },
    // getJournal() {
    //   this.$store.commit("set_loader");
    //   JournalService.get(this.form.id)
    //     .then(({ data }) => {
    //       this.displayData(data);
    //       this.$store.commit("close_loader");
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       this.$store.commit("close_loader");
    //       this.isEditing = false;
    //       this.$router.push({ path: "/catalogs/brands/index" });
    //     });
    // },
    // displayData(data = null) {
    //   if (data != null && data != "") {
    //     this.resetForm();
    //     this.isEditing = true;
    //     this.form.id = data.uuid;
    //     this.form.name = data.name;
    //     if (data.parent_id !== "" && data.parent_id !== null) {
    //       this.form.parent_id = data.parent_id ?? "";
    //     }
    //     this.form.status = data.status;
    //     this.display_images = data.image ?? "";
    //     this.form.image = "";
    //   }
    // },
    // resetForm() {
    //   for (let index in this.form) {
    //     this.form[index] = "";
    //   }
    //   this.isEditing = false;
    // },
  },
};
</script>
<style scoped>
.ra {
  align-items: baseline;
}
</style>
