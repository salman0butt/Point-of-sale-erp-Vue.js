import http from "@/http-common";
import Helper from "@/helpers/Helper";

class ReportService extends Helper {

  profitAndLossReport() {
    return http.get(`/reports/profit-and-loss-report`);
  }



}

export default new ReportService();
