<template>
  <div>
    <CCard>
      <Loader />
      <CCardHeader>
        Journal #
        <strong>
          {{
            journal.journal_no ? journal.journal_prefix + journal.journal_no : "-"
          }}</strong
        >
        <div class="float-right buttons-box">
          <a href="#" class="btn btn-sm btn-info" @click.prevent="savePdf()">
            <CIcon name="cil-save" /> Download
          </a>
          <a
            class="btn btn-sm btn-info ml-1"
            style="color: #fff"
            @click.prevent="print()"
          >
            <CIcon name="cil-print" class="mr-1" /> Print Me
          </a>
        </div>
      </CCardHeader>
      <CCardBody id="printMe">
        <vue-html2pdf
          :show-layout="false"
          :float-layout="true"
          :enable-download="true"
          :preview-modal="false"
          :paginate-elements-by-height="1400"
          filename="BillPayment"
          :pdf-quality="2"
          :manual-pagination="false"
          pdf-format="a4"
          pdf-orientation="landscape"
          pdf-content-width="100%"
          ref="html2Pdf"
        >
          <section slot="pdf-content" md="12" style="padding: 0 20px">
            <CRow class="mb-4">
              <CCol sm="4">
                <CImg
                  v-if="businessLogo"
                  :src="businessLogo"
                  block
                  class="mb-2 imger"
                  width="100%"
                  style="max-width: 150px"
                />
                <div>
                  <strong>{{ branch.name }}</strong>
                </div>
                <div>{{ branch.address }}</div>
                <div>Phone :{{ branch.mob }}</div>
                <div v-if="branch.cr">Cr #{{ branch.cr }}</div>
              </CCol>
              <CCol sm="8" class="mt-5" style="text-align: right">
                <div>
                  Dated :<strong># {{ journal.date }}</strong>
                </div>
                <div>
                  Refernce ID :<strong># {{ journal.ref_id }}</strong>
                </div>
              </CCol>
            </CRow>
            <div class="table-responsive-sm">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th class="right">Account</th>
                    <th class="center">Description</th>
                    <th class="right">Debits</th>
                    <th class="center">Credits</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(transaction, index) in journal.transactions" :key="index">
                    <td class="center">
                      {{
                        transaction.from_account
                          ? transaction.from_account.name
                          : transaction.to_account.name
                      }}
                    </td>
                    <td class="left">
                      {{ transaction.description ? transaction.description : "-" }}
                    </td>
                    <td class="left">
                      {{ transaction.debit ? transaction.debit : "-" }}
                    </td>
                    <td class="center">
                      {{ transaction.credit ? transaction.credit : "-" }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <CRow>
              <CCol lg="4" sm="5">
                <div>
                  <strong>
                    Note :
                    <span class="ml-2">{{ journal.description }}</span>
                  </strong>
                </div>
              </CCol>
              <CCol lg="4" sm="5" class="ml-auto">
                <table class="table table-clear">
                  <tbody>
                    <tr>
                      <td class="left">
                        <strong>Total Credits</strong>
                      </td>
                      <td class="right">
                        {{ this.total_credit }}
                      </td>
                    </tr>

                    <tr>
                      <td class="left"><strong>Total Debits</strong></td>
                      <td class="right">
                        {{ this.total_debit }}
                      </td>
                    </tr>
                    <tr>
                      <td class="left"><strong>Differnce</strong></td>
                      <td class="right">
                        {{ this.total_differnce }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </CCol>
            </CRow>
          </section>
        </vue-html2pdf>
      </CCardBody>
    </CCard>
  </div>
</template>
<script>
import JournalServices from "@/services/accounting/journal/JournalServices.js";

import { cisWallet } from "@coreui/icons-pro";
import Loader from "@/components/layouts/Loader.vue";
import { cilPencil, cilTrash, cilEye } from "@coreui/icons-pro";

import VueHtml2pdf from "vue-html2pdf";

export default {
  name: "ShowJournal",
  cisWallet,
  cilPencil,
  cilTrash,
  cilEye,
  components: {
    Loader,
    VueHtml2pdf,
  },

  data() {
    return {
      uuid: "",
      branch: Object,
      journal: Object,
      total_credit: 0,
      total_debit: 0,
      total_differnce: 0,
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
    async print() {
      await this.$htmlToPaper("printMe");
    },
    savePdf() {
      this.$refs.html2Pdf.generatePdf();
    },
    async getServerData() {
      this.$store.commit("set_loader");
      await new Promise((resolve, reject) => {
        this.uuid = this.$route.params.id;
        JournalServices.get(this.uuid)
          .then(({ data }) => {
            console.log(data);
            if (data) {
              this.journal = data;
              this.branch = data.branch;
              if (data.transactions) {
                data.transactions.map((transaction) => {
                  if (transaction.debit) {
                    this.total_debit += parseFloat(transaction.debit);
                  }
                  if (transaction.credit) {
                    this.total_credit += parseFloat(transaction.credit);
                  }
                });
                this.total_differnce = this.total_credit - this.total_debit;
              }
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
