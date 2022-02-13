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
                <form
                  @submit.prevent="isEditing ? updateJournal() : saveJournal()"
                >
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

                  <!-- <CRow>
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
                  </CRow> -->
                  <CRow>
                    <CCol xs="12" md="12" class="pt-2">
                      <table class="table table-bordered">
                        <thead>
                          <tr>
                            <th scope="col">Account</th>
                            <th scope="col">Description</th>

                            <th scope="col">Debits</th>
                            <th scope="col">Credits</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, k) in form.items" :key="k">
                            <th>
                              <multiselect
                                v-model="item.account"
                                :options="options.account"
                                :close-on-select="true"
                                :clear-on-select="false"
                                :disabled="isDisabled"
                                placeholder="Select Account"
                                label="label"
                              >
                              </multiselect>

                              <!-- <div v-if="$v.form.branch_id.$error">
                                  <p
                                    v-if="!$v.form.branch_id.required"
                                    class="errorMsg"
                                  >
                                    Branch is required
                                  </p>
                                </div> -->
                            </th>
                            <td>
                              <CTextarea
                                placeholder="content..."
                                v-model="item.description"
                              />
                            </td>

                            <td>
                              <CInput
                                type="number"
                                placeholder="0.00"
                                style="max-width: 100px"
                                v-model="item.debit"
                                @change="calculateTotal()"
                                step="any"
                              />
                            </td>

                            <td>
                              <CInput
                                type="number"
                                placeholder="0.00"
                                style="max-width: 100px"
                                v-model="item.credit"
                                @change="calculateTotal()"
                                step="any"
                              />
                            </td>
                            <td>
                              <CButton @click="removeItem(k)">
                                <CIcon
                                  :content="$options.cilTrash"
                                  style="color: red"
                                />
                              </CButton>
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
                            <CIcon
                              :content="$options.cisCaretBottom"
                              style="width: 10px"
                          /></CButton>
                        </CCol>
                        <CCol xs="12" md="5" class="pt-2 ml-1">
                          <CRow class="pt-2 ra">
                            <CCol> <h6>Sub Total</h6> </CCol>
                            <CCol
                              ><h6>{{ form.debitTotal }}</h6>
                            </CCol>
                            <CCol
                              ><h6>{{ form.creditTotal }}</h6>
                            </CCol>
                          </CRow>
                          <CRow class="pt-2 ra">
                            <CCol>
                              <h5>Total</h5>
                            </CCol>
                            <CCol>
                              <h5>
                                <strong>{{ form.debitTotal }}</strong>
                              </h5></CCol
                            >
                            <CCol
                              ><h5>
                                <strong>{{ form.creditTotal }}</strong>
                              </h5>
                            </CCol>
                          </CRow>
                          <CRow class="pt-2 ra">
                            <CCol>
                              <h5 style="color: red">Difference</h5>
                            </CCol>
                            <CCol> </CCol>
                            <CCol
                              ><h5>
                                <strong style="color: red">
                                  {{ form.difference }}</strong
                                >
                              </h5>
                            </CCol>
                          </CRow>
                        </CCol>
                      </CRow>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol xs="12" md="12" class="pt-2">
                      <CTextarea
                        class="mt-4"
                        label="Notes"
                        placeholder="content here.."
                        v-model="form.notes"
                        :class="{ error: $v.form.notes.$error }"
                        @input="$v.form.notes.$touch()"
                      />
                      <div v-if="$v.form.notes.$error">
                        <p v-if="!$v.form.notes.required" class="errorMsg">
                          Notes is required
                        </p>
                      </div>
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
                      @click="saveAndExit = true"
                      type="submit"
                      >Save & Exit</CButton
                    >
                    <CButton
                      timeout="2000"
                      block
                      color="danger"
                      style="
                        float: right;
                        width: 140px;
                        margin-left: 20px;
                        margin-top: 0;
                      "
                      type="submit"
                      @click="saveAsDraft = true"
                      >Save As Draft</CButton
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
import AccountServices from "@/services/accounting/accounts/AccountServices";
import JournalServices from "@/services/accounting/journal/JournalServices";
import Multiselect from "vue-multiselect";

export default {
  name: "CreateOrUpdateJournal",
  components: {
    Loader,
    Multiselect,
  },
  cilTrash,
  cisCaretBottom,
  data: () => ({
    isEditing: false,
    saveAndExit: false,
    saveAsDraft: false,
    isDisabled: false,
    form: {
      id: "",
      date: "",
      journal: "",
      reference: "",
      notes: "",
      journal_type: "",
      debitTotal: 0.0,
      creditTotal: 0.0,
      debitSubtotal: 0.0,
      creditSubtotal: 0.0,
      difference: 0,
      status: "completed",
      items: [
        {
          account: "",
          description: "",
          debit: 0,
          credit: 0,
        },
      ],
    },
    options: {
      account: [],
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
      },
    };
  },
  created() {
    this.getPreRequisites();
    if (this.$route.params.id) {
      this.form.id = this.$route.params.id;
      this.getJournal();
    }
  },
  methods: {
    addItem() {
      this.form.items.push({
        account: "",
        description: "",
        debit: 0,
        credit: 0,
      });
    },
    getPreRequisites() {
      var currentDateWithFormat = new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "-");
      this.form.date = currentDateWithFormat;

      AccountServices.getTreeStructure()
        .then(({ data }) => {
          let account = this.options.account;
          data.map(function (val) {
            if (val) {
              // Account type
              account.push({
                value: val.uuid,
                label: val.name,
                $isDisabled: true,
              });
            }
            if (val.children && val.children.length > 0) {
              // Account Subtype

              val.children.map(function (val2) {
                if (val2.accounts && val2.accounts.length > 0) {
                  account.push({
                    value: val2.uuid,
                    label: "-" + val2.name,
                    $isDisabled: true,
                  });
                  val2.accounts.map(function (val3) {
                    account.push({
                      value: val3.uuid,
                      label: "-- " + val3.name,
                    });
                  });
                }
              });
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    removeItem(index) {
      this.form.items.splice(index, 1);
      this.calculateTotal();
    },
    async calculateTotal() {
      // calulcate total and sub total
      let debitTotal = 0;
      let creditTotal = 0;

      this.form.items.map((item) => {
        if (item.credit || item.debit) {
          debitTotal += parseFloat(item.debit);
          creditTotal += parseFloat(item.credit);
        }
      });

      this.form.debitTotal = debitTotal.toFixed(3);
      this.form.creditTotal = creditTotal.toFixed(3);
      this.form.debitSubtotal = debitTotal.toFixed(3);
      this.form.creditSubtotal = creditTotal.toFixed(3);
      this.form.difference = (creditTotal - debitTotal).toFixed(3);
    },
    saveJournal() {
      if (!this.saveAsDraft) {
        if (this.form.difference != 0) {
          this.$swal.fire({
            icon: "error",
            title: "Error",
            text: "Debit and Credit must be equal to zero",
            timer: 3600,
          });
          return;
        }
      } else {
        this.form.status = "draft";
      }
      let formData = this.form;
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };

      JournalServices.create(formData, config)
        .then((res) => {
          this.$swal.fire({
            icon: "success",
            title: "Success",
            text: "Journal Added Successfully",
            timer: 3600,
          });

          if (this.saveAndExit) {
            this.$router.push({ path: "/accounting/journals/index" });
          } else {
            this.$router.push({
              path: "/accounting/journals/index",
            });
          }
        })
        .catch((error) => {
          this.$swal.fire({
            icon: "error",
            title: "Error",
            text: "Something Went Wrong.",
            timer: 3600,
          });
        });
    },
    updateJournal() {
      //   this.$v.$touch();
      this.$store.commit("set_loader");
      let formData = this.form;

      // formData.append("_method", "PATCH");
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      JournalServices.update(this.form.id, formData, config)
        .then((res) => {
          if (res.status == 200) {
            this.displayData(res.data);
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Journal Updated Successfully",
              timer: 3600,
            });
            this.$v.$reset();
            this.$store.commit("close_loader");
            this.$router.push({ path: "/accounting/journals/index" });
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
    },
    getJournal() {
      this.$store.commit("set_loader");
      JournalServices.get(this.form.id)
        .then(({ data }) => {
          console.log(data);
          this.displayData(data);
          this.$store.commit("close_loader");
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("close_loader");
          // this.isEditing = false;
          // this.$router.push({ path: "/catalogs/brands/index" });
        });
    },
    displayData(data = null) {
      if (data != null && data != "") {
        this.resetForm();
        this.isEditing = true;
        this.form.id = data.uuid;
        this.form.date = data.date;
        this.form.journal = data.journal_no;
        this.form.reference = data.ref_id;
        this.form.notes = data.description;
        if (data.transactions && data.transactions.length > 0) {
          data.transactions.map((value, index) => {
            var account_uuid = "";
            if (value.from_account) {
              account_uuid = {
                label: value.from_account.name,
                value: value.from_account.uuid,
              };
            } else {
              account_uuid = {
                label: value.to_account.name,
                value: value.to_account.uuid,
              };
              //
            }
            this.form.items.push({
              account: account_uuid,
              description: value.description,
              debit: value.debit,
              credit: value.credit,
            });

            // console.log(this.form.items);
          });
          this.calculateTotal();
        }
      }
    },
    resetForm() {
      // for (let index in this.form) {
      //   this.form[index] = "";
      // }
      this.form.items = [];
      this.isEditing = false;
    },
  },
};
</script>
<style scoped>
.ra {
  align-items: baseline;
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
