<template>
  <div>
    <CCard>
      <CCardHeader>Email</CCardHeader>
      <CCardBody>
        <form @submit.prevent="storeMedia()">
          <CCardBody>
            <CRow v-if="!readOnly">
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
                  style="width: 39px; border-radius: 35px; margin: auto; margin-top: 25px"
                  ><CIcon name="cil-plus"
                /></CButton>
              </CCol>
            </CRow>
            <CRow class="mt-2">
              <Loader />
              <table class="table" v-if="form.mediaLst && form.mediaLst.length">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Designation</th>
                    <th scope="col">Email</th>
                    <th scope="col" v-if="!readOnly">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in form.mediaLst" :key="item.name">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ item.name }}</td>
                    <td>{{ item.designation }}</td>
                    <td>@{{ item.email }}</td>
                    <td v-if="!readOnly">
                      <CButton
                        block
                        color="default"
                        style="width: 39px; border-radius: 35px; margin: auto"
                        @click="DelMedia(index)"
                        ><CIcon name="cil-minus"
                      /></CButton>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CRow>
            <!-- <CRow v-for="(item, index) in form.mediaLst" :key="item.name">
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
            </CRow> -->
            <CButton
              v-if="!readOnly"
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
import Loader from "@/components/layouts/Loader";

export default {
  name: "Contact",
  components: { Loader },
  props: {
    module: String,
    readOnly: {
      type: Boolean,
      default: false,
    },
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
      this.$store.commit("set_loader");
      if (this.form.module == "customer") {
        CustomerEmailServices.getCustomerEmails(this.form.uuid)
          .then(({ data }) => {
            if (data) {
              data.forEach((value, index) => {
                var data = {
                  name: value.name,
                  designation: value.designation,
                  email: value.email,
                };
                this.form.mediaLst.push(data);
              });
            }
            this.$store.commit("close_loader");
          })
          .catch((err) => {
            this.$store.commit("close_loader");
            console.log(err);
          });
      }
      if (this.form.module == "supplier") {
        SupplierEmailServices.getSupplierEmails(this.form.uuid)
          .then(({ data }) => {
            if (data) {
              data.forEach((value, index) => {
                var data = {
                  name: value.name,
                  designation: value.designation,
                  email: value.email,
                };
                this.form.mediaLst.push(data);
              });
            }
            this.$store.commit("close_loader");
          })
          .catch((err) => {
            this.$store.commit("close_loader");
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
        this.$swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please Add You data",
        });
        return false;
      }
      var data = {
        name: this.mediaitem.name,
        designation: this.mediaitem.designation,
        email: this.mediaitem.email,
      };
      this.form.mediaLst.push(data);
      this.mediaitem.name = "";
      this.mediaitem.designation = "";
      this.mediaitem.email = "";
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
