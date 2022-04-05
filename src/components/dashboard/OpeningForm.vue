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
            <CCol sm="12" md="12" class="pt-2">
              <CCol
                sm="6"
                md="6"
                v-for="(value, index) in form.serverValues"
                :key="index"
                class="floater"
              >
                <CRow>
                  <CCol sm="6" md="3" class="pt-2 bolder">
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
            </CCol>
          </CRow>
        </form>
        <p v-else-if="isContinue">Please Continue..</p>
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
      }
    },
    continue(val) {
      this.$emit("hide-total");
    },
    branchChnaged(val) {
      this.getDependencies();
    },
    showOpeningForm(val) {
      if (val) {
        this.isContinue = false;
      }
    },
    showClosingButton(val) {
      if (val) {
        this.isContinue = false;
      }
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
    showClosingButton() {
      return this.$store.getters.getShowClosingButton;
    },
    showOpeningForm() {
      return this.$store.getters.getShowOpeningForm;
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
      let formValues = this.form.formValues;
      let storeValue = [];
      if (formValues && formValues.length > 0) {
        formValues.map((item) => {
          if (item && item.input && item.value && item.denominations) {
            storeValue.push({
              denomination: item.denominations,
              value: parseFloat(item.value),
              total_number: parseInt(item.input),
            });
          }
        });
      }

      const terminal_id = localStorage.getItem("terminal_id");
      if (!terminal_id) return;
      const data = {
        terminal_id: terminal_id,
        type: "open",
        total: this.form.total,
        details: storeValue,
      };
      TerminalRecordService.create(data)
        .then((res) => {
          if (res.status === 201) {
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "Opening Created Successfully",
              timer: 3600,
            });
            this.$emit("reset-model");
            this.getDependencies();
            this.$emit("hide-total");
            this.$store.commit("set_opening_model", false);
            this.$router.push({ path: "/sales/invoices/create" });
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
      this.$store.commit("set_loader");
      const terminal_id = localStorage.getItem("terminal_id");
      if (terminal_id) {
        let type = JSON.stringify(["open_and_close"]);
        SettingService.get(type)
          .then(async ({ data }) => {
            if (data && data.open_and_close) {
              // check branch exist
              const selected_branch = this.getSelectedBranch();
              if (!selected_branch) return;
              if (data.open_and_close === "on") {
                BranchServices.get(selected_branch[0])
                  .then(({ data }) => {
                    if (data && data.uuid) {
                      BranchTerminalServices.getTerminalByBranch(selected_branch[0])
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
                                  this.$store.commit("set_show_opening_form", false);
                                  this.$store.commit("set_show_closing_button", true);
                                  localStorage.setItem("terminal_id", data[0].uuid);
                                } else {
                                  localStorage.setItem("terminal_id", data[0].uuid);
                                  this.$store.commit("set_show_closing_button", false);
                                  this.$store.commit("set_show_opening_form", true);
                                  this.isContinue = false;
                                  this.form.terminal = data[0].uuid;
                                }
                                // console.log("working 1");
                              } else {
                                // console.log("working 2");
                                // console.log(data[0]);
                                this.isContinue = false;
                                this.form.terminal = data[0].uuid;
                                localStorage.setItem("terminal_id", data[0].uuid);
                                this.$store.commit("set_show_opening_form", true);
                                this.$store.commit("set_show_closing_button", false);
                              }
                            } else {
                              let terminals = this.options.terminals;
                              if (data && data.length > 0) {
                                data.map(function (item, id) {
                                  terminals.push({
                                    label: item.name,
                                    value: item.uuid,
                                    id,
                                  });
                                });
                              }

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
              } else if (data.open_and_close === "off") {
                BranchServices.get(selected_branch[0])
                  .then(({ data }) => {
                    if (data && data.uuid) {
                      BranchTerminalServices.get(selected_branch[0]).then(({ data }) => {
                        if (data && data.length > 0) {
                          localStorage.setItem("terminal_id", data[0].uuid);
                        }
                      });
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                    this.isContinue = false;
                  });
              } else {
                this.isContinue = true;
                this.$store.commit("set_opening_model", false);
                this.$router.push({ path: "/sales/invoices/create" });
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.isContinue = true;
      }
      this.$store.commit("close_loader");
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
          this.$store.commit("set_show_closing_button", true);
          this.$store.commit("set_show_opening_form", false);

          localStorage.setItem("terminal_id", terminal.uuid);
          this.isContinue = true;
          this.$store.commit("set_opening_model", false);
          this.$router.push({ path: "/sales/invoices/create" });
        } else {
          this.$store.commit("set_show_closing_button", false);
          this.$store.commit("set_show_opening_form", true);
          localStorage.setItem("terminal_id", terminal.uuid);
          this.isContinue = false;
        }
      } else {
        localStorage.setItem("terminal_id", terminal.uuid);
        this.isContinue = false;
        this.$store.commit("set_show_closing_button", false);
        this.$store.commit("set_show_opening_form", true);
      }
    },
    createMethod() {
      let denominations = this.form.serverValues;
      let formValues = this.form.formValues;
      CurrencyDenominationService.getAll()
        .then(({ data }) => {
          if (data && data.length) {
            data.map((value) => {
              denominations.push(value);
              formValues.push({
                input: 0,
                value: value.value,
                denominations: value.denominations,
              });
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
.floater {
  display: block !important;
  float: left !important;
}
</style>
