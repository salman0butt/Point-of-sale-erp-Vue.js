<template>
  <div id="test">
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
      EmployeeSalaryAdjustmentService.genrateSalary(this.salary.id).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement("a");

        fileLink.href = fileURL;
        fileLink.setAttribute("download", "file.pdf");
        document.body.appendChild(fileLink);

        fileLink.click();
      });
    },
  },
};
</script>
