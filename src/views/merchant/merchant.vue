<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
    <Loader/>
        <CCard>
          <CCardHeader> Merchant View </CCardHeader>
          <CCardBody>
            <CTabs id="Mer" name="Mer" ref="Mer" variant="pills" vertical>
              <CTab active>
                <template slot="title">
                  {{ tabs[0] }}
                </template>
                <CRow>

                  <CCol xs="12" lg="7">
                    <CCardHeader> <strong>Merchant</strong> Information </CCardHeader>
                    <CCardBody>
                      <CForm>
                        <CInput
                          label="Bussiness Name : "
                          horizontal
                          autocomplete="name"
                          v-model="general_items.business_name"
                        />
                        <CInput
                          label="Bussiness Activity : "
                          horizontal
                          disabled
                          v-model="general_items.business_activity"
                        />
                      </CForm>
                    </CCardBody>
                    <CCardHeader> <strong>Owner</strong> Information </CCardHeader>
                    <CCardBody>
                      <CForm>
                        <CInput
                          label="Name : "
                          horizontal
                          disabled
                          v-model="general_items.name"
                        />
                        <CInput
                          label="Email : "
                          horizontal
                          v-model="general_items.email"
                        />
                        <CInput
                          label="Mobile : "
                          horizontal
                          v-model="general_items.mobile"
                        />
                        <CInput
                          label="Country : "
                          horizontal
                          disabled
                          v-model="general_items.country"
                        />
                      <CInput label="Tax ID" horizontal v-model="general_items.tax_id" />

                        <!-- <div class="form-group"> -->
                        <!-- <label for="signature">Stamp</label> -->
                        <!-- <input class="form-control" id="Stamp" type="file" @change="pickFile" style="padding:3px;width: 75%;float:right;" /> -->

                        <!-- </div> -->
                         <CRow>
              </CRow>
              <br/>
               <div>
                 <p v-if="this.$store.state.errors.length">
                  <b>Please correct the following error(s):</b>
                  <ul>
                    <li class="error" v-for="(error, index) in this.$store.state.errors" v-bind:key="index">{{ error }}</li>
                  </ul>
                </p>
               </div>
                        <CButton

                          block
                          color="success"
                          @click.prevent="updateDetail"
                          style="float: right; width: 100px"
                          >Update</CButton
                        >
                      </CForm>
                    </CCardBody>
                  </CCol>
                  <CCol xs="12" lg="5">
                    <CCardBody>
                      <div class="mb-2" style="padding: 5px; background: #fff">
                        <CImg
                          v-bind:src="general_items.previewImage"
                          block
                          class="mb-2 imger"
                          width="100%"
                        />
                      </div>
                      <input class="form-control" type="file" @change="pickFile" style="padding:3px;" />
                    <hr/>
                      <div class="mb-2" style="padding: 5px; background: #fff">

                        <CImg
                          v-bind:src="general_items.previewStampImage"
                          block
                          class="mb-2 imger"
                          width="100%"
                        />
                      </div>
                        <label for="signature">Electronic Stamp:</label>
                      <input class="form-control" type="file" @change="pickStampFile" style="padding:3px;" />
                    </CCardBody>
                  </CCol>
                </CRow>
              </CTab>
              <CTab>
                <template slot="title">
                  {{ tabs[1] }}
                </template>
                <CRow>
                  <CCol xs="12" lg="7">
                    <CCardHeader>
                      <strong>SubScription</strong>
                    </CCardHeader>
                    <CCardBody>
                      <CForm>
                        <CInput
                          label="Expire Date : "
                          horizontal
                          autocomplete="name"
                          disabled
                        />
                        <CInput
                          label="Remaing : "
                          horizontal
                          autocomplete="name"
                          plaintext
                        />
                      </CForm>
                    </CCardBody>
                    <CCardHeader>
                      <strong>Packages</strong>
                    </CCardHeader>
                    <CCardBody>
                      <CForm>
                        <CInput
                          label="Package Name : "
                          horizontal
                          autocomplete="name"
                          plaintext
                        />
                      </CForm>
                    </CCardBody>
                    <CCardHeader>
                      <strong>Plugins</strong>
                    </CCardHeader>
                    <CCardBody>
                      <CForm>
                        <CInput
                          label="Plugin Name : "
                          horizontal
                          autocomplete="name"
                          plaintext
                        />
                      </CForm>
                    </CCardBody>
                    <CCardBody>
                      <CForm>
                        <CInput
                          label="Total : "
                          horizontal
                          autocomplete="name"
                          plaintext
                        />
                      </CForm>
                    </CCardBody>
                  </CCol>
                  <CCol xs="12" lg="5">
                    <CCardHeader>
                      <strong>Invoices</strong>
                    </CCardHeader>
                    <CCardBody>
                      <CCard
                        v-for="item in InvoiceLst"
                        :key="item.InvoiceNum"
                        color="default"
                        class="text-center"
                        body-wrapper
                      >
                        <blockquote
                          class="card-blockquote"
                          style="margin-bottom: -11px; float: left"
                        >
                          <p><strong>Invoice Number :</strong> {{ item.InvoiceNum }}</p>
                          <p><strong>Invoice Date :</strong> {{ item.InvoiceDate }}</p>
                        </blockquote>
                        <CButton
                          block
                          color="success"
                          style="float: right; width: 70px; margin-top: 15px"
                          >{{ item.action }}</CButton
                        >
                      </CCard>
                    </CCardBody>
                  </CCol>
                </CRow>
              </CTab>
              <CTab >
                <template slot="title">
                  {{ tabs[2] }}
                </template>
                <CCardHeader>
                  <strong>Plugin</strong>
                  <CButton
                  color="success"
                  class="btn mr-2"
                  style="float: right;line-height: 16px;"
                  @click="addCustomPlugin()"
                >
                  Add Custom Plugin</CButton
                >
                </CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol sm="12" md="12" style="padding-top: 12px">
                      <CInput
                        placeholder="plugin"
                        v-on:keyup="PluginSeach"
                        v-model="pluginname"
                      >
                        <template #prepend>
                          <CButton style="background: #10163a; color: white">
                            <CIcon name="cil-magnifying-glass" /> Search
                          </CButton>
                        </template>
                      </CInput>
                    </CCol>
                  </CRow>
                </CCardBody>
                <CRow v-if="pluginlist && pluginlist.length > 0">
                  <CCol v-for="(item, k) in pluginlist" :key="k" sm="6" md="4" class="p-0">
                    <CCard accent-color="primary">
                      <CCardHeader>{{ item.name }}</CCardHeader>
                      <CCardBody>
                        <CRow>
                          <CCol sm="12" md="5" class="p-0">
                            <CImg
                              :src="item.imgUrl"
                              block
                              class="mb-2"
                              width="100%"
                            />
                          </CCol>
                          <CCol sm="12" md="7" class="p-0">
                            <CCardBody>{{ item.content }}</CCardBody>
                            <CButton
                              block
                              color="success"
                              style="float: right; width: 100px; margin-top: 15px"
                              @click="togglePlugin(item.uuid)"
                              >{{ item.status }}</CButton
                            >
                          </CCol>
                        </CRow>
                      </CCardBody>
                    </CCard>
                  </CCol>

                </CRow>
                 <CRow v-else class="text-center">
                    <CCol sm="12" md="12" class="text-muted text-center">No Plugin Found </CCol></CRow>
                <CButton
                  block
                  color="success"
                  style="float: right; width: 100px; margin-top: 15px"
                  >Load more</CButton
                >
              </CTab>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
      <CustomPluginModel @update-table="updateTable" />
  </div>
</template>

<script>
// import { cibHtmlacademy } from "@coreui/icons";
import { mapActions } from "vuex";
import { cilTrash } from "@coreui/icons-pro";
import Loader from "@/components/layouts/Loader.vue";
import ModuleService from "@/services/merchant/ModuleService";
import CustomPluginModel from "@/components/merchant/CustomPluginModel";

export default {
  name: "Tabs",
  components: {
    Loader,
    CustomPluginModel
  },
  cilTrash,
  data() {
    return {
      pluginname: "",
      general_items: {
        business_name: "",
        business_activity: "",
        name: "",
        email: "",
        mobile: "",
        country: "",
        tax_id: "",
        previewImage: "/img/images/no-logo.png",
        previewStampImage: "/img/images/no-stamp.png",
        logo: "",
        stamp: "",
      },
      imageData: "",
      tabs: ["General", "Billing", "Plugins"],
      InvoiceLst: [
        { InvoiceNum: "#123122", InvoiceDate: "07/04/2021", action: "Paid" },
        { InvoiceNum: "#234244", InvoiceDate: "07/07/2021", action: "Unpaid" },
      ],
      PluginLst: [

      ],
      activeTab: 1,
    };
  },

  mounted: function () {
    this.$el.querySelector(".col-sm-4").classList.add("col-sm-2");
    this.$el.querySelector(".col-sm-4").classList.remove("col-sm-4");

    this.$el.querySelector(".col-sm-8").classList.add("col-sm-10");
    this.$el.querySelector(".col-sm-8").classList.remove("col-sm-8");

    this.$store.commit("remove_errors");
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
  },
  created() {
    this.pluginlist = this.PluginLst;
    this.getBusinessInfo();
    this.indexPlugins();
  },
  methods: {
    updateTable() {
      setTimeout(() => {
        this.indexPlugins();
      }, 1000);
    },
    ...mapActions(["set_errors"]),
    getBusinessInfo() {
      this.$store.commit("set_loader");
      let business_id = localStorage.getItem("business_id");
      this.$http
        .get("/business/" + business_id)
        .then(({ data }) => {
          this.displayData(data);
          this.$store.commit("close_loader");
        })
        .catch((err) => {
          this.$store.commit("close_loader");
          console.log(err);
        });
    },
    displayData(data = null) {
      if (data && data !== "") {
        this.general_items.business_name = JSON.parse(data.business_name).en;
        this.general_items.business_activity = JSON.parse(
          data.business_activity
        ).en;
        this.general_items.name = JSON.parse(data.owner_name).en;
        this.general_items.email = data.business_email;
        this.general_items.mobile = data.business_mobile_no;
        this.general_items.country = data.country;
        this.general_items.tax_id = data.tax_id;
        if (data.logo) {
          this.general_items.previewImage = data.logo.path;
        }
        this.general_items.logo = "";
        this.general_items.stamp = "";

        if (data.stamp) {
          this.general_items.previewStampImage = data.stamp.path;
        }
      }
    },
    PluginSeach() {
      var data = [];
      var initial = this.PluginLst;
      if (initial.length > 0 && this.pluginname != "") {
        for (var i = 0; i < initial.length; i++) {
          if (
            initial[i]["name"]
              .toUpperCase()
              .includes(this.pluginname.toUpperCase())
          ) {
            data.push(initial[i]);
          }
        }
        this.pluginlist = data;
      } else if (this.pluginname == "") {
        this.pluginlist = initial;
      }
    },
    updateDetail() {
      let business_id = localStorage.getItem("business_id");
      let formData = new FormData();
      formData.append("business_name", this.general_items.business_name);
      formData.append("business_email", this.general_items.email);
      formData.append("tax_id", this.general_items.tax_id);
      formData.append("business_mobile_no", this.general_items.mobile);
      if (this.general_items.logo != "") {
        formData.append("logo", this.general_items.logo);
      }
      if (this.general_items.stamp) {
        formData.append("stamp", this.general_items.stamp);
      }
      formData.append("_method", "PATCH");

      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      this.$store.commit("remove_errors");

      this.$http
        .post("/business/" + business_id, formData, config)
        .then((response) => {
          if (response.status === 200) {
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Detail Updated Successfully",
              timer: 3600,
            });
            this.displayData(response.data);
          }
        })
        .catch((error) => {
          if (error.response && error.response.status == 422) {
            let errors = error.response.data.errors;
            for (const err in errors) {
              this.set_errors(errors[err][0]);
            }
          }
        });
    },
    pickFile(e) {
      let file = e.target.files;
      if (file && file[0]) {
        this.general_items.logo = file[0];
        let reader = new FileReader();
        reader.onload = (e) => {
          this.general_items.previewImage = e.target.result;
        };
        reader.readAsDataURL(file[0]);
      }
    },
    pickStampFile(e) {
      let file = e.target.files;
      if (file && file[0]) {
        this.general_items.stamp = file[0];
        let reader = new FileReader();
        reader.onload = (e) => {
          this.general_items.previewStampImage = e.target.result;
        };
        reader.readAsDataURL(file[0]);
      }
    },
    indexPlugins() {
      var plugins = this.pluginlist;
      ModuleService.index()
        .then(({ data }) => {
          if(data){
          data.map((item, id) => {
            plugins.push({
              uuid: item.uuid,
              global_id: item.global_id,
              name: item.name,
              imgUrl: "/img/images/photo-not-available.png",
              content: item.description,
              status: item.status == "active" ? "Deactivate" : "Activate" ,
            });
          });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addCustomPlugin() {
      this.$store.commit("set_custom_plugin_model", true);
    },
    togglePlugin(uuid) {
      this.$store.commit("set_loader");
      let plugins = this.pluginlist;
      let plugin = plugins.find((item) => item.uuid == uuid);
      let status = '';
      let successMsg = '';
      if (plugin.status === "Activate") {
        status = "active";
        successMsg = 'Activated';
        plugin.status = "Deactivate";
      } else {
        status = "inactive";
         successMsg = 'Deactivated';
        plugin.status = "Activate";
      }
      this.$http.patch(`/modules/${plugin.global_id}/${status}`).then((response) => {
        if (response.status === 200) {
          this.$swal.fire({
            icon: "success",
            title: "Success",
            text: `Plugin ${successMsg} Successfully`,
            timer: 3600,
          });
        }
        this.$store.commit("close_loader");
      }).catch((error) => {
         this.$swal.fire({
            icon: "error",
            title: "Error",
            text: "Something went wrong",
            timer: 3600,
          });
        this.$store.commit("close_loader");
      });
    },
  },
};
</script>
<style>
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: #fff;
  background-color: #10163a !important;
}
.success {
  color: green;
}
.error {
  color: red;
}
.p-0.col-sm-6.col-md-4 {
  max-width: 31% !important;
  margin: 10px !important;
}
.imger {
  max-height: 150px;
  width: auto;
  display: block !important;
  margin: 0 auto;
}
</style>
