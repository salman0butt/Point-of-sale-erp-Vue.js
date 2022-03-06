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
    const serial_number = 'whatsapp';
    this.$http.get(`/modules/${serial_number}`).then((response) => {
      if (response.status === 200) {
          if(response.data && response.data.status === 'active') {
            this.showWhatsappButton = true;
          }
      }
    }).catch((error) => {
      console.log(error);
    });

  },
  methods: {
    sendWhatsapp() {
      if(this.whatsapp.number && this.whatsapp.name){
        this.whatsapp.link =
        "https://wa.me/" +
        this.whatsapp.number +
        "?text=" +
        `Dear%20${this.whatsapp.name}%0A%0AClick%20on%20the%20link%20below%20to%20view%2Fdownload%20your%20%28invoice%29%0A%0Ahttps%3A%2F%2Fdemo.switcher.one%2Fpu%2Fdoc%2Ffilename.pdf%0A%0Athank%20you`;
      window.open(this.whatsapp.link);
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
