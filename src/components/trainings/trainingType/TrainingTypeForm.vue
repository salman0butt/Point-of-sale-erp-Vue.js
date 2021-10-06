<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form @submit.prevent="isEditing ? updateTrainingType() : saveTrainingType()">
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Name"
                v-model="form.name"
                :class="{ error: $v.form.name.$error }"
                @input="$v.form.name.$touch()"
              />
              <div v-if="$v.form.name.$error">
                <p v-if="!$v.form.name.required" class="errorMsg">Name is required</p>
              </div>
            </CCol>

            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                v-if="isEditing"
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
import TrainingTypeService from "@/services/trainings/TrainingTypeService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "TrainingTypeForm",
  data: () => ({
    isEditing: false,
    saveAndExit: false,
    form: {
      id: null,
      name: "",
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
        name: { required },
      },
    };
  },
  created() {
    this.form.id = this.$route.params.id;
    if (this.form.id !== "" && this.form.id !== undefined) {
      this.isEditing = true;
      this.getTrainingType();
    }
  },
  methods: {
    saveTrainingType() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        TrainingTypeService.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "TrainingType Added Successfully",
                timer: 3600,
              });
              // this.$emit("employee-training-types-update");
              this.$v.$reset();
              this.resetForm();

              if (this.saveAndExit) {
                this.$router.push({ path: "/trainingTypes/index" });
              } else {
                this.$router.push({ path: "/trainingTypes/edit/" + res.data.uuid });
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
    updateTrainingType() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        TrainingTypeService.update(this.form.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "TrainingType Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              // this.$emit("employee-transfer-update");
              if (this.saveAndExit) {
                this.$router.push({ path: "/trainingTypes/index" });
              } else {
                this.$router.push({ path: "/trainingTypes/edit/" + res.data.uuid });
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
    getTrainingType() {
      TrainingTypeService.get(this.form.id)
        .then(({ data }) => {
          console.log(data);
          if (data != null && data != "") {
            this.isEditing = true;
            this.form.id = data.uuid;
            this.form.name = data.name;
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
