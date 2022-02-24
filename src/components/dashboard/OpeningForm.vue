<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CSelect
          label="Select Terminal"
          :options="options.terminals"
          :value.sync="form.terminal"
          @change="selectTerminal()"
          v-if="showTerminalOptions"
        />

        <form @submit.prevent="saveData()" v-if="!isContinue">
          <CRow>
            <CCol sm="6" md="6" class="pt-2">
              <CRow v-for="(value, index) in form.serverValues" :key="index">
                <CCol sm="6" md="4" class="pt-2 bolder">
                  {{ value.denominations }}
                </CCol>
                <CCol sm="6" md="8" class="pt-2">
                  <CInput
                    type="number"
                    v-model="form.formValues[index].input"
                    @change="calculate()"
                  />
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </form>
        <p v-else>Please Continue</p>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import CurrencyDenominationService from "@/services/currency/CurrencyDenominationService";
import SettingService from "@/services/settings/SettingService";
import BranchServices from "@/services/branches/BranchServices";
import BranchTerminalServices from "@/services/branches/BranchTerminalServices";

export default {
  name: "OpeningForm",
  props: {
    submit: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    options: {
      type: [{ value: "", label: "Choose type", disabled: true, selected: "" }],
      terminals: [{ value: "", label: "Choose Terminal", disabled: true, selected: "" }],
    },
    isContinue: false,
    showTerminalOptions: false,
    list_terminals: [],
    form: {
      serverValues: [],
      formValues: [],
      terminal: "",
    },
  }),
  created() {
    this.createMethod();
    this.getDependencies();
  },
  watch: {
    submitForm() {
      this.$v.$touch();
      if (this.submit && !this.$v.$invalid) {
        this.$emit("reset-model");
      }
    },
  },
  computed: {
    submitForm() {
      return this.submit;
    },
  },
  methods: {
    calculate() {
      let total = parseFloat("0.000");
      let formValues = this.form.formValues;
      formValues.map((value) => {
        total += parseFloat(value.input) * parseFloat(value.value);
      });

      this.$emit("total", total.toFixed(3));
    },
    getDependencies() {
      const terminal_id = localStorage.getItem("terminal_id");
      if (!terminal_id) {
        let type = JSON.stringify(["open_and_close"]);
        SettingService.get(type)
          .then(({ data }) => {
            if (data && data.open_and_close) {
              if (data.open_and_close === "on") {
                // check branch exist
                let selected_branch = JSON.parse(
                  localStorage.getItem("selected_branches")
                );
                BranchServices.get(selected_branch[0])
                  .then(({ data }) => {
                    if (data && data.uuid) {
                      BranchTerminalServices.get(selected_branch[0])
                        .then(({ data }) => {
                          if (data && data.length > 0) {
                            let list_terminal = this.list_terminals;
                            data.map(function (item, id) {
                              list_terminal.push({ ...item, id });
                            });
                            if (data.length === 1) {
                              const records = data[0].records;
                              const type = records[0].type;
                              if (type === "open") {
                                this.isContinue = true;
                              } else {
                                localStorage.setItem("terminal_id", data[0].uuid);
                                this.isContinue = false;
                              }
                            } else {
                              let terminals = this.options.terminals;
                              data.map(function (item, id) {
                                terminals.push({
                                  label: item.name,
                                  value: item.uuid,
                                  id,
                                });
                              });
                              this.showTerminalOptions = true;
                            }
                          }
                        })
                        .catch((error) => {
                          console.log(error);
                          this.isContinue = false;
                        });
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                    this.isContinue = false;
                  });
              } else {
                this.isContinue = true;
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.isContinue = true;
      }
    },
    selectTerminal() {
      let uuid = this.form.terminal;
      let terminal = this.list_terminals.find(function (item, id) {
        return item.uuid === uuid;
      });

      if (terminal) {
        let type = terminal.records[0].type;
        if (type === "open") {
          this.isContinue = true;
        } else {
          localStorage.setItem("terminal_id", terminal.uuid);
          this.isContinue = false;
        }
      }
    },
    createMethod() {
      let denominations = this.form.serverValues;
      let formValues = this.form.formValues;
      CurrencyDenominationService.getAll()
        .then(({ data }) => {
          data.map((value) => {
            denominations.push(value);
            formValues.push({ input: 0, value: value.value });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // saveData() {
    //   this.$v.$touch();
    //   if (!this.$v.$invalid) {
    //     let data = this.form;
    //     SupplierServices.quickAdd(data)
    //       .then((res) => {
    //         if (res.status === 201 || res.status === 200) {
    //           this.$swal.fire({
    //             icon: "success",
    //             title: "Success",
    //             text: "Supplier Created Successfully",
    //             timer: 3600,
    //           });
    //           this.$v.$reset();
    //           this.resetForm();
    //         }
    //       })
    //       .catch((error) => {
    //         if (error.response.status == 422) {
    //           let errors = error.response.data.errors;
    //           this.$swal.fire({
    //             icon: "error",
    //             title: "Serial No",
    //             text: errors.serial_no,
    //             timer: 3600,
    //           });
    //         } else {
    //           this.$swal.fire({
    //             icon: "error",
    //             title: "Error",
    //             text: "Something Went Wrong",
    //             timer: 3600,
    //           });
    //         }
    //       });
    //   }
    // },
    // resetForm() {
    //   for (let key in this.form) {
    //     this.form[key] = "";
    //   }
    // },
  },
};
</script>

<style scoped>
.bolder {
  font-weight: bold;
}
</style>
