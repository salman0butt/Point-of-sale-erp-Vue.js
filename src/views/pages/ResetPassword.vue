<template>
  <div class="c-app flex-row align-items-center" :class="{ 'c-dark-theme': $store.state.darkMode }">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm @submit.prevent="reset">
                  <h1>Reset Password</h1>
                  <p class="text-muted">Genrate New Password</p>

                  <CInput
                    placeholder="Password"
                    type="password"
                    autocomplete="new_password"
                     v-model="form.password"
                  >
                    <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                  </CInput>
                   <CInput
                    placeholder="Confirm Password"
                    type="password"
                    autocomplete="confirm_new_password"
                     v-model="form.password_confirmation"
                  >
                    <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                  </CInput>

                <p v-if="form.successMsg" class="successMsg">{{ form.successMsg }}</p>
                  <p v-if="this.$store.state.errors.length">
                  <b>Please correct the following error(s):</b>
                  <ul>
                    <li class="error" v-for="(error, index) in this.$store.state.errors" v-bind:key="index">{{ error }}</li>
                  </ul>
                </p>
                  <CRow>
                    <CCol col="6" class="text-left">
                      <CButton style="background-color:#52b947;color:white" @click="reset" class="px-4">Reset</CButton>
                    </CCol>
                    <CCol col="6" class="text-right">
                      <router-link to="/login" color="link" class="px-0">Login?</router-link>
                      <!-- <CButton color="link" class="d-lg-none">Register now!</CButton> -->
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard
              color="default"
              text-color="white"
              class="text-center py-5 d-md-down-none"
              body-wrapper
            >
              <CCardBody>
                <CImg
                    src="/login.PNG"
                    block
                    class="mb-2"
                    width="80%"
                />
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
      <CCardBody class="text-center"><p class="h5">Powered by Switcher Solutions</p></CCardBody>
    </CContainer>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ResetPassword',
  data(){
    return{
      form: {
        email:'',
        password:'',
        password_confirmation:'',
        token:'',
        successMsg:''
      }
    }
  },
  created(){
    this.form.token = this.$route.params.token;
    this.form.email = this.$route.params.email;
    this.$store.commit('remove_errors');
  },
  methods:{
    ...mapActions(["set_errors"]),
      reset(){
      let data = this.form;
      if(this.form.password && this.form.password_confirmation){
        this.$http.post('reset-password', data )
        .then(() =>{
          this.form.successMsg = "Password Successfully Changed";
           this.$store.commit('remove_errors');
        }).catch(() => {
          this.form.successMsg = "";
         this.set_errors('Something went wrong');
        });
      }
    }
  }
}
</script>

<style scope>
.error {
  color:red !important;
}
.successMsg {
  color: green;
}
</style>
