<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form @submit.prevent="isEditing ? updateTraining() : saveTraining()">
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Trainers"
                :options="options.trainers"
                :value.sync="form.trainer_id"
                :class="{ error: $v.form.trainer_id.$error }"
                @input="$v.form.trainer_id.$touch()"
              />
              <div v-if="$v.form.trainer_id.$error">
                <p v-if="!$v.form.trainer_id.required" class="errorMsg">
                  Trainers is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Training Type"
                :options="options.training_types"
                :value.sync="form.training_type"
                :class="{ error: $v.form.training_type.$error }"
                @input="$v.form.training_type.$touch()"
              />
              <div v-if="$v.form.training_type.$error">
                <p v-if="!$v.form.training_type.required" class="errorMsg">
                  Training Type is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Employee"
                :options="options.employees"
                :value.sync="form.employee_id"
                :class="{ error: $v.form.employee_id.$error }"
                @input="$v.form.employee_id.$touch()"
              />
              <div v-if="$v.form.employee_id.$error">
                <p v-if="!$v.form.employee_id.required" class="errorMsg">
                  Employee is required
                </p>
              </div>
            </CCol>

            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Start Date"
                type="date"
                v-model="form.start_date"
                :class="{ error: $v.form.start_date.$error }"
                @input="$v.form.start_date.$touch()"
              />
              <div v-if="$v.form.start_date.$error">
                <p v-if="!$v.form.start_date.required" class="errorMsg">
                  Start Date is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="End Date"
                type="date"
                v-model="form.end_date"
                :class="{ error: $v.form.end_date.$error }"
                @input="$v.form.end_date.$touch()"
              />
              <div v-if="$v.form.end_date.$error">
                <p v-if="!$v.form.end_date.required" class="errorMsg">
                  End Date is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Training Cost"
                type="number"
                v-model="form.training_cost"
                :class="{ error: $v.form.training_cost.$error }"
                @input="$v.form.training_cost.$touch()"
              />
              <div v-if="$v.form.training_cost.$error">
                <p v-if="!$v.form.training_cost.required" class="errorMsg">
                  Training Cost is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4">
              <CTextarea
                label="Description"
                placeholder="Content..."
                v-model="form.description"
                :class="{ error: $v.form.description.$error }"
                @input="$v.form.description.$touch()"
              />
              <div v-if="$v.form.description.$error">
                <p v-if="!$v.form.description.required" class="errorMsg">
                  Description is required
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
import TrainingService from "@/services/trainings/TrainingService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "TrainingForm",
  data: () => ({
    isEditing: false,
    saveAndExit: false,
    form: {
      id: null,
      trainer_id: "",
      training_type: "",
      employee_id: "",
      start_date: "",
      end_date: "",
      training_cost: "",
      description: "",
      status: "active",
    },
    options: {
      trainers: [{ value: "", label: "Choose Trainer", disabled: true, selected: "" }],
      employees: [{ value: "", label: "Choose Employee", disabled: true, selected: "" }],
      training_types: [
        { value: "", label: "Choose Training Type", disabled: true, selected: "" },
      ],
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
        trainer_id: { required },
        training_type: { required },
        employee_id: { required },
        start_date: { required },
        end_date: { required },
        training_cost: { required },
        description: { required },
      },
    };
  },
  created() {
    this.form.id = this.$route.params.id;
    this.getAllEmployees();
    this.getAllTrainers();
    this.getTrainingTypes();
    if (this.form.id !== "" && this.form.id !== undefined) {
      this.isEditing = true;
      this.getTraining();
    }
  },
  methods: {
    saveTraining() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        TrainingService.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Training Added Successfully",
                timer: 3600,
              });
              // this.$emit("employee-training-update");
              this.$v.$reset();
              this.resetForm();

              if (this.saveAndExit) {
                this.$router.push({ path: "/trainings/index" });
              } else {
                this.$router.push({ path: "/trainings/edit/" + res.data.uuid });
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
    updateTraining() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        TrainingService.update(this.form.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Training Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              // this.$emit("employee-training-update");
              if (this.saveAndExit) {
                this.$router.push({ path: "/trainings/index" });
              } else {
                this.$router.push({ path: "/trainings/edit/" + res.data.uuid });
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
    getTraining() {
      TrainingService.get(this.form.id)
        .then(({ data }) => {
          console.log(data);
          if (data != null && data != "") {
            this.isEditing = true;
            this.form.id = data.uuid;
            this.form.trainer_id = data.trainer.uuid;
            this.form.training_type = data.training_type.uuid;
            this.form.employee_id = data.employee.uuid;
            this.form.start_date = data.start_date;
            this.form.end_date = data.end_date;
            this.form.training_cost = data.training_cost;
            this.form.description = data.description;
            this.form.status = data.status;
          }
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
        });
    },
    getAllEmployees() {
      TrainingService.getAllEmployees()
        .then(({ data }) => {
          if (data != null && data != "") {
            let employees = this.options.employees;
            if (data.data) {
              data.data.map(function (val) {
                employees.push({ value: val.uuid, label: val.full_name });
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getAllTrainers() {
      TrainingService.getAllTrainers()
        .then(({ data }) => {
          if (data != null && data != "") {
            let trainers = this.options.trainers;
            if (data.data) {
              data.data.map(function (val) {
                trainers.push({ value: val.uuid, label: val.full_name });
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getTrainingTypes() {
      TrainingService.getTrainingTypes()
        .then(({ data }) => {
          if (data != null && data != "") {
            let training_types = this.options.training_types;
            if (data.data) {
              data.data.map(function (val) {
                training_types.push({ value: val.uuid, label: val.name });
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
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
