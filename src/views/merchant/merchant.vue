<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader> Merchant View </CCardHeader>
          <CCardBody>
            <CTabs id="Mer" name="Mer" ref="Mer" variant="pills" vertical>
              <CTab active>
                <template slot="title">
                  {{ tabs[0] }}
                </template>
                <CRow>
                  <Loader/>
                  <CCol xs="12" lg="7">
                    <CCardHeader> <strong>Merchant</strong> Information </CCardHeader>
                    <CCardBody>
                      <CForm>
                        <CInput
                          label="Bussiness Name : "
                          horizontal
                          autocomplete="name"
                          disabled
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
                        <!-- <div class="form-group"> -->
                        <!-- <label for="signature">Stamp</label> -->
                        <!-- <input class="form-control" id="Stamp" type="file" @change="pickFile" style="padding:3px;width: 75%;float:right;" /> -->

                        <!-- </div> -->
                         <CRow>
                <CCol sm="12" md="12" class="pt-2">
                  <label for="signature">Stamp</label>
                  <app-upload ref="fileUpload" @file:changed="handleFile"
                  fileType="image/jpg,image/jpeg,image/png"
                  />

                  <div v-if="displays_stamps && displays_stamps.length" class="attachment-display">
                    <ul class="mt-5 d-flex">
                      <li
                        v-for="(img, index) in displays_stamps"
                        v-bind:key="index"
                        class="display-attachment-row"
                      >
                        <div>
                          <span>
                            <img
                              v-bind:src="img.path"
                              class="name-attachment"
                              style="max-width: 80px"
                            />
                          </span>
                        </div>
                        <span
                          >{{ img.name }}
                          <a
                            @click.prevent="deleteAttachment(img.uuid)"
                            class="delete-attachment"
                          >
                            <CIcon :content="$options.cilTrash" /> </a
                        ></span>
                      </li>
                    </ul>
                  </div>
                </CCol>
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
                          class="mb-2"
                          width="100%"
                        />
                      </div>
                      <!-- <CInputFile
                        label="Change Logo"
                        horizontal
                        custom
                        class="logoupload"
                        @click.prevent="selectImage"
                      /> -->
                      <input class="form-control" type="file" @change="pickFile" style="padding:3px;" />
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
              <CTab>
                <template slot="title">
                  {{ tabs[2] }}
                </template>
                <CCardHeader>
                  <strong>Plugin</strong>
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
                <CRow>
                  <CCol v-for="item in pluginlist" :key="item.name" sm="6" md="4" class="p-0">
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
                              style="float: right; width: 80px; margin-top: 15px"
                              >{{ item.active }}</CButton
                            >
                          </CCol>
                        </CRow>
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CRow>
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
  </div>
</template>

<script>
// import { cibHtmlacademy } from "@coreui/icons";
import { mapActions } from "vuex";
import AppUpload from "@/components/uploads/Upload.vue";
import { cilTrash } from "@coreui/icons-pro";
import Loader from "@/components/layouts/Loader.vue";

export default {
  name: "Tabs",
    components: {
    AppUpload,
    Loader
  },
  cilTrash,
  data() {
    return {
      pluginlist: [],
      pluginname: "",
      general_items: {
        business_name: "",
        business_activity: "",
        name: "",
        email: "",
        mobile: "",
        country: "",
        previewImage: "/img/images/no-logo.png",
        logo: "",
        stamps: [],
      },
      displays_stamps: [],
      imageData: "",
      tabs: ["General", "Billing", "Plugins"],
      InvoiceLst: [
        { InvoiceNum: "#123122", InvoiceDate: "07/04/2021", action: "Paid" },
        { InvoiceNum: "#234244", InvoiceDate: "07/07/2021", action: "Unpaid" },
      ],
      PluginLst: [
        {
          name: "plugin1",
          imgUrl:  "/img/images/photo-not-available.png",
          content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit,",
          active: "Active",
        },
        {
          name: "plugin2",
          imgUrl:  "/img/images/photo-not-available.png",
          content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit,",
          active: "Deactive",
        },
        {
          name: "plugin3",
          imgUrl:  "/img/images/photo-not-available.png",
          content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit,",
          active: "Deactive",
        },
        {
          name: "plugin4",
          imgUrl:  "/img/images/photo-not-available.png",
          content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit,",
          active: "Active",
        },
        {
          name: "plugin5",
          imgUrl:  "/img/images/photo-not-available.png",
          content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit,",
          active: "Deactive",
        },
        {
          name: "plugin6",
          imgUrl:  "/img/images/photo-not-available.png",
          content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit,",
          active: "Active",
        },
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
  },
  methods: {
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
    displayData(data = null){
      if (data && data !== '') {
          this.general_items.business_name = JSON.parse(data.business_name).en;
          this.general_items.business_activity = JSON.parse(
            data.business_activity
          ).en;
          this.general_items.name = JSON.parse(data.owner_name).en;
          this.general_items.email = data.business_email;
          this.general_items.mobile = data.business_mobile_no;
          this.general_items.country = data.country;
          if (data.logo) {
            this.general_items.previewImage = data.logo.path;
          }
          this.general_items.logo = "";

          if (data.stamps) {
            this.displays_stamps = [];
            let displays_stamps = this.displays_stamps;
            data.stamps.map(function (item) {
              displays_stamps.push(item);
            });
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
      formData.append("business_email", this.general_items.email);
      formData.append("business_mobile_no", this.general_items.mobile);
      if (this.general_items.logo != "") {
        formData.append("logo", this.general_items.logo);
      }
      if(this.general_items.stamps && this.general_items.stamps.length) {
        this.general_items.stamps.map(function (item) {
          formData.append("stamps[]", item);
        });
      }
      formData.append("_method", "PATCH");

      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      this.$store.commit("remove_errors");

      this.$http
        .post("/business/" + business_id, formData, config)
        .then((response) => {
          if (response.status == 200) {
            this.resetForm();
            this.displayData(response.data);
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Detail Updated Successfully",
              timer: 3600,
            });
          }
        })
        .catch((error) => {
          if (error.response.status == 422) {
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
        handleFile(files) {
      this.general_items.stamps = Object.values(files);
    },
    deleteAttachment(uuid) {
      this.$swal
        .fire({
          title: "Do you want to delete this Attachment",
          text: "This will be Deleted from Database",
          showCancelButton: true,
          confirmButtonColor: "#e55353",
          confirmButtonText: "Yes, remove it it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$store
              .dispatch("deleteAttachment", uuid)
              .then((res) => {
                if (res.status == 200) {
                  this.$swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Attachment Deleted Successfully",
                    timer: 3600,
                  });
                  this.displays_stamps = this.displays_stamps.filter(
                    (item) => item.uuid != uuid
                  );
                }
              })
              .catch((err) => {
                this.$swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Something went Wrong",
                  timer: 3600,
                });
                console.log(err);
              });
          }
        });
    },
     resetForm() {
      this.general_items.stamps = [];
      this.display_stamps = [];
      this.$refs.fileUpload.reset();
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
    margin:10px !important;
}
</style>
