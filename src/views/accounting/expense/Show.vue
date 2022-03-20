<template>
  <div>
    <CCard>
      <Loader />
      <CCardHeader> Expense </CCardHeader>
      <CCardBody>
        <CRow class="mb-4">
          <!-- table to show expense data -->

          <CCol xs="12" lg="12">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Account</th>
                  <th>Debit</th>
                  <th>Date</th>
                  <th>Reference No</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ expense.account ? expense.account.name : "-" }}</td>
                  <td>{{ expense.debit ? expense.debit : "-" }}</td>
                  <td>{{ expense.date ? expense.date : "-" }}</td>
                  <td>{{ expense.ref_id ? expense.ref_id : "-" }}</td>
                  <td>{{ expense.status ? expense.status : "-" }}</td>
                </tr>
              </tbody>
            </table>
          </CCol>
        </CRow>
        <!-- show description and attachments -->
        <CRow class="mb-4">
          <CCol xs="12" lg="12">
            <div>
              <strong> Note : </strong>
              <span class="ml-2">{{ expense.description }}</span>
            </div>
          </CCol>
        </CRow>
        <CRow class="mb-4">
          <CCol xs="12" lg="12">
            <strong> Attachments : </strong>
            <div class="attachment-display">
              <ul v-if="expense.documents" style="padding-left: 0px">
                <li
                  v-for="(doc, index) in expense.documents"
                  v-bind:key="index"
                  class="display-attachment-row"
                >
                  <CIcon :content="$options.cisFile" />
                  <a v-bind:href="doc.path" target="_blank" class="name-attachment">
                    {{ doc.name }}</a
                  >
                </li>
              </ul>
            </div>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  </div>
</template>
<script>
import ExpenseService from "@/services/accounting/expense/ExpenseService";
import Loader from "@/components/layouts/Loader.vue";
import { cilPencil, cilTrash, cilEye, cisFile, cisWallet } from "@coreui/icons-pro";

export default {
  name: "ShowExpense",
  cisWallet,
  cilPencil,
  cilTrash,
  cilEye,
  cisFile,
  components: {
    Loader,
  },

  data() {
    return {
      uuid: "",
      expense: Object,
      // options: {
      //   contacts: [{ label: "Choose Contact", value: "" }],
      // },
    };
  },

  created() {
    this.getServerData();
  },
  computed: {
    businessLogo() {
      return this.$store.getters.getBusinessLogo;
    },
  },
  methods: {
    async getServerData() {
      this.$store.commit("set_loader");
      await new Promise((resolve, reject) => {
        this.uuid = this.$route.params.id;
        ExpenseService.get(this.uuid)
          .then(({ data }) => {
            if (data) {
              this.expense = data;
            }

            this.$store.commit("close_loader");
            resolve();
          })
          .catch((err) => {
            this.$store.commit("close_loader");
            console.log(err);
          });
      });
    },
  },
};
</script>
<style>
.vue-html2pdf .layout-container {
  position: inherit !important;
  width: auto !important;
  height: auto !important;
  background: initial !important;
}
.buttons-box {
  display: flex;
  width: auto;
  align-items: center;
}
</style>
