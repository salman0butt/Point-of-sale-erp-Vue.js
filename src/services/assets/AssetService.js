import http from "../../http-common";
import Helper from "@/helpers/Helper";

class AssetService extends Helper {
  getAll(page, per_page) {
    let url = "/assets";
    if(page !== '')
    url = super.updateQueryStringParameter(url,"page",page);

   if(per_page !== '')
    url = super.updateQueryStringParameter(url,"per_page",per_page);

    return http.get(url, super.selectedBranch());
  }

  getAllBranches() {
    return http.get(`/branches`);
  }

  get(id) {
    return http.get(`/assets/${id}`);
  }

  create(data) {
    return http.post("/assets", data, super.selectedBranch());
  }

  update(id, data) {
    return http.patch(`/assets/${id}`, data);
  }

  delete(id) {
    return http.delete(`/assets/${id}`);
  }
}

export default new AssetService();
