export const smsMixin = {
  data: function () {
    return {
      showSmsButton: false,
      sms: {
        name: "",
        number: "",
        link: "",
      },
    }
  },
  created: function () {
    const serial_number = JSON.stringify(['sms']);
    this.$http.get(`/modules/${serial_number}`).then((response) => {
      if (response.status === 200) {
          if(response.data && response.data[0] && response.data[0].status === 'active') {
            this.showSmsButton = true;
          }
      }
    }).catch((error) => {
      console.log(error);
    });

  },
  methods: {
    openSmsModel() {
      this.$store.commit("set_sms_plugin_model", true);
    },
    sendSms(type = null) {
      const id = this.$route.params.id;
      if(!type || !id) return;

      let send_link = '';
      let base_url = window.location.origin;
      if(type === 'invoice') {
        send_link = base_url+`/show-invoice/`+id;
      }else if(type === 'quotation') {
        send_link = base_url+`/show-quotation/`+id;
      }else {
        return;
      }
      if(this.sms.number){
        let msg = `Dear%20${this.sms.name}%0A%0AClick%20on%20the%20link%20below%20to%20view%2Fdownload%20your%20%28invoice%29%0A%0A${send_link}%0A%0Athank%20you`;
        this.$http.post(`/plugins/sms/send`, {
          number: this.sms.number,
          message: msg,
        }).then((response) => {
          if (response.status === 200) {
            this.$swal.fire({
              icon: "success",
              title: "Success",
              text: "SMS Sent Successfully",
              timer: 3600,
            });
          }
        }).catch((error) => {
          this.$swal.fire({
            icon: "error",
            title: "Error",
            text: "Something went wrong.",
            timer: 3600,
          });
        });

      }else {
        this.$swal.fire({
          icon: "error",
          title: "Error",
          text: "Please add the Customer Phone Number First and set as default and try again.",
          timer: 3600,
        });
      }

    },

  }
}
