<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form @submit.prevent="isEditing ? updateTrainer() : saveTrainer()">
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="First Name"
                v-model="form.first_name"
                :class="{ error: $v.form.first_name.$error }"
                @input="$v.form.first_name.$touch()"
              />
              <div v-if="$v.form.first_name.$error">
                <p v-if="!$v.form.first_name.required" class="errorMsg">
                  First Name is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Last Name"
                v-model="form.last_name"
                :class="{ error: $v.form.last_name.$error }"
                @input="$v.form.last_name.$touch()"
              />
              <div v-if="$v.form.last_name.$error">
                <p v-if="!$v.form.last_name.required" class="errorMsg">
                  Last Name is required
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
                <p v-if="!$v.form.email.required" class="errorMsg">Email is required</p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Phone"
                type="tel"
                v-model="form.phone"
                :class="{ error: $v.form.phone.$error }"
                @input="$v.form.phone.$touch()"
              />
              <div v-if="$v.form.phone.$error">
                <p v-if="!$v.form.phone.required" class="errorMsg">Phone is required</p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Expertise"
                v-model="form.expertise"
                :class="{ error: $v.form.expertise.$error }"
                @input="$v.form.expertise.$touch()"
              />
              <div v-if="$v.form.expertise.$error">
                <p v-if="!$v.form.expertise.required" class="errorMsg">
                  Expertise is required
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
            <CCol v-if="isEditing" sm="6" md="4" class="pt-2">
              <CSelect
                label="Status"
                :options="options.status"
                :value.sync="form.status"
              />
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
              >Save & Continue</CButton
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
      </CCol>
    </CRow>
  </div>
</template>
<script>
import TrainerService from "@/services/trainings/TrainerService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "TrainerForm",
  data: () => ({
    isEditing: false,
    saveAndExit: false,
    form: {
      id: null,
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      expertise: "",
      address: "",
      status: "active",
    },
    options: {
      status: [
        { value: "", label: "Choose Status", disabled: true, selected: "" },
        { value: "active", label: "Active" },
        { value: "inactive", label: "InActive" },
      ],
    },
  }),
  validations() {
    return {
      form: {
        first_name: { required },
        last_name: { required },
        email: { required },
        phone: { required },
        expertise: { required },
        address: { required },
      },
    };
  },
  created() {
    this.form.id = this.$route.params.id;
    if (this.form.id !== "" && this.form.id !== undefined) {
      this.isEditing = true;
      this.getTrainer();
    }
  },
  methods: {
    saveTrainer() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        TrainerService.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Trainer Added Successfully",
                timer: 3600,
              });
              // this.$emit("employee-trainer-update");
              this.$v.$reset();
              this.resetForm();

              if (this.saveAndExit) {
                this.$router.push({ path: "/trainers/index" });
              } else {
                this.$router.push({ path: "/trainers/edit/" + res.data.uuid });
              }
            }
          })
          .catch((error) => {
            console.log(error);
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: "Something Went Wrong.",
              timer: 3600,
            });
          });
      }
    },
    updateTrainer() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        TrainerService.update(this.form.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Trainer Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              // this.$emit("employee-trainer-update");
              if (this.saveAndExit) {
                this.$router.push({ path: "/trainers/index" });
              } else {
                this.$router.push({ path: "/trainers/edit/" + res.data.uuid });
              }
            }
          })
          .catch((error) => {
            console.log(error);
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: "Something Went Wrong.",
              timer: 3600,
            });
          });
      }
    },
    getTrainer() {
      TrainerService.get(this.form.id)
        .then(({ data }) => {
          console.log(data);
          if (data != null && data != "") {
            this.isEditing = true;
            this.form.id = data.uuid;
            this.form.first_name = data.first_name;
            this.form.last_name = data.last_name;
            this.form.email = data.email;
            this.form.phone = data.phone;
            this.form.expertise = data.expertise;
            this.form.address = data.address;
            this.form.status = data.status;
          }
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
        });
    },
    resetForm() {
      for (let index in this.form) {
        this.form[index] = "";
      }
      this.isEditing = false;
    },
  },
};
</script>

<style>
.errorMsg {
  color: red;
}
</style>
