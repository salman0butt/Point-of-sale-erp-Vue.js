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
                      <div class="mb-2" style="padding: 5px; background: #f7e9e9">
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
                      <input type="file" @change="pickFile" />
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
                    <CCol sm="6" md="8" class="pt-2">
                      <CTabs add-tab-classes="mt-1">
                        <CTab active>
                          <template slot="title"> Featured </template>
                          <CCardBody> </CCardBody>
                        </CTab>
                        <CTab>
                          <template slot="title"> Popular </template>
                          <CCardBody> </CCardBody>
                        </CTab>
                        <CTab>
                          <template slot="title"> Active </template>
                          <CCardBody> </CCardBody>
                        </CTab>
                      </CTabs>
                    </CCol>
                    <CCol sm="6" md="4" style="padding-top: 12px">
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
                  <CCol v-for="item in pluginlist" :key="item.name" sm="6" md="4">
                    <CCard accent-color="primary">
                      <CCardHeader>{{ item.name }}</CCardHeader>
                      <CCardBody>
                        <CRow>
                          <CCol sm="12" md="4">
                            <CImg
                              :src="item.imgUrl"
                              block
                              class="mb-2"
                              width="100%"
                              height="100%"
                            />
                          </CCol>
                          <CCol sm="12" md="8">
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
import $ from "jquery";
// import { cibHtmlacademy } from "@coreui/icons";
import { mapActions } from 'vuex'

export default {
  name: "Tabs",
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
        previewImage: "https://picsum.photos/1024/480/?image=54",
        logo: null,
      },
      imageData: "",
      tabs: ["General", "Billing", "Plugins"],
      InvoiceLst: [
        { InvoiceNum: "#123122", InvoiceDate: "07/04/2021", action: "Paid" },
        { InvoiceNum: "#234244", InvoiceDate: "07/07/2021", action: "Unpaid" },
      ],
      PluginLst: [
        {
          name: "plugin1",
          imgUrl: "https://picsum.photos/1024/480/?image=54",
          content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit,",
          active: "Active",
        },
        {
          name: "plugin2",
          imgUrl: "https://picsum.photos/1024/480/?image=54",
          content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit,",
          active: "Deactive",
        },
        {
          name: "plugin3",
          imgUrl: "https://picsum.photos/1024/480/?image=54",
          content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit,",
          active: "Deactive",
        },
        {
          name: "plugin4",
          imgUrl: "https://picsum.photos/1024/480/?image=54",
          content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit,",
          active: "Active",
        },
        {
          name: "plugin5",
          imgUrl: "https://picsum.photos/1024/480/?image=54",
          content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit,",
          active: "Deactive",
        },
        {
          name: "plugin6",
          imgUrl: "https://picsum.photos/1024/480/?image=54",
          content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit,",
          active: "Active",
        },
      ],
      activeTab: 1,
    };
  },

  mounted: function () {
    $(".col-sm-4").removeClass("col-sm-4").addClass("col-sm-2");
    $(".col-sm-8").removeClass("col-sm-8").addClass("col-sm-10");
     this.$store.commit('remove_errors');
  },
  created() {
    this.pluginlist = this.PluginLst;
    let business_id = localStorage.getItem("business_id");

    this.$http
      .get("/business/" + business_id)
      .then(({ data }) => {
        this.general_items.business_name = JSON.parse(data.business_name).en;
        this.general_items.business_activity = JSON.parse(data.business_activity).en;
        this.general_items.name = JSON.parse(data.owner_name).en;
        this.general_items.email = data.business_email;
        this.general_items.mobile = data.business_mobile_no;
        this.general_items.country = data.country;
        if (data.logo != '') {
          this.general_items.previewImage = data.logo;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    ...mapActions(["set_errors"]),
    PluginSeach() {
      var data = [];
      var initial = this.PluginLst;
      if (initial.length > 0 && this.pluginname != "") {
        for (var i = 0; i < initial.length; i++) {
          if (initial[i]["name"].toUpperCase().includes(this.pluginname.toUpperCase())) {
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
      if(this.general_items.logo != ''){
        formData.append("logo", this.general_items.logo);
      }
      formData.append("_method", "PATCH");

      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      this.$store.commit('remove_errors');

      this.$http
        .post("/business/" + business_id, formData, config)
        .then((response) => {
          if (response.status == 200) {
          this.$swal.fire({
            icon: "success",
            title: "Success",
            text: "Detail Updated Successfully",
            timer: 3600,
          });
        }
        })
        .catch((error) => {
          if (error.response.status == 422){
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
  color:green;
}
.error {
  color:red;
}
</style>
