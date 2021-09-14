import http from "../../http-common";

class DesignationService {
  getAll(page, per_page) {
    let url = "/designations";
    if(page !== '')
     url = this.updateQueryStringParameter(url,"page",page);

    if(per_page !== '')
     url = this.updateQueryStringParameter(url,"per_page",per_page);

    return http.get(url);
  }

  get(id) {
    return http.get(`/designations/${id}`);
  }

  create(data) {
    return http.post("/designations", data);
  }

  update(id, data) {
    return http.patch(`/designations/${id}`, data);
  }

  delete(id) {
    return http.delete(`/designations/${id}`);
  }

  updateQueryStringParameter(uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
      return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
      return uri + separator + key + "=" + value;
    }
  }

}

export default new DesignationService();
