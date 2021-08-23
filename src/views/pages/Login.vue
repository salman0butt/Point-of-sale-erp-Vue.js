<template>
  <div class="c-app flex-row align-items-center" :class="{ 'c-dark-theme': $store.state.darkMode }">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm @submit.prevent="login">
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>

                  <CInput
                    placeholder="username or email or Employee ID"
                    autocomplete="username"
                    v-model="username"
                  >
                    <template #prepend-content><CIcon name="cil-user"/></template>
                  </CInput>
                  <CInput
                    placeholder="Password"
                    type="password"
                    autocomplete="curent-password"
                     v-model="password"
                  >
                    <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                  </CInput>
                  <p v-if="this.$store.state.errors.length">
                  <b>Please correct the following error(s):</b>
                  <ul>
                    <li class="error" v-for="(error, index) in this.$store.state.errors" v-bind:key="index">{{ error }}</li>
                  </ul>
                </p>
                  <CRow>
                    <CCol col="6" class="text-left">
                      <CButton style="background-color:#52b947;color:white" @click="login" class="px-4">Login</CButton>
                    </CCol>
                    <CCol col="6" class="text-right">
                      <router-link to="/forget-password"  color="link" class="px-0">Forgot password?</router-link>
                      <CButton color="link" class="d-lg-none">Register now!</CButton>
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
// import http from '../../http-common'
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data(){
    return{
      username:'',
      password:''
    }
  },
  created(){
    if(this.$store.getters.isLoggedIn){
      this.$router.push("/dashboard")
    }
     this.$store.commit('remove_errors');
  },
  methods:{
    ...mapActions(["set_errors"]),
    login(){
      let username = this.username;
      let password = this.password
      if(username != '' && username != undefined && password != undefined && password != ''){
        this.$store.dispatch('login', { username, password })
        .then(() =>{
          localStorage.setItem('username', this.username);
          this.$store.commit('remove_errors');
          this.$router.push({path: '/dashboard'});
        }).catch(() => {
         this.set_errors('Username Or Password Incorrect');
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
</style>
