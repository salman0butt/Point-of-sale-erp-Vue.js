<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Quick Customer Add</CCardHeader>
          <CCardBody>
            <form @submit.prevent="isEditing ? updateData() : saveData()">
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Fullname"
                    v-model="form.full_name"
                    :class="{ error: $v.form.full_name.$error }"
                    @input="$v.form.full_name.$touch()"
                  />
                  <div v-if="$v.form.full_name.$error">
                    <p v-if="!$v.form.full_name.required" class="errorMsg">
                      Fullname is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Type"
                    :options="options.type"
                    :value.sync="form.type"
                    :class="{ error: $v.form.type.$error }"
                    v-on:change="CustomerType"
                    @input="$v.form.type.$touch()"
                  />
                  <div v-if="$v.form.type.$error">
                    <p v-if="!$v.form.type.required" class="errorMsg">
                      Customer Type is required
                    </p>
                  </div>
                </CCol>

                <CCol sm="6" md="4" class="pt-2">
                  <CSelect
                    label="Group"
                    :options="options.group"
                    :value.sync="form.group"
                    :class="{ error: $v.form.group.$error }"
                    @input="$v.form.group.$touch()"
                  />
                  <div v-if="$v.form.group.$error">
                    <p v-if="!$v.form.group.required" class="errorMsg">
                      Group is required
                    </p>
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Contact"
                    v-model="form.contact"
                    :class="{ error: $v.form.contact.$error }"
                    @input="$v.form.contact.$touch()"
                  />
                  <div v-if="$v.form.contact.$error">
                    <p v-if="!$v.form.contact.required" class="errorMsg">
                      Contact is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Email"
                    v-model="form.email"
                    :class="{ error: $v.form.email.$error }"
                    @input="$v.form.email.$touch()"
                  />
                  <div v-if="$v.form.email.$error">
                    <p v-if="!$v.form.email.required" class="errorMsg">
                      Email is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="4" class="pt-2">
                  <CInput
                    label="Address"
                    v-model="form.address"
                    :class="{ error: $v.form.address.$error }"
                    @input="$v.form.address.$touch()"
                  />
                  <div v-if="$v.form.address.$error">
                    <p v-if="!$v.form.address.required" class="errorMsg">
                      Address is required
                    </p>
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="12" md="12" class="pt-2">
                  <CTextarea label="Notes" type="textarea" v-model="form.notes" />
                </CCol>
              </CRow>

              <p v-if="$v.$anyError" class="errorMsg">Please Fill the required data</p>
              <CRow class="mt-4">
                <CButton
                  progress
                  timeout="2000"
                  block
                  color="success"
                  style="float: right; width: 200px; margin-left: 20px"
                  type="submit"
                  @click="saveAndExit = false"
                  >Save and View</CButton
                >
                <CButton
                  timeout="2000"
                  block
                  color="danger"
                  style="float: right; width: 140px; margin-left: 20px; margin-top: 0"
                  @click="saveAndExit = true"
                  type="submit"
                  >Save & Exit</CButton
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
import CustomerSettingService from "@/services/settings/CustomerSettingService";
import GroupServices from "@/services/groups/GroupServices";
import CustomerServices from "@/services/contacts/customers/CustomerServices";
import { required, numeric } from "vuelidate/lib/validators";

export default {
  name: "QuickAddCustomer",
  data: () => ({
    saveAndExit: false,
    isEditing: false,
    form: {
      full_name: "",
      type: "",
      group: "",
      contact: "",
      email: "",
      address: "",
      notes: "",
    },
    options: {
      type: [{ value: "", label: "Choose type", disabled: true, selected: "" }],
      group: [{ value: "", label: "Choose Group", disabled: true, selected: "" }],
    },
    type_selected: false,
  }),
  validations() {
    return {
      form: {
        full_name: { required },
        type: { required },
        group: { required },
        contact: { required },
        email: { required },
        address: { required },
      },
    };
  },
  created() {
    this.getDependenices();
    // this.checkUpdateOrCreate();
  },
  methods: {
    CustomerType() {
      if (this.form.type != "individual") {
        this.type_selected = true;
      } else {
        this.type_selected = false;
      }
    },
    getDependenices() {
      // Customer Types
      let type = "customer";
      CustomerSettingService.getAll(type)
        .then(({ data }) => {
          let type = this.options.type;
          data.map(function (val) {
            // Customer Types
            if (val.key == "customer_types") {
              let customer_types = JSON.parse(val.value);
              customer_types.forEach((element) => {
                type.push({
                  value: element,
                });
              });
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });

      // Customer Groups
      let active = "active";
      let module_type = "customer";
      GroupServices.getActivegroups(active, module_type)
        .then(({ data }) => {
          let group = this.options.group;
          data.map(function (val) {
            group.push({
              value: val.uuid,
              label: val.name,
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    saveData() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        CustomerServices.quickAdd(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Customer Created Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              if (this.saveAndExit) {
                this.$router.push({ path: "/customers" });
              } else {
                this.$router.push({ path: "/customers/edit/" + res.data.uuid });
              }
            }
          })
          .catch((error) => {
            if (error.response.status == 422) {
              let errors = error.response.data.errors;
              this.$swal.fire({
                icon: "error",
                title: "Serial No",
                text: errors.serial_no,
                timer: 3600,
              });
            } else {
              this.$swal.fire({
                icon: "error",
                title: "Error",
                text: "Something Went Wrong",
                timer: 3600,
              });
            }
          });
      }
    },
    // updateData() {
    //   this.$v.$touch();
    //   if (!this.$v.$invalid) {
    //     let data = this.form;
    //     CustomerServices.update(this.$route.params.id, data)
    //       .then((res) => {
    //         if (res.status == 200) {
    //           this.$swal.fire({
    //             icon: "success",
    //             title: "Success",
    //             text: "Customer Updated Successfully",
    //             timer: 3600,
    //           });
    //           this.$v.$reset();
    //           if (this.saveAndExit) {
    //             this.$router.push({ path: "/customers" });
    //           }
    //           //  else {
    //           //   this.$router.push({ path: "/customers/edit/" + res.data.uuid });
    //           // }
    //         }
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //         this.$swal.fire({
    //           icon: "error",
    //           title: "Error",
    //           text: "Something Went Wrong",
    //           timer: 3600,
    //         });
    //       });
    //   }
    // },

    // checkUpdateOrCreate() {
    //   if (this.$route.params.id) {
    //     this.isEditing = true;
    //     CustomerServices.get(this.$route.params.id)
    //       .then((res) => {
    //         if (res.status === 200) {
    //           this.form.full_name = res.data.full_name;
    //           this.form.type = res.data.type;
    //           if (res.data.type == "company") {
    //             this.type_selected = true;
    //           }
    //           this.form.group = res.data.group.uuid;
    //           this.form.contact = res.data.contact.uuid;
    //           this.form.email = res.data.email;
    //           this.form.address = res.data.address;
    //           this.form.notes = res.data.notes;
    //         }
    //       })
    //       .catch((error) => {
    //         this.$router.push({ path: "/customers" });
    //       });
    //   }
    // },
  },
};
</script>
