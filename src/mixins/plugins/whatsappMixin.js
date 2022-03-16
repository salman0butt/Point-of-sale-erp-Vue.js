export const whatsappMixin = {
  data: function () {
    return {
      showWhatsappButton: false,
      whatsapp: {
        name: "",
        number: "",
        link: "",
      },
    }
  },
  created: function () {
    const serial_number = JSON.stringify(['whatsapp']);
    this.$http.get(`/modules/${serial_number}`).then((response) => {
      if (response.status === 200) {
        if (response.data && response.data[0] && response.data[0].status === 'active') {
          this.showWhatsappButton = true;
        }
      }
    }).catch((error) => {
      console.log(error);
    });

  },
  methods: {
    openWhatsappModel() {
      this.$store.commit("set_whatsapp_plugin_model", true);
    },
    sendWhatsapp(type = null) {
      const id = this.$route.params.id;
      if (!type || !id) return;

      let send_link = '';
      let base_url = window.location.origin;
      if (type === 'invoice') {
        send_link = base_url + `/show-invoice/` + id;
      } else if (type === 'quotation') {
        send_link = base_url + `/show-quotation/` + id;
      } else if (type === 'payment') {
        send_link = base_url + `/show-payment/` + id;
      }
      else {
        return;
      }

      console.log("we are ftsa");

      if (this.whatsapp.number && this.whatsapp.name) {
        this.whatsapp.link =
          "https://wa.me/" +
          this.whatsapp.number +
          "?text=" +
          `Dear%20${this.whatsapp.name}%0A%0AClick%20on%20the%20link%20below%20to%20view%2Fdownload%20your%20%28invoice%29%0A%0A${send_link}%0A%0Athank%20you`;
        window.open(this.whatsapp.link);
      } else {
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
