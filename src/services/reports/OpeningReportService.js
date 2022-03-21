import http from "@/http-common";
import Helper from "@/helpers/Helper";

class OpeningReportService extends Helper {

  // getAll(page, per_page) {
  //   let url = "/employee-resignations";

  //   if (page !== '')
  //     url = super.updateQueryStringParameter(url, "page", page);

  //   if (per_page !== '')
  //     url = super.updateQueryStringParameter(url, "per_page", per_page);

  //   return http.get(url, super.selectedBranch());
  // }

  genrateReport(data) {
    let url = "/reports/opening";
    return http.post(url, data);
  }

  get(id) {
    return http.get(`/reports/opening/show/${id}`);
  }

}

export default new OpeningReportService();
