<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form @submit.prevent="isUpdatePage ? updateData() : saveData()">
          <CCard>
            <CCardHeader v-if="!isUpdatePage">New Role</CCardHeader>
            <CCardHeader v-else>Edit Role</CCardHeader>
            <CCardBody>
              <CRow>
                <Loader />
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Role Name"
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

              <h2><u> Permissions</u></h2>
              <label class="mr-4 font-lg"
                ><strong> Select All Permissions</strong>
              </label>
              <CSwitch
                class="mx-1 pt-2"
                color="success"
                :checked.sync="selectAll"
                shape="pill"
              />
              <div v-for="module in modules" :key="module.id">
                <h4>
                  <u> {{ module }}</u>
                </h4>

                <CRow>
                  <CCol
                    sm="6"
                    md="4"
                    class="pt-2"
                    v-if="item.module == module"
                    v-for="item in form.items"
                    :key="item.uuid"
                  >
                    <CSwitch
                      class="mx-1 pt-2"
                      color="success"
                      :checked.sync="item.value"
                      shape="pill"
                    />
                    <label class="mr-4 font-lg"> {{ item.name }} </label>
                  </CCol>
                </CRow>
              </div>
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
            </CCardBody>
          </CCard>
        </form>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import RolesAndPermissionsService from "@/services/rolesandpermissions/RolesAndPermissionsService";
import "core-js/stable";
import "regenerator-runtime/runtime";

import { required, minLength } from "vuelidate/lib/validators";
import Loader from "@/components/layouts/Loader";

export default {
  name: "UpdateOrCreateRole",
  components: {
    Loader,
  },
  data: () => ({
    selectAll: false,

    isUpdatePage: false,
    form: {
      items: [],
      name: "",
    },
    modules: [],
  }),
  watch: {
    selectAll(val) {
      if (val) {
        this.form.items.forEach((item) => {
          item.value = true;
        });
      } else {
        this.form.items.forEach((item) => {
          item.value = false;
        });
      }
    },
  },
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
  },
  methods: {
    getSetting() {
      this.$store.commit("set_loader");
      RolesAndPermissionsService.getAllPermissions()
        .then((res) => {
          for (let index = 0; index < Object.keys(res.data).length; index++) {
            let module = Object.keys(res.data)[index];
            this.modules.push(module);
            res.data[module].forEach((element) => {
              this.form.items.push({
                name: element.name,
                uuid: element.uuid,
                value: false,
                module: module,
              });
            });
          }
          this.$store.commit("close_loader");
          this.getEditData();
        })
        .catch((error) => {
          this.$store.commit("close_loader");
          this.$swal.fire({
            icon: "error",
            title: "Error",
            text: "Something Went Wrong",
            timer: 3600,
          });
        });
    },
    getEditData() {
      // this.$store.commit("set_loader");
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
            // this.$store.commit("close_loader");
          })
          .catch((error) => {
            // this.$store.commit("close_loader");
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
        this.$store.commit("set_loader");

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

              this.$v.$reset();
              this.$router.push({ name: "Index Roles" });
            }
            this.$store.commit("close_loader");
          })
          .catch((error) => {
            this.$store.commit("close_loader");

            this.$swal.fire({
              icon: "error",
              title: error.message,
              text: error.errors,
              timer: 3600,
            });
          });
      }
    },
    updateData() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.commit("set_loader");
        let data = this.form;
        let id = this.$route.params.id;
        RolesAndPermissionsService.update(id, data)
          .then((res) => {
            console.log(res);
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Role Updated Successfully",
                timer: 3600,
              });

              this.$v.$reset();
              this.$router.push({ name: "Index Roles" });
            }
            this.$store.commit("close_loader");
          })
          .catch((error) => {
            this.$store.commit("close_loader");
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
