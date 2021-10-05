<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Edit Group</CCardHeader>
          <CCardBody>
            <form @submit.prevent="updateData">
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
                      Group Name is required
                    </p>
                    <p v-if="!$v.form.name.minLength" class="errorMsg">
                      Group Name should be at least 4 character
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Type"
                    :options="options.type"
                    :value.sync="form.type"
                    :class="{ error: $v.form.type.$error }"
                    @input="$v.form.type.$touch()"
                  />
                  <div v-if="$v.form.type.$error">
                    <p v-if="!$v.form.type.required" class="errorMsg">
                      Type of Group is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Status"
                    :options="options.status"
                    :value.sync="form.status"
                  />
                </CCol>
              </CRow>

              <CRow class="mt-4">
                <CButton
                  progress
                  timeout="2000"
                  block
                  color="success"
                  style="float: right; width: 200px; margin-left: 20px"
                  type="submit"
                  >Update</CButton
                >
              </CRow>
            </form>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import GroupServices from "@/services/groups/GroupServices";

import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "EditGroup",
  data: () => ({
    form: {
      name: "",
      type: "",
      status: "",
    },
    url_data: "",

    active: "active",
    options: {
      type: [
        {
          value: "",
          label: "Choose Type",
          disabled: true,
          selected: "",
        },
        {
          value: "Customer",
          label: "Customer",
        },
      ],
      status: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
      ],
    },
  }),
  validations() {
    return {
      form: {
        name: { required, minLength: minLength(4) },
        type: { required },
      },
    };
  },
  created() {
    this.getServerData();
  },
  methods: {
    updateData() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        GroupServices.update(this.url_data, data)
          .then((res) => {
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Group Updated Successfully",
              timer: 3600,
            });
            this.$v.$reset();

            this.$router.push({ path: "/groups/index" });
          })
          .catch((error) => {
            console.log(error);
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: "Something Went Wrong",
              timer: 3600,
            });
          });
      }
    },
    getServerData() {
      this.url_data = this.$route.params.id;
      GroupServices.get(this.url_data)
        .then((res) => {
          this.form.name = res.data.name;
          this.form.type = res.data.type;
          this.form.status = res.data.status;
        })
        .catch((error) => {
          console.log(error);
          this.$swal.fire({
            icon: "error",
            title: "Error",
            text: "Something Went Wrong",
            timer: 3600,
          });
        });
    },
  },
};
</script>

<style scoped>
.errorMsg {
  color: red;
}
</style>
