<template>
  <div>
    <CRow>
      <CCol xs="6" lg="6">
        <CCard>
          <CCardHeader> Total Send </CCardHeader>
          <CCardBody>
            <h3>{{ form.total_send }}</h3>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="6" lg="6">
        <CCard>
          <CCardHeader> Credit Balance </CCardHeader>
          <CCardBody>
            <h3>{{ form.total_credits }}</h3>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <Loader />
          <CCardHeader> SMS Status </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="12" md="12" class="pt-2">
                <CButton
                  color="success"
                  class="btn"
                  style="float: right; margin-right: 10px"
                  @click.prevent="buyCredit()"
                >
                  Buy Credits</CButton
                >
                <div style="clear: both; margin-bottom: 20px"></div>
                <CDataTable
                  :items="items"
                  :fields="fields"
                  table-filter
                  items-per-page-select
                  @pagination-change="changePagination"
                  :items-per-page="perPage"
                  sorter
                  clickable-rows
                  hover
                  ref="externalAgent"
                >
                  <template #user="{ item }">
                    <td>
                      {{ item.user.name }}
                    </td>
                  </template>
                </CDataTable>
                <CPagination
                  v-show="pages > 1"
                  :pages="pages"
                  :active-page.sync="activePage"
                />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <Loader />
          <CCardHeader> Sender </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol xs="12" lg="12">
                <form @submit.prevent="updateSmsSetting()">
                  <CRow>
                    <CCol sm="6" md="6" class="pt-2">
                      <CInput
                        label="Sender ID"
                        :value.sync="form.sender_id"
                        :class="{ error: $v.form.sender_id.$error }"
                        @input="$v.form.sender_id.$touch()"
                      />
                      <div v-if="$v.form.sender_id.$error">
                        <p v-if="!$v.form.sender_id.required" class="errorMsg">
                          Sender ID is required
                        </p>
                        <p v-if="!$v.form.sender_id.maxLength" class="errorMsg">
                          Sender ID Should be 10 characters
                        </p>
                      </div>
                    </CCol>
                  </CRow>

                  <CRow class="mt-4 d-block">
                    <CButton
                      progress
                      timeout="2000"
                      block
                      color="success"
                      style="float: right; width: 150px; margin-right: 20px"
                      type="submit"
                      >Save</CButton
                    >
                  </CRow>
                </form>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <BuyCreditModel />
  </div>
</template>
<script>
import SettingService from "@/services/settings/SettingService";
import { required, maxLength } from "vuelidate/lib/validators";
import Loader from "@/components/layouts/Loader";
import BuyCreditModel from "./BuyCreditModel";
import SmsPluginService from "@/services/plugins/sms/SmsPluginService";

const fields = [
  { key: "date", label: "Date", _style: "min-width:40%" },
  { key: "time", label: "Time", _style: "min-width:15%;" },
  { key: "user", label: "User", _style: "min-width:15%;" },
  { key: "status", label: "Status", _style: "width:25%;" },
];

export default {
  name: "SmsSettingForm",
  components: { Loader, BuyCreditModel },
  data: () => ({
    items: [],
    activePage: 1,
    pages: 0,
    perPage: 10,
    settingData: [],
    fields,
    form: {
      sender_id: "",
      total_send: 0,
      total_credits: 0,
    },
  }),
  validations() {
    return {
      form: {
        sender_id: { required, maxLength: maxLength(10) },
      },
    };
  },
  created() {
    this.smsSettingService();
    this.getSmsList();
  },
  computed: {
    credits() {
      return this.$store.getters.getSmsCredits;
    },
  },
  watch: {
    credits(val) {
      this.form.total_credits = val;
      // this.smsSettingService();
    },

    reloadParams() {
      this.onTableChange();
    },
    activePage() {
      this.getSmsList(this.activePage, this.perPage);
    },
  },
  methods: {
    getSmsList(page = "", per_page = "") {
      this.items = [];
      let items = this.items;
      this.$store.commit("set_loader");
      SmsPluginService.getAll(page, per_page)
        .then(({ data }) => {
          if (data && data.data) {
            data.data.map((item, id) => {
              items.push({ ...item, id });
            });
            if (data.data[0]) {
              this.form.total_send = data.data[0].total_send;
            }
            if (data.meta) {
              this.setPagination(data.meta);
            }
          }
          this.$store.commit("close_loader");
        })
        .catch((error) => {
          this.$store.commit("close_loader");
          console.log(error);
        });
    },
    smsSettingService() {
      let type = "sms";
      this.$store.commit("set_loader");
      SettingService.getAll(type)
        .then(({ data }) => {
          if (data) {
            let sender_id = "";
            let credits = 0;
            data.map(function (item) {
              if (item.key === "sms_sender_id") {
                sender_id = item.value;
              }
              if (item.key === "sms_credits") {
                credits = item.value;
              }
            });
            if (sender_id) {
              this.form.sender_id = sender_id;
            }
            if (credits) {
              this.form.total_credits = credits;
            }
            this.$store.commit("set_sms_credits", credits);
          }
          this.$store.commit("close_loader");
        })
        .catch((error) => {
          this.$store.commit("close_loader");
          console.log(error);
        });
    },
    buyCredit() {
      this.$store.commit("set_buy_credit_model", true);
    },
    updateSmsSetting() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.commit("set_loader");
        this.settingData = [];
        let data = this.form.sender_id;
        this.settingData.push({ key: "sms_sender_id", value: data, type: "sms" });
        SettingService.update(this.settingData)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Sender ID Updated Successfully",
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
    setPagination(meta) {
      this.activePage = parseInt(meta.current_page);
      this.pages = parseInt(meta.last_page);
      this.perPage = parseInt(meta.per_page);
    },
    onTableChange() {
      setTimeout(() => {
        const agent = this.$refs.externalAgent;
        this.designationsData = agent.currentItems;
        this.pages = Math.ceil(agent.sortedItems.length / 5);
      }, 1000);
    },
    changePagination(value) {
      this.perPage = parseInt(value);
      this.getSmsList("", this.perPage);
    },
  },
};
</script>
