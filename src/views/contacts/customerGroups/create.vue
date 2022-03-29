<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>New Group</CCardHeader>
          <CCardBody>
            <form @submit.prevent="saveData">
              <CRow>
                <CCol sm="6" md="6" class="pt-2">
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
                <CCol v-if="showType" sm="6" md="6" class="pt-2">
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
              </CRow>

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
  name: "CreateGroup",
  data: () => ({
    showType: true,
    form: {
      name: "",
      type: "",
    },
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
        {
          value: "Supplier",
          label: "Supplier",
        },
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
    const type = this.$route.params.type;
    console.log("🚀 ~ type", type);
    if (type) {
      this.showType = false;
      this.form.type = type;
    }
  },
  methods: {
    saveData() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        GroupServices.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Group Created Successfully",
                timer: 3600,
              });
              this.$v.$reset();

              this.$router.push({ path: "/groups/index" });
            }
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
  },
};
</script>

