<template>
  <div :class="{ 'c-dark-theme': $store.state.darkMode }" class="c-app">
    <CContainer class="d-flex align-items-center min-vh-100">
      <CRow class="w-100 justify-content-center">
        <CCol md="6">
          <div class="w-100">
            <img src="/img/images/404.svg" alt="404" />
            <div class="text-center">
              <h4 class="pt-3">Oops! You're lost.</h4>
              <p class="text-muted">The page you are looking for was not found.</p>
            </div>
          </div>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
export default {
  name: "Page404",
};
</script>
