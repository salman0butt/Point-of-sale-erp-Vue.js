<template>
  <div>
    <CCard>
      <CCardHeader> SMTP </CCardHeader>
      <CCardBody>
        <CRow>
          <Loader />
          <CCol xs="12" lg="12">
            <form @submit.prevent="updateSmtpSetting()">
              <CRow>
                <CCol sm="6" md="6" class="pt-2">
                  <CInput label="Host" :value.sync="form.host" />
                  <div v-if="$v.form.host.$error">
                    <p v-if="!$v.form.host.required" class="errorMsg">Host is required</p>
                  </div>
                </CCol>
                <CCol sm="6" md="6" class="pt-2">
                  <CInput label="Port" :value.sync="form.port" />
                  <div v-if="$v.form.port.$error">
                    <p v-if="!$v.form.port.required" class="errorMsg">Port is required</p>
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="6" class="pt-2">
                  <CInput label="Username" :value.sync="form.username" />
                  <div v-if="$v.form.username.$error">
                    <p v-if="!$v.form.username.required" class="errorMsg">
                      Username is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="6" class="pt-2">
                  <CInput label="Password" :value.sync="form.password" />
                  <div v-if="$v.form.password.$error">
                    <p v-if="!$v.form.password.required" class="errorMsg">
                      Password is required
                    </p>
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm="6" md="6" class="pt-2">
                  <CSelect
                    label="Encryption Type"
                    :options="options.encryption"
                    :value.sync="form.encryption"
                  />
                  <div v-if="$v.form.encryption.$error">
                    <p v-if="!$v.form.encryption.required" class="errorMsg">
                      Encryption is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="6" class="pt-2">
                  <CInput label="From Email" :value.sync="form.from_email" />
                  <div v-if="$v.form.from_email.$error">
                    <p v-if="!$v.form.from_email.required" class="errorMsg">
                      From Email is required
                    </p>
                  </div>
                </CCol>
                <CCol sm="6" md="6" class="pt-2">
                  <CInput label="From Name" :value.sync="form.from_name" />
                  <div v-if="$v.form.from_name.$error">
                    <p v-if="!$v.form.from_name.required" class="errorMsg">
                      From Name is required
                    </p>
                  </div>
                </CCol>
              </CRow>

              <CRow class="mt-4 d-block">
                <CButton
                  progress
                  timeout="2000"
                  block
                  color="success"
                  style="float: right; width: 150px; margin-right: 20px"
                  type="submit"
                  >Save</CButton
                >
              </CRow>
            </form>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  </div>
</template>
<script>
import SettingService from "@/services/settings/SettingService";
import { required } from "vuelidate/lib/validators";
import Loader from "@/components/layouts/Loader";

export default {
  name: "SmtpSettingForm",
  components: { Loader },
  data: () => ({
    settingData: [],
    form: {
      host: "",
      port: "",
      username: "",
      password: "",
      from_email: "",
      from_name: "",
      encryption: "",
    },
    options: {
      encryption: [
        { value: "", label: "Choose Type", disabled: true, selected: "" },
        { value: "tls", label: "TLS" },
        { value: "ssl", label: "SSL" },
      ],
    },
  }),
  validations() {
    return {
      form: {
        host: { required },
        port: { required },
        username: { required },
        password: { required },
        from_email: { required },
        from_name: { required },
        encryption: { required },
      },
    };
  },
  created() {
    this.SmtpSettingService();
  },
  methods: {
    SmtpSettingService() {
      let type = "smtp";
      this.$store.commit("set_loader");
      SettingService.getAll(type)
        .then(({ data }) => {
          if (data && data[0] && data[0].value) {
            let {
              host,
              port,
              username,
              password,
              from_email,
              from_name,
              encryption,
            } = JSON.parse(data[0].value);
            this.form.host = host;
            this.form.port = port;
            this.form.username = username;
            this.form.password = password;
            this.form.from_email = from_email;
            this.form.from_name = from_name;
            this.form.encryption = encryption;
          }
          this.$store.commit("close_loader");
        })
        .catch((error) => {
          this.$store.commit("close_loader");
          console.log(error);
        });
    },
    updateSmtpSetting() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.commit("set_loader");
        this.settingData = [];
        let data = JSON.stringify(this.form);
        this.settingData.push({ key: "smtp", value: data, type: "smtp" });
        SettingService.update(this.settingData)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "SMTP Updated Successfully",
                timer: 3600,
              });

              this.$v.$reset();
              this.$store.commit("close_loader");
            }
          })
          .catch((error) => {
            console.log(error);
            this.$store.commit("close_loader");
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: "Something Went Wrong.",
              timer: 3600,
            });
          });
      }
    },
  },
};
</script>
