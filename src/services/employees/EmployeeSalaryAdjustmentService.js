import http from "@/http-common";
import Helper from "@/helpers/Helper";

class EmployeeSalaryAdjustmentService extends Helper{

  get(id) {
    return http.get(`/employee-salary-adjustments/${id}`);
  }

  create(data) {
    return http.post("/employee-salary-adjustments", data);
  }

  update(id, data) {
    return http.patch(`/employee-salary-adjustments/${id}`, data);
  }

  delete(id) {
    return http.delete(`/employee-salary-adjustments/${id}`);
  }

}

export default new EmployeeSalaryAdjustmentService();
