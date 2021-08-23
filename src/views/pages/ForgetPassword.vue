<template>
  <div class="c-app flex-row align-items-center" :class="{ 'c-dark-theme': $store.state.darkMode }">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm @submit.prevent="forget">
                  <h1>Forget Password</h1>
                  <p class="text-muted">We will send you a reset token</p>

                  <CInput
                    placeholder="Email"
                    autocomplete="email"
                    v-model="email"
                  >
                    <template #prepend-content><CIcon name="cil-user"/></template>
                  </CInput>
                <p v-if="successMsg" class="successMsg">{{ successMsg }}</p>
                  <p v-if="this.$store.state.errors.length">
                  <b>Please correct the following error(s):</b>
                  <ul>
                    <li class="error" v-for="(error, index) in this.$store.state.errors" v-bind:key="index">{{ error }}</li>
                  </ul>
                </p>
                  <CRow>
                    <CCol col="6" class="text-left">
                      <CButton style="background-color:#52b947;color:white" @click="forget" class="px-4">Reset</CButton>
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
                    src="login.PNG"
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
  name: 'ForgetPassword',
  data(){
    return{
      email:'',
      successMsg:''
    }
  },
  created(){
    this.$store.commit('remove_errors');
  },
  methods:{
    ...mapActions(["set_errors"]),
      forget(){
      let email = this.email;
      if(email != '' && email != undefined){
        this.$http.post('forget-password', { email })
        .then(() =>{
          this.successMsg= "Successfully Sent the Link, check your inbox...";
           this.$store.commit('remove_errors');
        }).catch(() => {
           this.successMsg = "";
         this.set_errors('invalid Email');
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
