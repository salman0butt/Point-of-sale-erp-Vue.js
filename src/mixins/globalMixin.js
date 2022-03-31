import moment from 'moment';

export const globalMixin = {
  methods: {
    calculateTodayDate() {
      let today = new Date();
      let dd = today.getDate().toString().padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0");
      let yyyy = today.getFullYear().toString();
      return yyyy + "-" + mm + "-" + dd;
    },
    calculateDueDate() {
      // let today = new Date();
      // // let dd = today.getDate().toString().padStart(2, "0");
      // let dd = String(today.getDate() + 2).padStart(2, "0");
      // let mm = String(today.getMonth() + 2).padStart(2, "0");
      // let yyyy = today.getFullYear().toString();
      // return yyyy + "-" + mm + "-" + dd;
      let date = new Date();
    let eMoment = moment(date);

    let leftEMonth = eMoment.add(1, 'months').format('YYYY-MM-DD');
  
      return leftEMonth;
    },
  }
}
