<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Term Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(term, k) in terms" :key="k">
              <td>{{ term.label }}</td>
              <td>
                <CButton
                  @click="editTerm(term)"
                  class="btn-sm text-white"
                  color="warning"
                  >Edit <CIcon :content="$options.cilPencil"
                /></CButton>
              </td>
            </tr>
          </tbody>
        </table>
      </CCol>
    </CRow>
    <TermAndConditionModel :editData="editData" @update-table="updateTable" />
  </div>
</template>
<script>
import SettingService from "@/services/settings/SettingService";
import { cilPencil } from "@coreui/icons-pro";
import TermAndConditionModel from "@/components/termsAndConditions/TermAndConditionModel";

export default {
  name: "TermAndCondition",
  components: {
    TermAndConditionModel,
  },
  cilPencil,
  data: () => ({
    settingData: [],
    editData: {},
    terms: [
      {
        key: "invoice_term_and_condition",
        label: "Invoice",
        data: "",
      },
      {
        key: "quotation_term_and_condition",
        label: "Quotation ",
        data: "",
      },
      {
        key: "purchase_order_term_and_condition",
        label: "Purchase Orders",
        data: "",
      },
      {
        key: "payment_term_and_conditon",
        label: "Payments",
        data: "",
      },
    ],
  }),

  created() {
    this.GeneralSettingService();
  },
  methods: {
    updateTable() {
      setTimeout(() => {
        this.GeneralSettingService();
      }, 1000);
    },
    editTerm(term) {
      this.editData = term;
      this.$store.commit("set_term_and_condition_model", true);
    },
    GeneralSettingService() {
      let type = "accounting";
      this.$store.commit("set_loader");
      SettingService.getAll(type)
        .then(({ data }) => {
          if (data) {
            data.map((item) => {
              this.terms.map((term) => {
                if (term.key === item.key) {
                  term.data = item.value;
                }
              });
            });
          }
          this.$store.commit("close_loader");
        })
        .catch((error) => {
          this.$store.commit("close_loader");
          console.log(error);
        });
    },
    updateGeneralSetting() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.commit("set_loader");
        this.settingData = [];
        for (const key in this.form) {
          this.settingData.push({
            key: key,
            value: this.form[key],
            type: "accounting",
          });
        }
        let data = this.settingData;
        SettingService.update(data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Settings Updated Successfully",
                timer: 3600,
              });

              this.$v.$reset();
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
  },
};
</script>
