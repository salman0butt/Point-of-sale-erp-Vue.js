<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <CSelect
          label="Select Terminal"
          :options="options.terminals"
          :value.sync="form.terminal"
          @change="selectTerminal()"
          v-if="showTerminalOptions && !isContinue"
        />

        <form @submit.prevent="saveData()" v-if="!isContinue && form.terminal">
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
        <p v-else-if="isContinue">Please Continue</p>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import CurrencyDenominationService from "@/services/currency/CurrencyDenominationService";
import SettingService from "@/services/settings/SettingService";
import BranchServices from "@/services/branches/BranchServices";
import BranchTerminalServices from "@/services/branches/BranchTerminalServices";
import TerminalRecordService from "@/services/general/TerminalRecordService";
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
      total: 0.0,
    },
  }),
  created() {
    this.createMethod();
    this.getDependencies();
  },
  watch: {
    submitForm() {
      if (this.submit) {
        this.saveOpening();
        this.$emit("reset-model");
      }
    },
    continue(val) {
      // if (this.continue) {
      this.$emit("hide-total");
      // }
    },
    branchChnaged(val) {
      this.getDependencies();
    },
  },
  computed: {
    submitForm() {
      return this.submit;
    },
    continue() {
      return this.isContinue;
    },
    branchChnaged() {
      return this.$store.getters.getBranches;
    },
  },
  methods: {
    calculate() {
      let total = parseFloat("0.000");
      let formValues = this.form.formValues;
      formValues.map((value) => {
        total += parseFloat(value.input) * parseFloat(value.value);
      });
      this.form.total = total;
      this.$emit("total", total.toFixed(3));
    },
    saveOpening() {
      const terminal_id = localStorage.getItem("terminal_id");
      if (!terminal_id) return;
      const data = { terminal_id: terminal_id, type: "open", total: this.form.total };
      TerminalRecordService.create(data)
        .then((res) => {
          if (res.status === 201) {
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Opening Created Successfully",
              timer: 3600,
            });
            this.getDependencies();
            this.$emit("hide-total");
            this.$store.commit("set_opening_model", false);
          }
        })
        .catch((error) => {
          console.log(error);
          localStorage.removeItem("terminal_id");
          this.isContinue = false;
          this.form.terminal = "";
        });
    },
    getSelectedBranch() {
      const terminal_id = localStorage.getItem("selected_branches");
      if (terminal_id) {
        return JSON.parse(terminal_id);
      }
    },
    getDependencies() {
      const terminal_id = localStorage.getItem("terminal_id");
      if (!terminal_id) {
        let type = JSON.stringify(["open_and_close"]);
        SettingService.get(type)
          .then(async ({ data }) => {
            if (data && data.open_and_close) {
              if (data.open_and_close === "on") {
                // check branch exist
                const selected_branch = this.getSelectedBranch();
                if (!selected_branch) return;

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
                              if (
                                data[0] &&
                                data[0].records &&
                                data[0].records[0] &&
                                data[0].records[0].type
                              ) {
                                const records = data[0].records;
                                const type = records[0].type;
                                if (type === "open") {
                                  this.isContinue = true;
                                } else {
                                  localStorage.setItem("terminal_id", data[0].uuid);
                                  this.isContinue = false;
                                  this.form.terminal = data[0].uuid;
                                }
                              } else {
                                // console.log(data[0]);
                                this.isContinue = false;
                                this.form.terminal = data[0].uuid;
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
      let terminal = this.list_terminals.find(function (item) {
        return item.uuid === uuid;
      });

      if (
        terminal &&
        terminal.records &&
        terminal.records[0] &&
        terminal.records[0].type
      ) {
        let type = terminal.records[0].type;
        if (type === "open") {
          localStorage.setItem("terminal_id", terminal.uuid);
          this.isContinue = true;
        } else {
          localStorage.setItem("terminal_id", terminal.uuid);
          this.isContinue = false;
        }
      } else {
        localStorage.setItem("terminal_id", terminal.uuid);
        this.isContinue = false;
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
  },
};
</script>
