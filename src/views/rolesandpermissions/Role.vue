<template>
  <div>
    <vue-element-loading
      :active="isLoading"
      spinner="mini-spinner"
      color="#FF6700"
    />
    <CRow>
      <CCol xs="12" lg="12">
        <form @submit.prevent="saveData">
          <CCard>
            <CCardHeader v-if="!isUpdatePage">New Role</CCardHeader>
            <CCardHeader v-else>Edit Role</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Name"
                    v-model="form.name"
                    :class="{ error: $v.form.name.$error }"
                    @input="$v.form.name.$touch()"
                  />
                  <div v-if="$v.form.name.$error">
                    <p v-if="!$v.form.name.required" class="errorMsg">
                      Role Name is required
                    </p>
                    <p v-if="!$v.form.name.minLength" class="errorMsg">
                      Role Name should be at least 4 character
                    </p>
                  </div>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
          <CCard>
            <CCardHeader>Permissions</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol
                  sm="6"
                  md="4"
                  class="pt-2"
                  v-for="item in form.items"
                  :key="item.uuid"
                >
                  <label class="mr-4 font-lg"> {{ item.name }} </label>
                  <CSwitch
                    class="mx-1 pt-1"
                    style="float: right"
                    color="success"
                    :checked.sync="item.value"
                    shape="pill"
                  />
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>

          <CRow class="mt-4">
            <CButton
              progress
              timeout="2000"
              block
              color="success"
              style="float: right; width: 200px; margin-left: 20px"
              type="submit"
              >Save</CButton
            >
          </CRow>
        </form>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import RolesAndPermissionsService from "@/services/rolesandpermissions/RolesAndPermissionsService";

import { required, minLength } from "vuelidate/lib/validators";
import VueElementLoading from "vue-element-loading";

export default {
  name: "UpdateOrCreateRole",
  components: {
    VueElementLoading,
  },
  data: () => ({
    isLoading: false,
    isUpdatePage: false,
    form: {
      items: [],
      name: "",
    },
  }),

  validations() {
    return {
      form: {
        name: { required, minLength: minLength(4) },
      },
    };
  },
  mounted() {},
  created() {
    this.getSetting();

    this.getEditData();
  },
  methods: {
    getSetting() {
      RolesAndPermissionsService.getAllPermissions()
        .then((res) => {
          res.data.forEach((element) => {
            this.form.items.push({
              name: element.name,
              uuid: element.uuid,
              value: false,
            });
          });
        })
        .catch((error) => {
          this.$swal.fire({
            icon: "error",
            title: "Error",
            text: "Something Went Wrong",
            timer: 3600,
          });
        });
    },
    getEditData() {
      if (this.$route.params.id) {
        this.isUpdatePage = true;
        RolesAndPermissionsService.get(this.$route.params.id)
          .then((res) => {
            if (res.status == 200) {
              this.form.name = res.data.name;
              let increment = "";
              res.data.permissions.forEach((element) => {
                increment = element.uuid;
                this.form.items.forEach((element2) => {
                  if (element2.uuid == increment) {
                    element2.value = true;
                  }
                });
              });
            }
          })
          .catch((error) => {
            this.$swal.fire({
              icon: "error",
              title: error.message,
              text: error.errors,
              timer: 3600,
            });
            this.$router.push({ name: "Index Roles" });
          });
      }
    },

    saveData() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.isLoading = true;
        let data = this.form;
        RolesAndPermissionsService.create(data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Role Created Successfully",
                timer: 3600,
              });
              this.isLoading = false;
              this.$v.$reset();
              this.$router.push({ name: "Index Roles" });
            }
          })
          .catch((error) => {
            this.isLoading = false;
            this.$swal.fire({
              icon: "error",
              title: error.message,
              text: error.errors,
              timer: 3600,
            });
          });
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
