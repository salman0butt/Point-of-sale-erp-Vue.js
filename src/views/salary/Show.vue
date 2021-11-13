<template>
  <div id="salary-pdf">
    <CRow>
      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>Salary View</CCardHeader>
          <CCardBody>
            <CRow>
              <CCol xs="6" lg="6">
                <CCardHeader>
                  <h3>Detail</h3>
                </CCardHeader>
                <CCardBody>
                  <div class="table-responsive">
                    <table class="table table-sm table-borderless mb-0">
                      <tbody>
                        <tr>
                          <th class="pl-0 w-35" scope="row">Employee ID:</th>
                          <td>{{ salary.employee.serial_no }}</td>
                        </tr>
                        <tr>
                          <th class="pl-0 w-35" scope="row">Employee:</th>
                          <td>{{ salary.employee.full_name }}</td>
                        </tr>
                        <tr>
                          <th class="pl-0 w-35" scope="row">Year:</th>
                          <td>{{ year }}</td>
                        </tr>

                        <tr>
                          <th class="pl-0 w-35" scope="row">Month:</th>
                          <td>{{ month }}</td>
                        </tr>
                        <tr>
                          <th class="pl-0 w-35" scope="row">Total Days:</th>
                          <td>{{ salary.total_days }}</td>
                        </tr>
                        <tr>
                          <th class="pl-0 w-35" scope="row">Total Working Days:</th>
                          <td>{{ salary.total_working_days }}</td>
                        </tr>
                        <tr>
                          <th class="pl-0 w-35" scope="row">Total Leaves:</th>
                          <td>{{ salary.total_leaves }}</td>
                        </tr>
                        <tr>
                          <th class="pl-0 w-35" scope="row">Total Absent:</th>
                          <td>{{ salary.total_absent }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CCardBody>
              </CCol>
              <CCol xs="6" lg="6">
                <CCardHeader>
                  <h3>Earnings</h3>
                </CCardHeader>
                <CCardBody>
                  <div class="table-responsive">
                    <table class="table table-sm table-borderless mb-0">
                      <tbody>
                        <tr>
                          <th class="pl-0 w-35" scope="row">Basic Salary:</th>
                          <td>{{ salary.basic_salary }}</td>
                        </tr>
                        <tr v-for="(input, k) in salary.earnings.inputs" :key="k">
                          <th v-if="input.value" class="pl-0 w-35" scope="row">
                            {{ input.name }}:
                          </th>
                          <td v-if="input.value">{{ input.value }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CCardBody>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="6" lg="6">
                <CCardHeader>
                  <h3>Deductions</h3>
                </CCardHeader>
                <CCardBody>
                  <div class="table-responsive">
                    <table class="table table-sm table-borderless mb-0">
                      <tbody>
                        <tr v-for="(input, k) in salary.deductions.inputs" :key="k">
                          <th v-if="input.value" class="pl-0 w-35" scope="row">
                            {{ input.name }}:
                          </th>
                          <td v-if="input.value">{{ input.value }}</td>
                          <th v-if="input.note" class="pl-0 w-35" scope="row">note:</th>
                          <td>{{ input.note }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CCardBody>
              </CCol>
              <CCol xs="6" lg="6">
                <CCardHeader>
                  <h3>Expenses</h3>
                </CCardHeader>
                <CCardBody>
                  <div class="table-responsive">
                    <table class="table table-sm table-borderless mb-0">
                      <tbody>
                        <tr v-for="(input, k) in salary.expenses.inputs" :key="k">
                          <th v-if="input.value" class="pl-0 w-35" scope="row">
                            {{ input.name }}:
                          </th>
                          <td v-if="input.value">{{ input.value }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CCardBody>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12" md="12" class="pt-2">
                <CCardBody>
                  <h6>Basic Salary: {{ salary.basic_salary }}</h6>
                  <h6 v-if="salary.total_earnings">
                    Total Earnings: {{ salary.total_earnings }}
                  </h6>
                  <h6 v-if="salary.total_deductions">
                    Total Deductions: -{{ salary.total_deductions }}
                  </h6>
                  <h6 v-if="salary.total_expenses">
                    Total Expense: +{{ salary.total_expenses }}
                  </h6>
                  <h4>Total Payable Salary: {{ salary.payable_salary }}</h4>
                </CCardBody>
              </CCol>
            </CRow>
            <CButton
              progress
              timeout="2000"
              block
              color="success"
              style="float: right; width: 200px; margin-left: 20px"
              type="button"
              @click="makePDF()"
              >Genrate PDF</CButton
            >
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import EmployeeSalaryAdjustmentService from "@/services/employees/EmployeeSalaryAdjustmentService";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default {
  name: "ShowSalary",
  data() {
    return {
      salary: {
        id: "",
        employee: "",
        total_working_days: 0,
        total_days: 0,
        total_leaves: 0,
        total_absent: 0,
        basic_salary: 0,
        total_earnings: 0,
        total_deductions: 0,
        total_expenses: 0,
        net_salary: 0,
        payable_salary: 0,
        deductions: {
          inputs: [
            {
              name: "Name",
              value: "",
            },
          ],
        },
        earnings: {
          inputs: [
            {
              name: "Name",
              value: "",
            },
          ],
        },
        expenses: {
          inputs: [],
        },
      },
      year: "",
      month: "",
    };
  },
  created() {
    this.salary.id = this.$route.params.id;
    this.getEmployeeSalary();
  },
  methods: {
    getEmployeeSalary() {
      EmployeeSalaryAdjustmentService.get(this.salary.id)
        .then(({ data }) => {
          if (data != null && data != "") {
            this.isEditing = true;
            this.salary.id = data.uuid;
            this.salary.employee = data.employee;
            this.month = data.month;
            this.year = data.year;
            this.salary.total_working_days = data.total_working_days;
            this.salary.total_days = data.total_days;
            this.salary.total_leaves = data.total_leaves;
            this.salary.total_absent = data.total_absents ? data.total_absents : 0;
            this.salary.basic_salary = data.basic_salary;
            this.salary.total_earnings = data.total_earnings;
            this.salary.total_deductions = data.total_deductions;
            this.salary.total_expenses = data.total_expenses;
            this.salary.payable_salary = data.payable_salary;
            this.salary.net_salary = data.net_salary;
            let earnings = JSON.parse(data.earnings);
            this.salary.deductions.inputs = [];
            this.salary.earnings.inputs = [];
            this.salary.expenses.inputs = [];
            if (earnings && earnings.length) {
              for (let index in earnings) {
                this.salary.earnings.inputs.push({
                  name: earnings[index].name,
                  value: earnings[index].value,
                });
              }
            }

            let deductions = JSON.parse(data.deductions);
            if (deductions && deductions.length) {
              for (let index in deductions) {
                this.salary.deductions.inputs.push({
                  name: deductions[index].name,
                  value: deductions[index].value,
                  note: deductions[index].note,
                });
              }
            }

            let expenses = JSON.parse(data.expenses);
            if (expenses && expenses.length) {
              for (let index in expenses) {
                this.salary.expenses.inputs.push({
                  name: expenses[index].name,
                  value: expenses[index].value,
                });
              }
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    makePDF() {
      // EmployeeSalaryAdjustmentService.genrateSalary(this.salary.id).then((response) => {
      //   var fileURL = window.URL.createObjectURL(new Blob([response.data]));
      //   var fileLink = document.createElement("a");

      //   fileLink.href = fileURL;
      //   fileLink.setAttribute("download", "file.pdf");
      //   document.body.appendChild(fileLink);

      //   fileLink.click();
      // });
      window.html2canvas = html2canvas;
      let doc = new jsPDF("p", "pt", "a4");
      let x = 20;
      let y = 20;

      y = y + 20;
      doc.setFontSize(16);

      doc.text("Detail", x, y);
      y = y + 20;

      doc.setFontSize(9);

      doc.text("Employee ID", x, y);
      doc.text(this.salary.employee.serial_no, x + 500, y);

      y = y + 20;

      doc.text("Employee Name", x, y);
      doc.text(this.salary.employee.full_name, x + 500, y);

      y = y + 20;

      doc.text("Year", x, y);
      doc.text(this.year, x + 500, y);

      y = y + 20;

      doc.text("Month", x, y);
      doc.text(this.month, x + 500, y);

      y = y + 20;

      doc.text("Total Days", x, y);
      doc.text(this.salary.total_days.toString(), x + 500, y);

      y = y + 20;

      doc.text("Total Working Days", x, y);
      doc.text(this.salary.total_working_days.toString(), x + 500, y);

      y = y + 20;

      doc.text("Total Leaves", x, y);
      doc.text(this.salary.total_leaves.toString(), x + 500, y);

      y = y + 20;

      doc.text("Total Absent", x, y);
      doc.text(this.salary.total_absent.toString(), x + 500, y);

      //Earnings
      y = y + 40;
      doc.setFontSize(16);

      doc.text("Earnings", x, y);
      y = y + 20;

      doc.setFontSize(9);
      doc.text("Basic Salary", x, y);
      doc.text(this.salary.basic_salary, x + 500, y);
      if (this.salary.earnings.inputs && this.salary.earnings.inputs.length > 0) {
        for (const index in this.salary.earnings.inputs) {
          y = y + 20;
          doc.text(this.salary.earnings.inputs[index].name, x, y);
          doc.text(this.salary.earnings.inputs[index].value, x + 500, y);
        }
      }
      //Deductions
      if (this.salary.deductions.inputs && this.salary.deductions.inputs.length > 0) {
        y = y + 40;
        doc.setFontSize(16);

        doc.text("Deductions", x, y);

        doc.setFontSize(9);
        for (const index in this.salary.deductions.inputs) {
          y = y + 20;
          doc.text(this.salary.deductions.inputs[index].name, x, y);
          doc.text(this.salary.deductions.inputs[index].value, x + 500, y);
          y = y + 20;
          doc.text("Note: ", x, y);
          doc.text(this.salary.deductions.inputs[index].note, x + 30, y);
        }
      }

      //Expesne
      if (this.salary.expenses.inputs && this.salary.expenses.inputs.length > 0) {
        y = y + 40;
        doc.setFontSize(16);

        doc.text("Expenses", x, y);

        doc.setFontSize(9);
        for (const index in this.salary.expenses.inputs) {
          y = y + 20;
          doc.text(this.salary.expenses.inputs[index].name, x, y);
          doc.text(this.salary.expenses.inputs[index].value, x + 500, y);
        }
      }
      y = y + 40;
      doc.setFontSize(10);
      doc.text("Basic Salary", x, y);
      doc.text(this.salary.basic_salary, x + 500, y);

      y = y + 20;
      doc.text("Total Earnings", x, y);
      doc.text(this.salary.total_earnings, x + 500, y);

      y = y + 20;
      doc.text("Total Deductions", x, y);
      doc.text(this.salary.total_deductions, x + 500, y);

      y = y + 20;
      doc.text("Total Expense", x, y);
      doc.text(this.salary.total_expenses, x + 500, y);

      y = y + 20;
      doc.setFontSize(14);
      doc.text("Total Payable Salary", x, y);
      doc.text(this.salary.payable_salary, x + 500, y);

      doc.save("salary.pdf");

      //       Employee ID:	00001
      // Employee:	admin
      // Year:	2021
      // Month:	Dec
      // Total Days:	30
      // Total Working Days:	25
      // Total Leaves:	0
      // Total Absent:	25
      // https://rawgit.com/MrRio/jsPDF/master/docs/jsPDF.html#text
      // doc.html(document.getElementById("salary-pdf"), {
      //   callback: function (doc) {
      //     doc.save("salary.pdf");
      //   },
      // });
    },
  },
};
</script>
<style scoped></style>
