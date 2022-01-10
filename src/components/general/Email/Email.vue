<template>
  <div>
    <CCard>
      <CCardHeader>Email</CCardHeader>
      <CCardBody>
        <form @submit.prevent="storeMedia()">
          <CCardBody>
            <CRow>
              <CCol sm="3" md="3" class="pt-2">
                <CInput label="Name" v-model="mediaitem.name" />
              </CCol>

              <CCol sm="3" md="3" class="pt-2">
                <CInput label="Designation" v-model="mediaitem.designation" />
              </CCol>

              <CCol sm="3" md="3" class="pt-2">
                <CInput label="Email" v-model="mediaitem.email" />
              </CCol>

              <CCol sm="6" md="1" class="pt-2">
                <CButton
                  block
                  color="default"
                  @click="AddMedia"
                  style="
                    width: 39px;
                    border-radius: 35px;
                    margin: auto;
                    margin-top: 25px;
                  "
                  ><CIcon name="cil-plus"
                /></CButton>
              </CCol>
            </CRow>
            <CRow v-for="(item, index) in form.mediaLst" :key="item.name">
              <CCol sm="3" md="3" class="pt-2">
                {{ item.name }}
              </CCol>
              <CCol sm="1" md="1" class="pt-2"> {{ item.designation }} </CCol>
              <CCol sm="6" md="3" class="pt-2">
                {{ item.email }}
              </CCol>
              <CCol sm="6" md="1" class="pt-2">
                <CButton
                  block
                  color="default"
                  style="width: 39px; border-radius: 35px; margin: auto"
                  @click="DelMedia(index)"
                  ><CIcon name="cil-minus"
                /></CButton>
              </CCol>
            </CRow>
            <CButton
              block
              color="success"
              style="float: right; width: 100px; margin-top: 25px"
              type="submit"
              >Save</CButton
            >
          </CCardBody>
        </form>
      </CCardBody>
    </CCard>
  </div>
</template>
<script>
import CustomerEmailServices from "@/services/contacts/customers/CustomerEmailServices";
import SupplierEmailServices from "@/services/contacts/supplier/SupplierEmailServices";

export default {
  name: "Contact",

  props: {
    module: String,
  },

  data() {
    return {
      form: {
        mediaLst: [],
        uuid: "",
        module: "",
      },
      mediaitem: { name: "", designation: "", email: "" },
      usersData: [],
      details: [],
      errors: [],
    };
  },

  created() {
    this.form.module = this.module;
    this.getAllMedia();
  },

  methods: {
    getAllMedia() {
      this.form.uuid = this.$route.params.id;

      if (this.form.module == "customer") {
        CustomerEmailServices.getCustomerEmails(this.form.uuid)
          .then(({ data }) => {
            data.forEach((value, index) => {
              var data = {
                name: value.name,
                designation: value.designation,
                email: value.email,
              };
              this.form.mediaLst.push(data);
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (this.form.module == "supplier") {
        SupplierEmailServices.getSupplierEmails(this.form.uuid)
          .then(({ data }) => {
            data.forEach((value, index) => {
              var data = {
                name: value.name,
                designation: value.designation,
                email: value.email,
              };
              this.form.mediaLst.push(data);
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    AddMedia() {
      if (
        this.mediaitem.name == "" ||
        this.mediaitem.designation == "" ||
        this.mediaitem.email == ""
      ) {
        return false;
      }
      var data = {
        name: this.mediaitem.name,
        designation: this.mediaitem.designation,
        email: this.mediaitem.email,
      };
      this.form.mediaLst.push(data);
    },
    DelMedia(index) {
      this.form.mediaLst.splice(index, 1);
    },
    storeMedia() {
      this.form.uuid = this.$route.params.id;
      let data = this.form;
      if (this.form.module == "customer") {
        if (data.mediaLst.length > 0) {
          CustomerEmailServices.store(data)
            .then((res) => {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Email Added Successfully",
                timer: 3600,
              });
            })
            .catch((error) => {
              this.$swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!Try Again",
                footer: '<a href="">Why do I have this issue?</a>',
              });
            });
        } else {
          this.$swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please Add By Pressing Plus Button",
            footer: '<a href="">Why do I have this issue?</a>',
          });
        }
      }
      if (this.form.module == "supplier") {
        if (data.mediaLst.length > 0) {
          SupplierEmailServices.store(data)
            .then((res) => {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Contact Added Successfully",
                timer: 3600,
              });
            })
            .catch((error) => {
              this.$swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!Try Again",
                footer: '<a href="">Why do I have this issue?</a>',
              });
            });
        } else {
          this.$swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please Add By Pressing Plus Button",
            footer: '<a href="">Why do I have this issue?</a>',
          });
        }
      }
    },
  },
};
</script>
<style scoped>
.errorMsg {
  color: red;
}
</style>