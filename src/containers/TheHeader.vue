<template>
  <CHeader class="headerStyle" fixed with-subheader light>
    <CToggler
      in-header
      class="ml-3 d-lg-none"
      @click="$store.commit('toggleSidebarMobile')"
    />
    <CToggler
      in-header
      class="ml-3 d-md-down-none"
      @click="$store.commit('toggleSidebarDesktop')"
    />
    
    <CHeaderNav class="d-md-down-none mr-auto">
      
    </CHeaderNav>
    <CHeaderNav class="mr-4">
      <!-- <CHeaderNavItem class="d-md-down-none mx-0"> -->
        <NotificationBell/>
      <!-- </CHeaderNavItem> -->
      <TheHeaderDropdownAccnt/>
    </CHeaderNav>
    <CSubheader class="px-3">
      <CBreadcrumbRouter class="border-0 mb-0"/>
    </CSubheader>
  </CHeader>
</template>

<script>
import TheHeaderDropdownAccnt from './TheHeaderDropdownAccnt'
import NotificationBell from './NotificationDropdown'

export default {
  name: 'TheHeader',
  components: {
    TheHeaderDropdownAccnt, NotificationBell
  },
  data(){
    return{
      isalert:false
    }
    
  },
  methods:{
    Notification(){
      this.isalert = true;
    }
  }
}
</script>
<style scoped>
.c-header-toggler:focus{
  outline: 0!important;
}
</style>