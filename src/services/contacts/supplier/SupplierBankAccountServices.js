import http from "../../../http-common";
import Helper from "@/helpers/Helper";

class SupplierBankAccountServices extends Helper {
    getAll(emp_id,page, per_page) {
        let url = "/bank-accounts/supplier";
        if(emp_id !== '')
        url = super.updateQueryStringParameter(url,"id",emp_id);
    
        if(page !== '')
         url = super.updateQueryStringParameter(url,"page",page);
    
        if(per_page !== '')
         url = super.updateQueryStringParameter(url,"per_page",per_page);
    
        return http.get(url);
      }
    
      get(id) {
        return http.get(`/bank-accounts/supplier/${id}`);
      }
    
      create(data) {
        return http.post("/bank-accounts/supplier", data);
      }
    
      update(id, data) {
        return http.patch(`/bank-accounts/supplier/${id}`, data);
      }
    
      delete(id) {
        return http.delete(`/bank-accounts/supplier/${id}`);
      }

  
}

export default new SupplierBankAccountServices();
