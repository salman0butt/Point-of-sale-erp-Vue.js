import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/http-common'


Vue.use(Vuex)

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false,
  asideShow: false,
  darkMode: false,
  status: '',
  token: localStorage.getItem('token') || '',
  user: {},
  errors: [],
  msgs: [],
  employee_name: "",
  permissions: JSON.parse(localStorage.getItem("permissions")) || [],
  selected_branches: JSON.parse(localStorage.getItem("selected_branches")) || [],
  list_branches: JSON.parse(localStorage.getItem("list_branches")),
  showBranchModel: false,
  loading: false,
  emp_img: "",
  profile_img: localStorage.getItem("profile_pic") ?? "/img/avatars/placeholder.png",
  employee_id: localStorage.getItem('employee_id') || '',
  total_receivings_cost: 0,
  searchProductItems: [],
  quotations: {
    total: 0,
    subTotal: 0,
    taxTotal: 0,
    discount: 0,
  },

  language: localStorage.getItem('language') || 'en',
  customerModel: false,
  supplierModel: false,
  brandModel: false,
  paymentModel: false,
  categoryModel: false,
  TermAndConditionModel: false,
  PaymentTermModel: false,
  openingModel: false,
  closingModel: false,
  PaymernTermId: '',
  business_logo: localStorage.getItem('business_logo') || '/img/images/switcher-logo.jpeg',
  customPluginModel: false,
  whatsappPluginModel: false,
  returnByProductModel: false,
  ReturnByInvoiceModel: false,
  buyCreditModel: false,
  smsCredits: 0,
  smsPluginModel: false,
}

const mutations = {
  toggleSidebarDesktop(state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile(state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set(state, [variable, value]) {
    state[variable] = value
  },
  toggle(state, variable) {
    // console.log("llllllllllllllllll", state[variable]);
    state[variable] = !state[variable]
  },
  auth_success(state, token) {
    state.status = 'success';
    state.token = token;
  },
  auth_error(state) {
    state.status = 'error'
  },
  logout(state) {
    state.status = ''
    state.token = ''
    state.permissions = ''
  },
  post_errors(state, errors) {
    state.errors.push(errors);
  },
  post_msgs(state, msg) {
    state.msgs.push(msg);
  },
  remove_errors(state) {
    state.errors = [];
  },
  remove_msgs(state) {
    state.msgs = [];
  },
  set_employee_name(state, name) {
    state.employee_name = name;
  },
  set_permissions(state, permissions) {
    state.permissions = permissions;
  },
  set_branches(state, branches) {
    state.selected_branches = branches;
  },
  set_list_branches(state, branch_list) {
    state.list_branches = branch_list;
  },
  set_show_branch_model(state, status) {
    state.showBranchModel = status;
  },
  set_loader(state) {
    state.loading = true;
  },
  close_loader(state) {
    state.loading = false;
  },
  set_profile_img(state, img) {
    localStorage.setItem("profile_pic", img)
    state.profile_img = img;
  },
  set_emp_img(state, img) {
    state.emp_img = img;
  },
  set_total_receivings_cost(state, cost) {
    state.total_receivings_cost = cost;
  },
  set_search_product_items(state, items) {
    state.searchProductItems = items;
  },
  set_quotation_total(state, total) {
    state.quotations.total = total;
  },
  set_quotation_sub_total(state, sub_total) {
    state.quotations.subTotal = sub_total;
  },
  set_quotation_tax_total(state, tax_total) {
    state.quotations.taxTotal = tax_total;
  },
  set_quotation_total_discount(state, discount) {
    state.quotations.discount = discount;
  },
  set_language(state, language) {
    state.language = language;
  },
  set_customer_model(state, status) {
    state.customerModel = status;
  },
  set_supplier_model(state, status) {
    state.supplierModel = status;
  },
  set_brand_model(state, status) {
    state.brandModel = status;
  },
  set_payment_model(state, status) {
    state.paymentModel = status;
  },
  set_category_model(state, status) {
    state.categoryModel = status;
  },
  set_term_and_condition_model(state, status) {
    state.TermAndConditionModel = status;
  },
  set_payment_term_model(state, status) {
    state.PaymentTermModel = status;
  },
  set_payment_term_id(state, id) {
    state.PaymernTermId = id;
  },
  set_opening_model(state, status) {
    state.openingModel = status;
  },
  set_closing_model(state, status) {
    state.closingModel = status;
  },
  set_business_logo(state, logo) {
    state.business_logo = logo;
    localStorage.setItem('business_logo', logo);
  },
  set_custom_plugin_model(state, status) {
    state.customPluginModel = status;
  },
  set_whatsapp_plugin_model(state, status) {
    state.whatsappPluginModel = status;
  },
  set_return_by_product_model(state, status) {
    state.returnByProductModel = status;
  },
  set_return_by_invoice_model(state, status) {
    state.ReturnByInvoiceModel = status;
  },
  set_buy_credit_model(state, status) {
    state.buyCreditModel = status;
  },
  set_sms_credits(state, credits) {
    state.smsCredits = credits;
  },
  set_sms_plugin_model(state, status) {
    state.smsPluginModel = status;
  }


}
const actions = {
  login({ commit, dispatch }, user) {
    return new Promise((resolve, reject) => {
      commit('remove_errors');
      http.post('/auth/login', user).then(res => {
        if (res.status === 200 && res.data) {
          const { data } = res;
          const token = data.token;
          localStorage.setItem('token', token);
          localStorage.setItem('employee_id', data.employee.uuid);
          localStorage.setItem('permissions', JSON.stringify(data.permissions));
          localStorage.setItem('list_branches', JSON.stringify(data.branches));
          localStorage.setItem('business_id', data.business.uuid);
          if (data.business && data.business.logo && data.business.logo.path) {
            localStorage.setItem('business_logo', data.business.logo.path);
          }
          if (data.branches && data.branches.length == 1) {
            localStorage.setItem('selected_branches', JSON.stringify([data.branches[0].uuid]));
          }
          http.defaults.headers.common['Authorization'] = "Bearer " + token;
          const profile_pic = data.employee?.personal_photo;
          if (profile_pic) {
            commit('set_profile_img', data.employee.personal_photo);
          }
          commit('set_permissions', data.permissions);
          commit('set_list_branches', data.branches);
          commit('auth_success', token);
          if (data.employee.user && data.employee.user.language) {
            dispatch("setLanguage", data.employee.user.language);
          }
          resolve(res);
        }
      }).catch(err => {
        commit('auth_error');
        localStorage.removeItem('token');
        reject(err);
      });

    })
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      commit('logout');
      http.post('/auth/logout').then((res) => {
        localStorage.clear();
        delete http.defaults.headers.common['Authorization'];
        resolve(res);
      }).catch((err) => {
        reject(err);
        // console.log(err);
      });
      resolve();
    })
  },
  auto_logout({ commit }) {
    return new Promise((resolve) => {
      commit('logout');
      localStorage.clear();
      resolve();
    })
  },
  set_errors({ commit }, errorMsg) {
    return new Promise((resolve) => {
      commit('post_errors', errorMsg);
      resolve();
    });
  },
  deleteAttachment({ commit }, uuid) {
    return new Promise((resolve, reject) => {
      http.delete('/attachments/' + uuid).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    })
  },
  setLanguage({ commit }, language) {
    commit('set_language', language);
    localStorage.setItem("language", language);
    http.defaults.headers.common['lang'] = language;
    const htmlEl = document.querySelector("html");
    if (language === 'ar') {
      htmlEl.setAttribute('dir', 'rtl');
      htmlEl.setAttribute('lang', language);
    } else if (language === 'en') {
      htmlEl.setAttribute('dir', 'ltr');
      htmlEl.setAttribute('lang', language);
    }

  },
  setPorfileImage({ commit }, img) {
    commit('set_profile_img', img);
    localStorage.setItem("profile_pic", img)
  }

}
const getters = {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,
  errors: state => state.errors,
  msgs: state => state.msgs,
  get_employee_name: state => state.employee_name,
  getPermissions: state => state.permissions,
  getBranches: state => state.selected_branches,
  branchLists: state => state.list_branches,
  showBranchModel: state => state.showBranchModel,
  loading: state => state.loading,
  getEmployeeImg: state => state.emp_img,
  getProfileImg: state => state.profile_img,
  getTotalReceivingsCost: state => state.total_receivings_cost,
  getSearchProductItems: state => state.searchProductItems,
  getQuotationTotal: state => state.quotations.total,
  getQuotationSubTotal: state => state.quotations.subTotal,
  getQuotationTaxTotal: state => state.quotations.taxTotal,
  getQuotationDiscount: state => state.quotations.discount,
  getLanguage: state => state.language,
  getCustomerModel: state => state.customerModel,
  getSupplierModel: state => state.supplierModel,
  getBrandModel: state => state.brandModel,
  getPaymentModel: state => state.paymentModel,
  getCategoryModel: state => state.categoryModel,
  getTermAndConditionModel: state => state.TermAndConditionModel,
  getPaymentTermModel: state => state.PaymentTermModel,
  getPaymentTermId: state => state.PaymernTermId,
  getOpeningModel: state => state.openingModel,
  getClosingModel: state => state.closingModel,
  getBusinessLogo: state => state.business_logo,
  getCustomPluginModel: state => state.customPluginModel,
  getWhatsappPluginModel: state => state.whatsappPluginModel,
  getReturnByProductModel: state => state.returnByProductModel,
  getReturnByInvoiceModel: state => state.ReturnByInvoiceModel,
  getBuyCreditModel: state => state.buyCreditModel,
  getSmsCredits: state => state.smsCredits,
  getSmsPluginModel: state => state.smsPluginModel

}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
